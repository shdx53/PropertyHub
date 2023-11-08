<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import GoogleMaps from "../components/ListingView/GoogleMaps.vue";

import { ref, watch } from "vue";

// External libraries
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, updateDoc, collection, getDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";

var msg = ref("");

// init listing objs
const route = useRoute();
const listingId = route.query.listingId;
const address = ref("");
const listedPrice = ref(null);
const about = ref("");
const bedrooms = ref("");
const bathrooms = ref("");
const balcony = ref("");
const floorSize = ref("");
const remainingLease = ref("");
const tenure = ref("");
const type = ref("");
const dateOfEntry = ref(null);
const level = ref("");
const favoriteCounts = ref("");
const imgPath = ref("");
const viewingDates = ref([])
const imgUrl = ref("")

// init seller objs
const sellerEmail = ref("");
const sellerName = ref("");
const sellerPhone = ref("");
const sellerBal = ref(null);

// init combined viewingDates w Buyer info
var bidArr = ref([])
const bidArrCheck = ref(false);


// price to beat and purchaseArr
const priceToBeat = ref(0)
var purchaseArr = ref([])

// fetch data and add it to objects
const db = getFirestore();
const listingDocRef = doc(db, "listings", listingId);
const listing = ref({});

onSnapshot(listingDocRef, listing => {
  listing.value = listing.data();

  // handle listing data
  address.value = listing.value.address;
  listedPrice.value = listing.value.listedPrice;
  about.value = listing.value.about;
  bedrooms.value = listing.value.bedrooms;
  bathrooms.value = listing.value.bathrooms;
  balcony.value = listing.value.balcony;
  floorSize.value = listing.value.floorSize;
  remainingLease.value = listing.value.remainingLease;
  tenure.value = listing.value.tenure;
  type.value = listing.value.type;
  dateOfEntry.value = listing.value.dateOfEntry;
  level.value = listing.value.level;
  favoriteCounts.value = listing.value.favoriteCounts;
  imgPath.value = listing.value.imgPath;

  bidArr = listing.value.viewingDates;
  viewingDates.value = listing.data().viewingDates;

  priceToBeat.value = listing.value.listedPrice; // initial price = listed price

  // populate bidArr for viewing
  for (let bid of bidArr){
    if (bid.buyer != null){
      const bidDocRef = doc(db, "balance", bid.buyer);
      if (bidDocRef) {
        getDoc(bidDocRef)
          .then(doc =>{
            bid.name = doc.data().name 
            bid.phone = doc.data().phone 
          })
      }
      bidArrCheck.value = true;
    }
  }  
  
  // handle purchaseBids
  if (listing.value.purchaseBids != null){
    purchaseArr.value = listing.value.purchaseBids;

    // handle updating of priceToBeat
    for (let purchase of purchaseArr.value){
      if (purchase.buyerBid > priceToBeat.value){
        priceToBeat.value = purchase.buyerBid 
      }
    }
  }
  // handle image storage
  const storage = getStorage();
  const storageReference = storageRef(storage, imgPath.value);
  getDownloadURL(storageReference)
    .then((url) => {
      imgUrl.value = url;
    })

  // handle seller data
  sellerEmail.value = listing.value.userEmail;
  const balanceDocRef = doc(db, "balance", sellerEmail.value);

  onSnapshot(balanceDocRef, balance => {
    balance.value = balance.data();

    sellerPhone.value = balance.value.phone;
    sellerName.value = balance.value.name;
    sellerBal.value = balance.value.balance;
  });

  
});

// Checks if user is logged in
const auth = getAuth();
const userId = ref(null);
const isLoggedIn = ref(false);

const userEmail = ref(""); // Checks if user is seller or customer

let customersDocRef;

onAuthStateChanged(auth, user => {
  if (user) {
    isLoggedIn.value = true;
    customersDocRef = doc(db, "customers", user.uid);
    userId.value = auth.currentUser.uid;
    userEmail.value = auth.currentUser.email;
  }
})

// Handle favorite toggle
let isFavorited = ref(null);
let favoritedListings = ref([]);

const customersColRef = collection(db, "customers");

updateFavorites();

onSnapshot(customersColRef, snapshot => {
  updateFavorites();
})

function updateFavorites() {
  if (customersDocRef) {
    getDoc(customersDocRef)
      .then(doc => {
        favoritedListings.value = doc.data().favoritedListings;

        if (!favoritedListings.value.includes(listingId)) {
          isFavorited.value = false;
        } else if (favoritedListings.value.includes(listingId)) {
          isFavorited.value = true;
        }
      })
      .catch(err => console.log(err.message))
  } else {
    isFavorited.value = false;
  }
}

function handleFavorite() {
  event.preventDefault();
  event.stopPropagation();
  const listingsDocRef = doc(db, "listings", listingId);

  if (isFavorited.value) {
    isFavorited.value = false;

    updateDoc(listingsDocRef, {
      favoriteCounts: favoriteCounts.value - 1,
      isFavorited: false
    })

    const itemToBeRemovedIndex = favoritedListings.value.indexOf(listingId);
    favoritedListings.value.splice(itemToBeRemovedIndex, 1);

    updateDoc(customersDocRef, {
      favoritedListings: favoritedListings.value
    })
  } else {
    isFavorited.value = true;

    updateDoc(listingsDocRef, {
      favoriteCounts: favoriteCounts.value + 1,
      isFavorited: true
    })

    if (!favoritedListings.value.includes(listingId)) {
      updateDoc(customersDocRef, {
        favoritedListings: arrayUnion(listingId)
      })
    }
  }
}

// handling dashboard
let activeTab = ref("view");

function handleActiveTab(tab) {
  if (tab == "view") {
    activeTab.value = "view";
  } else {
    activeTab.value = "purchase";
  }
}

// handling purchase bids
let inpPurchasePrice;
async function handlePurchaseBid(){
  // comparison
  if (parseInt(inpPurchasePrice) <= parseInt(listedPrice.value)){
    msg.value = "Your bid to purchase does not meet minimum listing price!";
    setTimeout(() => {
      msg.value = "";
    }, 3000);
    return false
  } else{
    if (parseInt(inpPurchasePrice) > parseInt(priceToBeat.value)){
      priceToBeat.value = parseInt(inpPurchasePrice);
    }

    // add bid to purchaseArr
    const bidDocRef = doc(db, "balance", userEmail.value);
    if (bidDocRef) {
      await getDoc(bidDocRef)
        .then(doc =>{
          console.log(doc.data())
          var bid = {};
          bid['buyerName'] = doc.data().name;
          bid['buyerPhone'] = doc.data().phone;
          bid['buyerBid'] = inpPurchasePrice;

          purchaseArr.value.push(bid);
          // console.log(purchaseArr.value)
        })
    }

    // update purchaseBids in Firebase
    const listingDocRef = doc(db, "listings", listingId);
    updateDoc(listingDocRef, {
        purchaseBids : purchaseArr.value
    })
  
    msg.value = "Purchase bid submitted!"
    setTimeout(() => {
      msg.value = "";
    }, 3000);
  }
}

// handling viewing bids
let selectedViewingDate = "";
const userBal = ref(null);

watch(userEmail, async () => {
  if (userEmail.value) {
    const balanceDocRef = doc(db, "balance", userEmail.value);

    onSnapshot(balanceDocRef, balance => {
      userBal.value = balance.data().balance
    })
  }
})

function handleViewingBid(){
  // handle user data

  // let bid = selectedViewingDate;
  
  if (userBal.value >= selectedViewingDate.price){
    // bid is successful 

    // subtract from user
    userBal.value -= parseInt(selectedViewingDate.price);
    const userDocRef = doc(db, "balance", userEmail.value);
    updateDoc(userDocRef, {
      balance: userBal.value
    })

    // add to seller
    sellerBal.value = parseInt(sellerBal.value) + parseInt(selectedViewingDate.price);
    const sellerDocRef = doc(db, "balance", sellerEmail.value);
    updateDoc(sellerDocRef, {
      balance: sellerBal.value
    })

    // update listing by replacing whole array
    for (let dateObj of viewingDates.value){
      if (dateObj == selectedViewingDate){
        dateObj.buyer = userEmail.value;
      }
    }

    const listingDocRef = doc(db, "listings", listingId);
    console.log(viewingDates.value)
    updateDoc(listingDocRef, {
      viewingDates : viewingDates.value
    })
    
    msg.value = "Deposit submitted!"
    setTimeout(() => {
      msg.value = "";
    }, 3000)
    return true
  }else{
    msg.value = "Not enough credits in balance!";
    setTimeout(() => {
      msg.value = "";
    }, 3000)
    return false
  }
}
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <div class="general__container">
    <!-- Block: custom-carousel -->
    <div id="imgCarousel" class="carousel slide mt-4">
      <!-- Elements: custom-carousel__indicators -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="0" class="active" aria-current="true"
          aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      </div>

      <!-- Block: custom-carousel__inner -->
      <div class="carousel-inner">
        <!-- Elements: custom-carousel__item -->
        <div class="carousel-item active custom-carousel__item">
          <img :src="imgUrl" class="d-block w-100 rounded" alt="Slide 1">
        </div>
      </div>

      <!-- Controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#imgCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#imgCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div> <!-- End of custom-carousel -->

    <!-- ListingOverview | User-CTA -->
    <div class="property-info__container my-5">
      <!-- Left column -->
      <div>
        <div class="property-overview-row">
          <div class="property-header">
            <h2 class="property-title">{{ address }}</h2>
            <button @click="handleFavorite" class="favorite-btn" :class="{ 'favorite-btn-active': isFavorited }"
              :disabled="!isLoggedIn">
              <img class="favorite-icon me-1" src="https://i.postimg.cc/7YTKqFY1/favorite-FILL1-wght400-GRAD0-opsz24.png">
              <span class="text-body-tertiary fw-bold" :class="{ 'favorite-qty': isFavorited }">{{
                favoriteCounts
              }}</span>
            </button>
          </div>

          <div class="property-price text-muted"> ${{ Number(listedPrice).toLocaleString() }}</div>

          <div class="section-divider"></div>

          <section class="overview-section">
            <div class="d-flex justify-content-center">
              <div class="mx-3 text-center">
                <div class="overview__description">Bedrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bed</span>
                  <span class="overview__value"> {{ bedrooms }} </span>
                </div>
              </div>

              <div class="mx-3 text-center">
                <div class="overview__description">Bathrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bathtub</span>
                  <span class="overview__value"> {{ bathrooms }} </span>
                </div>
              </div>

              <div class="mx-3 text-center">
                <div class="overview__description">Living Area</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">crop_square</span>
                  <span class="overview__value">
                    {{ floorSize }} <span class="overview__unit">sqft</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="about-section">
            <div class="description-block">
              <h2>About the Property</h2>
              <p class="text">
                {{ about }}
              </p>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="details-section">
            <h2>More Details</h2>
            <div class="row">
              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Property Type</div>
                  <div class="col-6 col-md-12">{{ type }}</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Level</div>
                  <div class="col-6 col-md-12">{{ level }}</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Tenure</div>
                  <div class="col-6 col-md-12">{{ tenure }} Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Remaining Lease</div>
                  <div class="col-6 col-md-12">{{ remainingLease }} Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Balcony</div>
                  <div class="col-6 col-md-12">{{ balcony }}</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Listed On</div>
                  <div v-if="dateOfEntry" class="col-6 col-md-12">
                  {{ dateOfEntry.toDate().toLocaleString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                  }) }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="mb-5">
            <div>
              <h2>Nearby Amenities</h2>
              <GoogleMaps v-if="address && listedPrice && imgPath" :address="address" :listedPrice="listedPrice"
                :imgPath="imgPath" />
            </div>
          </section>
        </div>
      </div> <!-- End of Left column -->

      <!-- Right column -->
      <div>
        <!-- Dashboard if user is seller -->
        <div v-if="userEmail == sellerEmail" class="right__container mx-2 ms-lg-4">
          <h2 class="dashboard__title fw-bold mb-3">Your Dashboard</h2>
          <div class="nav__bar">
            <ul class="nav nav-tabs mb-3">
              <li class="nav-item">
                <a class="nav-link fw-bold" @click="handleActiveTab('view')"
                  :class="{ active: activeTab == 'view' }">Viewing Dates</a>
              </li>
              <li class="nav-item fw-bold">
                <a class="nav-link" @click="handleActiveTab('purchase')"
                  :class="{ active: activeTab == 'purchase' }">Purchase</a>
              </li>
            </ul>
          </div>
          <div class="buyer__info">
            <!-- View  -->
            <div v-if="activeTab == 'view'" class="view__container">
              <div>
                <!-- Loop to iterate through viewingDates-->
                
                <div v-if="bidArrCheck" class="text-center my-5">
                  <div v-for="bid of bidArr">
                    <div v-if="bid.name != null" class="user__profile mb-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <div class="bidder__name fw-bold mb-1">
                            {{ bid.name }}
                          </div>
                          <div class="bidder__phone text-body-secondary">
                            {{ bid.phone }}
                          </div>
                        </div>

                        <div>
                          <div class="date__title fw-bold mb-1">Date:</div>
                          <div class="date__value text-body-secondary">{{ bid.datetime.toDate().toLocaleString(undefined, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }) }} </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="text-muted text-center my-5">
                  You have no appointments scheduled
                </div>
                
              </div>
            </div>

            <div v-else class="purchase__container">
              <!-- Loop to iterate through purchaseBids -->
              
              <div v-if="purchaseArr.length>0" class="text-center my-5">
                <div v-for="bid of purchaseArr">
                  <div class="user__profile mb-3">
                    <div class="d-flex justify-content-between align-items-center">
                      <!-- name of bidder  -->
                      <div>
                        <div class="bidder__name fw-bold mb-1">{{bid.buyerName}}</div>
                        <div class="bidder__phone text-body-secondary">{{bid.buyerPhone}}</div>
                      </div>
    
                      <div>
                        <div class="bid-price__title fw-bold mb-1">Bid Price:</div>
                        <div class="bid-price__value text-body-secondary">${{bid.buyerBid}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="text-muted text-center my-5"> 
                {{console.log(purchaseArr)}}
                No bids to purchase have been made
              </div>


            </div>
          </div>
        </div>

        <!-- Seller information if user is customer -->
        <div v-else class="right__container py-4 ms-lg-4 border rounded">
          <div class="container-fluid">
            <div class="row mb-4">
              <div class="text-center">
                <div class="fw-bold fs-4">
                  {{ sellerName }}
                </div>
                <div>
                  {{ sellerEmail }}
                </div>
                <div>
                  {{ sellerPhone }}
                </div>
              </div>
            </div>
          </div>
          <!-- button for viewSlotsModal -->
          <div class="btn-container d-flex justify-content-center my-2">
            <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal"
              data-bs-target="#viewSlotsModal" :disabled="!isLoggedIn">
              Viewing
              <!-- How to add icons beside CTA?
                <span class="material-symbols-outlined" style="font-size:20px;">schedule_send</span> -->
            </button>
          </div>
          <!-- button for purchaseModal -->
          <div class="btn-container d-flex justify-content-center my-2">
            <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal"
              data-bs-target="#purchaseModal" :disabled="!isLoggedIn">
              Purchase
            </button>
          </div>
        </div>

      </div> <!-- End of Right column -->
    </div> <!-- End of ListingOverview | User-CTA -->

  </div> <!-- End of general container  -->

  <!-- viewSlotsModal -->
  <div class="modal fade rounded" id="viewSlotsModal" tabindex="-1" aria-labelledby="viewSlotsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-8 text-start">
                <b class="modal-title fs-4" id="viewSlotsModalLabel">Viewing</b>
              </div>
              <div class="col-4 text-end">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="row text-start">
              <p class="modal-subheader fs-6 mb-0">Place deposit for timeslots</p>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-4 text-center d-flex justify-content-center align-items-center">
                <img :src="imgUrl" class="rounded modal_img">
              </div>
              <div class="col-8 text-center px-1">
                <div class="text-start d-flex flex-column justify-content-between h-100">
                  <div>
                    <span id="modal-property-title">{{ address }}</span>

                    <!-- icons -->
                    <div id="modal-icons" class="d-flex mt-2">
                      <div class="me-3 icon-container">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">bed</span>
                          <div class="icon-text">{{ bedrooms }}</div>
                        </div>
                        <div class="listing-info text-muted">Bedrooms</div>
                      </div>

                      <div class="me-3 icon-container">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">bathtub</span>
                          <div class="icon-text">{{ bathrooms }}</div>
                        </div>
                        <div class="listing-info text-muted">Bathrooms</div>
                      </div>

                      <div>
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">crop_square</span>
                          <div class="icon-text">{{ floorSize }} sqft</div>
                        </div>
                        <div class="listing-info text-muted">Living Area</div>
                      </div>
                    </div>
                  </div>

                  <!-- Form for TimeSlot -->
                  <select v-if="viewingDates" class="form-select" v-model="selectedViewingDate" aria-label="Default select example" placeholder="Timeslots">
                    <option v-if="viewingDates" v-for="viewingDate in viewingDates" :value="viewingDate" :disabled="viewingDate.buyer" style="font-size: 12px;">
                      {{ viewingDate.datetime.toDate().toLocaleString(undefined, {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }) }} - ${{ viewingDate.price }}
                    </option>
                  </select>
                  <select v-else class="form-select" v-model="selectedViewingDate" aria-label="Default select example" placeholder="No Available Viewing Slots">

                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer flex-column justify-content-center">
          <button @click="handleViewingBid()" type="button" class="btn btn-primary btn--submit">Submit Deposit</button>
        </div>
        <div v-if="msg=='Deposit submitted!'" class="mb-3 text-center text-success" style="font-size: 13px;">
            {{ msg }}
        </div>
        <div v-else class="mb-3 text-center text-danger" style="font-size: 13px;">
            {{ msg }}
        </div>
      </div>
    </div>
  </div>

  <!-- purchaseModal -->
  <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="purchaseModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- modal-header -->
        <div class="modal-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-8 text-start">
                <b class="modal-title fs-4" id="purchaseModalLabel">Purchase</b>
              </div>
              <div class="col-4 text-end">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="row text-start">
              <p class="modal-subheader fs-6 mb-0">Submit bid to purchase unit</p>
            </div>
          </div>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-4 text-center d-flex justify-content-center align-items-center my-auto">
                <img :src="imgUrl" class="rounded modal_img">
              </div>
              <div class="col-8 text-center px-1">
                <div class="text-start d-flex flex-column justify-content-between h-100">
                  <div>
                    <span id="modal-property-title">{{ address }}</span>

                    <!-- icons -->
                    <div id="modal-icons" class="d-flex mt-1">
                      <div class="me-3 icon-container">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">bed</span>
                          <div class="icon-text">{{ bedrooms }}</div>
                        </div>
                        <div class="listing-info text-muted">Bedrooms</div>
                      </div>

                      <div class="me-3 icon-container">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">bathtub</span>
                          <div class="icon-text">{{ bathrooms }}</div>
                        </div>
                        <div class="listing-info text-muted">Bathrooms</div>
                      </div>

                      <div>
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2">crop_square</span>
                          <div class="icon-text">{{ floorSize }} sqft</div>
                        </div>
                        <div class="listing-info text-muted">Living Area</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-div">
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">$</span>
                      <input type="number" v-model="inpPurchasePrice" class="form-control input-group-value" placeholder="Bid Price"
                        aria-label="Bid Price" aria-describedby="basic-addon1" >

                    </div>
                    <div class="text-start highest-bid">Current Price to Beat: ${{ priceToBeat }} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer flex-column justify-content-center">
          <button @click="handlePurchaseBid()" type="button" class="btn btn-primary btn--submit">Submit Bid</button>
          <div v-if="msg=='Your bid to purchase does not meet minimum listing price!'" class="mb-2 text-center text-danger" style="font-size: 13px;">
            {{ msg }}
          </div>
          <div v-else class="mb-2 text-center text-success" style="font-size: 13px;">
            {{ msg }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
/* Elements */
.general__container {
  width: 90%;
  max-width: 750px;
}

.material-symbols-outlined {
  font-size: 22px;
  font-weight: 300;
}

h1 {
  color: black;
  text-align: center;
}

.custom-carousel__item img {
  /* Your styling for carousel images */
  width: 100%;
  /* Adjust this width as needed */
  max-height: 450px;
  /* Adjust this height as needed */
  object-fit: cover;
  /* Maintain aspect ratio and cover the entire space */
  aspect-ratio: 1.5 / 1;
}

.property-info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.property-header {
  display: flex;
  justify-content: space-between;
}

.property-price {
  font-size: 22px;
}

.property-title {
  font-size: 25px;
  margin-bottom: auto;
  margin-top: auto;
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 12px;
}

.favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 1px 5px;
  display: flex;
  align-items: center;
}

.favorite-btn-active {
  background-color: red;
}

.favorite-icon {
  width: 20px;
}

.favorite-qty {
  color: white !important;
}

.overview__value {
  font-size: 20px;
  align-self: center;
}

.overview__unit {
  font-size: 18px;
}

.overview__description {
  font-size: 16px;
  font-weight: 700;
}

.section-divider {
  margin-top: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid lightgrey;
}

.right__container {
  width: 80vw;
  max-width: 450px;
}

.modal-body {
  border: none;
}

.modal-body #modal-property-title {
  font-size: 18px;
  font-weight: bold;
}

.modal-body .listing-info {
  font-size: 12px;
}

.icon-text {
  font-size: 16px;
}

.dashboard__title {
  font-size: 16px;
}

.nav-link {
  color: black;
  font-size: 12px;
  cursor: pointer;
}

.active {
  color: #0b5ed7 !important;
}

.bid__date-time {
  font-weight: bold;
  font-size: 14px;
}

.user__profile {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  border: 1px solid lightgrey;
  border-radius: 8px;
  padding: 20px 30px;
}

.bidder__name {
  font-size: 16px;
}

.bidder__phone {
  font-size: 14px;
}

.bid-price__title,
.date__title {
  font-size: 16px;
}

.bid-price__value,
.date__value {
  font-size: 14px;
}

.form-select,
.btn--submit {
  font-size: 14px;
}

.form-select {
  max-width: 250px;
}

.input-div {
  max-width: 200px;
}

.highest-bid {
  margin-top: 2px;
}

.input-group-text,
.input-group-value {
  font-size: 14px;
}

.highest-bid {
  font-size: 10px;
}

.modal_img {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
}

/* responsiveness */
@media (min-width: 1150px) {
  .general__container {
    max-width: 1150px;
  }
  
  .property-info__container {
    flex-direction: row;
    align-items: start;
  }

  h2 {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 15px;
  }

  .property-title {
    font-size: 30px;
    margin-bottom: auto;
  }

  .property-price {
    font-size: 26px;
  }

  .view__container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .purchase__container {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
  }

  .right__container {
    max-width: 400px;
  }
}

@media (max-width: 585px) {

  /* div.property-info__container{
    width: 80%;
    margin:auto;
    align-items: center;
  } */
  .overview__description {
    font-size: 16px;
    font-weight: 700;
  }

  .overview__value {
    font-size: 16px;
  }

  .overview__unit {
    font-size: 16px;
  }

  .modal-dialog {
    width: 90vw;
    margin: auto;
  }

  .modal-body .icon-text {
    font-size: 16px;
  }

  .modal-body .input-group {
    justify-content: center;
  }

  .modal-body #modal-property-title {
    font-size: 18px;
  }

  .modal-body .listing-info {
    font-size: 12px;
  }
}

@media (max-width: 500px) {
  .overview__description {
    font-size: 14px;
  }

  .overview__value {
    font-size: 13px;
  }

  .overview__unit {
    font-size: 13px;
  }

  .material-symbols-outlined {
    font-size: 26px;
  }

  .icon-text {
    font-size: 14px;
  }

  .modal-body .listing-info {
    display: none;
  }

  .input-group-text,
  .input-group-value {
    font-size: 12px;
  }

  .highest-bid {
    font-size: 10px;
  }
}

@media (max-width: 450px) {
  .property-title {
    font-size: 22px;
  }

  .property-price {
    font-size: 20px;
  }

  .material-symbols-outlined {
    font-size: 24px;
  }

  .modal-body #modal-property-title {
    font-size: 14px;
  }

  .modal-body .icon-text {
    font-size: 12px;
  }

  .form-select,
  .btn--submit {
    font-size: 12px;
  }

  .input-div {
    margin-top: 10px;
    max-width: 160px;
  }

  .highest-bid {
    font-size: 8px;
  }
}

@media (max-width:800px) {
  .nav__bar {
    justify-content: start;
  }

  .buyer__info {
    justify-content: center;
  }
}

@media (min-width: 1150px) {
  .dashboard__title {
    font-size: 20px;
  }
}

@media (max-width: 1150px) {
  .dashboard__title {
    text-align: center
  }
}

</style>
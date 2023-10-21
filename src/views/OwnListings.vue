<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import GoogleMaps from "../components/ListingDetailsView/GoogleMaps.vue";
import ViewPurchase from "../components/OwnListings/ViewPurchase.vue";


import { ref } from "vue";
let isFavorited = ref(false);

function handleFavorite() {
  event.preventDefault();
  isFavorited.value = !isFavorited.value;
}

// firebase 
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import {db,getCurrentUser}  from "../firebase/index.js";

// const auth = getAuth();
// var shownBalance = ref(null);
// var email = ref(null);
// async function getBalance(email) {
//   const docRef = doc(db, "balance", email);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//     console.log(docSnap.data().balance);
//     shownBalance.value = docSnap.data().balance;
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }


// }

// getCurrentUser()
//   .then(user => {
//     if (user) {
//       email.value = user.email;
// //     // console.log(email.value);
//     getBalance(email.value);
//     } else {
//       console.log("No user is currently logged in.");
//     }
//   })
//   .catch(error => {
//     console.error("Error getting current user:", error);
//   });

</script>

<template>
  <!-- Nav -->
  <Navbar />

  <div class="general__container">
    <!-- Block: custom-carousel -->
    <div id="imgCarousel" class="carousel slide mx-auto mt-4">
      <!-- Elements: custom-carousel__indicators -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#imgCarousel" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
      </div>

      <!-- Block: custom-carousel__inner -->
      <div class="carousel-inner">
        <!-- Elements: custom-carousel__item -->
        <div class="carousel-item active custom-carousel__item">
          <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100 rounded"
            alt="Slide 1">
        </div>

        <!-- Add more carousel items as needed -->
        <div class="carousel-item custom-carousel__item">
          <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100 rounded" alt="Slide 2">
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

    <!-- Property Overview | Seller Information -->
    <div class="property-info__container my-5">
      <!-- Left column -->
      <div>
        <div class="property-overview-row">
          <div class="property-header">
            <h2 class="property-title">220B Bedok Central</h2>
            <button @click="handleFavorite" class="favorite-btn" :class="{ 'favorite-btn-active': isFavorited }">
              <img class="favorite-icon" src="../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
            </button>
          </div>

          <div class="property-price text-muted">$530,000</div>

          <div class="section-divider"></div>

          <section class="overview-section">
            <div class="d-flex justify-content-center">
              <div class="mx-3 text-center">
                <div class="overview__description">Bedrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bed</span>
                  <span class="overview__value">3</span>
                </div>
              </div>

              <div class="mx-3 text-center">
                <div class="overview__description">Bathrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bathtub</span>
                  <span class="overview__value">2</span>
                </div>
              </div>

              <div class="mx-3 text-center">
                <div class="overview__description">Living Area</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">crop_square</span>
                  <span class="overview__value">
                    984 <span class="overview__unit">sqft</span>
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
                Discover a remarkable opportunity with this newly listed property, offering a host of captivating
                features that define luxury living:
                <br>
                -High Floor
                <br>
                -Two lifts
                <br>
                -Unblock view
                <br>
                -Modern Renovations
                <br>
                -Spacious Layout
                <br>
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
                  <div class="col-6 col-md-12">5-room HDB</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Level</div>
                  <div class="col-6 col-md-12">8</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Tenure</div>
                  <div class="col-6 col-md-12">99 Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Remaining Lease</div>
                  <div class="col-6 col-md-12">40 Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Balcony</div>
                  <div class="col-6 col-md-12">Yes</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Listed On</div>
                  <div class="col-6 col-md-12">Date</div>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="mb-5">
            <div>
              <h2>Nearby Amenities</h2>
              <GoogleMaps />
            </div>
          </section>
        </div>
      </div>

      <!-- Right column -->
      <div class="seller__container py-4 ms-lg-4 border rounded">
        <div class="view__purchase">
          <ViewPurchase/>
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
  width: 80%;
  max-width: 1150px;
}

.material-symbols-outlined {
  font-size: 30px;
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
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.property-header{
  display:flex;
  justify-content:space-between;
}

.property-price{
  font-size: 22px;
}

.property-title{
  font-size: 25px;
  margin-bottom: auto;
  margin-top:auto;  
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
  padding: 5px;
}

.favorite-btn-active {
  background-color: red;
}

.favorite-icon {
  width: 20px;
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

.seller__container {
  width: 80vw;
  max-width: 400px;
}

.modal-body {
  border: none;
}

.modal-body #modal-property-title{
  font-size:18px ;
  font-weight: bold;
}

.modal-body .listing-info {
    font-size: 12px;
  }

.icon-text {
  font-size: 16px;
}

/* responsiveness */
@media (min-width: 1150px) {
  .property-info__container {
    flex-direction: row;
    align-items: start;
  }

  h2 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
  }

  .property-title{
  font-size: 30px;
  margin-bottom: auto;  
  }

  .property-price{
  font-size: 26px;
  }

}

@media (max-width: 585px){
  /* div.property-info__container{
    width: 80%;
    margin:auto;
    align-items: center;
  } */
  .overview__description {
    font-size: 15px;
    font-weight: 700;
  }
  .overview__value {
    font-size: 15px;
  }

  .overview__unit {
    font-size: 15px;
  }

  .modal-dialog {
    width:80vw;
    margin:auto;
  }

  #modal-icons {
    justify-content: center;
    align-items: center;
  }

  .modal-body .icon-text {
    font-size: 13px;
  }

  .modal-body .icon-container{
    margin-left: 1rem
  }
  .modal-body .input-group{
    justify-content: center;
  }


  .modal-body #modal-property-title{
    font-size:16px ;
    display: flex;
    justify-content: center;
  }

  .modal-body .listing-info {
    font-size: 10px;
  }
}

</style>
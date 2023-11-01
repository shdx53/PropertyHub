<script setup>
import Navbar from "../components/Navbar.vue";
import Listing from "../components/HomeView/Listing.vue";
import Footer from "../components/Footer.vue";
import Filter from "../components/Filter.vue";
import Autocomplete from "../components/Autocomplete.vue";
import { ref } from "vue";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "vue-router";

// Filter
let isDisplayFilter = ref(false);
function displayFilter() {
  isDisplayFilter.value = isDisplayFilter.value ? false : true;
};

// Fetch listings data
const db = getFirestore();
const listingsColRef = collection(db, "listings");
const recentListingsQuery = query(listingsColRef, orderBy("dateOfEntry", "desc"));
let recentListings = ref([]);

const popularListingsQuery = query(listingsColRef, orderBy("favoriteCounts", "desc"))
let popularListings = ref([]);

let recentListingsKey = ref(0);
let popularListingsKey = ref(0);

function displayListings(query, listings) {
  onSnapshot(query, snapshot => {
    let listingsData = snapshot.docs;
    listings.value = [];
    if (listingsData.length > 3) {
      listingsData = listingsData.slice(0, 3);
    }
    listingsData.forEach(listing => {
      listings.value.push([listing.id, listing.data()]);
    })
  })
  recentListingsKey.value += 1;
  popularListingsKey.value += 1;
}

displayListings(recentListingsQuery, recentListings);
displayListings(popularListingsQuery, popularListings);

// Rerender whenever user favorite/unfavorite a listing
const customersColRef = collection(db, "customers");

onSnapshot(customersColRef, () => {
  recentListingsKey.value += 1;
  popularListingsKey.value += 1;
})

// Rerender whenever user logs out
const auth = getAuth();

onAuthStateChanged(auth, () => {
  recentListingsKey.value += 1;
  popularListingsKey.value += 1;
})

// Submit search
const router = useRouter();
let addressInput = ref("");
function handleSubmit() {
  router.push({
    path: "/buy",
    query: { addressInput: addressInput.value }
  })
}

function handleInputChange(value) {
  addressInput.value = value;
}
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <!-- Header -->
  <header class="mb-5">
    <div class="general__container" :class="{ 'container--without-listings': recentListings.length == 0 }">
      <div class="row">
        <div class="col-md-7 text-center text-md-start">
          <h1 class="fw-bold text-white mb-3 mb-md-2">Buy and Sell your property in one place!</h1>

          <div class="header__subtitle mb-5 text-white-50">PropertyHub is an all-in-one property site that helps you find,
            purchase and sell your home.</div>

          <div class="header__search-container">
            <div class="input-group">
              <Autocomplete @inputChange="handleInputChange" />

              <button @click="displayFilter" class="btn header__filter-btn" type="button">
                <span class="material-symbols-outlined">tune</span>
              </button>
            </div>

            <button class="btn btn-primary ms-5" @click="handleSubmit">
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Recently Added -->
  <section class="mb-5">
    <div class="listings__container" :class="{ 'container--without-listings': recentListings.length == 0 }">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold m-0">Recently Added</h3>
        <a class="view-all" href="./buy">View All</a>
      </div>

      <div class="row">
        <!-- <div class="col-12 col-lg-4 mb-4">
          <Listing></Listing>
        </div> -->

        <div v-for="recentListing in recentListings" :key="recentListingsKey" class="col-12 mb-4 col-lg-4">
          <Listing :listingId="recentListing[0]" :address="recentListing[1].address"
            :listedPrice="recentListing[1].listedPrice" :bedrooms="recentListing[1].bedrooms"
            :bathrooms="recentListing[1].bathrooms" :floorSize="recentListing[1].floorSize"
            :favoriteCounts="recentListing[1].favoriteCounts" :imgPath="recentListing[1].imgPath">
          </Listing>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular Listings -->
  <section class="mb-5">
    <div class="listings__container" :class="{ 'container--without-listings': recentListings.length == 0 }">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold m-0">Popular Listings</h3>
        <a class="view-all" href="./buy">View All</a>
      </div>

      <div class="row">
        <div v-for="popularListing in popularListings" :key="popularListingsKey" class="col-12 mb-4 col-lg-4">
          <Listing :listingId="popularListing[0]" :address="popularListing[1].address"
            :listedPrice="popularListing[1].listedPrice" :bedrooms="popularListing[1].bedrooms"
            :bathrooms="popularListing[1].bathrooms" :floorSize="popularListing[1].floorSize"
            :favoriteCounts="popularListing[1].favoriteCounts" :isFavorited="popularListing[1].isFavorited"
            :imgPath="popularListing[1].imgPath">
          </Listing>
        </div>
      </div>
    </div>
  </section>

  <!-- Filter Overlay -->
  <section v-if="isDisplayFilter" class="filter-overlay">
    <Filter :isDisplayFilter="isDisplayFilter" :displayFilter="displayFilter" />
  </section>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
header {
  height: 500px;
  background-image: url("https://i.imgur.com/h11kSI3.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
}

header::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: black;
  opacity: 0.7;
}

.header__search-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
}

.header__filter-btn {
  background-color: #f0f0f0;
}

.header__filter-btn:hover {
  background-color: #f0f0f0;
  opacity: 0.9;
}

.container--without-listings {
  height: calc(100vh - 68px - 84px);
}

.listings__container {
  width: 90%;
  max-width: 550px;
  margin: 0 auto;
}

.view-all {
  text-decoration: none;
  color: black;
}

/* Filter Overlay */
.filter-overlay::before {
  content: "";
  position: fixed;
  z-index: 3;
  inset: 0;
  background-color: black;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .header__search-container {
    margin: 0;
    width: 100%;
    max-width: 500px;
  }
}

@media (min-width: 992px) {
  .listings__container {
    max-width: 1550px;
  }
}
</style>



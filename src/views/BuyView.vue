<script setup>
import Navbar from "../components/Navbar.vue";
import GoogleMaps from "../components/BuyView/GoogleMaps.vue";
import Footer from "../components/Footer.vue";
import Listing from "../components/BuyView/Listing.vue";
import Filter from "../components/Filter.vue";
import { ref, computed, watch } from "vue";
import Autocomplete from "../components/Autocomplete.vue";
import { getFirestore, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRoute, useRouter } from 'vue-router';

let isDisplayFilter = ref(false);
function displayFilter() {
  isDisplayFilter.value = isDisplayFilter.value ? false : true;
};

// Handle pagination
let currentPage = ref(1);
const itemsPerPage = 3;

const totalPages = computed(() => {
  if (listings.value.length) {
    return Math.ceil(listings.value.length / itemsPerPage);
  }
})

const pageNums = computed(() => {
  if (totalPages.value == 0) {
    return [];
  } else if (totalPages.value == 1) {
    return [1];
  } else if (totalPages.value == 2) {
    return [1, 2];
  } else if (totalPages.value >= 3) {
    return [1, 2, 3];
  }
})

const paginatedListings = computed(() => {
  if (listings.value.length) {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return listings.value.slice(startIndex, endIndex);
  }
})

// function previousPage() {
//   if (currentPage.value > 1) {
//     currentPage.value -= 1;
//     buyListingsKey.value += 1;
//   }
// };

// function nextPage() {
//   if (currentPage.value < totalPages.value) {
//     currentPage.value += 1;
//     buyListingsKey.value += 1;
//   }
// };

function specificPage(page) {
  currentPage.value = page;
  const prevPage = page - 1;
  const nextPage = page + 1;
  pageNums.value = [prevPage, page, nextPage];
  buyListingsKey.value += 1;
}

// Fetch listings data
const db = getFirestore();
const listingsColRef = collection(db, "listings");
const listingsQuery = query(listingsColRef, orderBy("dateOfEntry", "desc"));
let listings = ref([]);
let buyListingsKey = ref(0);

function displayListings(query, listings) {
  onSnapshot(query, snapshot => {
    listings.value = [];
    snapshot.docs.forEach(listing => {
      listings.value.push([listing.id, listing.data()]);
    })

    if (addressInput.value) {
      listings.value = listings.value.filter(listing => {
        const address = listing[1].address.toLowerCase();
        return address.includes(addressInput.value.toLowerCase())
      })
    }

    if (submittedFilterTowns.value) {
      const filteredListings = [];
      if (Array.isArray(submittedFilterTowns.value)) {
        for (const filterTown of submittedFilterTowns.value) {
          for (const listing of listings.value) {
            const address = listing[1].address.toLowerCase();
            if (address.includes(filterTown.toLowerCase())) {
              filteredListings.push(listing);
            }
          }
        }
        listings.value = filteredListings;
      } else {
        listings.value = listings.value.filter(listing => {
          const address = listing[1].address.toLowerCase();
          return address.includes(submittedFilterTowns.value.toLowerCase())
        })
      }
    }

    if (submittedFilterPrice.value) {
      listings.value = listings.value.filter(listing => {
        const listedPrice = listing[1].listedPrice;
        return listedPrice <= submittedFilterPrice.value
      })
    }

    if (submittedFilterBedrooms.value) {
      listings.value = listings.value.filter(listing => {
        const bedrooms = listing[1].bedrooms;
        return bedrooms == submittedFilterBedrooms.value
      })
    }
  })
  buyListingsKey.value += 1;
}

// // Rerender whenever user logs out
// const auth = getAuth();

// onAuthStateChanged(auth, () => {
//   buyListingsKey.value += 1;
// })

// Submit search
const router = useRouter();
const hasFilter = ref(false);
const isSearch = ref(false);
function handleInputChange(value) {
  addressInput.value = value;
  console.log(addressInput.value);
}

function handleFilterResults(value) {
  filterTowns.value = value.towns;
  filterPrice.value = value.price;
  filterBedrooms.value = value.bedrooms;
  hasFilter.value = true;
}

function handleSubmit() {
  router
    .push({
      path: "/buy",
      query: {
        addressInput: addressInput.value,
        filterTowns: filterTowns.value,
        filterPrice: filterPrice.value,
        filterBedrooms: filterBedrooms.value,
      }
    })
    .then(() => router.go())
}

// Matched listings
const route = useRoute();
const addressInput = ref("");
const filterTowns = ref([]);
const filterPrice = ref(null);
const filterBedrooms = ref(null);
const submittedFilterTowns = ref([]);
const submittedFilterPrice = ref(null);
const submittedFilterBedrooms = ref(null);

addressInput.value = route.query.addressInput;
submittedFilterTowns.value = route.query.filterTowns;
submittedFilterPrice.value = route.query.filterPrice;
submittedFilterBedrooms.value = route.query.filterBedrooms;

if (
  addressInput.value ||
  submittedFilterTowns.value ||
  submittedFilterPrice.value ||
  submittedFilterBedrooms.value
) {
  isSearch.value = true;
  displayListings(listingsQuery, listings);
}

displayListings(listingsQuery, listings);

</script>

<template>
  <!-- Nav -->
  <Navbar />

  <main class="general__container">
    <!-- Search -->
    <section class="search__container">
      <div class="d-flex justify-content-center">
        <div class="input-group">
          <Autocomplete @inputChange="handleInputChange" />

          <button @click="displayFilter" class="btn header__filter-btn" type="button" :class="{ 'header__filter-btn--active' : hasFilter }">
            <span class="material-symbols-outlined">tune</span>
          </button>
        </div>

        <button class="btn btn-primary ms-5" @click="handleSubmit">
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>

      <div class="mt-2 d-flex flex-wrap">
        <div v-if="submittedFilterTowns && isSearch" class="flair">
          <div>
            <span class="fw-bold">Towns: </span>
            <span v-if="Array.isArray(submittedFilterTowns)">
              <span v-for="filterTown in submittedFilterTowns" class="me-1">{{ filterTown }}</span>
            </span>
            <span v-else>{{ submittedFilterTowns }}</span>
          </div>
        </div>

        <div v-if="submittedFilterPrice && isSearch" class="flair">
          <div>
            <span class="fw-bold">Max Price: </span>${{ Number(submittedFilterPrice).toLocaleString() }}
          </div>
        </div>

        <div v-if="submittedFilterBedrooms && isSearch" class="flair">
          <div>
            <span class="fw-bold">Bedrooms: </span>{{ submittedFilterBedrooms }}
          </div>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section class="search-results__container">
      <div class="search-results__qty mb-2">{{ listings.length }} listings found</div>

      <div class="search-results__flex">
        <div class="search-results__listing-container">
          <div v-for="listing in paginatedListings" :key="buyListingsKey">
            <Listing :listingId="listing[0]" :address="listing[1].address" :listedPrice="listing[1].listedPrice"
              :bedrooms="listing[1].bedrooms" :bathrooms="listing[1].bathrooms" :floorSize="listing[1].floorSize"
              :favoriteCounts="listing[1].favoriteCounts" :imgPath="listing[1].imgPath">
            </Listing>
          </div>
        </div>

        <div class="search-results__map-container">
          <GoogleMaps :listings="paginatedListings" :key="paginatedListings" />
        </div>
      </div>

      <nav aria-label="Page navigation" class="mb-5 mg-lg-0">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': currentPage == 1 }" @click="specificPage(1)">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" :class="{ 'active': currentPage == page }" v-for="page in pageNums"
            @click="specificPage(page)">
            <a href="#" class="page-link">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage == totalPages }" @click="specificPage(totalPages)">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  </main>

  <!-- Filter Overlay -->
  <section v-if="isDisplayFilter" class="filter-overlay">
    <Filter :isDisplayFilter="isDisplayFilter" :displayFilter="displayFilter" @getFilterResults="handleFilterResults" />
  </section>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
/* Search */
.search__container {
  padding: 25px 0;
  max-width: 450px;
  margin: 0 auto;
}

.input-group {
  max-width: 440px;
}

.header__filter-btn {
  background-color: #f0f0f0;
}

.header__filter-btn--active {
  background-color: #22bf76;
}

.header__filter-btn:hover {
  background-color: lightgray;
}

.flair {
  font-size: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-right: 10px;
  padding: 3px 10px;
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

/* Search Results */
.search-results__container {
  max-width: 600px;
  margin: 0 auto;
}

.search-results__qty {
  font-size: 12px;
}

.search-results__flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 1px auto;
}

.search-results__map-container {
  display: none;
}

a {
  color: black;
  text-decoration: none;
}

.page-link {
  border: 0;
  font-size: 12px;
}

.page-link:hover {
  color: black;
}

@media (min-width: 576px) {
  .page-link {
    font-size: 14px;
  }
}

@media (min-width: 992px) {
  .general__container {
    height: calc(100vh - 65px - 84px);
  }

  .search__container {
    padding: 20px 0;
  }

  .header__filter-btn {
    padding: 0 10px;
  }

  .material-symbols-outlined {
    font-size: 18px;
  }

  .search-results__container {
    max-width: 700px;
  }

  .search-results__qty {
    font-size: 10px;
  }

  .search-results__flex {
    flex-direction: row;
    align-items: start;
  }

  .search-results__listing-container {
    width: 55%;
    margin-right: 30px;
  }

  .search-results__map-container {
    display: block;
    width: 45%;
    height: calc(417.47px - 15px);
  }

  .page-link {
    font-size: 10px;
  }
}

@media (min-width: 992px) and (min-height: 900px) {
  .search__container {
    padding: 25px 0;
  }

  .search-results__container {
    max-width: 850px;
  }

  .search-results__map-container {
    height: calc(544.83px - 15px);
  }

  .page-link {
    font-size: 12px;
  }
}

@media (min-width: 1400px) and (min-height: 900px) {
  .search-results__container {
    max-width: 900px;
  }

  .search-results__map-container {
    height: calc(575.11px - 15px);
  }

  .page-link {
    font-size: 14px;
  }
}
</style>



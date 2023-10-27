<script setup>
import Navbar from "../components/Navbar.vue";
import GoogleMaps from "../components/BuyView/GoogleMaps.vue";
import Footer from "../components/Footer.vue";
import Listing from "../components/BuyView/Listing.vue";
import Filter from "../components/Filter.vue";
import { ref } from "vue";
import Autocomplete from "../components/Autocomplete.vue";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

let isDisplayFilter = ref(false);
function displayFilter() {
  isDisplayFilter.value = isDisplayFilter.value ? false : true;
};

// Fetch listings data
const db = getFirestore();
const listingsColRef = collection(db, "listings");
const listingsQuery = query(listingsColRef, orderBy("dateOfEntry", "desc"));
let listings = ref([]);

let buyListingsKey = ref(0);

function displayListings(query, listings) {
  onSnapshot(query, snapshot => {
    let listingsData = snapshot.docs;
    listings.value = [];
    if (listingsData.length > 3) {
      listingsData = listingsData.slice(0, 4);
    }
    snapshot.docs.forEach(listing => {
      listings.value.push([listing.id, listing.data()]);
    })
  })
  buyListingsKey.value += 1;
}

displayListings(listingsQuery, listings);

//getting data from firestore
// import { doc, getDoc } from "firebase/firestore";

// const docRef = doc(db, "listings", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <main class="general__container">
    <!-- Search -->
    <section class="search__container">
      <div class="input-group">
        <Autocomplete />

        <button @click="displayFilter" class="btn header__filter-btn" type="button">
          <span class="material-symbols-outlined">tune</span>
        </button>
      </div>

      <button class="btn btn-primary ms-5">
        <span class="material-symbols-outlined">search</span>
      </button>
    </section>

    <!-- Search Results -->
    <section class="search-results__container">
      <div class="search-results__qty mb-2">{{ listings.length }} listings found</div>

      <div class="search-results__flex">
        <div class="search-results__listing-container">
          <div v-for="listing in listings" :key="buyListingsKey">
            <Listing :listingId="listing[0]" :address="listing[1].address"
              :listedPrice="listing[1].listedPrice" :bedrooms="listing[1].bedrooms"
              :bathrooms="listing[1].bathrooms" :floorSize="listing[1].floorSize"
              :favoriteCounts="listing[1].favoriteCounts" :imgPath="listing[1].imgPath">
            </Listing>
          </div>
        </div>

        <div class="search-results__map-container">
          <GoogleMaps :listings="listings" :key="listings"/>
        </div>
      </div>

      <nav aria-label="Page navigation" class="mb-5 mg-lg-0">
        <ul class="pagination justify-content-center">
          <li class="page-item">
            <a class="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
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
    <Filter :isDisplayFilter="isDisplayFilter" :displayFilter="displayFilter" />
  </section>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
/* Search */
.search__container {
  display: flex;
  justify-content: center;
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

.header__filter-btn:hover {
  background-color: lightgray;
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
  margin: 0 auto;
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
    height: calc(100vh - 68px - 84px);
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



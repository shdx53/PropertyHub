<script setup>
import Navbar from "../components/Navbar.vue";
import GoogleMaps from "../components/BuyView/GoogleMaps.vue";
import Footer from "../components/Footer.vue";
import Listing from "../components/BuyView/Listing.vue";
import Filter from "../components/Filter.vue";
import { ref } from "vue";
import Autocomplete from "../components/Autocomplete.vue";

let isDisplayFilter = ref(false);
function displayFilter() {
  isDisplayFilter.value = isDisplayFilter.value ? false : true;
};

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
      <div class="search-results__qty mb-2">200 listings found</div>

      <div class="search-results__flex">
        <div class="search-results__listing-container">
          <Listing></Listing>
          <Listing></Listing>
          <Listing></Listing>
        </div>

        <div class="search-results__map-container">
          <GoogleMaps />
        </div>
      </div>

      <div class="page-num text-center mb-5 mb-lg-0">
        <a class="me-2" href="#">1</a>
        <a class="me-2" href="#">2</a>
        <a class="me-2" href="#">3</a>
        <span class="me-2">. . .</span>
        <a href="#">20</a>
      </div>
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
}

.input-group {
  max-width: 440px;
}

.header__filter-btn {
  background-color: #f0f0f0;
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

.page-num {
  font-size: 8px;
}

a {
  color: black;
  text-decoration: none;
}

.search-results__map-container {
  display: none;
}

@media (min-width: 992px) {
  .general__container {
    height: calc(100vh - 65px - 87px);
  }

  .search-results__container {
    max-width: 700px;
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
}

@media (min-width: 992px) and (min-height: 900px) {
  .search-results__container {
    max-width: 800px;
  }

  .search-results__map-container {
    height: calc(514.59px - 15px);
  }

  .page-num {
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

  .page-num {
    font-size: 14px;
  }
}
</style>



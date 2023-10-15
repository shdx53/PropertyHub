<script setup>
import Navbar from "../components/Navbar.vue";
import Listing from "../components/HomeView/Listing.vue";
import Footer from "../components/Footer.vue";
import Filter from "../components/Filter.vue"
import { ref } from "vue";

let isDisplayFilter = ref(false);
function displayFilter() {
  isDisplayFilter.value = isDisplayFilter.value ? false : true;
};
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <!-- Header -->
  <header class="mb-5">
    <div class="general__container general__container--home">
      <div class="row">
        <div class="col-md-7 text-center text-md-start">
          <h1 class="fw-bold text-white mb-3 mb-md-2">Buy and Sell your property in one place!</h1>

          <div class="header__subtitle mb-5 text-white-50">PropertyHub is an all-in-one property site that helps you find,
            purchase and sell your home.</div>

          <div class="header__search-container">
            <div class="input-group">
              <input type="text" class="form-control border border-0" placeholder="Search">

              <button @click="displayFilter" class="btn header__filter-btn" type="button">
                <span class="material-symbols-outlined">tune</span>
              </button>
            </div>

            <button class="btn btn-primary ms-5">
              <span class="material-symbols-outlined">search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Recently Added -->
  <section class="mb-5">
    <div class="general__container general__container--home">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold m-0">Recently Added</h3>
        <a class="view-all" href="./buy">View All</a>
      </div>

      <div class="row">
        <div class="col-12 col-lg-4 mb-4">
          <Listing></Listing>
        </div>

        <div class="col mb-4 col-lg-4 ">
          <Listing></Listing>
        </div>

        <div class="col col-lg-4 ">
          <Listing></Listing>
        </div>
      </div>
    </div>
  </section>

  <!-- Popular Listings -->
  <section class="mb-5">
    <div class="general__container general__container--home">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold m-0">Popular Listings</h3>
        <a class="view-all" href="./buy">View All</a>
      </div>

      <div class="row">
        <div class="col-12 col-lg-4 mb-4">
          <Listing></Listing>
        </div>

        <div class="col mb-4 col-lg-4 ">
          <Listing></Listing>
        </div>

        <div class="col col-lg-4 ">
          <Listing></Listing>
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
    background-image: url("../assets/img/HomeView/jiachen-lin-AIk_5-M9Uho-unsplash.jpg");
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

  .general__container--home {
    max-width: 1400px;
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
</style>



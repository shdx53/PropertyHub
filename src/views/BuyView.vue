<script setup>
import Navbar from "../components/Navbar.vue";
import GoogleMaps from "../components/BuyView/GoogleMaps.vue";
import Footer from "../components/Footer.vue";
import Listing from "../components/BuyView/Listing.vue";
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <main class="general-container">
    <!-- Search -->
    <section class="search-container">
      <div class="input-group">
        <input type="text" class="form-control border border-light-subtle" placeholder="Search">

        <button class="btn header__filter-btn" type="button">
          <span class="material-symbols-outlined">tune</span>
        </button>
      </div>

      <button class="btn btn-primary ms-5">
        <span class="material-symbols-outlined">search</span>
      </button>
    </section>

    <!-- Search Results -->
    <div class="search-results__container">
      <div class="search-results__qty mb-2">200 listings found</div>

      <div class="search-results__flex">
        <div class="search-results__listing-container me-lg-5">
          <Listing></Listing>
          <Listing></Listing>
          <Listing></Listing>
        </div>

        <div class="search-results__map-container">
          <GoogleMaps />
        </div>
      </div>

      <div class="text-center mb-5 mb-lg-0">
        <a class="me-3" href="#">1</a>
        <a class="me-3" href="#">2</a>
        <a class="me-3" href="#">3</a>
        <span class="me-3">. . .</span>
        <a href="#">20</a>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.input-group {
  max-width: 440px;
}

.header__filter-btn {
  background-color: #f0f0f0;
}

.search-results__container {
  max-width: 1200px;
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

.search-results__listing-container {
  width: 75%;
}

a {
  color: black;
  text-decoration: none;
}

.search-results__map-container {
  display: none;
}

@media (min-width: 992px) {
  .general-container {
    height: calc(100vh - 65px - 87px);
  }

  .search-results__flex {
    flex-direction: row;
    align-items: start;
  }

  .search-results__listing-container {
    width: 60%;
  }

  .search-results__map-container {
    display: block;
    width: 442px;
    height: 570px;
  }
}
</style>


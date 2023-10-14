<script setup>
import { ref } from "vue";
let isFavorited = ref(false)

function handleFavorite() {
  event.preventDefault()
  isFavorited.value = !isFavorited.value
}
</script>

<template>
  <a href="#">
    <div class="card">
      <img src="../../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="card-img-top card__img">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h5 class="card-title fw-bold mb-1">220B Bedok Central</h5>
          <button 
            @click="handleFavorite" 
            class="favorite-icon-btn"
            :class="{ 'favorite-icon-btn-active': isFavorited }"
          >
            <img class="favorite-icon" src="../../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
          </button>
        </div>

        <p class="card-text text-muted">$530,000</p>
        <hr class="text-black-50">

        <div class="d-flex">
          <div class="me-3">
            <div class="d-flex">
              <span class="material-symbols-outlined me-2">bed</span>
              <b class="listing-info-value">3</b>
            </div>

            <div class="listing-info-description text-muted">Bedrooms</div>
          </div>

          <div class="me-3">
            <div class="d-flex">
              <span class="material-symbols-outlined me-2">bathtub</span>
              <b class="listing-info-value">2</b>
            </div>

            <div class="listing-info-description text-muted">Bathrooms</div>
          </div>
          <div>

            <div class="d-flex">
              <span class="material-symbols-outlined me-2">crop_square</span>
              <b class="listing-info-value">984 sqft</b>
            </div>

            <div class="listing-info-description text-muted">Living Area</div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
}

.card__img {
  height: 350px;
  object-fit: cover;
}

.favorite-icon-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 1px 5px;
}

.favorite-icon-btn-active {
  background-color: red;
}

.favorite-icon {
  width: 18px;
}

.card-text {
  font-size: 16px;
}

.listing-info-description {
  font-size: 13px;
}
</style>
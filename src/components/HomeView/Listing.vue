<script setup>
import { ref } from "vue";
let isFavorited = ref(false);

function handleFavorite() {
  event.preventDefault();
  isFavorited.value = !isFavorited.value;
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
            class="card__favorite-btn"
            :class="{ 'card__favorite-btn-active': isFavorited }"
          >
            <img class="card__favorite-icon" src="../../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
          </button>
        </div>

        <p class="card-text text-muted">$530,000</p>
        <hr class="text-black-50">

        <div class="d-flex">
          <div class="me-3">
            <div class="d-flex">
              <span class="material-symbols-outlined me-2">bed</span>
              <b>3</b>
            </div>

            <div class="card__property text-muted">Bedrooms</div>
          </div>

          <div class="me-3">
            <div class="d-flex">
              <span class="material-symbols-outlined me-2">bathtub</span>
              <b>2</b>
            </div>

            <div class="card__property text-muted">Bathrooms</div>
          </div>
          <div>

            <div class="d-flex">
              <span class="material-symbols-outlined me-2">crop_square</span>
              <b>984 <span class="card__unit">sqft</span></b>
            </div>

            <div class="card__property text-muted">Living Area</div>
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

.card__favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 1px 5px;
}

.card__favorite-btn-active {
  background-color: red;
}

.card__favorite-icon {
  width: 18px;
}

.card-text {
  font-size: 16px;
}

.card__unit {
  font-size: 14px;
}

.card__property {
  font-size: 13px;
}
</style>
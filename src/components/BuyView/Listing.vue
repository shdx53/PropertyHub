<script setup>
import { ref } from "vue";
let isFavorited = ref(false)

function handleFavorite() {
  event.preventDefault()
  isFavorited.value = !isFavorited.value
}
</script>

<template>
  <div class="card">
    <div class="row g-0">
      <div class="col-4">
        <img src="../../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg"
          class="card__img img-fluid rounded-start">
      </div>

      <div class="col-8">
        <div class="card-body d-flex flex-column justify-content-center h-100">
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

          <p class="card-text text-muted mb-0">$530,000</p>
          <hr class="text-black-50">

          <div class="d-flex">
            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bed</span>
                <b class="card__value">3</b>
              </div>
              <div class="d-none d-sm-block text-muted card__property">Bedrooms</div>
            </div>

            <div class="me-2 me-lg-3">
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">bathtub</span>
                <b class="card__value">2</b>
              </div>
              <div class="d-none d-sm-block text-muted card__property">Bathrooms</div>
            </div>

            <div>
              <div class="d-flex">
                <span class="material-symbols-outlined me-1">crop_square</span>
                <b class="card__value">984 <span class="unit">sqft</span></b>
              </div>
              <div class="d-none d-sm-block text-muted card__property">Living Area</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
}

.card-title {
  font-size: 15px;
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

.card-text,
.card__value {
  font-size: 12px;
}

.material-symbols-outlined {
  font-size: 16px;
}

.unit {
  font-size: 10px;
}

.card__property {
  font-size: 11px;
}

@media (min-width: 470px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 17px;
  }

  .card-text,
  .card__value {
    font-size: 14px;
  }

  .unit {
    font-size: 12px;
  }
}

@media (min-width: 576px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 20px;
  }

  .card-text,
  .card__value {
    font-size: 15px;
  }

  .unit {
    font-size: 14px;
  }
}

@media (min-width: 700px) {

  .card-title,
  .material-symbols-outlined {
    font-size: 24px;
  }

  .card-text,
  .card__value {
    font-size: 20px;
  }

  .unit {
    font-size: 18px;
  }

  .card__property {
    font-size: 15px;
  }
}

@media (min-width: 992px) {
  .card {
    height: 180px;
    margin-bottom: 15px;
  }

  .card__img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .card-title,
  .material-symbols-outlined {
    font-size: 20px;
  }

  .card-text,
  .card__value {
    font-size: 16px;
  }

  .unit {
    font-size: 14px;
  }

  .card__property {
    font-size: 12px;
  }
}
</style>
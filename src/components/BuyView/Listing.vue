<script setup>

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
          <h5 class="card-title fw-bold mb-1">$530,000</h5>
          <p class="card-text text-muted mb-0">220B Bedok Central</p>
          <hr>
        
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
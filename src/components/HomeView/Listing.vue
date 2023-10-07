<script setup>

</script>

<template>
  <div class="card">
    <img src="../../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="card-img-top card__img">
    <div class="card-body">
      <h5 class="card-title fw-bold mb-1">$530,000</h5>
      <p class="card-text text-muted">220B Bedok Central</p>
      <hr>

      <div class="d-flex">
        <div class="me-3">
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">bed</span>
            <b>3</b>
          </div>
          <div class="listing-info text-muted">Bedrooms</div>
        </div>

        <div class="me-3">
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">bathtub</span>
            <b>2</b>
          </div>
          <div class="listing-info text-muted">Bathrooms</div>
        </div>
        <div>
          
          <div class="d-flex">
            <span class="material-symbols-outlined me-2">crop_square</span>
            <b>984 sqft</b>
          </div>
          <div class="listing-info text-muted">Living Area</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card__img {
  height: 350px;
  object-fit: cover;
}

.card-text,
.listing-info {
  font-size: 13px;
}
</style>
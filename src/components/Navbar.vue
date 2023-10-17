<script setup>
import { ref } from 'vue';

let isExpanded = ref(false);
function handleToggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <nav class="navbar navbar-expand-sm sticky-top bg-black">
    <div class="container-fluid general__container px-0">
      <a class="navbar-brand" href="./home">
        <b>Property</b>Hub
      </a>

      <button @click="handleToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <img v-if="isExpanded" class="nav__close-icon" src="../assets/img/Navbar/close.png">
        <span v-else class="material-symbols-outlined text-white fs-1">menu</span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100 align-items-sm-center">
          <li class="nav-item">
            <a class="nav-link" href="./buy">Buy</a>
          </li>

          <li class="nav-item mb-5 mb-sm-0">
            <a class="nav-link" href="./sell">Sell</a>
          </li>

          <hr class="text-white-50">

          <div class="d-sm-flex w-100 justify-content-end">
            <!-- <li class="nav-item">
              <a class="nav-link pe-0" href="#">Sign In</a>
            </li> -->

            <li class="nav-item d-flex justify-content-between d-sm-none">
              <a class="nav-link pe-0" href="#">
                <img class="nav__user-img rounded-circle me-3 me-sm-1" src="https://source.unsplash.com/g0zwKn5vslI" />
                <span class="text-white pe-0 me-3">Chason Jui</span>
              </a>

              <a href="#">
                <img class="nav__logout-icon" src="../assets/img/Navbar/logout.png" />
              </a>
            </li>

            <li class="nav-item d-none d-sm-block">
              <button class="btn p-0" type="button">
                <img class="nav__user-img rounded-circle" src="https://source.unsplash.com/g0zwKn5vslI" />
              </button>
              <!-- <div>
                <a href="#">User Profile</a>
              </div> -->
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 18px 0 17px 0;
  z-index: 3;
}

.general__container {
  width: 90%;
}

.navbar-brand,
.nav-link {
  color: white;
  padding-top: 0;
  padding-bottom: 0;
}

.navbar-brand:hover {
  color: white;
}

.nav__close-icon {
  width: 15px;
  height: 15px;
}

.nav__logout-icon {
  width: 32px;
  height: 32px;
}

.nav-link:hover {
  color: lightgray;
}

.nav__user-img {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

@media (min-width: 576px) {
  .nav__user-img {
    width: 40px;
    height: 40px;
  }
}
</style>
<script setup>
import { ref } from 'vue';

let isNavExpanded = ref(false);
let isUserExpanded = ref(false);

function handleNavToggle() {
  isNavExpanded.value = !isNavExpanded.value;
}

function handleUserToggle() {
  isUserExpanded.value = !isUserExpanded.value;
}
</script>

<template>
  <nav class="navbar navbar-expand-md sticky-top bg-black">
    <div class="container-fluid general__container px-0">
      <a class="navbar-brand" href="./home">
        <b>Property</b>Hub
      </a>

      <button @click="handleNavToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
        aria-label="Toggle navigation">
        <img v-if="isNavExpanded" class="nav__close-icon" src="../assets/img/Navbar/close.png">
        <span v-else class="material-symbols-outlined text-white fs-1">menu</span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100 align-items-md-center">
          <li class="nav-item">
            <a class="nav-link" href="./buy">Buy</a>
          </li>

          <li class="nav-item mb-5 mb-md-0">
            <a class="nav-link" href="./sell">Sell</a>
          </li>

          <hr class="text-white-50">

          <div class="d-md-flex w-100 justify-content-end">
            <!-- <li class="nav-item">
              <a class="nav-link pe-0" href="#">Sign In</a>
            </li> -->

            <li class="nav-item d-flex justify-content-between d-md-none">
              <a class="nav-link pe-0" href="#">
                <img class="nav__user-img rounded-circle me-3 me-sm-1" src="https://source.unsplash.com/g0zwKn5vslI" />
                <span class="text-white fw-bold pe-0 me-3">Chason Jui</span>
              </a>

              <a href="#">
                <img class="nav__logout-icon" src="../assets/img/Navbar/logout.png" />
              </a>
            </li>

            <li class="nav-item user__container d-none d-md-block">
              <button @click="handleUserToggle" class="btn p-0" type="button">
                <img class="nav__user-img rounded-circle" src="https://source.unsplash.com/g0zwKn5vslI" />
              </button>

              <div v-if="isUserExpanded" class="user__collapse p-3">
                <a class="nav-link ps-0 d-flex align-items-center" href="#">
                  <img class="nav__user-img rounded-circle me-3" src="https://source.unsplash.com/g0zwKn5vslI" />
                  <span class="text-black fw-bold pe-0 me-3">Chason Jui</span>
                </a>

                <a href="#">
                  <img class="nav__logout-icon" src="../assets/img/Navbar/logout2.png" />
                </a>
              </div>
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

.user__container {
  position: relative;
}

.user__collapse {
  position: absolute;  
  top: 50px;
  right: 0;
  width: 250px;
  background-color: #f0f0f0;
  border-radius: 5px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 768px) {
  .nav__user-img {
    width: 40px;
    height: 40px;
  }
}
</style>
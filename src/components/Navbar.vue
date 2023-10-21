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
        <span v-else class="material-symbols-outlined text-white nav__menu-icon">menu</span>
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

            <div class="d-md-none">
              <div class="d-flex justify-content-between">
                <button class="btn p-0" data-bs-toggle="collapse" href="#userCollpase" role="button" aria-expanded="false" aria-controls="userCollapse">
                    <img class="nav__user-img rounded-circle me-3 me-md-1" src="https://source.unsplash.com/g0zwKn5vslI" />
                    <span class="text-white fw-bold pe-0 me-3">Chason Jui</span>
                </button>

                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <img class="nav__logout-icon" src="../assets/img/Navbar/logout.png" />
                  </a>
                </li>
              </div>
              
              <div class="collapse mt-2" id="userCollpase">
                <li class="nav-item">
                  <a href="#" class="nav-link">Profile</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Listings</a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">Favorites</a>
                </li>
              </div>
            </div>

            <li class="nav-item user__container d-none d-md-block">
              <button @click="handleUserToggle" class="btn p-0" type="button">
                <img class="nav__user-img rounded-circle" src="https://source.unsplash.com/g0zwKn5vslI" />
              </button>

              <div v-if="isUserExpanded" class="user__collapse p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn p-0" data-bs-toggle="collapse" href="#userCollpase" role="button" aria-expanded="false" aria-controls="userCollapse">
                    <img class="nav__user-img--collapse rounded-circle me-3" src="https://source.unsplash.com/g0zwKn5vslI" />
                    <span class="user__name text-black fw-bold pe-0">Chason Jui</span>
                  </button>

                  <a href="#">
                    <img class="nav__logout-icon" src="../assets/img/Navbar/logout2.png" />
                  </a>
                </div>
               
                <div class="collapse mt-2" id="userCollpase">
                  <li class="nav-item">
                    <a href="#" class="nav-link user-collapse__item text-black">Profile</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link user-collapse__item text-black">Listings</a>
                  </li>
                  <li class="nav-item">
                    <a href="#" class="nav-link user-collapse__item text-black">Favorites</a>
                  </li>
                </div>
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
  padding: 16px 0 16px 0;
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
  font-size: 16px;
}

.navbar-brand:hover {
  color: white;
}

.nav__menu-icon {
  font-size: 26px;
}

.nav__close-icon {
  width: 15px;
  height: 15px;
}

.nav__logout-icon {
  width: 32px;
  height: 32px;
  transition: opacity 0.2s ease;
}

.nav__logout-icon:hover {
  opacity: 0.7;
}

.nav-link:hover {
  color: lightgray;
}

.nav__user-img {
  width: 34px;
  height: 34px;
  object-fit: cover;
}

.user__container {
  position: relative;
}

.user__collapse {
  position: absolute;
  top: 52px;
  right: 0;
  width: 200px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.nav__user-img--collapse {
  width: 34px;
  height: 34px;
  object-fit: cover;
}

.user__name {
  font-size: 12px;
}

.user-collapse__item:hover {
  opacity: 0.8;
}

@media (min-width: 992px) {
  .nav__logout-icon {
    width: 26px;
    height: 26px;
  }

  .user-collapse__item {
    font-size: 12px; 
  }
}

@media (min-width: 992px) and (min-height: 900px) {
  .user__collapse {
    width: 210px;
  }

  .user-collapse__item,
  .user__name {
    font-size: 14px;
  }
}
</style>
<script setup>
import { ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db, getCurrentUser } from "../firebase/index.js";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "vue-router";

const auth = getAuth();
let isLoggedIn = ref(false);
let isAuthLoading = ref(true);
// var user = ref(null);
var name =ref(null);
async function getName(email) {
      const docRef = doc(db, "balance", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        name.value = docSnap.data().name;
        console.log(docSnap.data().name)
        console.log(name);
      } else {
        console.log("No such document!");
      }
    }
getCurrentUser()
        .then((user) => {
          if (user) {
            console.log(user)
            // user.value = user;
            getName(user.email);

          } else {
            console.log("No user is currently logged in.");
          }
        })
        .catch((error) => {
          console.error("Error getting current user:", error);
        });

let isNavExpanded = ref(false);
let isUserExpanded = ref(false);
let router = useRouter();
onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = user ? true : false;
  isAuthLoading.value = false;
})

function handleNavToggle() {
  isNavExpanded.value = !isNavExpanded.value;
}

function handleUserToggle() {
  isUserExpanded.value = !isUserExpanded.value;
}

function handleLogout() {
  signOut(auth);
  router.go();
}

// function handleProfile(){
//   router.push("/userprofile");
// }
</script>

<template>
  <nav class="navbar navbar-expand-md sticky-top bg-black">
    <div class="container-fluid general__container px-0">
      <a class="navbar-brand" href="./">
        <b>Property</b>Hub
      </a>

      <button @click="handleNavToggle" class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
        aria-label="Toggle navigation">
        <img v-if="isNavExpanded" class="nav__close-icon" src="https://i.postimg.cc/qBspRvBQ/close.png">
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
            <div v-if="isLoggedIn && !isAuthLoading" class="d-md-none">
              <div class="d-flex justify-content-between">
                <button class="btn p-0 border-0" data-bs-toggle="collapse" href="#userCollpase" role="button" aria-expanded="false"
                  aria-controls="userCollapse">
                  <span class="text-white fw-bold pe-0 me-3">{{name}}</span>
                </button>

                <li class="nav-item">
                  <a @click="handleLogout" class="nav-link">
                    <img class="nav__logout-icon" src="https://i.postimg.cc/d32r1k4G/logout.png" />
                  </a>
                </li>
              </div>

              <div class="collapse mt-2" id="userCollpase">
                <li class="nav-item">
                  <a href="/user-profile" class="nav-link">Profile</a>
                </li>
                <li class="nav-item">
                  <a href="/my-listings" class="nav-link">Listings</a>
                </li>
                <li class="nav-item">
                  <a href="/liked-listings" class="nav-link">Likes</a>
                </li>
              </div>
            </div>

            <div v-if="isLoggedIn && !isAuthLoading" class="nav-item user__container d-none d-md-block">
              <button @click="handleUserToggle" class="btn p-0 border-0 text-white" type="button">
                {{ name }}
              </button>

              <div v-if="isUserExpanded" class="user__collapse p-3">
                <div class="d-flex justify-content-between align-items-center">
                  <button class="btn p-0 border-0" data-bs-toggle="collapse" href="#userCollpase" role="button"
                    aria-expanded="false" aria-controls="userCollapse">
                    <span class="user__name text-black fw-bold pe-0">{{name}}</span>
                  </button>

                  <a @click="handleLogout">
                    <img class="nav__logout-icon" src="https://i.postimg.cc/RCDTbKnb/logout2.png" />
                  </a>
                </div>

                <div class="collapse mt-2" id="userCollpase">
                  <li class="nav-item">
                    <a href="/user-profile" class="nav-link user-collapse__item text-black px-0">Profile</a>
                  </li>
                  <li class="nav-item">
                    <a href="/my-listings" class="nav-link user-collapse__item text-black px-0">Listings</a>
                  </li>
                  <li class="nav-item">
                    <a href="/liked-listings" class="nav-link user-collapse__item text-black px-0">Likes</a>
                  </li>
                </div>
              </div>
            </div>

            <li v-if="!isAuthLoading && !isLoggedIn" class="nav-item">
              <a class="nav-link nav-link--login pe-0" href="/login">Login</a>
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
  width: 26px;
  height: 26px;
  transition: opacity 0.2s ease;
  cursor: pointer;
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
  top: 46px;
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
  font-size: 14px;
}

.user-collapse__item:hover {
  opacity: 0.8;
}

.nav-link--login {
  padding: 6px 0;
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
    width: 200px;
  }

  .user-collapse__item,
  .user__name {
    font-size: 14px;
  }
}
</style>
<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/BuyView/Listing.vue";
import { ref } from "vue";

// External libraries
import { getAuth } from "firebase/auth";
import { getDoc, doc, getFirestore, collection, onSnapshot } from "firebase/firestore";
import { getCurrentUser } from "../firebase/index.js";

const db = getFirestore();

// Checks if user is logged in
const auth = getAuth();
const userEmail = ref("");
getCurrentUser()
  .then(user => {
    if (user) {
      // console.log(user);
      userEmail.value = user.email;
    } else {
      console.log("No user is currently logged in.");
    }
  })
  .catch(error => {
    console.error("Error getting current user:", error);
  });

let favouriteListings = ref([]);

async function getFavourites(userEmail) {
  const docRef = doc(db, "balance", userEmail);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    // console.log(docSnap.data().favoritedListings);
    favouriteListings.value = [];
    for (const favourite of docSnap.data().favoritedListings) {
      const listingRef = doc(db, "listings", favourite);
      const listingSnap = await getDoc(listingRef);
      if (listingSnap.exists()) {
        favouriteListings.value.push([listingSnap.id, listingSnap.data()])
      }
    }
  } else {
    console.log("No such document!");
  }
}

const balanceColRef = collection(db, "balance");

onSnapshot(balanceColRef, () => {
  if (userEmail.value) {
    getFavourites(userEmail.value);
  }
})
</script>

<template>
  <div class="d-flex flex-column justify-content-between" style="height: 100vh;">
    <div>
      <Navbar />
      <div class="container mx-auto py-5">
        <h2 class="mb-4 fw-bold fs-3">Liked Listings</h2>
        <div v-for="listing in favouriteListings" :key="listing[0]">
          <Listing :listingId="listing[0]" :address="listing[1].address" :listedPrice="listing[1].listedPrice"
            :bedrooms="listing[1].bedrooms" :bathrooms="listing[1].bathrooms" :floorSize="listing[1].floorSize"
            :favoriteCounts="listing[1].favoriteCounts" :isFavorited="listing[1].isFavorited"
            :imgPath="listing[1].imgPath" :key="isLoggedIn"></Listing>
        </div>
        <div v-if="favouriteListings.length == 0" class="text-center mt-3 text-black-50">You currently have no liked listings.</div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>


<style scoped>
.container {
  width: 90%;
  max-width: 600px;
}
</style>


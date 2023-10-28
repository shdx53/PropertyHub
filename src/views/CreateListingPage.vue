<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/CreateListing/Listing.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc, collection, getDoc, arrayUnion, onSnapshot, getDocs, orderBy } from "firebase/firestore";
import { query, where } from "firebase/firestore";
const router = useRouter();
const createlisting = () => {
  router.push("/createlisting");
};

const db = getFirestore();

// Checks if user is logged in
const auth = getAuth();
const userId = ref(null);
const isLoggedIn = ref(false);
console.log(auth.currentUser)

const listingsColRef = collection(db, "listings");
const currentuserListingsQuery = query(listingsColRef, where("userEmail", "==", "chasonjui@gmail.com"));
// const q = query(listingRef, where("userEmail", "==", auth.currentUser.email));

let userListings = ref([]);
function displayListings(query, listings) {
  onSnapshot(query, snapshot => {
    listings.value = [];
    snapshot.docs.forEach(listing => {
      listings.value.push([listing.id, listing.data()]);
    })
  })
}

displayListings(currentuserListingsQuery, userListings);

onSnapshot(listingsColRef, snapshot => {
  displayListings(currentuserListingsQuery, userListings);
});
</script>

<template>
    <Navbar/>
    <div class="container mx-auto my-5">
        <div class="d-flex justify-content-between">
            <h2 class="mb-4 fw-bold">My Listings</h2>
            <button @click="createlisting" type="button" class="mb-4 btn btn-primary createbtn">Create Listing</button>
        </div>
        <div v-for="listing in userListings" :key="listing[0]">
          <Listing :listingId="listing[0]"
                  :address="listing[1].address"
                  :listedPrice="listing[1].listedPrice"
                  :bedrooms="listing[1].bedrooms"
                  :bathrooms="listing[1].bathrooms"
                  :floorSize="listing[1].floorSize"
                  :favoriteCounts="listing[1].favoriteCounts"
                  :isFavorited="listing[1].isFavorited"
                  :imgPath="listing[1].imgPath"
          ></Listing>
        </div>
    </div>
    <Footer></Footer>
</template>


<style scoped>
.container{
    width: 80%;
    max-width: 700px;
}
.createbtn:hover{
    background-color: transparent;
    color:#0d6efd;
    box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.22);
}
</style>


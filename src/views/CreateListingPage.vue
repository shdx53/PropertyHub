<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/CreateListing/Listing.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc, collection, getDoc, arrayUnion, onSnapshot, getDocs, orderBy, deleteDoc } from "firebase/firestore";
import { getStorage, deleteObject, ref as storageRef } from "firebase/storage";
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
const currentuserListingsQuery = query(listingsColRef, where("userEmail", "==", "tester1@wad.com"));
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

function handleDelete() {
  event.preventDefault();
  document.getElementById('btn-close').click();
  const id = document.getElementById('deleteModal').dataset.id;
  const imgPath = document.getElementById('deleteModal').dataset.img

  // Delete image
  const storage = getStorage();
  const imageRef = storageRef(storage, imgPath);

  deleteObject(imageRef).then(() => {
    console.log("File deleted successfully");
    // Delete listing from db
    deleteDoc(doc(db, "listings", id)).then(() => {
      console.log("Listing deleted successfully");
    });
  }).catch((error) => {
    console.error("Whoops image not deleted:", error);
  });
}
</script>

<template>
    <Navbar/>
    <div class="container mx-auto my-5">
        <div class="d-flex justify-content-between">
            <h2 class="mb-4 fw-bold">My Listings</h2>
            <button @click="createlisting" type="button" class="mb-4 btn btn-primary createbtn">Create Listing</button>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-id="" data-img="">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <!-- modal-header -->
              <div class="modal-header">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-8 text-start">
                      <b class="modal-title fs-4" id="deleteModalLabel">Delete</b>
                    </div>
                    <div class="col-4 text-end">
                      <button type="button" id="btn-close" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- modal-body -->
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="text-center">
                      <div class="text-start d-flex flex-column justify-content-between h-100">
                        <div>
                          <span>Are you sure you want to delete this listing?</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-space-between">
                <button type="button" class="btn cancel-btn" data-bs-dismiss="modal">Cancel</button>
                <button type="button" id="confirm-delete-btn" class="btn btn-primary"  @click="handleDelete">Delete</button>
              </div>
            </div>
          </div>
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
.cancel-btn:hover {
  background-color: #f0f0f0;
}
</style>


<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";
import {storage,getCurrentUser} from "../firebase/index.js";
import { ref as storageRef, uploadBytes } from "firebase/storage";

const fileInput = ref(null);
// const storage = getStorage();
// const storageRef = s_Ref(storage, "listings");

// 'file' comes from the Blob or File API

// function uploadFile() {
//   uploadBytes(storageRef, this.$ref.myfile).then((snapshot) => {
//     console.log("Uploaded a blob or file!");
//   });
// }
const userEmail = ref(null);
getCurrentUser()
  .then(user => {
    if (user) {
      userEmail.value = user.email;
    } else {
      console.log("No user is currently logged in.");
    }
  })
  .catch(error => {
    console.error("Error getting current user:", error);
  });


const uploadFile = async () => {
  if (fileInput.value && fileInput.value.files.length > 0) {
    const files = fileInput.value.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageReference = storageRef(storage, "listings/" + `${userEmail.value}/` + file.name);
      try {
        const snapshot = await uploadBytes(storageReference, file);
        console.log("Uploaded a blob or file!", snapshot);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }
};

</script>

<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <div class="editform">
    <h2>Listing Details</h2>
    <br />
    <div class="mb-3">
      <label for="address" class="col-form-label fw-bold">Address:</label>
      <input type="text" class="form-control" id="address" />
    </div>

    <div class="mb-3">
      <label for="insertphoto" class="col-form-label fw-bold"
        >Insert Photo:</label
      >
      <input
        type="file"
        name="image"
        accept="image/png, image/jpeg"
        @change="uploadFile"
        multiple
        ref = "fileInput"
        id="insertphoto"
      />
    </div>
    <div class="mb-3">
      <label for="leasecommence" class="col-form-label fw-bold"
        >Lease commencement year:</label
      >
      <input type="number" min="1920" class="form-control" id="leasecommence" />
    </div>
    <div class="mb-3">
      <label for="listedprice" class="col-form-label fw-bold"
        >Listed price:</label
      >
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">$</span>
        </div>
        <input
          type="number"
          class="form-control"
          aria-label="listedprice"
          aria-describedby="basic-addon1"
          id="listedprice"
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="floorsize" class="col-form-label fw-bold">Floor size:</label>
      <div class="input-group mb-3">
        <input
          type="number"
          class="form-control"
          placeholder=""
          aria-label="floorsize"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <span class="input-group-text" id="basic-addon2">sqft</span>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="balcony" class="col-form-label fw-bold">Balcony:</label>
      <select class="form-select" id="balcony">
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="bedroom" class="col-form-label fw-bold"
        >Number of Bedrooms:</label
      >
      <input type="number" min="1" max="5" class="form-control" id="bedroom" />
    </div>
    <div class="mb-3">
      <label for="bathroom" class="col-form-label fw-bold"
        >Number of Bathrooms:</label
      >
      <input type="number" min="1" max="5" class="form-control" id="bathroom" />
    </div>
    <br />
    <hr />
    <h2>Customize viewing window</h2>
    <br />
    <div class="mb-3">
      <label for="startdate" class="col-form-label fw-bold">Start Date:</label>
      <input type="date" class="form-control" id="startdate" />
    </div>
    <div class="mb-3">
      <label for="enddate" class="col-form-label fw-bold">End Date:</label>
      <input type="date" class="form-control" id="enddate" />
    </div>

    <div class="buttongrp">
      <button type="button" class="btn btn-primary">Create Listing</button>
      <button type="button" class="btn btn-secondary mx-2">Cancel</button>
    </div>
  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.editform {
  width: 80%;
  margin: auto;
  margin-top: 30px;
}
input::file-selector-button {
  margin-left: 20px;
  margin-right: 20px;
  padding: 0.5em;
  border: thin solid grey;
  border-radius: 5px;
  background-color: #0d6efd;
  color: white;
  cursor: pointer;
}

.buttongrp {
  margin-top: 20px;
  margin-bottom: 40px;
}

h2 {
  font-weight: 900;
}
</style>

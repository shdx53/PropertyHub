<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import Autocomplete from "../components/CreateListingView/Autocomplete.vue";
import { ref } from "vue";
import { storage, getCurrentUser } from "../firebase/index.js";
import { ref as storageRef, uploadBytes } from "firebase/storage";
import { doc, updateDoc, getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useRouter } from "vue-router";

const db = getFirestore();
const fileInput = ref(null);
const form = ref(null);
const router = useRouter();

// Viewing window
const date = ref(null);
const viewingprice = ref(null);
const additionalDates = ref([]);

// const storage = getStorage();
// const storageRef = s_Ref(storage, "listings");

// 'file' comes from the Blob or File API

// function uploadFile() {
//   uploadBytes(storageRef, this.$ref.myfile).then((snapshot) => {
//     console.log("Uploaded a blob or file!");
//   });
// }

const userEmail = ref(null);
const userId = ref(null);
getCurrentUser()
  .then(user => {
    if (user) {
      console.log(user);
      userEmail.value = user.email;
      userId.value = user.uid;
    } else {
      console.log("No user is currently logged in.");
    }
  })
  .catch(error => {
    console.error("Error getting current user:", error);
  });

const uploadFile = async (listingId) => {
  if (fileInput.value && fileInput.value.files.length > 0) {
    const files = fileInput.value.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imgPath = `listings/${userEmail.value}/${listingId}/${file.name}`;
      const storageReference = storageRef(storage, imgPath);
      try {
        const snapshot = await uploadBytes(storageReference, file);
        console.log("Uploaded a blob or file!", snapshot);

        const listingsDocRef = doc(db, "listings", listingId);
        updateDoc(listingsDocRef, {
          imgPath: imgPath
        })
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }
};

function generateNewDate() {
  event.preventDefault();
  additionalDates.value.push({ datetime: ref(null), price: ref(null) });
}

function handleSubmit() {
  event.preventDefault()

  let isFormValid = true;

  const address = form.value["address"].value;
  const about = form.value["about"].value;
  const listedPrice = form.value["listed-price"].value;
  const type = form.value["type"].value;
  const level = form.value["level"].value;
  const bedrooms = form.value["bedrooms"].value;
  const bathrooms = form.value["bathrooms"].value;
  const floorSize = form.value["floor-size"].value;
  const tenure = form.value["tenure"].value;
  const remainingLease = form.value["remaining-lease"].value;
  const balcony = form.value["balcony"].value;
  const viewingDate = date.value;
  const viewingPrice = viewingprice.value;
  let viewingDates = [{ datetime: viewingDate, price: viewingPrice, buyer: null }];
  additionalDates.value.forEach(additionalDate => {
    if (additionalDate.datetime != null && additionalDate.price != null) {
      viewingDates.push({ datetime: additionalDate.datetime, price: additionalDate.price, buyer: null });
    }
  });

  // Form validation
  Array.from(form.value).forEach(form => {
    if (!form.classList.contains("dp__input")) {
      if (!form.checkValidity()) {
        form.classList.add("is-invalid");
        isFormValid = false;
      } else if (form.classList.contains("is-invalid")) {
        form.classList.remove("is-invalid")
      }
    } else {
      if (viewingDate == null) {
        document.getElementById("viewing-date").querySelector(".dp__input").classList.add("form-control");
        document.getElementById("viewing-date").querySelector(".dp__input").classList.add("is-invalid");
        document.getElementById("viewing-date").classList.add("is-invalid");
        isFormValid = false;
      } else if (document.getElementById("viewing-date").classList.contains("is-invalid")) {
        document.getElementById("viewing-date").querySelector(".dp__input").classList.remove("form-control");
        document.getElementById("viewing-date").querySelector(".dp__input").classList.remove("is-invalid");
        document.getElementById("viewing-date").classList.remove("is-invalid");
      }
    }
  })

  // Store listing in Firebase
  if (isFormValid) {
    const colRef = collection(db, "listings");

    addDoc(colRef, {
      userId: userId.value,
      userEmail: userEmail.value,
      address: address,
      about: about,
      listedPrice: listedPrice,
      type: type,
      level: level,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      floorSize: floorSize,
      tenure: tenure,
      remainingLease: remainingLease,
      balcony: balcony,
      viewingDates: viewingDates,
      favoriteCounts: 0,
      dateOfEntry: serverTimestamp()
    })
      .then(docRef => {
        uploadFile(docRef.id);
        Array.from(form.value).forEach(form => {
          form.value = "";
        })
        date.value = null;
        additionalDates.value = [];
        router.push("/my-listings");
      })
  }
}
</script>

<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <div class="editform">
    <h2>Listing Details</h2>

    <br />

    <form ref="form" class="needs-validation">
      <div class="edit-form__container">
        <div>
          <div class="mb-3">
            <label for="address" class="col-form-label fw-bold">Address:</label>
            <Autocomplete />
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="insertphoto" class="col-form-label fw-bold">Insert Photo(s):</label>
            <input type="file" name="image" accept="image/png, image/jpeg" multiple ref="fileInput" id="insertphoto" />
          </div>

          <div class="mb-3">
            <label for="about" class="col-form-label fw-bold">About the Property</label>
            <textarea class="form-control" id="about"></textarea>
          </div>

          <div class="mb-3">
            <label for="listed-price" class="col-form-label fw-bold">Listed price:</label>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0 rounded-start-2" id="basic-addon1">$</span>
              </div>
              <input type="number" class="form-control" aria-label="listed-price" aria-describedby="basic-addon1"
                id="listed-price" required />
              <div class="invalid-feedback">
                Field is required
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="type" class="col-form-label fw-bold">Property Type:</label>
            <select class="form-select" id="type" required>
              <option value=""></option>
              <option value="1-room HDB">1-room HDB</option>
              <option value="2-room HDB">2-room HDB</option>
              <option value="3-room HDB">3-room HDB</option>
              <option value="4-room HDB">4-room HDB</option>
              <option value="5-room HDB">5-room HDB</option>
            </select>
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="level" class="col-form-label fw-bold">Level:</label>
            <input type="number" min="1" class="form-control" id="level" required />
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <!-- <div class="mb-3">
                <label for="leasecommence" class="col-form-label fw-bold"
                  >Lease commencement year:</label
                >
                <input type="number" min="1920" class="form-control" id="leasecommence" />
              </div> -->

          <div class="mb-3">
            <label for="bedrooms" class="col-form-label fw-bold">Number of Bedrooms:</label>
            <!-- <input type="number" min="1" max="5" class="form-control" id="bedroom" /> -->
            <select class="form-select" id="bedrooms" required>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="bathrooms" class="col-form-label fw-bold">Number of Bathrooms:</label>
            <!-- <input type="number" min="1" max="5" class="form-control" id="bathroom" /> -->
            <select class="form-select" id="bathrooms" required>
              <option value=""></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="floor-size" class="col-form-label fw-bold">Floor size:</label>
            <div class="input-group mb-3">
              <input type="number" class="form-control" id="floor-size" placeholder="" aria-label="floor-size"
                aria-describedby="basic-addon2" required />
              <div class="input-group-append">
                <span class="input-group-text rounded-0 rounded-end-2" id="basic-addon2">sqft</span>
              </div>
            </div>
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="tenure" class="col-form-label fw-bold">Tenure:</label>
            <input type="number" min="1" class="form-control" id="tenure" required />
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="remaining-lease" class="col-form-label fw-bold">Remaining Lease:</label>
            <input type="number" min="1" class="form-control" id="remaining-lease" required />
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>

          <div class="mb-3">
            <label for="balcony" class="col-form-label fw-bold">Balcony:</label>
            <select class="form-select" id="balcony" required>
              <option value=""></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <div class="invalid-feedback">
              Field is required
            </div>
          </div>
        </div>

        <div class="customize-viewing-window__container">
          <br class="d-lg-none" />
          <hr class="d-lg-none" />
          <div class="fw-bold fs-5 mb-2">Customize viewing window</div>

          <div class="mb-3 d-flex flex-row">
            <div class="input-group">
              <VueDatePicker v-model="date" :min-date="new Date()" id="viewing-date" class="" time-picker-inline
                :is-24="false"></VueDatePicker>
              <div class="invalid-feedback">
                Field is required
              </div>
            </div>
            <div class="input-group viewingdates-price">
              <div class="input-group-prepend">
                <span class="input-group-text rounded-0 rounded-start-2">$</span>
              </div>
              <input type="number" class="form-control" v-model="viewingprice" required />
              <div class="invalid-feedback">
                Field is required
              </div>
            </div>
          </div>

          <button class="add-date-btn" @click="generateNewDate">+ Add new date</button>

          <div class="mb-3" id="additional-viewingdates">
            <div class="d-flex flex-row" v-for="dateItem, dateIndex in additionalDates" :key="dateIndex">
              <VueDatePicker v-model="dateItem.datetime" :min-date="new Date()" class="viewing-dates" time-picker-inline
                :is-24="false"></VueDatePicker>
              <div class="input-group viewingdates-price">
                <div class="input-group-prepend">
                  <span class="input-group-text rounded-0 rounded-start-2">$</span>
                </div>
                <input type="number" class="form-control" v-model="dateItem.price" />
              </div>
            </div>
            <!-- <VueDatePicker v-for="dateItem, dateIndex in additionalDates" :key="dateIndex" v-model="dateItem.value"
              :min-date="new Date()" class="viewing-dates" time-picker-inline :is-24="false"></VueDatePicker> -->
          </div>
        </div>
      </div>

      <div class="buttongrp text-center">
        <button @click="handleSubmit" class="btn btn-primary">Create Listing</button>
        <!-- <button class="btn btn-secondary mx-2">Cancel</button> -->
      </div>
    </form>
  </div>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.editform {
  width: 80%;
  margin: auto;
  margin: 50px auto;
  max-width: 500px;
}

input::file-selector-button {
  margin-left: 20px;
  margin-right: 20px;
  padding: 0.5em;
  border: none;
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

.add-date-btn {
  margin: auto;
  background-color: unset;
  border: 0;
  border-radius: 8px;
  padding: 5px 10px;
  margin-top: 5px;
  width: 100%;
  margin-bottom: 1rem;
}

.add-date-btn:hover {
  background-color: #f0f0f0;
}

#viewing-date.form-control.is-invalid {
  border: 0;
  background-image: none;
  padding: 0;
}

.dp__pointer.is-invalid {
  border: 1px solid #DC3545;
}

.viewing-dates {
  margin-bottom: 20px;
}

.viewingdates-price {
  width: 55%;
  height: 100%;
  margin-left: 10px;
}

@media (min-width: 992px) {
  .editform {
    max-width: 900px;
  }

  .edit-form__container {
    display: flex;
    justify-content: space-between;
  }

  .customize-viewing-window__container {
    width: 42%;
  }
}
</style>

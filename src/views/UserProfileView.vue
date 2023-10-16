<script setup>
import Navbar from "../components/Navbar.vue";

import Footer from "../components/Footer.vue";

import Filter from "../components/FIlter.vue";
import { ref } from "vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {db}  from "../firebase/index.js";

const auth = getAuth();
var shownBalance = ref(null);
var email = ref(null);
async function getBalance(email) {
  const docRef = doc(db, "balance", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    console.log(docSnap.data().balance);
    shownBalance.value = docSnap.data().balance;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }


}
onAuthStateChanged(auth, (user) => {
  if (user) {
    email.value = user.email;
    // console.log(email.value);
    getBalance(email.value);
    // console.log(getBalance(email.value));
    
  } else {
    // User is signed out
    // ...
  }
});


function add(value){

}

</script>

<template>
  <Navbar />
  <div class="mx-4">
    <div class="card mt-4 mb-4">
      <h5 class="card-header">Your Balance({{email}})</h5>
      <div class="card-body">
        <h5 class="card-title">Current Amount:</h5>
        <p class="card-text">${{ shownBalance }}</p>
        <a href="#" class="btn btn-primary">Previous Transactions</a>
      </div>
    </div>
    <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
      <h1 class="display-4 fw-normal">Pricing</h1>
      <p class="fs-5 text-muted">
        Get your E-credits to enjoy the best experiences that our platform
        provides
      </p>
    </div>
    <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Primary</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              $5<small class="text-muted fw-light">/mo</small>
            </h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>50 credits</li>
              <li>Bid for viewings</li>
              <li>Bid for houses</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">
              Get started
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Pro</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              $15<small class="text-muted fw-light">/mo</small>
            </h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>200 Credits</li>
              <li>30% Cheaper</li>
              <li>Get ahead of others in bidding</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">
              Get started
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">Premium</h4>
          </div>
          <div class="card-body">
            <h1 class="card-title pricing-card-title">
              $25<small class="text-muted fw-light">/mo</small>
            </h1>
            <ul class="list-unstyled mt-3 mb-4">
              <li>300 Credits</li>
              <li>50% Cheaper</li>
              <li>Have the biggest dog in the fight</li>
            </ul>
            <button type="button" class="w-100 btn btn-lg btn-primary">
              Lets do this
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer id="footer" />
</template>

<style>
#footer {
}
</style>

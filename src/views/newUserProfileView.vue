<script setup>
import Navbar from "../components/Navbar.vue";

import Footer from "../components/Footer.vue";

import Filter from "../components/FIlter.vue";
</script>
<template>
  <Navbar />
  <div class="mx-4">
    <div class="card mt-4 mb-4">
      <h5 class="card-header">Your Balance({{ email }})</h5>
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
      <div class="col-3" v-for="(product,idx) in products">
        <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3">
            <h4 class="my-0 fw-normal">{{ product.name }}</h4>
          </div>
          <div class="card-body" >
            <h1 class="card-title pricing-card-title">
              ${{ product.prices[0].unit_amount / 100 }}
            </h1>
            <ul  v-for="detail in prod_details[idx]"
              class="list-unstyled mt-3 mb-4"
            >
              <li>{{ detail }}</li>
            </ul>
            <div v-if="isLoading == false">
              <button
                type="button"
                @click="createSingleCheckout(product.prices[0].id)"
                class="w-100 btn btn-lg btn-primary"
              >
                Purchase Credits
              </button>
            </div>
            <div v-else>
              <button
                type="button"
                disabled
                @click="
                  createSingleCheckout(
                    product.prices[0].id,
                    product.stripe_metadata_credits,
                  )
                "
                class="w-100 btn btn-lg btn-primary"
              >
                Purchase Credits
              </button>
            </div>
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

<script>
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

// import { firebaseAuth } from "@/firebase";
import { db, getCurrentUser } from "../firebase/index.js";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      products: [],
      prod_details: [
  { "1": "10 credits", "2": "Start bidding on viewings", "3": "Start bidding on your dream property" },
  { "1": "50 credits", "2": "Start bidding on your dream house", "3": "50% cheaper!" },
  { "1": "35 credits", "2": "Start bidding with more credits", "3": "30% cheaper!" },
],
      selectedPrice: null,
      isLoading: false,
      user: null,
      email: null,
      shownBalance: null,
    };
  },
  mounted() {
    this.fetchProducts();
    this.getUserPrice();
    console.log(this.products);
  },
  methods: {
    async getBalance(email) {
      const docRef = doc(db, "balance", email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.shownBalance = docSnap.data().balance;
      } else {
        console.log("No such document!");
      }
    },
    getUserPrice() {
      getCurrentUser()
        .then((user) => {
          if (user) {
            this.email = user.email;
            this.user = user;
            this.getBalance(user.email);
          } else {
            console.log("No user is currently logged in.");
          }
        })
        .catch((error) => {
          console.error("Error getting current user:", error);
        });
    },

    async fetchProducts() {
      const productsRef = collection(db, "products");
      const productsQuery = query(productsRef, where("active", "==", true));
      const productsQuerySnap = await getDocs(productsQuery);

      productsQuerySnap.forEach(async (doc) => {
        const pricesRef = collection(db, "products", doc.id, "prices");
        const pricesQuerySnap = await getDocs(pricesRef);

        this.products.push({
          id: doc.id,
          ...doc.data(),
          prices: pricesQuerySnap.docs.map((price) => {
            return {
              id: price.id,
              ...price.data(),
            };
          }),
        });
      });
    },
    async createSingleCheckout(price, credits) {
      this.isLoading = true;
      this.selectedPrice = price;
      console.log(this.shownBalance);
      console.log(credits);
      const temp_balance = this.shownBalance+parseInt(credits);
      console.log(temp_balance);
      const collectionRef = collection(
        db,
        "customers",
        this.user.uid,
        "checkout_sessions"
      );

      const docRef = await addDoc(collectionRef, {
        price: this.selectedPrice,
        mode: "payment",
        success_url: window.location.href,
        cancel_url: window.location.href,
      });

      onSnapshot(docRef, async (snap) => {
        const { error, url } = snap.data();

        if (error) {
          console.error(`An error occurred: ${error.message}`);
          this.isLoading = false;
        }

        if (url) {
          // console.log(url);

          const balanceRef = doc(db, "balance", this.email);

          await updateDoc(balanceRef, {
            balance: temp_balance,
          });
          window.location.assign(url);
        }
      });
    },
  },
};
</script>

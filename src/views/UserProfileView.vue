<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div class="d-flex flex-column justify-content-between" style="height: 100vh">

    <Navbar />
    <div class="general__container">
      <div class="balance__container">
        <div class="d-flex justify-content-between align-items-center py-3" :class="{ 'mb-3' : showing, 'mb-5' : !showing }">
          <div>
            <span class="fw-bold">My Balance: </span>
            <span>{{ Number(shownBalance).toLocaleString() }} credits</span>
          </div>

          <div v-if="!showing">
            <a @click="showTransactions" class="btn btn-primary btn--transaction">
              View Transactions
            </a>
          </div>
          <div v-if="showing">
            <a @click="revertShowing" class="btn btn-primary btn--transaction">Hide Transactions
            </a>
          </div>
        </div>

        <!-- <div class="card mt-4 mb-4">
        <h5 class="card-header">Your Balance({{ email }})</h5>
        <div class="card-body">
          <h5 class="card-title">Current Amount:</h5>
          <p class="card-text">${{ shownBalance }}</p>
          <div v-if="!showing">
            <a @click="showTransactions" class="btn btn-primary">Previous Transactions</a>
          </div>
          <div v-if="showing">
            <a @click="() => {
                this.showing = false;
                this.transactions = [];
              }
              " class="btn btn-primary">Hide Transactions</a>
          </div>
        </div>
      </div> -->

        <div class="mb-5" v-if="showing">
          <h1 class="display-4 text-center fw-bold">Transactions</h1>
          <div class="text-center text-muted mb-4">
            Your past transactions with us
          </div>

          <div class="row mb-2">
            <div class="col-6 col-sm-5 d-none d-sm-block text-muted">ID</div>
            <div class="col-6 col-sm-2 text-muted">Amount Paid</div>
            <div class="col-6 col-sm-3 text-muted">Package</div>
            <div class="col-2 text-muted d-none d-sm-block">Time Created</div>
          </div>

          <div class="row bg-light rounded py-2 mb-3" v-for="transaction in transactions">
            <div class="col-6 col-sm-5 d-none d-sm-block">
              {{ transaction.id }}
            </div>
            <div class="col-6 col-sm-2">${{ transaction.amount / 100 }}</div>
            <div class="col-6 col-sm-3">
              {{ transaction.items[0].description }}
            </div>
            <div class="col-2 d-none d-sm-block">
              {{ timeStampy(transaction.created) }}
            </div>
          </div>
        </div>

        <!-- <div v-if="showing">
        <h1 class="display-4 fw-normal text-center">Transactions</h1>
        <p class="fs-5 text-muted text-center">
          Your past transactions with us
        </p>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Amount Paid</th>
              <th scope="col">Package</th>
              <th scope="col">Time Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions">
              <th scope="row">{{ transaction.id }}</th>
              <td>${{ transaction.amount / 100 }}</td>
              <td>{{ transaction.items[0].description }}</td>
              <td>{{ timeStampy(transaction.created) }}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
      </div>

      <div class="w-100">
        <div>
          <h1 class="display-4 text-center fw-bold">Pricing</h1>
          <div class="text-center text-muted mb-4">
            Get your E-credits to enjoy the best experiences that our platform
            provides
          </div>
        </div>

        <!-- <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Pricing</h1>
        <p class="fs-5 text-muted">
          Get your E-credits to enjoy the best experiences that our platform
          provides
        </p>
      </div> -->

        <div class="row pb-5 justify-content-center justify-content-lg-between">
          <div class="plan col-12 col-lg-4 bg-light rounded p-5 p-lg-4 px-xxl-5 mb-4 mb-lg-0"
            v-for="(product, idx) in products">
            <h2 class="product__name">{{ product.name }}</h2>
            <div class="product__price-container mb-2">
              <span class="product__price fw-bold me-2">
                ${{ product.prices[0].unit_amount / 100 }}
              </span>
              <span class="product__price-credits">/ {{ prod_details[idx]["1"] }}</span>
            </div>
            <div class="row mb-2">
              <div class="col-2 pe-0">
                <img class="tick-icon" src="https://i.postimg.cc/Y2JWwd3S/noun-tick-801900.png" />
              </div>
              <div class="col-10 ps-0">
                {{ prod_details[idx]["2"] }}
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-2 pe-0">
                <img class="tick-icon" src="https://i.postimg.cc/Y2JWwd3S/noun-tick-801900.png" />
              </div>
              <div class="col-10 ps-0">
                {{ prod_details[idx]["3"] }}
              </div>
            </div>

            <div v-if="isLoading == false">
              <button type="button" @click="
                createSingleCheckout(
                  product.prices[0].id,
                  product.stripe_metadata_credits
                )
                " class="w-100 btn btn-lg btn-primary purchase__btn">
                Purchase Credits
              </button>
            </div>
            <div v-else>
              <button type="button" disabled @click="
                createSingleCheckout(
                  product.prices[0].id,
                  product.stripe_metadata_credits
                )
                " class="w-100 btn btn-lg btn-primary purchase__btn">
                Purchase Credits
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col-3" v-for="(product, idx) in products">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">{{ product.name }}</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">
                ${{ product.prices[0].unit_amount / 100 }}
              </h1>
              <ul v-for="detail in prod_details[idx]" class="list-unstyled mt-3 mb-4">
                <li>{{ detail }}</li>
              </ul>
              <div v-if="isLoading == false">
                <button type="button" @click="
                  createSingleCheckout(
                    product.prices[0].id,
                    product.stripe_metadata_credits
                  )
                  " class="w-100 btn btn-lg btn-primary">
                  Purchase Credits
                </button>
              </div>
              <div v-else>
                <button type="button" disabled @click="
                  createSingleCheckout(
                    product.prices[0].id,
                    product.stripe_metadata_credits
                  )
                  " class="w-100 btn btn-lg btn-primary">
                  Purchase Credits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      </div>
    </div>


    <div>
      <Footer id="footer" />
    </div>
  </div></template>

<style scoped>
.general__container {
  width: 85%;
  max-width: 1400px;
}

.balance__container {
  width: 100%;
}

.btn--transaction {
  font-size: 14px;
  padding: 8px 12px;
}

.plan {
  max-width: 455px;
  margin: 0 auto;
}

.product__name {
  font-size: 25px;
}

.product__price {
  font-size: 35px;
}

.tick-icon {
  width: 20px;
}

.purchase__btn {
  font-size: 16px;
}

@media (min-width: 576px) {
  .general__container {
    width: 90%;
  }
}

@media (min-width: 992px) {
  .general__container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .plan {
    max-width: 300px;
    margin: unset;
  }
}

@media (min-width: 1250px) {
  .plan {
    max-width: 330px;
  }
}

@media (min-width: 1400px) {
  .plan {
    max-width: 380px;
  }
}

@media (min-width: 1600px) {
  .plan {
    max-width: 450px;
  }
}
</style>

<script>
//External libraries
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
import { db, getCurrentUser } from "../firebase/index.js";
import { loadStripe } from "@stripe/stripe-js";

export default {
  data() {
    return {
      products: [],
      prod_details: [
        {
          1: "10 credits",
          2: "Start bidding on viewings",
          3: "Start bidding on your dream property",
        },
        {
          1: "50 credits",
          2: "Start bidding on your dream house",
          3: "50% cheaper!",
        },
        {
          1: "35 credits",
          2: "Start bidding with more credits",
          3: "30% cheaper!",
        },
      ],
      selectedPrice: null,
      isLoading: false,
      user: null,
      email: null,
      shownBalance: null,
      transactions: [],
      showing: false,
    };
  },

  mounted() {
    this.fetchProducts();
    this.getUserPrice();
    console.log(this.products);
  },
  methods: {
    revertShowing() {
      this.showing = false;
      this.transactions = [];
    },
    timeStampy(unixTimestamp) {
      var date = new Date(unixTimestamp * 1000);
      var result =
        date.toLocaleDateString("en-US") +
        " " +
        date.toLocaleTimeString("en-US");
      return result;
    },
    async showTransactions() {
      const paymentsRef = collection(db, `customers/${this.user.uid}/payments`);
      const paymentsQuery = query(
        paymentsRef,
        where("status", "==", "succeeded")
      );
      const paymentsQuerySnap = await getDocs(paymentsQuery);

      paymentsQuerySnap.forEach(async (doc) => {
        // const pricesRef = collection(db, "products", doc.id, "prices");
        // const pricesQuerySnap = await getDocs(pricesRef);
        // console.log(doc);
        this.transactions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.showing = true;
      // console.log(this.transactions);
    },
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
      console.log(price, credits);
      this.isLoading = true;
      this.selectedPrice = price;
      const temp_balance = this.shownBalance + parseInt(credits);
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
          // const router = useRouter();
          // this.$router.push("/userprofile");
          window.location.assign(url);
        }
      });
    },
  },
};
</script>

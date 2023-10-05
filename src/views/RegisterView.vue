<!--
<template>
    <div class="container text-center">
  <h1>Create an account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="text" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button><button @click="login">Already Have an Account</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

-->

<template>
  <!-- Navbar -->
  <Navbar></Navbar>
  <!--Sign up container-->
  <div class="container">
    <div class="signup-form">
      <h2 class="text-center">Sign Up</h2>
      <form>
        <div class="form-group">
          <!--Email-->
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
        </div>
        <!--Password-->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>
        <!--Full Name-->
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            required
          />
        </div>
        <!--Phone Number-->
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="phone"
            required
          />
        </div>
        <!--Sign up button-->
        <div class="d-grid gap-2">
          <button
            type="submit"
            @click="register"
            class="btn btn-primary btn-block mt-3"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully registered");
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
const signInWithGoogle = () => {};
const login = () => {
  router.push("/login");
};
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;

  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>

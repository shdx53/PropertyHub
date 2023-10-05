<!-- 
  <template>
    <div class="container text-center">
    <h1>Sign In</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="text" placeholder="Password" v-model="password" /></p>
    <p>
      <button @click="signIn">Submit</button
      ><button @click="handleRegi">Register</button>
    </p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
    <p>{{ errMsg }}</p>
  </div>


</template>

  
  -->
<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <div class="container-fluid login-container">
    <!-- Login Image on left side -->
    <div class="login-image">
      <img
        src="../assets/img/LoginView/apartmentvector.svg"
        alt="Vector Image"
      />
    </div>
    <div style="width: 40%; max-width: 400px; min-width: 300px">
      <!-- Login Form on right -->
      <div class="login-form">
        <h2 class="text-center mb-4">Login</h2>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
            v-model="password"
          />
        </div>
        <!-- Forgot Password -->
        <div class="mt-1" style="font-size: 12px">
          <a href="forgotpassword.html">Forgot Password?</a>
        </div>
        <!-- Login button -->
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary mt-3" @click="signIn">
            Login
          </button>
        </div>

        <p>{{ errMsg }}</p>
      </div>
      <!-- Sign up link -->
      <p class="mt-3 text-center signup">
        Don't have an account?
        <span
          @click="handleRegi"
          style="color: blue; text-decoration: underline; cursor: pointer"
          >Sign up</span
        >
      </p>
    </div>
  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
}

.login-image {
  width: 60%;
  max-width: 700px;
}

.login-form {
  width: 40%;
  max-width: 400px;
  min-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.signup {
  width: 40%;
  max-width: 400px;
  min-width: 300px;
  text-align: center;
}
a {
  text-decoration: none;
}
@media only screen and (max-width: 876px) {
  .login-image {
    display: none;
  }
}
</style>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");
const handleRegi = () => {
  router.push("/register");
};
const signIn = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("successfully logged in");
      console.log(auth.currentUser);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account witht that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect Password";
          break;
        default:
          errMsg.value = "Email or password incorrect";
          break;
      }
    });
};
const signInWithGoogle = () => {};

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

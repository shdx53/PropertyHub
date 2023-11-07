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
  <div class="d-flex flex-column justify-content-between" style="height: 100vh">
    <!-- Navbar -->
    <Navbar></Navbar>

    <div class="login-container">
      <!-- Login Image on left side -->
      <div class="login-image">
        <img src="../assets/img/LoginView/apartmentvector.svg" alt="Vector Image" />
      </div>
      <!-- Login Form on right -->
      <div class="login-form">
        <h2 class="mb-4 fw-bold">Login</h2>

        <!-- Email -->
        <div class="form-group mb-2">
          <label for="email" class="py-2 fw-bold">Email:</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email" />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="password" class="py-2 fw-bold">Password:</label>
          <input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="password"
            v-on:keyup.enter="signIn" />
        </div>
        <!-- Forgot Password -->
        <div class="mt-1 mb-4 py-2" style="font-size: 12px">
          <span @click="forgotPassword" style="color: #0275d8; text-decoration: none; cursor: pointer">Forgot
            Password?</span>
        </div>
        <!-- Login button -->
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary mt-1" @click="signIn">
            Login
          </button>
        </div>

        <p class="my-2 text-danger text-center">{{ errMsg }}</p>

        <!-- Sign up link -->
        <p class="mt-3 text-center signup mx-auto">
          Don't have an account?
          <span @click="handleRegi" style="color: #0d6efd; text-decoration: none; cursor: pointer">Sign up</span>
        </p>
      </div>
    </div>
    <!-- Footer -->
    <Footer></Footer>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  max-width: 1100px;
  margin: 0 auto;
}

.login-image {
  width: 60%;
  max-width: 530px;
}

.login-form {
  width: 40%;
  max-width: 400px;
}

.signup {
  width: 90%;
  /* max-width: 400px;
  min-width: 300px;
  text-align: center; */
}

input {
  padding: 10px;
}

input::placeholder {
  font-size: 16px;
  color: darkgray;
}

@media only screen and (max-width: 992px) {
  .login-container {
    justify-content: center;
  }

  .login-image {
    display: none;
  }

  .login-form {
    width: 60%;
    max-width: 350px;
    min-width: unset;
  }
}

@media (max-width: 600px) {
  .login-form {
    width: 70%;
  }
}

@media (max-width: 510px) {
  .signup {
    font-size: 14px;
  }
}

@media (max-width: 420px) {
  .signup {
    font-size: 12px;
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
const forgotPassword = () => {
  router.push("/forgot-password");
};

const signIn = () => {
  const auth = getAuth();
  console.log(auth.currentUser)
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("successfully logged in");
      console.log(auth.currentUser);
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account within that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect Password";
          break;
        default:
          errMsg.value = "Incorrect email or password ";
          break;
      }
    });
};
const signInWithGoogle = () => { };

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <div class="register-container">
    <!-- Login Image on left side -->
    <div class="login-image">
      <img src="../assets/img/LoginView/apartmentvector.svg" alt="Vector Image" />
    </div>
    <!-- Login Form on right -->
    <div class="login-form">
      <h2 class="mb-3 fw-bold fs-4">Sign Up</h2>

      <!-- Name -->
      <div class="form-group mb-2">
        <label for="name" class="py-2 fw-bold">Name:</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your name" v-model="name" />
      </div>
      <!-- Phone Number -->
      <div class="form-group mb-2">
        <label for="phoneno" class="py-2 fw-bold">Phone Number:</label>
        <input type="number" class="form-control" id="phoneno" placeholder="Enter your phone number" v-model="phoneno" />
      </div>
      <!-- Email -->
      <div class="form-group mb-2">
        <label for="email" class="py-2 fw-bold">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email" />
      </div>
      <!-- Password -->
      <div class="form-group">
        <label for="password" class="py-2 fw-bold">Password:</label>
        <input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="password" />
      </div>
      <!-- Sign up button -->
      <div class="d-grid gap-2">
        <button type="submit" class="btn btn-primary mt-1" @click="register">
          Sign Up
        </button>
      </div>

      <p class="my-2 text-danger text-center">{{ errMsg }}</p>

      <!-- Sign up link -->
      <p class="mt-3 text-center login mx-auto">
        Already have an account?
        <span @click="handleLogin" style="color: #0d6efd; text-decoration: none; cursor: pointer; font-size: 14px;">Login</span>
      </p>
    </div>
  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>


<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 68px - 84px);
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

.login-form .btn {
  margin-top: 25px !important;
}

.login {
  width: 90%;
  font-size: 14px;
  /* max-width: 400px;
  min-width: 300px;
  text-align: center; */
}

label {
  font-size: 14px;
}

button {
  font-size: 14px;
}

input {
  padding: 10px; 
}

input::placeholder {
  font-size: 16px;
  color: darkgray;
}

@media only screen and (max-width: 992px) {
  .register-container {
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

@media (max-width: 768px) {
  .register-container {
    height: calc(100vh - 68px - 152px);
  }
}

@media (max-width: 600px) {
  .login-form {
    width: 70%;
  }
}

@media (max-width: 510px) {
  .login {
    font-size: 14px;
  }
}

@media (max-width: 420px) {
  .login {
    font-size: 12px;
  }
}
</style>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db } from "../firebase/index.js";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const phoneno = ref("");
const name = ref("");
const router = useRouter();
const errMsg = ref("");

const handleLogin = () => {
  router.push("/login");
};

async function createUserDocument(email, id, name, phoneno) {
  docRef = await setDoc(doc(db, "balance", email), {
    email: email,
    id: id,
    balance: 0,
    phone: phoneno,
    name: name
  })
  return docRef;

}
const register = () => {
  // Name and phone number validation before creating user
  if (!name.value) {
    errMsg.value = "Enter name";
    return;
  }
  if (!phoneno.value) {
    errMsg.value = "Enter phone number";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log(email.value, data.user.uid);
      createUserDocument(email.value, data.user.uid, name.value, phoneno.value);
      console.log("successfully registered");
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/missing-email":
          errMsg.value = "Enter email";
          break;
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/missing-password":
          errMsg.value = "Enter password";
          break;
        case "auth/weak-password":
          errMsg.value = "Password should be at least 6 characters";
          break;
      }
    });
};
const signInWithGoogle = () => { };

import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

// Add a new document in collection "cities"
</script>

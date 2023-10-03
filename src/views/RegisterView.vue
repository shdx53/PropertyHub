<template>
    <div class="container text-center">
  <h1>Create an account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="text" placeholder="Password" v-model="password" /></p>
  <p><button @click="register">Submit</button><button @click="login">Already Have an Account</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>


<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import {useRouter} from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("successfully registered");
      router.push('/home');
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
const signInWithGoogle = () => {};
const login = ()=>{
  router.push("/login");
}
</script>

<template>
  <div class="container text-center">
    <h1>Create an account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="text" placeholder="Password" v-model="password" /></p>
    <p>
      <button @click="register">Submit</button
      ><button @click="login">Already Have an Account</button>
    </p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script setup>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {db}  from "../firebase/index.js";
import { addDoc,collection,setDoc,doc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const phone = ref("");
const name = ref("");
const router = useRouter();
async function createUserDocument(email,id){
  docRef = await setDoc(doc(db,"balance",email),{
    email:email,
    id:id,
    balance:0
  })
    return docRef;

}
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log(email.value,data.user.uid);
      let newDoc = createUserDocument(email.value,data.user.uid);
      // console.log(getAuth());
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

// Add a new document in collection "cities"
</script>

<style scoped>
.container {
  height: calc(100vh - 65px - 87px);
}
.signup-form {
  max-width: 400px;
  margin: 0 auto;

  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>

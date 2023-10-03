<template>
  <div class="container text-center">
  <h1>Sign In</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="text" placeholder="Password" v-model="password" /></p>
  <p><button @click="signIn">Submit</button><button @click="handleRegi">Register</button></p>
  <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  <p>{{ errMsg }}</p>
  </div>
</template>


<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import {useRouter} from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref("");
const handleRegi = ()=>{
    router.push("/register");
}
const signIn = () => { 
    const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("successfully logged in");
      console.log(auth.currentUser);
      router.push('/home');
    })
    .catch((error) => {
      console.log(error.code);
    switch(error.code){
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
</script>

<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/BuyView/Listing.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const createlisting = () => {
  router.push("/createlisting");
};
</script>

<template>
    <Navbar/>
    <div class="container">
        <h2 class="mb-4 fw-bold">Listings</h2>
        <button @click="createlisting" type="button" class="mb-4 btn btn-primary createbtn">Create Listing</button>
        <Listing></Listing>
        <Listing></Listing>
        <Listing></Listing>
        <Listing></Listing>
    </div>
    <Footer></Footer>
</template>


<style scoped>
.container{
    width: 80%;
    margin: auto;
    margin-top: 5%;

}
.createbtn:hover{
    background-color: transparent;
    color:#0d6efd;
    box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.22);
}
</style>


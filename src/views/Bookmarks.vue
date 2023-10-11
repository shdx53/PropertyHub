<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/BuyView/Listing.vue";
</script>

<template>
    <Navbar/>
    <div class="container">
        <h2 class="mb-5 fw-bold">Bookmarks</h2>
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
</style>


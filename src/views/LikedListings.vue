<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/BuyView/Listing.vue";
</script>

<template>
    <Navbar/>
    <div class="container mx-auto my-5">
        <h2 class="mb-4 fw-bold">Liked Listings</h2>
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
    max-width: 850px;
}
</style>


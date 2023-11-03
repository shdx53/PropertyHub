<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import Listing from "../components/BuyView/Listing.vue";
</script>

<template>
    <Navbar/>
    <div class="container mx-auto my-5">
        <h2 class="mb-4 fw-bold fs-3">Liked Listings</h2>
        <Listing></Listing>
        <Listing></Listing>
        <Listing></Listing>
        <Listing></Listing>
    </div>
    <Footer></Footer>
</template>


<style scoped>
.container{
    width: 90%;
    max-width: 600px;
}
</style>


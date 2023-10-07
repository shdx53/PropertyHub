<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
</script>

<template>
    <Navbar/>
    <div class="container">
        <h2 class="mb-5">Bookmarks</h2>
        <table class="table table-hover table-striped table-bordered">
            <!--Header-->
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Bookmark Name</th>
                    <th scope="col" class="d-none d-sm-table-cell">Location</th>
                    <th scope="col" class="d-none d-sm-table-cell">Time Created</th>
                    <th scope="col" class="d-none d-sm-table-cell">Notes</th>
                </tr>
            </thead>
            <tbody>
                <!--Row 1-->
                <tr>
                    <td><img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" alt="" class="w-25"><span style="padding:25%">Data 1</span></td>
                    <td class="d-none d-sm-table-cell">Data 2</td>
                    <td class="d-none d-sm-table-cell">Data 3</td>
                    <td class="d-none d-sm-table-cell">Data 4</td>
                </tr>
                <!--Row 2-->
                <tr>
                    <td><img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" alt="" class="w-25"><span style="padding:25%">Data 1</span></td>
                    <td class="d-none d-sm-table-cell">Data 2</td>
                    <td class="d-none d-sm-table-cell">Data 3</td>
                    <td class="d-none d-sm-table-cell">Data 4</td>
                </tr>
                <!--Row 3-->
                <tr>
                    <td><img src="..\assets\img\HomeView\Listings\tobi-Z72YrutFDak-unsplash.jpg" alt="" class="w-25"><span style="padding:25%">Data 1</span></td>
                    <td class="d-none d-sm-table-cell">Data 2</td>
                    <td class="d-none d-sm-table-cell">Data 3</td>
                    <td class="d-none d-sm-table-cell">Data 4</td>
                </tr>
        
            </tbody>
        </table>
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


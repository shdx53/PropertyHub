<template>
    <div class="nav__bar">
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <a class="nav-link fw-bold" @click="handleActiveTab('view')"    :class="{ active: activeTab == 'view' }">View</a>
            </li>
            <li class="nav-item fw-bold">
                <a class="nav-link" @click="handleActiveTab('purchase')"     :class="{ active: activeTab == 'purchase' }">Purchase</a>
            </li>
        </ul>
    </div>

    <div class="container-fluid buyer__info">
        <div v-if="activeTab == 'view'">
            <h3>Viewer's profile</h3>
            <div class="row">
                <!-- First set of content for the "View" tab -->
                <div class="user__profile">
                    <!-- date and time -->
                    <div class="bid__date-time">
                        30 Oct 2023, 20:00
                    </div>

                    <!-- user picture -->
                    <div class="d-flex justify-content-left align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <span class="bidder__name">Jason</span>
                    </div>
                </div>
                <div class="user__profile">
                    <!-- date and time -->
                    <div class="bid__date-time">
                        30 Oct 2023, 21:00
                    </div>

                    <!-- user picture -->
                    <div class="d-flex justify-content-left align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <span class="bidder__name">Shi Da</span>
                    </div>
                </div>
            </div>
        </div>


        <div v-else>
            <h3>Bidder's profile</h3>
            <!-- First set of content for the "Purchase" tab -->
            <div class="row">
                <!-- First set of content for the "Purchase" tab -->
                <div class="user__profile">
                    <!-- user picture -->
                    <div class="d-flex justify-content-left align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <span class="bidder__name">Jason</span>
                            <span class="bidder__phone">81234567</span>
                    </div>

                    <div class="bid__price">
                        Bid Price: $550000
                    </div>
                </div>
                <div class="user__profile">
                    <!-- user picture -->
                    <div class="d-flex justify-content-left align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <span class="bidder__name">Shi Da</span>
                            <span class="bidder__phone">81234567</span>
                    </div>

                    <div class="bid__price">
                        Bid Price: $550000
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

  
<script setup>
import { ref } from 'vue';

let activeTab = ref("view");

function handleActiveTab(tab) {
    if (tab == "view") {
        activeTab.value = "view";
    } else {
        activeTab.value = "purchase";
    }
}
</script>
  
<style scoped>
  /* to add css */
  .bid__date-time{
    font-weight:bold;
    font-size:20px;
    padding:10px;
  }
  .user__profile {
    display: flex;
    flex-direction: column;
    width:100%;
    border: 1px solid lightgrey; 
    border-radius: 8px; 
    padding: 10px; 
}
.bidder__name, .bidder__phone{
    font-size:20px;
    margin:10px;

}
.bid__price{
    padding:10px;
    color:black;
    font-size:20px;
    font-weight:bold;
}

@media (max-width:800px){
    .nav__bar{
        justify-content:start;
    }
    .buyer__info{
        justify-content:center;
    }
}

</style>
  



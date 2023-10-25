<template>
    <h2 class="dashboard__title fw-bold mb-3">Your Dashboard</h2>

    <div class="nav__bar">
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <a class="nav-link fw-bold" @click="handleActiveTab('view')"
                    :class="{ active: activeTab == 'view' }">View</a>
            </li>
            <li class="nav-item fw-bold">
                <a class="nav-link" @click="handleActiveTab('purchase')"
                    :class="{ active: activeTab == 'purchase' }">Purchase</a>
            </li>
        </ul>
    </div>

    <div class="buyer__info">
        <div v-if="activeTab == 'view'" class="view__container">
            <!-- <h3 class="fs-6">Viewer's profile</h3> -->
            <div>
                <!-- First set of content for the "View" tab -->
                <div class="user__profile mb-3">
                    <!-- user picture -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover me-3" alt="avatar1"
                                src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <div>
                                <div class="bidder__name fw-bold mb-1">Jason</div>
                                <div class="bidder__phone text-body-secondary">81234567</div>
                            </div>
                        </div>

                        <div>
                            <div class="date__title fw-bold mb-1">Date:</div>
                            <div class="date__value text-body-secondary">30 Oct 2023, 22:00</div>
                        </div>
                    </div>
                </div>

                <div class="user__profile mb-3">
                    <!-- user picture -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover me-3" alt="avatar1"
                                src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                            <!-- name of bidder  -->
                            <div>
                                <div class="bidder__name fw-bold mb-1">Shi Da</div>
                                <div class="bidder__phone text-body-secondary">81234567</div>
                            </div>
                        </div>

                        <div>
                            <div class="date__title fw-bold mb-1">Date:</div>
                            <div class="date__value text-body-secondary">30 Oct 2023, 22:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div v-else class="purchase__container">
            <!-- <h3>Bidder's profile</h3> -->
            <!-- First set of content for the "Purchase" tab -->
            <div class="user__profile mb-3">
                <!-- user picture -->
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover me-3" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                        <!-- name of bidder  -->
                        <div>
                            <div class="bidder__name fw-bold mb-1">Jason</div>
                            <div class="bidder__phone text-body-secondary">81234567</div>
                        </div>
                    </div>

                    <div>
                        <div class="bid-price__title fw-bold mb-1">Bid Price:</div>
                        <div class="bid-price__value text-body-secondary">$550,000</div>
                    </div>
                </div>
            </div>

            <div class="user__profile mb-3">
                <!-- user picture -->
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover me-3" alt="avatar1"
                            src="https://source.unsplash.com/g0zwKn5vslI" width="50" height="50" />
                        <!-- name of bidder  -->
                        <div>
                            <div class="bidder__name fw-bold mb-1">Shi Da</div>
                            <div class="bidder__phone text-body-secondary">81234567</div>
                        </div>
                    </div>

                    <div>
                        <div class="bid-price__title fw-bold mb-1">Bid Price:</div>
                        <div class="bid-price__value text-body-secondary">$550,000</div>
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
.dashboard__title {
    font-size: 16px;
}

.nav-link {
    color: black;
    font-size: 12px;
    cursor: pointer;
}

.active {
    color: #0b5ed7 !important;
}

.bid__date-time {
    font-weight: bold;
    font-size: 14px;
}

.user__profile {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightgrey;
    border-radius: 8px;
    padding: 20px;
}

.bidder__name {
    font-size: 16px;
}

.bidder__phone {
    font-size: 14px;
}

.bid-price__title,
.date__title {
    font-size: 16px;
}

.bid-price__value,
.date__value {
    font-size: 14px;
}

.view__container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}

.purchase__container {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
}

@media (max-width:800px) {
    .nav__bar {
        justify-content: start;
    }

    .buyer__info {
        justify-content: center;
    }
}

@media (min-width: 1150px) {
    .dashboard__title {
        font-size: 20px;
    }
}
</style>
  



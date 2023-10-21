<template>
    <div class="nav__bar">
        <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
                <a class="nav-link" @click="activeTab = 'view'" :class="{ active: activeTab === 'view' }">View</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" @click="activeTab = 'purchase'" :class="{ active: activeTab === 'purchase' }">Purchase</a>
            </li>
        </ul>
    </div>

    <div class="container-fluid d-flex justify-content-left tab-content">
        <div class="tab-pane fade" id="view" v-if="activeTab === 'view'">
            <h3>View Page</h3>
            <!-- First set of content for the "View" tab -->
            <div class="row">
                <!-- user picture -->
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                        src="https://source.unsplash.com/g0zwKn5vslI" width="90" height="90" />
                </div>
                <!-- name of bidder -->
                <div class="bidder__name">
                    Jason
                </div>
                <!-- offered price -->
                <div class="bid__price">
                    $550000
                </div>
            </div>
            
            <!-- Second set of content for the "View" tab -->
            <div class="row">
                <!-- user picture -->
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                        src="https://source.unsplash.com/g0zwKn5vslI" width="90" height="90" />
                </div>
                <!-- name of bidder -->
                <div class="bidder__name">
                    Jason
                </div>
                <!-- offered price -->
                <div class="bid__price">
                    $550000
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="purchase" v-if="activeTab === 'purchase'">
            <h3>Purchase Page</h3>
            <!-- First set of content for the "View" tab -->
            <div class="row">
                <div class="bid__date__time">
                    30 Oct 2023, 20:00
                </div>
                <!-- user picture -->
                <div class="col-3 d-flex justify-content-center align-items-center">
                    <img id="viewer-picture" class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                        src="https://source.unsplash.com/g0zwKn5vslI" width="90" height="90" />
                </div>
                <!-- name of bidder -->
                <div class="bidder__name">
                    Jason
                </div>
                <!-- offered price -->
                <div class="bidder__phone"> 
                    81234567
                </div>
            </div>
        </div>
    </div>
</template>

  
  <script>
  export default {
    data() {
      return {
        activeTab: 'view', // Initialize with 'view' as the active tab
      };
    },
  };
</script>
  
<style scoped>
  /* to add css */
</style>
  

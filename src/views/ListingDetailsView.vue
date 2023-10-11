<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <div class="general-container">
    <div class="row border border-light rounded">
      <div class="col">
        <!-- Block: custom-carousel -->
        <div id="carouselExampleCaptions" class="carousel slide mx-auto custom-carousel">
          <!-- Elements: custom-carousel__indicators -->
          <ol class="carousel-indicators custom-carousel__indicators">
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true"
              aria-label="Slide 1"></li>
            <li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></li>
          </ol>

          <!-- Block: custom-carousel__inner -->
          <div class="carousel-inner custom-carousel__inner">
            <!-- Elements: custom-carousel__item -->
            <div class="carousel-item active custom-carousel__item">
              <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100"
                alt="Slide 1">
              <!-- Elements: custom-carousel__caption -->
              <div class="carousel-caption d-none d-md-block custom-carousel__caption">
                <!-- Your caption content -->
              </div>
            </div>

            <!-- Add more carousel items as needed -->
            <div class="carousel-item custom-carousel__item">
              <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100"
                alt="Slide 2">
              <div class="carousel-caption d-none d-md-block custom-carousel__caption">
                <!-- Your caption content for Slide 2 -->
              </div>
            </div>
          </div>

          <!-- Controls -->
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div> <!-- End of custom-carousel -->
      </div> <!-- End of column -->
    </div> <!-- End of row -->
  
    <!-- Property Overview | Seller Information -->
    <div class="container-sm">
      <div class="row justify-content-between">
        <!-- Left column -->
        <div class="col-lg-7 col-md-12 my-5 px-3">
          <div class="property-overview-row">
            <div class="location-info">
              <h2 style="font-size: 45px; font-weight:bold">220B Bedok Central</h2> 
            </div>
            <div class="price">
              <p style="font-size:35px">$530,000</p>
            </div>


            <section class="overview-section">
              <div class="d-flex">
                <div class="me-3">
                  <div class="d-flex">
                    <span class="material-symbols-outlined me-2">bed</span>
                      <b>3</b>
                  </div>
                <div class="listing-info text-muted">Bedrooms</div>
              </div>

              <div class="me-3">
                <div class="d-flex">
                  <span class="material-symbols-outlined me-2">bathtub</span>
                    <b>2</b>
                </div>
                <div class="listing-info text-muted">Bathrooms</div>
              </div>
              <div>
                <div class="d-flex">
                  <span class="material-symbols-outlined me-2">crop_square</span>
                    <b>984 sqft</b>
              </div>
                <div class="listing-info text-muted">Living Area</div>
              </div>
            </div>
            </section>

            <div class="section-divider"></div>
            
            <section class="about-section">
              <div class="description-block">
                <h2 class="title">More about the property</h2> <br>
                <h4 class="subtitle">New Sale Listing! Renovated House with High-Level Elegance and Unblock Views</h4>
                <p class="text">
                  Discover a remarkable opportunity with this newly listed property, offering a host of captivating features that define luxury living:
                  <br>
                  -High Floor
                  <br>
                  -Two lifts
                  <br>
                  -Unblock view
                  <br>
                  -Modern Renovations
                  <br>
                  -Spacious Layout
                  <br>
                </p>
              </div>
            </section>
            <div class="section-divider"></div>
              

            <section class="details-section">
              <div class="meta-table-root">
                <div class="row">
                  <h2 class="meta-table_title col">More details</h2>
                </div>
                <table class="row">
                  <tbody>
                    <tr class="row">
                      <td class="meta-table_item wrapper col-md-6 col-12">
                        <div class="meta-table_item">
                          <div class="row">
                            <div class="meta-table_item_label col-md-12 col-5">
                              Property type
                            </div>
                            <div class="meta-table_item_value col-md-12 col-7">
                              5 ROOM HDB
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="meta-table_item wrapper col-md-6 col-12">
                        <div class="meta-table_item">
                          <div class="row">
                            <div class="meta-table_item_label col-md-12 col-5">
                              Balcony
                            </div>
                            <div class="meta-table_item_value col-md-12 col-7">
                              Yes/No
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr class="row">
                      <td class="meta-table_item wrapper col-md-6 col-12">
                        <div class="meta-table_item">
                          <div class="row">
                            <div class="meta-table_item_label col-md-12 col-5">
                              Tenure
                            </div>
                            <div class="meta-table_item_value col-md-12 col-7">
                              99 Years
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="meta-table_item wrapper col-md-6 col-12">
                        <div class="meta-table_item">
                          <div class="row">
                            <div class="meta-table_item_label col-md-12 col-5">
                              Listed On
                            </div>
                            <div class="meta-table_item_value col-md-12 col-7">
                              Date
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

            </section>
            <div class="section-divider"></div>

            <section class="location-section">
              <div class="listing-location-section-root">
                <h2 class="section-title">About the Location</h2>
                <div class="listing-location">
                  <!-- nav bar -->
                  <nav class="nav-tabs">
                    <a role="button" class="nav-commute">Commute</a>
                    <a role="button" class="nav-school">Schools</a>
                    <a role="button" class="nav-family-living">Family Living</a>
                    <a role="button" class="nav-lifestyle">Lifestyle</a>
                  </nav>
                </div>
              </div>

            </section>
            <div class="section-divider"></div>

          </div>  
        </div>
        <!-- Right column -->
        <div class="col-lg-4 col-md-12 my-5 px-4 pb-3 h-75 border">
          <!-- Seller information -->
          <div class="container-fluid my-5 d-flex justify-content-center">
            <div class="row">
              <div id="sellerPic" class="col-3 d-flex justify-content-center align-items-center">
                <img class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1" src="https://source.unsplash.com/g0zwKn5vslI" width="90" height="90"/>
              </div>
              <div class="col-8 d-flex flex-column justify-content-around align-items-start ms-3">
                <div class="fw-bold fs-4">
                  Chason Jui
                </div>
                <div>
                  {User ID}
                </div>
                <div>
                  {Phone Number}
                </div>
              </div>
            </div>
          </div>

          <!-- button for viewSlotsModal --> 
          <div class="btn-container d-flex justify-content-center my-2">
            <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal" data-bs-target="#viewSlotsModal">
              Viewing
            </button>
          </div>
          <!-- viewSlotsModal -->
          <div class="modal fade" id="viewSlotsModal" tabindex="-1" aria-labelledby="viewSlotsModalLabel" aria-hidden="true" style="display:none">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-8 text-start">
                        <p class="modal-title fs-2" id="viewSlotsModalLabel">Viewing</p>
                      </div>
                      <div class="col-4 text-end">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                    </div>
                    <div class="row text-start">
                      <p class="modal-subheader fs-6">Place deposit for timeslots</p>
                    </div>
                  </div>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-4 border border-start-0 border-top-0 border-bottom-0 text-center">
                        <img src="https://source.unsplash.com/EsudwXe8rB4" class="rounded" alt="" width="120" height="150">
                      </div>
                      <div class="col-8 text-center d-flex flex-column justify-content-between">
                        <div class="fs-4 text-start">
                          936 Bedok Central
                          <br>
                          <!-- icons -->
                          <div class="d-flex">
                            <div class="me-3">
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">bed</span>
                                <b class="icon-text">3</b>
                              </div>
                              <div class="listing-info text-muted">Bedrooms</div>
                            </div>

                            <div class="me-3">
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">bathtub</span>
                                <b class="icon-text">2</b>
                              </div>
                              <div class="listing-info text-muted">Bathrooms</div>
                            </div>
                            <div>
                              
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">crop_square</span>
                                <b class="icon-text">984 sqft</b>
                              </div>
                              <div class="listing-info text-muted">Living Area</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                  <!-- Form for TimeSlot -->
                  <select class="form-select" aria-label="Default select example"> 
                    <option selected>Timeslots</option> 
                    <option value="1" disabled>5th October 10am $100</option> 
                    <option value="2">6th October 10am $90</option> 
                    <option value="3">7th October 10am $80</option>
                    <option value="2">8th October 10am $70</option> 
                    <option value="3">9th October 10am $60</option> 
                  </select> 
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Submit Deposit</button>
                </div>
              </div>
            </div>
          </div>

          <!-- button for purchaseModal -->
          <div class="btn-container d-flex justify-content-center my-2">
            <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal" data-bs-target="#purchaseModal">
              Purchase
            </button>
          </div>
          <!-- purchaseModal -->
          <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="purchaseModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <!-- modal-header -->
                <div class="modal-header">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-8 text-start">
                        <p class="modal-title fs-2" id="purchaseModalLabel">Purchase</p>
                      </div>
                      <div class="col-4 text-end">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                    </div>
                    <div class="row text-start">
                      <p class="modal-subheader fs-6">Submit bid to purchase unit</p>
                    </div>
                  </div>
                </div>
                <!-- modal-body -->
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-4 border border-start-0 border-top-0 border-bottom-0 text-center">
                        <img src="https://source.unsplash.com/EsudwXe8rB4" class="rounded" alt="" width="120" height="150">
                      </div>
                      <div class="col-8 text-center d-flex flex-column justify-content-between">
                        <div class="fs-4 text-start">
                          936 Bedok Central
                          <br>
                          <!-- icons -->
                          <div class="d-flex">
                            <div class="me-3">
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">bed</span>
                                <b class="icon-text">3</b>
                              </div>
                              <div class="listing-info text-muted">Bedrooms</div>
                            </div>
                            <div class="me-3">
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">bathtub</span>
                                <b class="icon-text">2</b>
                              </div>
                              <div class="listing-info text-muted">Bathrooms</div>
                            </div>
                            <div>
                              <div class="d-flex">
                                <span class="material-symbols-outlined me-2">crop_square</span>
                                <b class="icon-text">984 sqft</b>
                              </div>
                              <div class="listing-info text-muted">Living Area</div>
                            </div>
                          </div>
                        </div>
                        <div class="input-group">
                          <span class="input-group-text" id="basic-addon1">$</span>
                          <input type="text" class="form-control" placeholder="Bid Price" aria-label="Bid Price" aria-describedby="basic-addon1">
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr>
                    <p>Current Highest Bid to Beat: $ </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">Submit Bid</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div> <!-- End of general container  -->
  </div>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
/* Block */
body {
  background-color: antiquewhite;
}

.custom-carousel {
  max-width: 80%;
  margin: 0 auto;
}

/* Elements */

.custom-carousel__item img {
  /* Your styling for carousel images */
  width: 300px;
  /* Adjust this width as needed */
  height: 400px;
  /* Adjust this height as needed */
  object-fit: cover;
  /* Maintain aspect ratio and cover the entire space */
}

h1 {
  color: black;
  text-align: center;
}

h2{
  font-weight:bold;
}

.main_information {
  display: flex;
  margin: 20px
}


.material-symbols-outlined {
  font-size: 50px;
}

b {
  font-size: 30px;
}

.listing-info {
  font-size: 20px;
}

.price {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  white-space: nowrap;
}

.section-divider {
  margin-top: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid lightgrey;
}

.meta-table_item_label {
  font-weight: bold;
}

.nav-tabs a {
  margin-right: 20px;
}


.icon-text {
  font-size: large;
}

.modal {
  z-index: 1050;
}
.modal-backdrop {
  z-index: 1040;
}

</style>
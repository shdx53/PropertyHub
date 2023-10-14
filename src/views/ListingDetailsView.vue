<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import GoogleMaps from "../components/ListingDetailsView/GoogleMaps.vue";

import { ref } from "vue";
let isFavorited = ref(false);

function handleFavorite() {
  event.preventDefault();
  isFavorited.value = !isFavorited.value;
}
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <div class="general__container">
    <!-- Block: custom-carousel -->
    <div id="carouselExampleCaptions" class="carousel slide mx-auto custom-carousel mt-4">
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
          <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100 rounded"
            alt="Slide 1">
          <!-- Elements: custom-carousel__caption -->
          <div class="carousel-caption d-none d-md-block custom-carousel__caption">
            <!-- Your caption content -->
          </div>
        </div>

        <!-- Add more carousel items as needed -->
        <div class="carousel-item custom-carousel__item">
          <img src="../assets/img/Listings/hudson-graves-nOJagMqGCpA-unsplash.jpg" class="d-block w-100" alt="Slide 2">
          <div class="carousel-caption d-none d-md-block custom-carousel__caption">
            <!-- Your caption content for Slide 2 -->
          </div>
        </div>
      </div>

      <!-- Controls -->
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div> <!-- End of custom-carousel -->

    <!-- Property Overview | Seller Information -->
    <div class="property-info__container my-5">
      <!-- Left column -->
      <div>
        <div class="property-overview-row">
          <div class="d-flex justify-content-between align-items-center">
            <h2 style="font-size: 30px; margin-bottom: 5px;">220B Bedok Central</h2>
            <button
              @click="handleFavorite" 
              class="favorite-btn"
              :class="{ 'favorite-btn-active': isFavorited }"
            >
              <img class="favorite-icon" src="../assets/img/Listings/favorite_FILL1_wght400_GRAD0_opsz24.png">
            </button>
          </div>

          <div class="text-muted" style="font-size: 26px;">$530,000</div>

          <div class="section-divider"></div>

          <section class="overview-section">
            <div class="d-flex justify-content-center">
              <div class="me-5">
                <div class="overview__description">Bedrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bed</span>
                  <span class="overview__value">3</span>
                </div>
              </div>

              <div class="me-5">
                <div class="overview__description">Bathrooms</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">bathtub</span>
                  <span class="overview__value">2</span>
                </div>
              </div>

              <div>
                <div class="overview__description text-center">Living Area</div>
                <div class="d-flex justify-content-center">
                  <span class="material-symbols-outlined me-2">crop_square</span>
                  <span class="overview__value">
                    984 <span class="overview__unit">sqft</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="about-section">
            <div class="description-block">
              <h2>About the Property</h2>
              <p class="text">
                Discover a remarkable opportunity with this newly listed property, offering a host of captivating
                features that define luxury living:
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
            <h2>More Details</h2>
            <div class="row">
              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Property Type</div>
                  <div class="col-6 col-md-12">5-room HDB</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Level</div>
                  <div class="col-6 col-md-12">8</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Tenure</div>
                  <div class="col-6 col-md-12">99 Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Remaining Lease</div>
                  <div class="col-6 col-md-12">40 Years</div>
                </div>
              </div>

              <div class="col-md-6 mb-2">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Balcony</div>
                  <div class="col-6 col-md-12">Yes</div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row">
                  <div class="col-6 col-md-12 fw-bold">Listed On</div>
                  <div class="col-6 col-md-12">Date</div>
                </div>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

          <section class="mb-5">
            <div>
              <h2>Nearby Amenities</h2>
              <GoogleMaps />
            </div>
          </section>
        </div>
      </div>

      <!-- Right column -->
      <div class="seller__container w-75 py-4 ms-lg-4 border rounded">
        <!-- Seller information -->
        <div class="container-fluid d-flex justify-content-center">
          <div class="row justify-content-between mb-4">
            <div id="sellerPic" class="col-3 d-flex justify-content-center align-items-center">
              <img class="rounded-circle d-flex object-fit-cover shadow-sm" alt="avatar1"
                src="https://source.unsplash.com/g0zwKn5vslI" width="90" height="90" />
            </div>
            <div class="col-8 d-flex flex-column justify-content-around align-items-start">
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
          <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal"
            data-bs-target="#viewSlotsModal">
            Viewing
            <!-- How to add icons beside CTA? 
              <span class="material-symbols-outlined" style="font-size:20px;">schedule_send</span> -->
          </button>
        </div>

        <!-- button for purchaseModal -->
        <div class="btn-container d-flex justify-content-center my-2">
          <button type="button" class="btn w-50 btn-primary border border-muted" data-bs-toggle="modal"
            data-bs-target="#purchaseModal">
            Purchase
          </button>
        </div>
      </div> <!-- End of right col -->

    </div> <!-- End of row -->
  </div> <!-- End of general container  -->

  <!-- viewSlotsModal -->
  <div class="modal fade rounded" id="viewSlotsModal" tabindex="-1" aria-labelledby="viewSlotsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-8 text-start">
                <b class="modal-title fs-4" id="viewSlotsModalLabel">Viewing</b>
              </div>
              <div class="col-4 text-end">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="row text-start">
              <p class="modal-subheader fs-6 mb-0">Place deposit for timeslots</p>
            </div>
          </div>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-4 text-center d-flex justify-content-center align-items-center">
                <img src="https://source.unsplash.com/EsudwXe8rB4" class="rounded" width="100%" height="150">
              </div>
              <div class="col-8 text-center">
                <div class="text-start d-flex flex-column justify-content-between h-100">
                  <div>
                    <span style="font-size:18px ;font-weight: bold;">936 Bedok Central</span>

                    <!-- icons -->
                    <div class="d-flex mt-2">
                      <div class="me-3">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">bed</span>
                          <div class="icon-text">3</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Bedrooms</div>
                      </div>

                      <div class="me-3">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">bathtub</span>
                          <div class="icon-text">2</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Bathrooms</div>
                      </div>

                      <div>
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">crop_square</span>
                          <div class="icon-text">984 sqft</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Living Area</div>
                      </div>
                    </div>
                  </div>

                  <!-- Form for TimeSlot -->
                  <select class="form-select" aria-label="Default select example">
                    <option selected>Timeslots</option>
                    <option value="1" disabled>5th October, 10am - $100</option>
                    <option value="2">6th October, 10am - $90</option>
                    <option value="3">7th October, 10am - $80</option>
                    <option value="2">8th October, 10am - $70</option>
                    <option value="3">9th October, 10am - $60</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary">Submit Deposit</button>
        </div>
      </div>
    </div>
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
                <b class="modal-title fs-4" id="purchaseModalLabel">Purchase</b>
              </div>
              <div class="col-4 text-end">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="row text-start">
              <p class="modal-subheader fs-6 mb-0">Submit bid to purchase unit</p>
            </div>
          </div>
        </div>
        <!-- modal-body -->
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-4 text-center d-flex justify-content-center align-items-center my-auto">
                <img src="https://source.unsplash.com/EsudwXe8rB4" class="rounded" width="100%" height="150">
              </div>
              <div class="col-8 text-center">
                <div class="text-start d-flex flex-column justify-content-between h-100">
                  <div>
                    <span style="font-size:18px ;font-weight: bold;">936 Bedok Central</span>

                    <!-- icons -->
                    <div class="d-flex mt-2">
                      <div class="me-3">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">bed</span>
                          <div class="icon-text">3</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Bedrooms</div>
                      </div>

                      <div class="me-3">
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">bathtub</span>
                          <div class="icon-text">2</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Bathrooms</div>
                      </div>

                      <div>
                        <div class="d-flex align-items-center">
                          <span class="material-symbols-outlined me-2" style="font-size:24px">crop_square</span>
                          <div class="icon-text">984 sqft</div>
                        </div>
                        <div class="listing-info text-muted" style="font-size:12px">Living Area</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="input-group">
                      <span class="input-group-text" id="basic-addon1">$</span>
                      <input type="text" class="form-control" placeholder="Bid Price" aria-label="Bid Price"
                        aria-describedby="basic-addon1">
                    </div>
                    <div class="text-start" style="font-size: 10px;">Current Highest Bid to Beat: $ </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary">Submit Bid</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
/* Elements */
.general__container {
  width: 80%;
  max-width: 1150px;
}

.material-symbols-outlined {
  font-size: 30px;
  font-weight: 300;
}

h1 {
  color: black;
  text-align: center;
}

h2 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 15px;
}

.custom-carousel__item img {
  /* Your styling for carousel images */
  width: 100%;
  /* Adjust this width as needed */
  height: 450px;
  /* Adjust this height as needed */
  object-fit: cover;
  /* Maintain aspect ratio and cover the entire space */
}

.property-info__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.favorite-btn {
  background-color: transparent;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 5px;
}

.favorite-btn-active {
  background-color: red;
}

.favorite-icon {
  width: 20px;
}

.overview__value {
  font-size: 20px;
}

.overview__unit {
  font-size: 18px;
}

.overview__description {
  font-size: 16px;
  font-weight: 700;
}

.section-divider {
  margin-top: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid lightgrey;
}

.seller__container {
  width: 75%;
  max-width: 400px;
}

.modal-body {
  border: none;
}

.icon-text {
  font-size: 16px;
}

@media (min-width: 1150px) {
  .property-info__container {
    flex-direction: row;
    align-items: start;
  }
}
</style>
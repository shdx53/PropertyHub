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
      </div> <!-- end of column -->
    </div> <!-- end of row -->
  </div>
  <div class="container-sm">
    <div class="row">
      <div class="col-lg-8 col-md-12">
        <div class="property-overview-row">
          <div class="location-info">
            <h2 style="font-size: 60px"> Address</h2>
          </div>
          <div class="price">
            <p style="font-size:50px">$price</p>
          </div>
          <div class="section-divider"></div>

          <section class="about-section">
            <div class="description-block">
              <h2 class="title">More about the property</h2> <br>
              <h4 class="subtitle">New sale listing! Renovated House , High level</h4>
              <p class="text">
                This is a description about this house. Features include:
                <br>
                -High Floor
                <br>
                -Two lifts
                <br>
                -Unblock view
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
                            Floor Size
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            xx sqft
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
                            PSF
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            S$ XXX
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
                            Currently Tenated
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            Yes/No
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="meta-table_item wrapper col-md-6 col-12">
                      <div class="meta-table_item">
                        <div class="row">
                          <div class="meta-table_item_label col-md-12 col-5">
                            Developer
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            Housing & Development Board (HDB)
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
                            Listed On
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            Date
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="meta-table_item wrapper col-md-6 col-12">
                      <div class="meta-table_item">
                        <div class="row">
                          <div class="meta-table_item_label col-md-12 col-5">
                            Listing ID
                          </div>
                          <div class="meta-table_item_value col-md-12 col-7">
                            123456
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

          <section class="price-insights-section">
            <div class="price-insights-root">
              <h2 class="section-title">Price Insights</h2>
              <div class="price-graph">
                <p class="price-data">Insert chart</p>
              </div>
            </div>
          </section>

          <div class="section-divider"></div>

        </div>

      </div>

    </div>

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

.main_information {
  display: flex;
  margin: 20px
}

.price {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  white-space: nowrap;
}

.section-divider {
  margin-top: 60px;
  margin-bottom: 60px;
  border-bottom: 1px solid grey;
}

.meta-table_item_value {
  font-weight: bold;
}

.nav-tabs a {
  margin-right: 20px;
}
</style>
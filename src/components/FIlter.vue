<script setup>
import { ref } from "vue";

const townArr = {
  north: [
    "Sembawang",
    "Woodlands",
    "Yishun"
  ],
  northEast: [
    "Ang Mo Kio",
    "Hougang",
    "Punggol",
    "Sengkang",
    "Serangoon"
  ],
  east: [
    "Bedok",
    "Pasir Ris",
    "Tampines",
  ],
  west: [
    "Bukit Batok",
    "Bukit Panjang",
    "Choa Chu Kang",
    "Clementi",
    "Jurong East",
    "Jurong West",
    "Tengah",
  ],
  central: [
    "Bishan",
    "Bukit Merah",
    "Bukit Timah",
    "Central Area",
    "Geylang",
    "Kallang",
    "Marine Parade",
    "Queenstown",
    "Toa Payoh",
  ]
};

const props = defineProps({
  isDisplayFilter: Boolean,
  displayFilter: Function
});

const emits = defineEmits(["getFilterResults"])

const selectedTowns = ref([]);
const selectedPrice = ref(null);
const selectedBedrooms = ref(null);

function handleSubmit() {
  event.preventDefault();
  props.displayFilter();
  const filterResults = {
    towns: selectedTowns.value,
    price: selectedPrice.value,
    bedrooms: selectedBedrooms.value
  }
  emits("getFilterResults", filterResults);
}
</script>

<template>
  <form>
    <div class="form__container">
      <div class="d-flex justify-content-end">
        <span @click="displayFilter" class="material-symbols-outlined text-end close-btn">close</span>
      </div>

      <!-- Towns -->
      <div>
        <h2 class="form__title">Towns</h2>
        <hr>
        <div class="d-flex flex-column flex-xxl-row">
          <div class="form__north-container mb-2 me-xxl-2">
            <h3 class="form__title form__title--area">North:</h3>

            <div v-for="town in townArr.north" class="form-check mb-2">
              <input class="form-check-input" type="checkbox" :value="town" :id="town" v-model="selectedTowns">
              <label class="form-check-label" :for="town">
                {{ town }}
              </label>
            </div>
          </div>

          <div class="form__northeast-container mb-2 me-xxl-2">
            <h3 class="form__title form__title--area">NorthEast:</h3>

            <div v-for="town in townArr.northEast" class="form-check mb-2 d-md-none d-xxl-block">
              <input class="form-check-input" type="checkbox" :value="town" :id="town" v-model="selectedTowns">
              <label class="form-check-label" :for="town">
                {{ town }}
              </label>
            </div>

            <div class="d-none d-md-block d-xxl-none">
              <div class="row">
                <div class="col">
                  <div v-for="town in townArr.northEast.slice(0, 3)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>

                <div class="col">
                  <div v-for="town in townArr.northEast.slice(3, 5)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form__east-container mb-2 me-xxl-2">
            <h3 class="form__title form__title--area">East:</h3>

            <div v-for="town in townArr.east" class="form-check mb-2">
              <input class="form-check-input" type="checkbox" :value="town" :id="town" v-model="selectedTowns">
              <label class="form-check-label" :for="town">
                {{ town }}
              </label>
            </div>
          </div>

          <div class="form__west-container mb-2 me-xxl-2">
            <h3 class="form__title form__title--area">West:</h3>

            <div v-for="town in townArr.west" class="form-check mb-2 d-md-none d-xxl-block">
              <input class="form-check-input" type="checkbox" :value="town" :id="town" v-model="selectedTowns">
              <label class="form-check-label" :for="town">
                {{ town }}
              </label>
            </div>

            <div class="d-none d-md-block d-xxl-none">
              <div class="row">
                <div class="col">
                  <div v-for="town in townArr.west.slice(0, 3)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>

                <div class="col">
                  <div v-for="town in townArr.west.slice(3, 6)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>

                <div class="col">
                  <div v-for="town in townArr.west.slice(6, 7)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form__central-container mb-4">
            <h3 class="form__title form__title--area">Central:</h3>

            <div v-for="town in townArr.central" class="form-check mb-2 d-md-none d-xxl-block">
              <input class="form-check-input" type="checkbox" :value="town" :id="town" v-model="selectedTowns">
              <label class="form-check-label" :for="town">
                {{ town }}
              </label>
            </div>

            <div class="d-none d-md-block d-xxl-none">
              <div class="row">
                <div class="col">
                  <div v-for="town in townArr.central.slice(0, 3)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>

                <div class="col">
                  <div v-for="town in townArr.central.slice(3, 6)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>

                <div class="col">
                  <div v-for="town in townArr.central.slice(6, 9)" class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" :value="town" :id="town"
                      v-model="selectedTowns">
                    <label class="form-check-label" :for="town">
                      {{ town }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Max Price -->
      <div class="d-md-flex mb-4 align-items-center">
        <label for="maxPrice" class="form-label form__title form__title2">Max Price:</label>
        <!-- <input type="number" id="maxPrice" class="form-control input-price"> -->
        <div class="input-group input-price__container">
          <span class="input-group-text">$</span>
          <input id="maxPrice" type="number" class="form-control" placeholder="Price" v-model="selectedPrice">
        </div>
      </div>

      <!-- Bedrooms -->
      <div class="d-md-flex mb-4 align-items-center">
        <!-- <div class="form__title form__title2">Bedrooms:</div>
        <div>
          <button class="btn btn-dark me-1 me-sm-2">1</button>
          <button class="btn btn-dark me-1 me-sm-2">2</button>
          <button class="btn btn-dark me-1 me-sm-2">3</button>
          <button class="btn btn-dark me-1 me-sm-2">4</button>
          <button class="btn btn-dark">5</button>
        </div> -->
        <label for="bedrooms" class="form__title form__title2">Bedrooms:</label>
        <select class="form-select select-bedrooms__container" id="bedrooms" v-model="selectedBedrooms">
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <!-- Apply -->
      <div class="d-flex justify-content-center" @click="handleSubmit">
        <button class="btn btn-primary">Apply</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.close-btn {
  cursor: pointer;
}

form {
  position: fixed;
  z-index: 4;
  inset: 15%;
  max-width: 880px;
  max-height: 680px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  overflow: scroll;
}

.form__container {
  width: 88%;
  margin: 0 auto;
  padding: 25px 0;
}

hr {
  margin: 10px 0;
  color: darkgray;
}

.form__title {
  font-weight: bold;
  font-size: 16px;
}

.form__title2 {
  margin-bottom: 5px;
}

input::placeholder {
  font-size: 16px;
}

.input-price__container,
.select-bedrooms__container,
.input-floor-size__container {
  width: 206px;
}

.col {
  padding-right: 0;
}

@media (min-width: 576px) {
  .form__northeast-container {
    max-width: 312px;
  }

  .form__west-container,
  .form__central-container {
    max-width: 480px;
  }
}

@media (min-width: 768px) {
  .form__title2 {
    width: 25%;
    max-width: 120px;
    margin-bottom: 0;
  }
}

@media (min-width: 1400px) {
  form {
    inset: 6% 20%;
    overflow: hidden;
  }

  .form__north-container {
    width: 18%;
  }

  .form__northeast-container {
    width: 20%;
  }

  .form__east-container {
    width: 16%;
  }

  .form__west-container {
    width: 22%;
  }

  .form__central-container {
    width: 19%;
  }
}
</style>
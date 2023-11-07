<script setup>
import { onMounted, ref } from "vue";

// External libraries
import { Loader } from "@googlemaps/js-api-loader";

let addressInput = ref(null);

onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_MAPS_API_KEY,
    version: "weekly",
  });

  loader.load().then(async () => {
    const { PlacesService } = await google.maps.importLibrary("places");

    const options = {
      componentRestrictions: { country: "sg" },
      types: ["address"],
      fields: ["address_components"]
    };

    const autocomplete = new google.maps.places.Autocomplete(addressInput.value, options);
  });
})
</script>

<template>
  <input ref="addressInput" type="text" class="form-control" id="address" placeholder="" required>
</template>

<style>
.pac-container {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0 5px;
}

.pac-icon {
  display: none;
}

.pac-item {
  border: none;
  padding: 10px 5px 5px 5px;
  border-radius: 5px;
}
</style>
<script setup>

</script>

<template>
  <nav class="navbar navbar-expand-sm sticky-top bg-black">
    <div class="container-fluid general__container px-0">
      <a class="navbar-brand" href="./home">
        <b>Property</b>Hub
      </a>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="material-symbols-outlined text-white fs-1">menu</span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <a class="nav-link" href="./buy">Buy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./sell">Sell</a>
          </li>
          <div class="d-sm-flex w-100 justify-content-end">
            <li class="nav-item">
              <a class="nav-link pe-0" href="#">Sign In</a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    padding: 18px 0 17px 0;
    z-index: 3;
  }
  .general__container {
    width: 90%;
  }

  .navbar-brand,
  .nav-link {
    color: white;
    padding-top: 0;
    padding-bottom: 0;
  }

  .navbar-brand:hover {
    color: white;
  }

  .nav-link:hover {
    color: lightgray;
  }
</style>
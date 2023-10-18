<script setup>
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
</script>
<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <div class="reset-container">
    <!-- Login Image on left side -->
    <div class="login-image">
      <img
        src="../assets/img/LoginView/apartmentvector.svg"
        alt="Vector Image"
      />
    </div>
    <div class="w-60">
      <!-- Forgot Password Form on right -->
      <div class="reset-form">
        <h2 class="mb-4 fw-bold">Reset Password</h2>

        <!-- Password -->
        <div class="form-group mb-2">
          <label for="password" class="py-2 fw-bold">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter your password"
            
          />
        </div>
        <!-- Password -->
        <div class="form-group">
          <label for="confirmpassword" class="py-2 fw-bold">Confirm Password:</label>
          <input
            type="password"
            class="form-control"
            id="confirmpassword"
            placeholder="Enter your password"
            
          />
        </div>
       
        <!-- Login button -->
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary mt-3">
            Reset
          </button>
        </div>

        <p class="my-2 text-danger text-center">{{ errMsg }}</p>
      </div>
      <!-- Sign up link -->

    </div>
  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.reset-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: calc(100vh - 65px - 87px);
  width: 90%;
  margin: 0 auto;
}

.login-image {
  width: 60%;
  max-width: 700px;
}

.reset-form {
  min-width: 400px;
}

@media only screen and (max-width: 992px) {
  .login-image {
    display: none;
  }
}
</style>
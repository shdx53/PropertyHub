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
        <button type="submit" class="btn btn-primary mt-4">
          Reset
        </button>
      </div>

      <p class="my-2 text-danger text-center">{{ errMsg }}</p>
    </div>
    <!-- Sign up link -->

  </div>
  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
.reset-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 68px - 84px);
  width: 85%;
  max-width: 1100px;
  margin: 0 auto;
}

.login-image {
  width: 60%;
  max-width: 530px;
}

.reset-form {
  width: 40%;
  max-width: 400px;
}

input::placeholder {
  font-size: 12px;
  color: darkgray;
}

@media only screen and (max-width: 992px) {
  .reset-container {
    justify-content: center;
  }

  .login-image {
    display: none;
  }

  .reset-form {
    width: 60%;
    max-width: 350px;
    min-width: unset;
  }
}

@media (max-width: 768px) {
  .reset-container {
    height: calc(100vh - 68px - 152px);
  }
}

@media (max-width: 600px) {
  .reset-form {
    width: 70%;
  }
}
</style>
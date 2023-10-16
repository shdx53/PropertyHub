<template>
  <!-- Navbar -->
  <Navbar/>
  <!--Sign up container-->
  <div class="container d-flex align-items-center">
    <div class="signup-form">
      <h2 class="text-center">Sign Up</h2>
      <form>
        <div class="form-group">
          <!--Email-->
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
          />
        </div>
        <!--Password-->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>
        <!--Full Name-->
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            required
          />
        </div>
        <!--Phone Number-->
        <div class="form-group">
          <label for="phone">Phone Number:</label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="phone"
            required
          />
        </div>
        <!--Sign up button-->
        <div class="d-grid gap-2">
          <button
            type="submit"
            @click="register"
            class="btn btn-primary btn-block mt-3"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
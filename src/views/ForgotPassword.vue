<template>
    <div class="container">
      <div class="reset-form">
        <h2 class="text-center">Reset Password</h2>
        <form action="resetsuccess.html">
          <div class="form-group">
            <!--Password-->
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="form-group">
            <!--Confirm Password-->
            <label for="confirmpassword">Confirm Password:</label>
            <input
              type="password"
              class="form-control"
              id="confirm"
              placeholder="Enter your password"
              required
            />
          </div>
          <!--Reset button-->
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-block mt-3">
              Reset
            </button>
          </div>
          
        </form>
      </div>
    </div>

</template>

<style scoped>
body {
  background-color: white;
}

.reset-form {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
  background: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
</style>
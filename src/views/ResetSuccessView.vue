<template>
    <div class="container">
        <div class="w-25 mx-auto mt-5">
            <img src="../assets/img/LoginView/resetsuccess.svg" alt="" />
        </div>

        <div class="alert alert-success text-center mt-3" role="alert">
        Your password has been successfully reset!
            <span @click="loginPage" style="color: blue; text-decoration: underline; cursor: pointer">Login</span>
        </div>
    </div>
</template>

<script>
const loginPage = () => {
  router.push("/login");
};
</script>

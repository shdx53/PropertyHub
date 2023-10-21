<script setup>

</script>

<template>
  <footer>
    <div class="general__container">
      <div class="footer-flex">
        <div class="footer__logo mb-3 mb-md-0">
          <b>Property</b>Hub
        </div>
        <div class="footer__copyright mb-3 mb-md-0">©2023 PropertyHub. All rights reserved.</div>
        <div class="footer__social-media">
          <a href="#">
            <img class="footer__icon me-2" src="../assets/img/Footer/linkedin.png">
          </a>
          <a href="#">
            <img class="footer__icon me-2" src="../assets/img/Footer/facebook.png">
          </a>
          <a href="#">
            <img class="footer__icon me-2" src="../assets/img/Footer/twitter.png">
          </a>
          <a href="#">
            <img class="footer__icon" src="../assets/img/Footer/instagram.png">
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: black;
  color: white;
  text-align: center;
  padding: 30px 0;
}

.footer__icon {
  width: 20px;
}

.footer__logo {
  font-size: 16px;
}

.footer__copyright {
  font-size: 8px;
}

@media (min-width: 768px) {
  .footer-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer__logo,
  .footer__social-media {
    width: 25%;
  }

  .footer__logo {
    text-align: start;
    margin-bottom: 0;
  }

  .footer__social-media {
    text-align: end;
  }
}
</style>
<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../assets/animation.css';

const auth = getAuth();
let isSignedIn = ref(false);

onAuthStateChanged(auth, (user) => {
  isSignedIn.value = user ? true : false;
})
</script>

<template>
  <!-- Nav -->
  <Navbar />

  <!-- Header -->
  <header class="mb-5">
    <div class="general__container text-center">
      <h1 class="fw-bold text-white mb-2">Selling your home?</h1>
      <h2 class="text-white-50 mb-4 fs-3">Let us help you find the perfect buyer</h2>
      <a v-if="isSignedIn" class="get-started-btn bg-primary" href="/my-listings">Get started</a>
      <a v-else class="get-started-btn bg-primary" href="/login">Get started</a>
    </div>
  </header>

  <!-- Benefits -->
  <section class="general__container mb-5">
    <div class="card__container d-sm-flex slide-in-left">
      <img src="https://i.postimg.cc/wj726CW6/christin-hume-Hcfwew744z4-unsplash.jpg" class="card__img mb-4 mb-sm-0">

      <div class="card__text-container ms-sm-3 ms-lg-4">
        <div>
          <h3 class="fw-bold card__title">500,000+</h3>
          <p class="fw-bold text-body-tertiary card__subtitle">Active Property Seekers</p>
        </div>

        <p class="card__text mb-3 mb-sm-0">Reach out to our extensive user base and enhance the exposure of your listing.
        </p>
      </div>
    </div>

    <div class="card__container card__container--flex slide-in-right">
      <div class="card__text-container me-sm-3 me-lg-4">
        <div>
          <h3 class="fw-bold card__title">16,800+</h3>
          <p class="fw-bold text-body-tertiary card__subtitle">Satisfied buyers served</p>
        </div>

        <p class="card__text mb-3 mb-sm-0">Sell your home with confidence.</p>
      </div>
      <img src="https://i.postimg.cc/908k1Y4Y/oppo-find-x5-pro-m-Cxk-ba7-CJ8-unsplash.jpg" class="card__img mb-4 mb-sm-0">
    </div>

    <div class="card__container d-sm-flex slide-in-left">
      <img src="https://i.postimg.cc/9FbHSy9T/amos-lee-5-Rc4do-Ynu94-unsplash.jpg" class="card__img mb-4 mb-sm-0">

      <div class="card__text-container ms-sm-3 ms-lg-4">
        <div>
          <h3 class="fw-bold card__title card__title--bid">Bid to View and Purchase</h3>
          <p class="fw-bold text-body-tertiary card__subtitle card__subtitle--bid">Narrow down potention buyers</p>
        </div>

        <p class="card__text mb-3 mb-sm-0">Helps you schedule visits and identify buyers who are genuinely interested.</p>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="mb-5">
    <h3 class="fw-bold text-center faq__title">Frequently Asked Questions</h3>
    <div class="general__container accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            How does the "bid to view" system work?
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Once you have listed your home, you can customize the viewing period based on
            your availability. Potential buyers will then bid for
            those viewing slots.</div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            What if I do not want to host a viewing
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">If you do not want to host your own viewings, that is totally fine. We are here to
            sell your home, in whatever way works for you.</div>
        </div>
      </div>

      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Does it cost money to sell on PropertyHub?
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">We always help you sell your home for free — really, truly free.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
header {
  height: 450px;
  background-image: url("https://i.imgur.com/UAT4jbX.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
}

header::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: black;
  opacity: 0.7;
}

.get-started-btn {
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.get-started-btn:hover {
  opacity: 0.9;
}

.card__container {
  border: none;
}

.card__container--flex {
  display: flex;
  flex-direction: column-reverse;
}

.card__img {
  width: 100%;
  aspect-ratio: 1.5 / 1;
  object-fit: cover;
}

.card__title--bid {
  font-size: 22px;
}

.card__subtitle {
  letter-spacing: 3px;
  text-transform: uppercase;
}

.card__subtitle--bid {
  font-size: 14px;
}

.faq__title {
  font-size: 22px;
}

.accordion-button:not(.collapsed) {
  background-color: transparent;
}

.accordion-button:focus {
  box-shadow: none;
  border-color: rgba(0, 0, 0, .125);
}

@media (min-width: 576px) {
  .card__container--flex {
    flex-direction: row;
  }

  .card__img {
    width: 50%;
  }

  .card__text-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card__title--bid {
    font-size: 17px;
  }

  .card__subtitle {
    font-size: 14px;
  }

  .card__text {
    font-size: 12px;
  }

  .faq__title {
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  header {
    height: 500px;
  }

  .card__title {
    font-size: 28px;
  }

  .card__title--bid {
    font-size: 24px;
  }

  .card__subtitle {
    font-size: 16px;
  }

  .card__subtitle--bid {
    font-size: 15px;
  }

  .card__text {
    font-size: 16px;
  }

  .faq__title {
    font-size: 26px;
  }
}

@media (min-width: 992px) {
  .card__title {
    font-size: 30px;
  }

  .card__title--bid {
    font-size: 26px;
  }

  .card__subtitle {
    font-size: 18px;
  }

  .card__subtitle--bid {
    font-size: 17px;
  }

  .card__text {
    font-size: 18px;
  }

  .faq__title {
    font-size: 28px;
  }
}

@media (min-width: 1400px) {
  .card__title {
    font-size: 34px;
  }

  .card__title--bid {
    font-size: 30px;
  }

  .card__subtitle {
    font-size: 22px;
  }

  .card__subtitle--bid {
    font-size: 21px;
  }

  .card__text {
    font-size: 22px;
  }

  .faq__title {
    font-size: 32px;
  }
}</style>
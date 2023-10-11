import { getAuth } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SellView from "../views/SellView.vue";
import BuyView from "../views/BuyView.vue";
import ListingDetails from "../views/ListingDetailsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: () => import("../views/StartView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/buy",
      name: "buy",
      component: BuyView,
    },
    {
      path: "/listing-details",
      name: "listing-listings",
      component: ListingDetails,
    },
    {
      path: "/sell",
      name: "sell",
      component: SellView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/forgotpassword",
      name: "forgotpassword",
      component: () => import("../views/ForgotPassword.vue"),
    },
    {
      path: "/resetsuccess",
      name: "resetsuccess",
      component: () => import("../views/ResetSuccess.vue"),
    },
    {
      path: "/bookmarks",
      name: "bookmarks",
      component: () => import("../views/Bookmarks.vue"),
    },
    {
      path: "/createlistingpage",
      name: "createlistingpage",
      component: () => import("../views/CreateListingPage.vue"),
    },
    {
      path: "/createlisting",
      name: "createlisting",
      component: () => import("../views/CreateListing.vue"),
    },
    {
      path: "/ownlistings",
      name: "ownlistings",
      component: () => import("../views/OwnListings.vue"),
    },
    {
      path: "/editlisting",
      name: "editlisting",
      component: () => import("../views/EditListing.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next();
    } else {
      alert("you dont have access!");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

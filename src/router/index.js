import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/buy",
      name: "buy",
      component: () => import("../views/BuyView.vue"),
    },
    {
      path: "/listing",
      name: "listing-listings",
      component: () => import("../views/ListingView.vue"),
    },
    {
      path: "/sell",
      name: "sell",
      component: () => import("../views/SellView.vue"),
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
      path: "/liked-listings",
      name: "likedlistings",
      component: () => import("../views/LikedListingsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/my-listings",
      name: "createlistingpage",
      component: () => import("../views/MyListingsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/create-listing",
      name: "createlisting",
      component: () => import("../views/CreateListingView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    // {
    //   path: "/brokenuserProfile",
    //   name: "brokenuserprofile",
    //   component: () => import("../views/brokenUserProfileView.vue"),
    // },
    {
      path: "/user-profile",
      name: "userprofile",
      component: () => import("../views/UserProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // if (getAuth().currentUser) {
    //   next();
    // } else {
    //   alert("you dont have access!");
    //   next("/login");
    // }
    onAuthStateChanged(getAuth(), user => {
      if (user) {
        next();
      } else {
        next("/");
      }
    })
  } else {
    next();
  }
});

export default router;

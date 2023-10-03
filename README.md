# IS216-Project
 
npm install
npm run build
npm run dev

username: wad@123.com
password: 123456

Routing:
refer to src/router/index.js -> follow the format. If you require someone to login, ensure meta:{requiresAuth: true}

Creating things:
every new file u wanna create, example /listing -> should go under src/views/ListingView.vue. 
html elements should be under <template></template>
scripts should be under <script></script>

if u wanna make re-usable components
<template>
  <div class="item">
    <i>
      <slot name="icon"></slot> // use slots
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

refer to src/components/WelcomeItem and src/components/TheWelcome
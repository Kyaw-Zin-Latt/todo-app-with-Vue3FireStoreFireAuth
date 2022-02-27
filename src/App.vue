<template>
  <div class="position-relative" style="height: 100vh">
    <div id="nav" class="bg-primary active position-fixed p-1 w-100 d-flex justify-content-around position-absolute bottom-0" style="z-index: 1">
      <router-link class="text-dark text-center text-decoration-none" to="/">
        <i class="bi-journal-bookmark-fill"></i><br>
        Home
      </router-link>
      <router-link class="text-dark text-center text-decoration-none" to="/favourite">
        <i class="bi-star-fill"></i><br>
        Favourite
      </router-link>
    </div>
    <div class="container overflow-hidden">
      <div class="row">
        <div class="col-md-7 col-12">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/

.active{

  color : white !important;

}

@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
 @import "../node_modules/animate.css/animate.min.css";
</style>

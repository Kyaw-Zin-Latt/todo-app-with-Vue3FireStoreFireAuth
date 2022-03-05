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
                    <List />
                    <button @click="$router.push({ name : 'Create'})" class="btn btn-primary rounded-circle rounded position-absolute btn-place">
                        <i class="bi-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import List from "../components/todo/List";
    import {ref} from "vue";
    export default {
        components: {
            List,

        },
        setup() {


        }
    }
</script>

<style scoped>

    .rounded{
        width: 50px;
        height: 50px;
    }

    .btn-place{
        bottom: 80px;
        right: 20px;
    }

</style>
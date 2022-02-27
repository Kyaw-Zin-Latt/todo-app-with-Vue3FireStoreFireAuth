<template>

    <List />
    <button @click="$router.push({ name : 'Create'})" class="btn btn-primary rounded-circle rounded position-absolute btn-place">
        <i class="bi-plus"></i>
    </button>
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
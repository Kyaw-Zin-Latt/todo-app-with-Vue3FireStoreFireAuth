<template>
    <div class="">
        <div v-if="isShow" class="spinner-border text-primary" role="status"></div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props : ['isShow']
    }
</script>

<style scoped>

</style>
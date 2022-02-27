<template>
    <div class="col-12 mt-2">

        <div class="mb-2">
            <input type="text" class="form-control rounded-pill" placeholder="&#128269; Type Something">
        </div>
        <clip-loader :loading="loading" color="#0d6efd" class="text-center position-absolute loading-place" size="50px"></clip-loader>

        <div v-for="todo in todos" :key="todo.id" class="card p-0 mb-2">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="">
                        <h6 class="">{{ todo.task }}</h6>
                        <div class="">
                            <i class="bi-clock text-primary me-2"></i>
                            <Timeago :datetime="todo.createdAt" long/>
<!--                            <small class="mb-0 text-secondary">{{ Date(todo.createdAt).toString().substring(4, 15) }}</small>-->
                        </div>
                    </div>
                    <div class="">
                        <i class="bi-pencil text-warning"></i>
                        <i @click="handleDelete(todo.id)" class="bi-trash mx-2 text-danger"></i>
                        <i class="bi-star-fill" v-if="todo.completed"></i>
                        <i class="bi-star" v-else></i>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {onMounted} from "@vue/runtime-core";
    import db from "../../firebase/init";
    import {ref} from "vue";
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import { Timeago } from 'vue2-timeago'


    export default {
        components: {ClipLoader, Timeago},
        name : "List",
        setup() {
            const todos = ref([]);
            const loading = ref(true);
            const collectionRef = db.collection("todos").orderBy("createdAt","desc");
            // onMounted(async () => {
            //     const snapshot = await collectionRef.get();
            //     let result = [];
            //
            //     snapshot.docs.map(doc => {
            //         result.push({
            //             ...doc.data(),
            //             id : doc.id
            //         })
            //     })
            //
            //     todos.value = result;
            //     loading.value = false;
            //
            // })

            collectionRef.onSnapshot((snapshot) => {
                    let result = [];

                    snapshot.docs.map(doc => {
                        result.push({
                            ...doc.data(),
                            id : doc.id
                        })
                    })

                    todos.value = result;
                    loading.value = false;
            })

            const handleDelete = async (id) => {
                await db.collection("todos").doc(id).delete();
            }

            return {todos, loading, handleDelete}
        }
    }
</script>

<style scoped>

    .loading-place{
        bottom: 350px;
        left: 165px;
    }

</style>
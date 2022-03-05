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

                <div class="col-12 mt-2">

                    <div class="mb-2">
                        <input type="text" v-model="searchKey" class="form-control rounded-pill" placeholder="&#128269; Type Something">
                    </div>
                    <clip-loader :loading="loading" color="#0d6efd" class="text-center position-absolute loading-place" size="50px"></clip-loader>

                    <div v-for="todo in searchedProducts" :key="todo.id" class="card p-0 mb-2">
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
                                    <i class="bi-star-fill" @click="handleFavourite(todo.id)" v-if="todo.completed"></i>
                                    <i class="bi-star" @click="handleFavourite(todo.id)" v-else></i>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>



</template>

<script>
    import {onMounted} from "@vue/runtime-core";
    import {db} from "../firebase/init";
    import {ref} from "vue";
    import ClipLoader from "vue-spinner/src/ClipLoader";
    import { Timeago } from 'vue2-timeago'
    import {computed} from "@vue/reactivity";


    export default {
        components: {ClipLoader, Timeago},
        name : "Favourite",
        setup() {
            const todos = ref([]);
            const loading = ref(true);
            const searchKey = ref("");
            const searchedTodoValue = ref([]);
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
                if (result.length != 0) {
                    loading.value = false;
                }
            })

            const handleDelete = async (id) => {
                await db.collection("todos").doc(id).delete();
            }

            const handleFavourite = async (id) => {
                const docRef = db.collection("todos").doc(id);
                const currTodo = (await docRef.get()).data();
                const completed = currTodo.completed;
                console.log(completed);
                await docRef.update({
                    completed : !completed
                })

            }

            const searchedProducts = computed(() => {
                if (searchKey.value !== ""){
                    return searchedTodoValue.value = todos.value.filter(todo => todo.task.toLowerCase().includes(searchKey.value.toLowerCase()));

                } else {
                    return searchedTodoValue.value = todos.value.filter(todo => todo.completed === true);
                }


            })




            return { loading, handleDelete, handleFavourite, searchedProducts, searchKey}
        }
    }
</script>

<style scoped>

    .loading-place{
        bottom: 350px;
        left: 165px;
    }

</style>
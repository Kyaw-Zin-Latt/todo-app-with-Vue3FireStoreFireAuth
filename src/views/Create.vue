<template>
    <div class="card mt-2">
        <div class="card-header">
            <h4 class="text-primary">
                <i class="bi bi-journal-album"></i>
                Create New Note
            </h4>
        </div>
        <div class="card-body">
            <form @submit.prevent="handleCreate" action="">
                <div class="mb-2">
                    <label for="">Your Note</label>
                    <input class="form-control" v-model="task" type="text" placeholder="Type Note">
                </div>
                <div class="mb-2">
                    <label for="">Deadline</label>
                    <input class="form-control" v-model="dueDate" type="date">
                </div>
                <div class="">
                    <button class="btn btn-outline-primary w-100">Add New Note</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
    import {reactive, toRefs} from "@vue/reactivity";
    import db from "../firebase/init";
    import {useRouter} from "vue-router";

    export default {
        name: "Create",
        setup() {
            const router = useRouter();
            const todo = reactive({
                task : "",
                dueDate : "",
                createdAt : Date.now(),
            })

            const handleCreate = async () => {

                // add to firebase store
                const collectionRef = db.collection("todos");
                collectionRef.add(todo);

                // go to home page
                router.push({ name : "Home"});



            }

            return { ...toRefs(todo), handleCreate }
        }
    }
</script>

<style scoped>



</style>
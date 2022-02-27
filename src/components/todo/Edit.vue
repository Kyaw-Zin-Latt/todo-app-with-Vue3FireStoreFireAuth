<template>
    <div class="mb-2">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <div class="form">
                        <div class="">
                            <label for="">Task</label>
                            <input type="text" class="form-control" v-model="task">
                        </div>
                        <div class="my-3">
                            <label for="">Date</label>
                            <input type="date" class="form-control" v-model="dueDate">
                        </div>
                        <button @click.prevent="handleUpdate" class="btn btn-outline-primary">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ref} from  "vue"
    import {reactive, toRefs} from "@vue/reactivity";
    import db from "../../firebase/init"
    import {useRoute, useRouter} from "vue-router";
    import {onMounted} from "@vue/runtime-core";

    export default {
        name: "Edit",
        setup() {
            const route = useRoute();
            const router = useRouter();
            const todo = reactive({
                task : "",
                dueDate : "",
                createdAt : Date.now(),
            })

            const collectionRef = db.collection("todos");


            onMounted(async () => {
                const id = route.params.id;
                const docRef = collectionRef.doc(id);
                const doc = await docRef.get();
                const oldTodo = doc.data();
                todo.task = oldTodo.task;
                todo.dueDate = oldTodo.dueDate;

            })

            const handleUpdate = async () => {
                const id = route.params.id;
                const docRef = collectionRef.doc(id);
                const update = await docRef.update(todo);
                router.push({ name : "Home"})
            }

            return {...toRefs(todo), handleUpdate }

        }
    }
</script>

<style scoped>

</style>
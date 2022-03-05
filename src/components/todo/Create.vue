<template>
    <div class="mb-2 p-2">
        <div class="col-12">
            <div class="card" v-if="addCard">
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
                        <button @click="add" class="btn btn-outline-primary">Add</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import 'animate.css'
    import {ref} from  "vue"
    import {reactive, toRefs} from "@vue/reactivity";
    import { db } from "../../firebase/init"
    import {inject} from "@vue/runtime-core";
    import Swal from "sweetalert2/dist/sweetalert2"

    export default {
        name: "Create",
        setup() {

            const todo = reactive({
                task : "",
                dueDate : "",
                createdAt : Date.now(),
            })
            const addCard = ref(true);
            const updateCard = ref(false);

            const add = () => {
                const collectionRef = db.collection("todos");
                collectionRef.add(todo);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
                console.log(todo);
            }

            const handleUpdate = async (id) => {
                const docRef = db.collection("todos").doc(id);
                const todo = (await docRef.get()).data();

                await docRef.update({
                    completed : !todo.completed
                });
            }

            return {...toRefs(todo), add, handleUpdate, addCard, updateCard}

        }
    }
</script>

<style scoped>

</style>
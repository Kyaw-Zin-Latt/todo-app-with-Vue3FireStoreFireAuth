<template>
    <div class="col-12 my-3 p-2">
        <div class="card">
            <div class="card-header">
                <h4>
                    <i class=""></i>
                    Register
                </h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="handleRegister">
                    <div class="mb-2">
                        <label for="" class="form-label">User Name</label>
                        <input type="text" class="form-control" v-model="user.userName">
                    </div>
                    <div class="mb-2">
                        <label for="" class="form-label">User Email</label>
                        <input type="text" class="form-control" v-model="user.userEmail">
                    </div>
                    <div class="mb-2">
                        <label for="" class="form-label">User Password</label>
                        <input type="text" class="form-control" v-model="user.userPassword">
                    </div>
                    <div class="">
                        <button v-if="regBtn" class="btn btn-outline-primary w-100">Register</button>
                        <button v-else class="btn btn-primary w-100" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    </div>
                    <p class="text-center mt-2 mb-0">
                        Have already Account?
                        <router-link to="/login">Login Here</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {reactive} from "@vue/reactivity";
    import {ref} from "vue";
    import {db, firebaseAuth} from "../firebase/init";
    import Swal from "sweetalert2/dist/sweetalert2"
    import {useRouter} from "vue-router";

    export default {
        name: "Register",
        setup() {
            const regBtn = ref(true);
            const router = useRouter();

            const user = reactive({
                userName : "",
                userEmail : "",
                userPassword : ""
            })

           const handleRegister = async () => {
                regBtn.value = false;
                try {

                    const res = await firebaseAuth.createUserWithEmailAndPassword(user.userEmail,user.userPassword);

                    await db.collection("users").doc(res.user.uid).set({
                        name : user.userName,
                        email : user.userEmail,
                        createdAt : Date.now()
                    })

                    // if register success
                    if (res.user.uid) {
                        regBtn.value = true
                        await router.push({ name : 'Home' })
                    }

                } catch (e) {
                    console.log(e.message);
                    // toast start
                    if (e.message) {
                        regBtn.value = true;
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-right',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'error',
                            title: e.message
                        })
                    }
                    //toast end

                }
                console.log(res);
           }


        return { user, regBtn, handleRegister }

        }
    }
</script>

<style scoped>

</style>
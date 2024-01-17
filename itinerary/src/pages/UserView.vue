<template>
  <div>
    <h1>This is the user profile</h1>
    <p v-for="user in users" :key="user._id"> {{ user }}</p>
  </div>
</template>

<script>
// import { onMounted } from "vue";
// import { useRoute } from "vue-router";
import axios from "axios";

export default{
    data(){
        return{
            users: []
        }
    },
    mounted(){
        axios.get("/api/users")
        .then(response=> this.users = response.data)
    }
}


</script>

<style></style>

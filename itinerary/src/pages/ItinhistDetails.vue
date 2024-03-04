<template lang="">
    <div>
        <NavBar/>
        <h1>Itinerary History Details</h1>
        <p>{{history}}</p>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import { useRoute } from "vue-router";

export default {
    name: 'itinhistDetails',
    components:{
        NavBar
    },
    data(){
        return{
            history: []
        }
    },
    mounted(){
        const route = useRoute();
        axios.get("/api/history/"+route.params.id).then((response) => (this.history = response.data));
    }

}
</script>
<style lang="">
    
</style>
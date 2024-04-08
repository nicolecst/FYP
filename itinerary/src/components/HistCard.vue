<template>
  <div class="container">
        <div class="left">
          <div class="square"></div>  
        </div>
      
      <div class="right">
        <!-- <p>Username: {{ userName }}</p> -->
        <p>{{ id }}</p>
        <p style="font-family: BungeeInline; font-size: 20px">{{ name }}</p>
        <p><span style="font-size: 1rem"><font-awesome-icon :icon="['fas', 'circle-user']" /></span> Author: {{ author }}</p>
        <p><span style="font-size: 1rem"><font-awesome-icon :icon="['fas', 'people-robbery']" /></span> Type: {{ type }}</p>
        <p><span style="font-size: 1rem"><font-awesome-icon :icon="['fas', 'users']" /></span> Participants: {{ participants }}</p>
        <p><span style="font-size: 1rem"><font-awesome-icon :icon="['fas', 'calendar-days']" /></span> From {{ start }} to {{ end }}</p>
        <p>Ratings: <span v-for="n in rating" :key="n" style="margin-right:8px"><font-awesome-icon :icon="['fas', 'star']" /></span></p>
        <p>View: {{ view }}</p>
        <router-link :to="/history/+id"><button class="btn view-btn">View</button></router-link>

            <button
            v-if="userName === author"
              type="button"
              class="btn delete-btn "
              @click="deleteItin(id)"
            >Delete
            </button>

      </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "HistCard",
  props: {
    author: String,
    id: String,
    name: String,
    type: String,
    participants: Number,
    start: String,
    end: String,
    rating: Number,
    view: String,
  },
  emit:[
    "deleteItin"
  ],
  data(){
    return{
      userName: "",
      selectedId: null
    }
  },
  methods:{
    async deleteItin(id){
      console.log(id);
            try {
        const response = await axios.delete("/api/delItin/"+id);
        alert('Itinerary Deleted!')
        location.reload();
        return response.data;

      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted(){
    const un = localStorage.getItem("username")
    this.userName = un;
  },
};
</script>
<style scoped>
.container {
  width: 70%;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}
.square {
  background-color: burlywood;
  background-image: url("@/assets/Images/Temporary_img.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 250px;
  width: 250px;
  margin: 30px;
  border-radius: 10px;
}
.left{
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.right{
    flex: 0 0 70%;
}
.view-btn{
  background-color: #016a70;
  color: #fff;
  border-color: #016a70;
  margin-right: 10px;
}
.view-btn:hover{
  border-color: #FFDB64;
  background-color: #FFDB64;
  color: #a08843;
  border-color: #a08843;
}
.delete-btn{
  color: #016a70;
  border-color: #016a70;
  margin-right: 10px;
}
.delete-btn:hover{
  background-color: #FA7070;
  color: #fff;
  border-color: #FA7070;
}
</style>

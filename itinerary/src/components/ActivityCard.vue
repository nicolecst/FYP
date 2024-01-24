<template>
  <div class="page">
    <div class="row">
      <div class="col-md-6">
        <h3>All activities</h3>
      </div>
      <div class="col-md-6 right">
        <a href="">View all activities</a>
      </div>
      
    </div>
    <!-- <h3>{{ category }}</h3> -->
    <div class="scrolls">
      <div
        class="card"
        v-for="activity in approved().slice(0,10)"
        :key="activity._id"
        style="min-width: 18rem"
      >
        <img class="card-img-top" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ activity.Act_name }}</h5>
          <p class="card-text">Area: {{ activity.Area }}</p>
          <p class="card-text">District:{{ activity.District }}</p>
          <p class="card-text">Type: {{ activity.Type }}</p>
          <p class="card-text">Category: {{ activity.Category }}</p>
          <p class="card-text">Charge: {{ activity.Charge }}</p>
          <router-link :to="'/actDetails/'+ activity._id"><button class="btn btn-primary">Go somewhere</button></router-link>
        </div>
      </div>
    </div>

    <h3>Places to Relax</h3>
    <div class="scrolls">
      <div
        class="card"
        v-for="activity in actCat('Wellness and Retreats')"
        :key="activity._id"
        style="min-width: 18rem"
      >
        <img class="card-img-top" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ activity.Act_name }}</h5>
          <p class="card-text">Area: {{ activity.Area }}</p>
          <p class="card-text">District:{{ activity.District }}</p>
          <p class="card-text">Type: {{ activity.Type }}</p>
          <p class="card-text">Category: {{ activity.Category }}</p>
          <p class="card-text">Charge: {{ activity.Charge }}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="module">
import axios from "axios";

export default {
  name: "ActivityCard",
  components: {},
  props:{
    category: String,
  },
  methods:{
    actCat(cat){
        return this.activities.filter((a)=> a.Category === cat)
    },
    approved(){
      return this.activities.filter((a)=>a.Approved === 'true')
    }

  },
  data() {
    return {
      activities: [],
    };
  },
  async created() {
    const response = await axios
      .get("/api/")
      .then((response) => (this.activities = response.data));

    // const activities = response.data;
    // this.activities = activities;

    console.log(response);
    // location.assign('/')
  }, 
};
</script>

<style scoped>
a{
    color: #016a70;
}
h3{
  margin-left: 30px;
}

.page {
  margin: 10px;
  margin: auto;
  margin-top: 30px;
}
.card {
  border-radius: 10px;
  /* display: inline-block; */
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  transition: all .5s ease;
  /* height: 600px; */
}
.card:hover {
  box-shadow: 0 0 1em 1em #f4aab9;
  transform: translate3D(0,-1px,0) scale(1.03);
  transition: all .4s ease;

}
.right{
  text-align: right;
}

.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
</style>

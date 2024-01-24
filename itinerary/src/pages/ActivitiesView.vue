<template>
    <div>
      <NavBarVue />
      <div class="row" style="padding: 20px 20px 0px 20px">
        <div class="col-md-6">
          <h3>All activities</h3>
        </div>
        <!-- <div class="col-md-6" style="text-align: right">
          <a href="">view all</a>
        </div> -->
      </div>
  
      <div class="container">
        <CardViewVue
          v-for="activity in approved()"
          :key="activity._id"
          :actname="activity.Act_name"
          :area="activity.Area"
          :district="activity.District"
          :type="activity.Type"
          :category="activity.Category"
          :charge="activity.Charge"
          :act_ID="activity._id"
        />
      </div>
  
    </div>
  </template>
  
  <script type="module">
  import axios from "axios";
  import NavBarVue from "../components/NavBar.vue";
  import CardViewVue from "../components/CardView.vue";
  
  export default {
    name: "ActivitiesView",
    components: {
      NavBarVue,
      CardViewVue,
    },
    data() {
      return {
        activities: [],
      };
    },
    methods: {
      actCat(cat) {
        return this.activities.filter((a) => a.Category === cat);
      },
      approved() {
        return this.activities.filter((a) => a.Approved === "true");
      },
    },
    async created() {
      const response = await axios
        .get("/api/")
        .then((response) => (this.activities = response.data));
  
      // const activities = response.data;
      // this.activities = activities;
  
      console.log(response);
    },
  };
  </script>
  
  <style scoped>
  /* .scrolls {
    display: flex;
    flex-wrap: no-wrap;
    overflow-x: auto;
    margin: 20px;
  } */
  
  a{
      color: #016a70;
  }

  .container{
    display: flex;
    flex-wrap: wrap;
  }
  </style>
  
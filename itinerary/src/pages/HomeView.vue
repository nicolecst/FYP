<template>
  <div>
    <NavBarVue />
    <h3>All activities</h3>
    <div class="scrolls">
      <CardViewVue v-for="activity in approved().slice(0,10)"
        :key="activity._id" :actname=" activity.Act_name" :area="activity.Area" :district="activity.District" :type="activity.Type" :category = "activity.Category" :charge="activity.Charge" :act_ID="activity._id"/>
    </div>
    <h3>Wellness and Retreats</h3>
    <div class="scrolls">
      <CardViewVue v-for="activity in actCat('Wellness and Retreats')"
        :key="activity._id" :actname=" activity.Act_name" :area="activity.Area" :district="activity.District" :type="activity.Type" :category = "activity.Category" :charge="activity.Charge" :act_ID="activity._id"/>
    </div>
    
    <!-- <ActivityCardVue/> -->

  </div>
</template>

<script type="module">
import axios from "axios";
import NavBarVue from "../components/NavBar.vue";
// import ActivityCardVue from '../components/ActivityCard.vue';
import CardViewVue from '../components/CardView.vue';

export default {
  name: "HomeView",
  components: {
    NavBarVue,
    // ActivityCardVue,
    CardViewVue
  },
  data() {
    return {
      activities: [],
    };
  },
  methods:{
    actCat(cat){
        return this.activities.filter((a)=> a.Category === cat)
    },
    approved(){
      return this.activities.filter((a)=>a.Approved === 'true')
    }
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

<style>
.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}

</style>

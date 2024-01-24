<template>
  <div>
    <NavBarVue />
    <CardViewVue name="Nicole" />
    <ActivityCardVue/>

  </div>
</template>

<script type="module">
import NavBarVue from "../components/NavBar.vue";
import ActivityCardVue from '../components/ActivityCard.vue';
import CardViewVue from '../components/CardView.vue';

export default {
  name: "HomeView",
  components: {
    NavBarVue,
    ActivityCardVue,
    CardViewVue
  },
  data() {
    return {
      activities: [],
    };
  },
  async created() {

  },
};
</script>

<style>


</style>

<template>
  <div>
    <NavBar />
    <h1>Itinerary History Details</h1>
    <div class="scrolls">
      <PlanCard
        v-for="(n, i) in dateDiff"
        :key="n"
        :n="n"
        :start="addDays(this.history.from, i)"
        :daysOfWeek="weekdays(this.history.from, i)"
      >
        <SubplanCard v-for="(n, i) in itinArray[i]" :key="i">
          {{ n }}
        </SubplanCard>
      </PlanCard>
    </div>

    <div v-for="n in 5" :key="n">
      <div v-if="n === 2">
        {{ n }}
      </div>
    </div>

    <div v-for="(n, i) in itinArray[0]" :key="i">
      {{ n }}
    </div>

    <!-- <p v-for="(itin, i) in this.history.dailyItin" :key="i">
      {{ itin }}
    </p> -->
    <!-- <p>{{ history }}</p> -->
    <p>dateDiff: {{ dateDiff }}</p>
    <p></p>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import PlanCard from "@/components/PlanCard.vue";
import SubplanCard from "@/components/SubplanCard.vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "itinhistDetails",
  components: {
    NavBar,
    PlanCard,
    SubplanCard,
  },
  data() {
    return {
      history: [],
      dateDiff: 0,
      itinArray: [],
    };
  },
  methods: {
    addDays(date, days) {
      // Function to add Days
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleString();
    },
    weekdays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleString("en-US", { weekday: "long" });
    },
  },
  //   computed: {
  //     dateDiff() {
  //       let day = new Date(this.history.to).getTime() - new Date(this.history.from).getTime();
  //       let diff = Math.floor(day / 86400000) + 1;
  //       return diff;
  //     },
  //   },
  mounted() {
    const fetchData = async () => {
      const route = useRoute();
      const response = await axios
        .get("/api/history/" + route.params.id)
        .then((response) => (this.history = response.data));

      // Calculate dateDiff based on the first and last items from the history array
      const start = new Date(this.history.from).getTime();
      const end = new Date(this.history.to).getTime();
      const diff = end - start;
      const dateDiff = Math.floor(diff / 86400000) + 1;
      this.dateDiff = dateDiff;
      console.log(response);
      console.log("length: " + this.history.dailyItin.length);
      console.log(this.history.dailyItin[2]);

      this.itinArray = this.history.dailyItin;
      console.log("length2: " + this.itinArray.length);
      console.log(this.history.dailyItin[0]);
    };
    fetchData();

    //   const fromDate = new Date(this.history.from);
    //   const toDate = new Date(this.history.to);
    //   const dayDiff = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) + 1;
    //   this.dateDiff = dayDiff;
  },
};
</script>
<style scoped>
.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
</style>

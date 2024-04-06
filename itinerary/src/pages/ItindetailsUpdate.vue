<template>
  <div>
    <NavBar />
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href="/history">Itinerary History</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Details
          </li>
        </ol>
      </nav>
    

    <form action="">
      <div class="row mt-4">
        <div class="col md-4">
          <label for="">Itinerary Name</label>
          <input type="text" class="form-control" v-model="this.history.name" disabled/>
        </div>
        <div class="col md-4">
          <label for="">Participants</label>
          <input
            type="number"
            class="form-control"
            v-model="this.history.participants"
          />
        </div>
        <div class="col md-4">
          <label for="">Participants</label>
          <select name="" id="" class="form-control" v-model="this.history.type">
            <option disabled>Choose the trip type..</option>
            <option>Solo</option>
            <option>Couple</option>
            <option>Friends</option>
            <option>Family</option>
          </select>
        </div>
      </div>
    </form>

    <div class="scrolls">
      <PlanCard
        v-for="(n, i) in dateDiff"
        :key="n"
        :n="n"
        :start="addDays(this.history.from, i)"
        :daysOfWeek="weekdays(this.history.from, i)"
      >
        <div v-for="(row, rowIndex) in itinArray[i]" :key="rowIndex">
          <div v-for="(element, columnIndex) in row" :key="columnIndex">
            <SubplanCard
              :actName="element.act_name"
              :location="element.location"
              :sTime="element.startTime"
              :eTime="element.endTime"
              :memo="element.memo"
            >
            </SubplanCard>
          </div>
        </div>
      </PlanCard>
    </div>
    <div class="button-row">
      <div><button class="btn btn-primary" style="margin: 10px;">Update</button></div>
      <div><button class="btn btn-primary" style="margin: 10px;">Cancel</button></div>
    </div>
    
  </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PlanCard from "@/components/PlanCard.vue";
import SubplanCard from "@/components/SubplanCard.vue";
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  name: "itindetailsUpdate",
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
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}
.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
.button-row{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

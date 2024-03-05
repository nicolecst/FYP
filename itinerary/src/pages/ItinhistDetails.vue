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
        <div v-for="(row, rowIndex) in itinArray[i]" :key="rowIndex">
          <div v-for="(element, columnIndex) in row" :key="columnIndex">
            <SubplanCard :actName="element.act_name" :memo="element.memo">
            </SubplanCard>
          </div>
        </div>
      </PlanCard>
    </div>

    <div>
      <button
        class="btn create-btn"
        @click.prevent="() => togglePopup('buttonTrigger')"
      >
        <span style="font-size: 1.5em; margin-right: 5px">
          <font-awesome-icon icon="fa-solid fa-calendar-plus" /> </span
        >Rate
      </button>
    </div>

    <PopupRateVue
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')"
    />

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
import PopupRateVue from "@/components/PopupRate.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "vue";

export default {
  name: "itinhistDetails",
  components: {
    NavBar,
    PlanCard,
    SubplanCard,
    PopupRateVue,
  },
  data() {
    return {
      history: [],
      dateDiff: 0,
      itinArray: [],
      itinSubArray: [],
      dailyItin: [
        [
          { itin: { name: 1 } },
          { itin: { name: 1.1 } },
          { itin: { name: 1.2 } },
        ],
        [{ itin: { name: 2 } }],
        [{ itin: { name: 3 } }],
      ],
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
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      popupTriggers,
      togglePopup,
    };
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

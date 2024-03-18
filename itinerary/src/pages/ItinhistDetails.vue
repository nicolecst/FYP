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
            <SubplanCard :actName="element.act_name" :location="element.location" :sTime="element.startTime" :eTime="element.endTime" :memo="element.memo">
            </SubplanCard>
          </div>
        </div>
      </PlanCard>
    </div>

    <div class="rate-container">
        <button
          class="btn rate-btn"
          @click.prevent="() => togglePopup('buttonTrigger')"
        >
          <span style="font-size: 1.5em; margin-right: 5px">
            <font-awesome-icon :icon="['fas', 'star']" /> </span
          >Rate
        </button>
      <div class="row mt-4">
        <div>
          <p
            v-for="n in this.history.rate"
            :key="n"
            style="display: inline; margin: 5px"
          >
            <font-awesome-icon :icon="['fas', 'star']" />
          </p>
        </div>
      </div>

      <div class="row mt-4">
        <p>
          <span style="margin: 5px"
            ><font-awesome-icon :icon="['fas', 'comment-dots']" /></span
          >{{ this.history.comment }}
        </p>
      </div>
    </div>

    <PopupRateVue
      v-if="popupTriggers.buttonTrigger"
      :togglePopup="() => togglePopup('buttonTrigger')"
      v-model:rate="rate"
      v-model:comment="comment"
      @rate="Rate(this.history._id)"
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
    async Rate(iid) {
      const rateData = {
        author: this.history.author,
        name: this.history.name,
        type: this.history.type,
        participants: this.history.participants,
        from: this.history.from,
        to: this.history.to,
        dailyItin: this.dailyItin,
        is_public: this.history.is_public,
        rate: parseInt(this.rate),
        comment: this.comment,
      };

      await axios.put("/api/rate/" + iid, rateData).then((response) => {
        console.log(response.data);
        alert("Successfully updated!");
      });
      console.log(rateData);
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
  setup() {
    const rate = ref();
    const comment = ref("");

    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      popupTriggers,
      togglePopup,
      rate,
      comment,
    };
  },
};
</script>
<style scoped>
.rate-btn {
  border-color: #016a70;
  color: #016a70;
}
.rate-btn :hover {
  border-color: #016a70;
  background-color: #016a70;
  color: #ffffdd;
}
.rate-container {
  margin: 30px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 10px;
}
.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
</style>

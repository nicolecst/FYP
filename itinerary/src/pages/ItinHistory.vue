<template lang="">
  <div class="outer-container">
    <NavBar />
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Itinerary History
          </li>
        </ol>
      </nav>
      <div class="sub-container">
        <h1 style="font-family: BungeeInline">Check your planned trips!</h1>
        <div class="row mt-4 searchBar">
          <input
            type="text"
            name=""
            id=""
            class="form-control"
            v-model="searchParam"
            placeholder="search by itinerary name.."
          />
        </div>
        <div class="row mt-4">
          <button class="btn sort-btn" @click="sortingButton">
            <span v-if="this.ascendingOrder === true"
              ><font-awesome-icon :icon="['fas', 'arrow-down-a-z']"
            /></span>
            <span v-if="this.ascendingOrder === false"
              ><font-awesome-icon :icon="['fas', 'arrow-up-z-a']"
            /></span>
            {{ sortButtonContent }}
          </button>
        </div>

        <!-- <p>{{ plans }}</p> -->
        <HistCard
          v-for="plan in sortedPlans"
          :key="plan._id"
          :id="plan._id"
          :author="plan.authorName"
          :name="plan.name"
          :type="plan.type"
          :participants="plan.participants"
          :start="plan.from"
          :end="plan.to"
          :rating="plan.selectedRate"
          :view="plan.is_public"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import HistCard from "@/components/HistCard.vue";
import axios from "axios";
import sortBy from "lodash/sortBy";

export default {
  name: "ItinHistory",
  components: {
    NavBar,
    HistCard,
  },
  data() {
    return {
      plans: [],
      ascendingOrder: false,
      sortButtonContent: "View in descending order",
      searchParam: "",
    };
  },
  async created() {
    const i = localStorage.getItem("userID");
    console.log(i);

    const response = axios
      .get("/api/itinHistory/" + i)
      .then((response) => (this.plans = response.data));

    console.log(response);
  },
  methods: {
    sortingButton() {
      this.ascendingOrder = !this.ascendingOrder;
      this.sortButtonContent = this.ascendingOrder
        ? "View in ascending order"
        : "View in descending order";
    },
  },
  computed: {
    sortedPlans: function () {
      const sorted = sortBy(this.plans, "createdAt");
      const filtered = this.plans.filter((p) =>
        p.name.toLowerCase().match(this.searchParam.toLowerCase())
      );
      return this.ascendingOrder
        ? sorted.filter((p) => filtered.includes(p))
        : sorted.reverse().filter((p) => filtered.includes(p));
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.sub-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #dcf2ec;
  padding: 30px;
}
.sort-btn {
  background-color: #016a70;
  color: #fff;
}
.sort-btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.searchBar {
  width: 70%;
}
</style>

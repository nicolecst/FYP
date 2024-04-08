<template lang="">
  <div>
    <NavBar />
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Itinerary References
          </li>
        </ol>
      </nav>
      <div class="sub-container">
        <h1 style="font-family: BungeeInline">Itinerary References</h1>

        <div class="row mt-4">
          <button class="btn filter-btn" @click="filterShow = !filterShow"><span><font-awesome-icon :icon="['fas', 'filter']" /></span> Filter</button>
          <div class="row" v-if="filterShow">
            <div class="filter-form">
              <div class="checkboxType">
                <div><h4 style="font-family: BungeeInline">Type</h4></div>
                <div><input
                  type="checkbox"
                  id="solo"
                  value="Solo"
                  v-model="checkedType"
                />
                <label for="solo">Solo</label></div>
                
                <div><input
                  type="checkbox"
                  id="couple"
                  value="Couple"
                  v-model="checkedType"
                />
                <label for="couple">Couple</label></div>
                
                <div><input
                  type="checkbox"
                  id="family"
                  value="Family"
                  v-model="checkedType"
                />
                <label for="family">Family</label></div>
                
                <div><input
                  type="checkbox"
                  id="friends"
                  value="Friends"
                  v-model="checkedType"
                />
                <label for="friends">Friends</label></div>
                <!-- <p>{{checkedType}}</p> -->
                
              </div>
            </div>
          </div>
        </div>

        <HistCard
          v-for="plan in filteredPlans"
          :key="plan._id"
          :author="plan.authorName"
          :id="plan._id"
          :name="plan.name"
          :type="plan.type"
          :participants="plan.participants"
          :start="plan.from"
          :end="plan.to"
          :rating="plan.rate"
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
import { ref } from 'vue';

export default {
  name: "AllHistory",
  components: {
    NavBar,
    HistCard,
  },
  data() {
    return {
      plans: [],
    };
  },
  async created() {
    const i = localStorage.getItem("userID");
    console.log(i);

    const response = axios
      .get("/api/itinHistory")
      .then(
        (response) =>
          (this.plans = response.data.filter((a) => a.is_public === true))
      );

    console.log(response);
  },
  computed:{
    filteredPlans() {
    if (this.checkedType.length === 0) {
      return this.plans; // No types selected, return all plans
    } else {
      return this.plans.filter((p) => this.checkedType.includes(p.type));
    }
  }
  },
  setup(){
    const filterShow = ref(false);
    const checkedType = ref([]);

    return{
      filterShow,
      checkedType
    }
  }
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
  background-color: #ffefbb;
  width: 100%;
  padding: 30px;
}
.filter-form {
  background-color: #fff;
  position: absolute;
  height: 180px;
  width: 150px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0.3em 0.3em 1em #d3d3d3;;
}
.checkboxType{
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  font-size: 18px;
  padding: 10px;
}
.filter-btn{
  background-color: #016a70;
  color: #fff;
}
.filter-btn:hover{
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
</style>

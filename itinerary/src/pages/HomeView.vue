<template>
  <div>
    <NavBarVue />

    <div class="welcomeMsg">
      <h1>Welcome {{ user.username }}!</h1>
      <form class="d-flex align-items-center flex-nowrap search-form">
        <input
          type="text"
          class="form-control input-lg"
          placeholder="search by activity name.."
          v-model="searchParam"
          style="min-width: 80vw; margin-bottom: 50px;"
        />
        <!-- <button class="btn btn-outline-success">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </button> -->
      </form>
      <p>{{ searchParam }}</p>
      <button class="btn create-btn" @click="create()">
          <span style="font-size: 1.5em">
            <font-awesome-icon icon="fa-solid fa-calendar-plus" style="margin-right: 8px;"/> </span
          >Create Itinerary!
        </button>
    </div>

    <!-- <div class="welcomMsg">
      <div class="search-container">
        <div class="search-inner-container">
          <div class="row mt-2 justify-content-center align-items-center">
            <div class="col-md-6">
              <h1>Welcome {{ user.username }}!</h1>
              <form class="d-flex align-items-center flex-nowrap search-form">
                <input
                  type="text"
                  class="form-control form-input"
                  placeholder="search by activity name.."
                  v-model="searchParam"
                />
                <button class="btn btn-outline-success">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
              </button>
              </form>
            </div>
          </div>
          <p>{{ searchParam }}</p>
        </div>
      </div>
    </div> -->
    <div class="row" style="padding: 20px 20px 0px 20px">
      <div class="col-md-6">
        <h3>Activities <span v-if="searchParam!=''">(Search Results)</span> </h3>
      </div>
      <div class="col-md-6" style="text-align: right">
        <a href="/activities">view all</a>
      </div>
    </div>

    <div class="scrolls">
      <CardViewVue
        v-for="activity in filteredAct.slice(0, 10)"
        :key="activity._id"
        :actname="activity.Act_name"
        :area="activity.Area"
        :district="activity.District"
        :type="activity.Type"
        :category="activity.Category"
        :charge="activity.Charge"
        :act_ID="activity._id"
        :img="activity.Image"
      />
    </div>

    <h3>{{ user.preference1 }}</h3>
    <div class="scrolls">
      <CardViewVue
        v-for="activity in actCat(user.preference1)"
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
    <h3>{{ user.preference2 }}</h3>
    <div class="scrolls">
      <CardViewVue
        v-for="activity in actCat(user.preference2)"
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
    <h3>{{ user.preference3 }}</h3>
    <div class="scrolls">
      <CardViewVue
        v-for="activity in actCat(user.preference3)"
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
  name: "HomeView",
  components: {
    NavBarVue,
    CardViewVue,
  },
  data() {
    return {
      activities: [],
      user: {},
      searchParam: '',
    };
  },
  methods: {
    actCat(cat) {
      return this.activities.filter((a) => a.Category === cat);
    },
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
    create() {
      this.$router.push("/create");
    },
    // filterAct(param){
    //   return this.activities.filter((a)=> a.Act_name === param && a.Approved === true)
    // }
  },
  async created() {
    const response = await axios
      .get("/api/")
      .then((response) => (this.activities = response.data));

    // const activities = response.data;
    // this.activities = activities;

    console.log(response);
  },
  mounted() {
    const i = localStorage.getItem("userID");
    console.log(i);
    axios
      .get("/api/users/" + i)
      .then((response) => (this.user = response.data));
  },
  computed: {
    filteredAct: function () {
      return this.activities.filter((a) => a.Act_name.toLowerCase().match(this.searchParam.toLowerCase()) && a.Approved === true);
    }

  },
};
</script>

<style scoped>
a {
  color: #016a70;
}
.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}
.welcomeMsg {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 50px;
  background-color: #0c3b2e;
  color: #fff;
  min-height: 50vh;
}

.search-container {
  /* background-image: url("@/assets/Images/hong-kong-mountain-top-view.jpg");
  background-position: center center;
  background-size: cover; */
  background-color: #0c3b2e;
  padding: 200px;
  justify-content: center;
  align-items: center;
}

.search-container::before {
  background-color: rgba(0, 0, 0, 0.25);
}

.search-inner-container {
  background: white;
  padding: 30px;
  border-radius: 20px;
}

.create-btn {
  border-color: #fff;
  color: #fff;
}
.create-btn:hover {
  border-color: #6d9773;
  background-color: #6d9773;
  color: #ffffdd;
}
</style>

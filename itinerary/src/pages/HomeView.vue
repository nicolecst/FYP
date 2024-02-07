<template>
  <div>
    <NavBarVue />
    <div class="welcomeMsg">
      <div>
        <h1 style="display: block">Welcome {{ user.username }}!</h1>
      </div>
      <div>
        <button class="btn create-btn" @click="create()"><span style="font-size: 1.5em">
            <font-awesome-icon icon="fa-solid fa-calendar-plus" />
            </span>Create Itinerary</button>
      </div>
    </div>

    <div class="row" style="padding: 20px 20px 0px 20px">
      <div class="col-md-6">
        <h3>All activities</h3>
      </div>
      <div class="col-md-6" style="text-align: right">
        <a href="/activities">view all</a>
      </div>
    </div>

    <div class="scrolls">
      <CardViewVue
        v-for="activity in approved().slice(0, 10)"
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
    };
  },
  methods: {
    actCat(cat) {
      return this.activities.filter((a) => a.Category === cat);
    },
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
    create(){
      this.$router.push('/create')
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
  mounted() {
    const i = localStorage.getItem("userID");
    console.log(i);
    axios
      .get("/api/users/" + i)
      .then((response) => (this.user = response.data));
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
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

.create-btn{
  border-color: #016a70;
  color: #016a70;
}
.create-btn:hover{
  border-color: #016a70;
  background-color: #016a70;
  color: #ffffdd;
}
</style>

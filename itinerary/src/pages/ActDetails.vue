<template>
  <div>
    <NavBar />
    <div class="shape">
      <img
        class="shape"
        src="@/assets/Images/hong-kong-mountain-top-view.jpg"
        alt=""
      />
      <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,64L48,69.3C96,75,192,85,288,106.7C384,128,480,160,576,186.7C672,213,768,235,864,245.3C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>

    <div class="text-container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a v-if="user.is_Admin===false" href="/">Home</a>
              <a v-if="user.is_Admin===true" href="/admin">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Activtiy Details</li>
          </ol>
        </nav>
        <h1 style="font-family: BungeeInline">{{ activity.Act_name }}</h1>
        <p>{{ activity.Act_ID }}</p>
        <p><span style="margin: 5px"><font-awesome-icon icon="fa-solid fa-location-dot" /></span>{{ activity.Location }}</p>
        
        <ColorTags v-if="activity.Area =='Hong Kong Island'" :text="activity.Area" color="#D2E9E9"/>
        <ColorTags v-if="activity.Area =='Hong Kong Island'" :text="activity.District" color="#D2E9E9"/>

        <div class="type">
          <span style="margin: 5px"><font-awesome-icon :icon="['fas', 'users']" /></span>
          <template v-for="t in activity.Type" :key="t">
            <ColorTags v-if="t == 'Couple'" :text="t" color="#FDCEDF" style="margin-right: 10px"/>
            <ColorTags v-if="t == 'Solo'" :text="t" color="#FFBE98" style="margin-right: 10px"/>
            <ColorTags v-if="t == 'Family'" :text="t" color="#F5E8DD" style="margin-right: 10px"/>
            <ColorTags v-if="t == 'Friends'" :text="t" color="#E3F4F4" style="margin-right: 10px"/>
          </template>
        </div>
        
        <p><span style="margin: 5px"><font-awesome-icon :icon="['fas', 'layer-group']" /></span>{{ activity.Category }}</p>
        <p><span style="margin: 5px"><font-awesome-icon :icon="['fas', 'sack-dollar']" /></span>{{ activity.Charge }}</p>
        <p><span style="margin: 5px"><font-awesome-icon :icon="['fas', 'comments']" /></span>{{ activity.Description }}</p>
        <a :href="activity.Info" target="_blank"><span style="margin: 5px"><font-awesome-icon :icon="['fas', 'circle-info']" /></span>{{ activity.Info }}</a>
        <p v-if="activity.Approved === true">Approved</p>
        <p v-if="activity.Approved === false">Not approved</p>
        <a :href="'/actEdit/' + activity._id">
          <button v-if="user.is_Admin == true" class="btn edit-btn">
            Edit
          </button>
        </a>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import ColorTags from "@/components/ColorTags.vue";
import { useRoute } from "vue-router";

export default {
  name: "ActDetails",
  components: {
    NavBar,
    ColorTags,
  },
  data() {
    return {
      activity: {},
      user: {},
    };
  },
  mounted() {
    const route = useRoute();
    axios
      .get("/api/activities/" + route.params.id)
      .then((response) => (this.activity = response.data));

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

.text-container{
  width: 70%;
  margin: auto;
}

.shape {
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-size: 200px 200px; */
  /* border-radius: 80% 20% 32% 68% / 58% 22% 78% 42%; */
  height: 30rem;
  width: 100%;
  position: relative;
  background-color: #fff;
  border-color: #fff;
  /* background-image: url("@/assets/Images/hong-kong-mountain-top-view.jpg");
  background-size: cover; */
  background-position: center center;
}

.svg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.type{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.edit-btn{
  margin: 10px;
  background-color: #016a70;
  color: #fff;
}
.edit-btn:hover{
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
</style>

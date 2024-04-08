<template>
  <div class="card" style="min-width: 18rem; max-width: 18rem">
    <img
      class="card-img-top"
      src="@/assets/uploads/victoria_peak.jpg"
      alt="Card image cap"
    />
    <!-- <img class="card-img-top" :src="`http://localhost:3000/${img}`" alt="Card image cap" /> -->
    <!-- <img class="card-img-top" src="" alt="Card image cap" /> -->
    <div class="card-body">
      <div class="card-body">
        <h5 class="card-title">{{ actname }}</h5>
        <!-- <p class="card-text">img: {{ img }}</p> -->
        <p class="card-text"><ColorTags color="#D2E9E9" :text="area" /></p>
        <p class="card-text"><ColorTags color="#D2E9E9" :text="district" /></p>
        <slot name="type"></slot>
        <p class="card-text"><span style="margin-right: 5px"><font-awesome-icon :icon="['fas', 'icons']" /></span>{{ category }}</p>
        <p class="card-text"><span style="margin-right: 5px"><font-awesome-icon :icon="['fas', 'sack-dollar']" /></span>{{ charge }}</p>
        <!-- <p class="card-text">Approved: {{ approved }}</p> -->
        <p class="card-text">ID: {{ act_ID }}</p>
        <router-link :to="'/actDetails/' + act_ID"
          ><button class="btn btn-primary">check</button></router-link
        >

        <!-- button trigger modal -->
        <button
          v-if="showButton"
          type="button"
          class="btn delete-btn"
          @click="deleteAct(act_ID)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ColorTags from "./ColorTags.vue";
export default {
  name: "CardView",
  components: {
    ColorTags,
  },
  props: {
    actname: String,
    area: String,
    district: String,
    type: String,
    category: String,
    charge: String,
    act_ID: String,
    img: String,
    approved: Boolean,
    showButton: String,
  },
  methods: {
    async deleteAct(aid) {
      console.log("aid: " + aid);
      try {
        const response = await axios.delete("/api/deletAct/" + aid);
        alert("Activity Deleted!");
        location.reload();
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.card-title{
  font-family: BungeeInline;
}
.card {
  margin: 10px;
  height: auto;
}
.btn {
  background-color: #1fbfaf;
  color: #fff;
  border-color: #1fbfaf;
  margin-right: 10px;
}
.btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.delete-btn {
  background-color: #fff;
  color: #1fbfaf;
  border-color: #1fbfaf;
}
.delete-btn:hover {
  background-color: #fa7070;
  color: #fff;
  border-color: #fa7070;
}

.cancel-button {
  background-color: #fff;
  color: #1fbfaf;
  border-color: #1fbfaf;
}
.modalDelete-btn:hover {
  background-color: #fa7070;
  color: #fff;
  border-color: #fa7070;
}
</style>

<template>
  <div class="popup">
    <div class="popup-inner">
        <div class="popup-header">
            <h2 style="font-family: BungeeInline;">Browse</h2>
            <button class="popup-close" @click="toggleActPopup()">
            <span style="font-size: 1.5rem"
              ><font-awesome-icon icon="fa-solid fa-circle-xmark"
            /></span>
          </button>

          
        </div>

      <div class="activity-card">
        <ActCard
          v-for="act in activities"
          :key="act"
          :actname="act.Act_name"
          :location="act.Location"
          :area="act.Area"
          :category="act.Category"
        >
          <button class="btn add-btn" @click.prevent="$emit('add', act)">Add</button>
        </ActCard>
        <!-- <div>
          <p v-for="act in activities" :key="act">{{ act }}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import ActCard from "./ActCard.vue";
import axios from "axios";

export default {
  name: "PopupAct",
  props: ["toggleActPopup"],
  data() {
    return {
      activities: [],
    };
  },
  components: {
    ActCard,
  },
  methods: {
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
  },
  async created() {
    const response = await axios
      .get("/api/")
      .then((response) => (this.activities = response.data.filter((a) => a.Approved === true)));

    console.log(response);
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.popup-inner {
  background-color: #fff;
  padding: 30px;
  padding-top: 0;
  border-radius: 10px;
  width: 50%;
  height: 50vh;
  overflow: scroll;
}
.popup-close {
  background-color: #fff;
  border: none;
}

.popup-header {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: fixed;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 48%;
  height: 90px;

}
.add-btn {
  border-radius: 5px;
  background-color: #016a70;
  color: #fff;
}
.add-btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.activity-card {
  margin-top: 90px;
}
</style>

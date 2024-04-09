<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="popup-header">
        <h2 style="font-family: BungeeInline">Browse</h2>
        <button class="popup-close" @click="toggleActPopup()">
          <span style="font-size: 1.5rem"
            ><font-awesome-icon icon="fa-solid fa-circle-xmark"
          /></span>
        </button>

        <button class="btn filter-btn" @click="filterShow = !filterShow">
          <span><font-awesome-icon :icon="['fas', 'filter']" /></span>
        </button>
        <div class="filter-form" v-if="filterShow">
          <table>
            <tr>
              <th><h4 style="font-family: BungeeInline">Type</h4></th>
              <th><h4 style="font-family: BungeeInline">Area</h4></th>
            </tr>

            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="NaturalAttractions"
                    value="Natural Attractions"
                    v-model="checkedCat"
                  />
                  <label for="NaturalAttractions">Natural Attractions</label>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="HongKong"
                    value="Hong Kong Island"
                    v-model="checkedCat"
                  />
                  <label for="HongKong">Hong Kong Island</label>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="UrbanAttractions"
                    value="Urban Attractions"
                    v-model="checkedCat"
                  />
                  <label for="UrbanAttractions">Urban Attractions</label>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="KowloonArea"
                    value="Kowloon Area"
                    v-model="checkedCat"
                  />
                  <label for="KowloonArea">Kowloon Area</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="AdventureandOutdoor"
                    value="Adventure and Outdoor"
                    v-model="checkedCat"
                  />
                  <label for="AdventureandOutdoor">Adventure and Outdoor</label>
                </div>
              </td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="NewTerritories"
                    value="New Territories"
                    v-model="checkedCat"
                  />
                  <label for="NewTerritories">New Territories</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="CulinaryandFood"
                    value="Culinary and Food"
                    v-model="checkedCat"
                  />
                  <label for="CulinaryandFood">Culinary and Food</label>
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="WellnessandRetreats"
                    value="Wellness and Retreats"
                    v-model="checkedCat"
                  />
                  <label for="WellnessandRetreats">Wellness and Retreats</label>
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="ThemePark"
                    value="Theme Park"
                    v-model="checkedCat"
                  />
                  <label for="ThemePark">Theme Park</label>
                </div>
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="EntertainmentComplexes"
                    value="Entertainment Complexes"
                    v-model="checkedCat"
                  />
                  <label for="EntertainmentComplexes"
                    >Entertainment Complexes</label
                  >
                </div>
              </td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div>
                  <input
                    type="checkbox"
                    id="Shopping"
                    value="Shopping"
                    v-model="checkedCat"
                  />
                  <label for="Shopping">Shopping</label>
                </div>
              </td>
              <td></td>
            </tr>
          </table>
          <div class="checkboxType">
          </div>
        </div>
      </div>

      <div class="activity-card">
        <ActCard
          v-for="act in filteredAct"
          :key="act"
          :actname="act.Act_name"
          :location="act.Location"
          :area="act.Area"
          :category="act.Category"
        >
          <button class="btn add-btn" @click.prevent="$emit('add', act)">
            Add
          </button>
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
import { ref } from "vue";

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
      .then(
        (response) =>
          (this.activities = response.data.filter((a) => a.Approved === true))
      );

    console.log(response);
  },
  computed: {
    filteredAct() {
      if (this.checkedCat.length === 0) {
        return this.activities; // No types selected, return all plans
      } else {
        return this.activities.filter((p) => this.checkedCat.includes(p.Category) || this.checkedCat.includes(p.Area));
      }
    },
  },
  setup() {
    const filterShow = ref(false);
    const checkedCat = ref([]);

    return {
      filterShow,
      checkedCat
    };
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
.filter-btn {
  margin: 10px;
  background-color: #016a70;
  color: #fff;
}
.filter-btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.filter-form {
  background-color: #fff;
  position: absolute;
  top: 10px;
  left: 70%;
  height: 260px;
  width: 400px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0.3em 0.3em 1em #d3d3d3;
  padding: 10px;
}
th,
td {
  padding-right: 5px;
}
</style>

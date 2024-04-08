<template>
  <div>
    <NavBarVue />
    <div class="outer-container">
      <div class="welcomeMsg">
      <form class="search-form">
        <input
          type="text"
          class="form-control input-lg search-input"
          placeholder="search by activity name.."
          v-model="searchParam"
        />
      </form>
      <button class="btn filter-btn" @click="filterShow = !filterShow"><span><font-awesome-icon :icon="['fas', 'filter']" /></span>Filter</button>
      <div class="filter-form" v-if="filterShow">
              <div class="checkboxType">
                <div><h4 style="font-family: BungeeInline">Type</h4></div>
                <div><input
                  type="checkbox"
                  id="NaturalAttractions"
                  value="Natural Attractions"
                  v-model="checkedCat"
                />
                <label for="NaturalAttractions">Natural Attractions</label></div>

                <div><input
                  type="checkbox"
                  id="UrbanAttractions"
                  value="Urban Attractions"
                  v-model="checkedCat"
                />
                <label for="UrbanAttractions">Urban Attractions</label></div>

                <div><input
                  type="checkbox"
                  id="AdventureandOutdoor"
                  value="Adventure and Outdoor"
                  v-model="checkedCat"
                />
                <label for="AdventureandOutdoor">Adventure and Outdoor</label></div>

                <div><input
                  type="checkbox"
                  id="CulinaryandFood"
                  value="Culinary and Food"
                  v-model="checkedCat"
                />
                <label for="CulinaryandFood">Culinary and Food</label></div>
                
                <div><input
                  type="checkbox"
                  id="WellnessandRetreats"
                  value="Wellness and Retreats"
                  v-model="checkedCat"
                />
                <label for="WellnessandRetreats">Wellness and Retreats</label></div>

                <div><input
                  type="checkbox"
                  id="ThemePark"
                  value="Theme Park"
                  v-model="checkedCat"
                />
                <label for="ThemePark">Theme Park</label></div>

                <div><input
                  type="checkbox"
                  id="EntertainmentComplexes"
                  value="Entertainment Complexes"
                  v-model="checkedCat"
                />
                <label for="EntertainmentComplexes">Entertainment Complexes</label></div>
                
                <div><input
                  type="checkbox"
                  id="Shopping"
                  value="Shopping"
                  v-model="checkedCat"
                />
                <label for="Shopping">Shopping</label></div>
                
              </div>
            </div>

    </div>
    <h1 v-if="searchParam!=''" style="font-family: BungeeInline">Search Results</h1>
    <div class="search-container">
      <div class="scrolls">
        <CardViewVue
          v-for="activity in searchAct"
          :key="activity._id"
          :actname="activity.Act_name"
          :area="activity.Area"
          :district="activity.District"
          :category="activity.Category"
          :charge="activity.Charge"
          :act_ID="activity._id"
          :approved="activity.Approved"
          :showButton="activity"
        >
        <template #type>
          <div style="margin-bottom: 8px">
            Type: <span v-for="t in activity.Type" :key="t">{{ t }}, </span>
          </div>
          <!-- <div><p>File:{{ activity.file.length }}</p></div> -->
        </template>
      </CardViewVue>
      </div>
    </div>

    <h1 v-if="this.checkedCat!=[]" style="font-family: BungeeInline">Filtered Results</h1>
    <div class="search-container">
      <div class="scrolls">
        <CardViewVue
          v-for="activity in filteredAct"
          :key="activity._id"
          :actname="activity.Act_name"
          :area="activity.Area"
          :district="activity.District"
          :category="activity.Category"
          :charge="activity.Charge"
          :act_ID="activity._id"
          :approved="activity.Approved"
          :showButton="activity"
        >
        <template #type>
          <div style="margin-bottom: 8px">
            Type: <span v-for="t in activity.Type" :key="t">{{ t }}, </span>
          </div>
          <!-- <div><p>File:{{ activity.file.length }}</p></div> -->
        </template>
      </CardViewVue>
      </div>
    </div>
    
    
    <h1 style="font-family: BungeeInline">Waiting for approval...</h1>
    <div class="container">
      <div class="scrolls">
        <CardViewVue
          v-for="activity in notApproved().slice(0, 10)"
          :key="activity._id"
          :actname="activity.Act_name"
          :area="activity.Area"
          :district="activity.District"
          :category="activity.Category"
          :charge="activity.Charge"
          :act_ID="activity._id"
          :approved="activity.Approved"
          :showButton="activity"
        >
        <template #type>
          <div style="margin-bottom: 8px">
            Type: <span v-for="t in activity.Type" :key="t">{{ t }}, </span>
          </div>
          <!-- <div><p>File:{{ activity.file.length }}</p></div> -->
        </template>
      </CardViewVue>
      </div>
    </div>
    <h1 style="font-family: BungeeInline">Approved activities</h1>
    <div class="container">
      <CardViewVue
        v-for="activity in approved()"
        :key="activity._id"
        :actname="activity.Act_name"
        :area="activity.Area"
        :district="activity.District"
        :category="activity.Category"
        :charge="activity.Charge"
        :act_ID="role === true"
      >
      <template #type>
          <div style="margin-bottom: 8px">
            Type: <span v-for="t in activity.Type" :key="t">{{ t }}, </span>
          </div>
        </template>
    </CardViewVue>
    </div>

    <!-- <p>{{ activities }}</p> -->
  </div>
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import CardViewVue from "@/components/CardView.vue";
import axios from "axios";
import { ref } from "vue";
export default {
  name: "AdminHome",
  components: {
    NavBarVue,
    CardViewVue,
  },
  data() {
    return {
      activities: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      searchParam:"",
    };
  },
  methods: {
    notApproved() {
      return this.activities.filter((a) => a.Approved === false);
    },
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
    fetchItems() {
      // Make an HTTP request to the Node.js API endpoint
      axios
        .get("/api/allAct", {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage,
          },
        })
        .then((response) => {
          // Ensure the response data structure matches your expectation
          const { activities, currentPage, totalPages } = response.data;

          // Assign the data to the component's properties
          this.activities = activities;
          this.currentPage = currentPage;
          this.totalPages = totalPages;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchItems();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchItems();
      }
    },
  },
  computed: {
    paginatedItems() {
      return this.activities.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    searchAct: function () {
      return this.activities.filter((a) => {
        if (
          this.searchParam !== null &&
          this.searchParam !== undefined &&
          this.searchParam !== ""
        ) {
          return (
            a.Act_name &&
            a.Act_name.toLowerCase().match(this.searchParam.toLowerCase())
          );
        }
      });
      // return this.activities.filter((a) => a.Act_name.toLowerCase().match(this.searchParam.toLowerCase()) && a.Approved === true);
    },
    filteredAct() {
    if (this.checkedCat.length === 0) {
      return this.activities; // No types selected, return all plans
    } else {
      return this.activities.filter((p) => this.checkedCat.includes(p.Category));
    }
  }
  },
  mounted() {
    this.fetchItems();

  },
  setup(){
    const role = localStorage.getItem("role");
    console.log(role);

    const checkedCat = ref([]);
    const filterShow = ref(false);

    return{
      filterShow,
      checkedCat
    }
  }
  // async created() {
  //   await axios
  //     .get("/api/")
  //     .then((response) => (this.activities = response.data));
  // },
};
</script>

<style scoped>
/* .outer-container{
  padding: 30px;
} */
.container {
  display: flex;
  flex-wrap: wrap;
}

.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}

.search-container{
  display: flex;
  flex-wrap: wrap;
}
.search-form{
  width: 50%;
}
.welcomeMsg{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1fbfaf;
}
.filter-form {
  background-color: #fff;
  position: relative;
  top: 50px;
  height: 250px;
  width: 230px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0.3em 0.3em 1em #d3d3d3;;
  padding: 10px;
}
.filter-btn{
  margin: 10px;
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

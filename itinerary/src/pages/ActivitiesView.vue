<template>
  <div>
    <NavBarVue />
    <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a v-if="this.role === 'false'" href="/">Home</a>
          <a v-if="this.role === 'true'" href="/admin">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Activtiy Details
        </li>
      </ol>
    </nav>

    <div class="header">
      <h3 style="margin: 0; font-family: BungeeInline">All activities</h3>
      <button class="btn filter-btn" @click="filterShow = !filterShow">
        <span><font-awesome-icon :icon="['fas', 'filter']" /></span>Filter
      </button>
      <div class="filter-form" v-if="filterShow">
        <div class="checkboxType">
          <div><h4 style="font-family: BungeeInline">Type</h4></div>
          <div>
            <input
              type="checkbox"
              id="NaturalAttractions"
              value="Natural Attractions"
              v-model="checkedCat"
            />
            <label for="NaturalAttractions">Natural Attractions</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="UrbanAttractions"
              value="Urban Attractions"
              v-model="checkedCat"
            />
            <label for="UrbanAttractions">Urban Attractions</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="AdventureandOutdoor"
              value="Adventure and Outdoor"
              v-model="checkedCat"
            />
            <label for="AdventureandOutdoor">Adventure and Outdoor</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="CulinaryandFood"
              value="Culinary and Food"
              v-model="checkedCat"
            />
            <label for="CulinaryandFood">Culinary and Food</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="WellnessandRetreats"
              value="Wellness and Retreats"
              v-model="checkedCat"
            />
            <label for="WellnessandRetreats">Wellness and Retreats</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="ThemePark"
              value="Theme Park"
              v-model="checkedCat"
            />
            <label for="ThemePark">Theme Park</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="EntertainmentComplexes"
              value="Entertainment Complexes"
              v-model="checkedCat"
            />
            <label for="EntertainmentComplexes">Entertainment Complexes</label>
          </div>

          <div>
            <input
              type="checkbox"
              id="Shopping"
              value="Shopping"
              v-model="checkedCat"
            />
            <label for="Shopping">Shopping</label>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-6" style="text-align: right">
          <a href="">view all</a>
        </div> -->
      <!-- <button><i class="fa-solid fa-filter fa-1x" style="margin-right:5px"></i>Filter</button> -->
    </div>

    <div class="container">
      <CardViewVue
        v-for="activity in filteredAndPaginatedItems"
        :key="activity._id"
        :actname="activity.Act_name"
        :area="activity.Area"
        :district="activity.District"
        :category="activity.Category"
        :charge="activity.Charge"
        :act_ID="activity._id"
      >
        <template #type>
          <div style="margin-bottom: 8px">
            Type: <span v-for="t in activity.Type" :key="t">{{ t }}, </span>
          </div>
        </template>
      </CardViewVue>
    </div>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button
        @click="pageNum(page)"
        class="pageNum"
        v-for="page in totalPages"
        :key="page"
        v-bind:style="{
          backgroundColor: page === currentPage ? '#016a70' : '#fff',
          color: page === currentPage ? '#fff' : '#016a70',
        }"
      >
        {{ page }}
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script type="module">
import axios from "axios";
import NavBarVue from "../components/NavBar.vue";
import CardViewVue from "../components/CardView.vue";
import { ref } from "vue";
export default {
  name: "ActivitiesView",
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
    };
  },
  methods: {
    actCat(cat) {
      return this.activities.filter((a) => a.Category === cat);
    },
    approved() {
      return this.activities.filter((a) => a.Approved === true);
    },
    pageNum(p) {
      this.currentPage = p;
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
          this.activities = activities.filter((a) => a.Approved === true);
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
  // async created() {
  //   const response = await axios
  //     .get("/api/allAct", {
  //         params: {
  //           page: this.currentPage,
  //           limit: this.itemsPerPage,
  //         },
  //       })
  //       .then((response) => {
  //         // Ensure the response data structure matches your expectation
  //         const { items, currentPage, totalPages } = response.data;

  //         // Assign the data to the component's properties
  //         this.items = items;
  //         this.currentPage = currentPage;
  //         this.totalPages = totalPages;
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });

  //   console.log(response);
  // },
  computed: {
    //   paginatedItems() {
    //     return this.activities.slice(
    //       (this.currentPage - 1) * this.itemsPerPage,
    //       this.currentPage * this.itemsPerPage
    //     );
    //   },
    //   filteredAct() {
    //   if (this.checkedCat.length === 0) {
    //     return this.activities; // No types selected, return all plans
    //   } else {
    //     return this.activities.filter((p) => this.checkedCat.includes(p.Category));
    //   }
    // },
    filteredAndPaginatedItems() {
      if (this.checkedCat.length === 0) {
        // No types selected, return all plans
        return this.activities.slice(
          (this.currentPage - 1) * this.itemsPerPage,
          this.currentPage * this.itemsPerPage
        );
      } else {
        return this.activities
          .filter((p) => this.checkedCat.includes(p.Category))
          .slice(
            (this.currentPage - 1) * this.itemsPerPage,
            this.currentPage * this.itemsPerPage
          );
      }
    },
  },
  mounted() {
    this.fetchItems();
  },
  setup() {
    const role = localStorage.getItem("role");
    const checkedCat = ref([]);
    const filterShow = ref(false);

    return {
      role,
      checkedCat,
      filterShow,
    };
  },
};
</script>

<style scoped>
/* .scrolls {
    display: flex;
    flex-wrap: no-wrap;
    overflow-x: auto;
    margin: 20px;
  } */

a {
  color: #016a70;
}

nav{
  padding-left: 100px;
  margin-top: 10px;
}

.container {
  display: flex;
  flex-wrap: wrap;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.header button {
  margin-left: 20px;
  color: #fff;
  background-color: #016a70;
  border-radius: 5px;
  border: none;
  padding: 5px;
}
.pagination {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 20px;
}
.pagination button {
  margin: auto;
  background-color: #016a70;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  border: none;
}
.pagination button:disabled {
  background-color: #8eb0b2;
}
.pageNum {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
}
.filter-form {
  background-color: #fff;
  position: absolute;
  top: 50px;
  right: 350px;
  height: 250px;
  width: 230px;
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0.3em 0.3em 1em #d3d3d3;
  padding: 10px;
}
</style>

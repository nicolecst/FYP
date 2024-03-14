<template>
  <div>
    <NavBarVue />

    <div class="header">
        <h3 style="margin:0">All activities</h3>
      <!-- <div class="col-md-6" style="text-align: right">
          <a href="">view all</a>
        </div> -->
        <button><i class="fa-solid fa-filter fa-1x" style="margin-right:5px"></i>Filter</button>
        
    </div>

    <div class="container">
      <CardViewVue
        v-for="activity in paginatedItems"
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
      <button @click="pageNum(page)"
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
    pageNum(p){
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
    paginatedItems() {
      return this.activities.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
  },
  mounted() {
    this.fetchItems();
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

.container {
  display: flex;
  flex-wrap: wrap;
}
.header{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.header button{
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
</style>

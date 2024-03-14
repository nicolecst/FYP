<template>
  <div>
    <NavBarVue />
    <h1>This is the admin home page</h1>
    <h1>Waiting for approval...</h1>
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
    <h1>Approved activities</h1>
    <div class="container">
      <CardViewVue
        v-for="activity in approved()"
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

    <!-- <p>{{ activities }}</p> -->
  </div>
</template>

<script>
import NavBarVue from "@/components/NavBar.vue";
import CardViewVue from "@/components/CardView.vue";
import axios from "axios";
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
  },
  mounted() {
    this.fetchItems();
  },
  // async created() {
  //   await axios
  //     .get("/api/")
  //     .then((response) => (this.activities = response.data));
  // },
};
</script>

<style scoped>
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
</style>

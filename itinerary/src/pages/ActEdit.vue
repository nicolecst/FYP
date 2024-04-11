<template>
  <div>
    <NavBar />
    <p>{{ activity._id }}</p>
    <div class="container">
      <form @submit.prevent="UpdateAct(activity._id)">
        <div class="row mt-4">
          <div class="col md-6 form-group">
            <label for="">Act_ID</label>
            <input
              type="text"
              class="form-control"
              v-model="activity.Act_ID"
              disabled
            />
          </div>
          <div class="col md-6 form-group">
            <label for="">Act_name</label>
            <input
              type="text"
              class="form-control"
              v-model="activity.Act_name"
            />
          </div>
        </div>

        <div class="row mt-4">
          <label for="">Location</label>
          <textarea
            type="text"
            class="form-control"
            v-model="activity.Location"
          ></textarea>
        </div>

        <div class="row mt-4">
          <div class="col-md-6 form-group">
            <label for="">Area</label>
            <select name="" id="" class="form-control" v-model="activity.Area">
              <option>Hong Kong Island</option>
              <option>Kowloon Area</option>
              <option>New Territories</option>
            </select>
          </div>
          <div class="col-md-6 form-group">
            <label for="">District</label>
            <select
              name=""
              id=""
              class="form-control"
              v-model="activity.District"
            >
              <option v-if="activity.Area === 'Hong Kong Island'">
                Central and Western District
              </option>
              <option v-if="activity.Area === 'Hong Kong Island'">
                Wan Chai District
              </option>
              <option v-if="activity.Area === 'Hong Kong Island'">
                Eastern District
              </option>
              <option v-if="activity.Area === 'Hong Kong Island'">
                Southern District
              </option>

              <option v-if="activity.Area === 'Kowloon Area'">
                Kowloon City District
              </option>
              <option v-if="activity.Area === 'Kowloon Area'">
                Sham Shui Po District
              </option>
              <option v-if="activity.Area === 'Kowloon Area'">
                Yau Tsim Mong District
              </option>
              <option v-if="activity.Area === 'Kowloon Area'">
                Kwun Tong District
              </option>
              <option v-if="activity.Area === 'Kowloon Area'">
                Wong Tai Sin District
              </option>

              <option v-if="activity.Area === 'New Territories'">
                Kwai Tsing District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Tsuen Wan District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Shatin District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Tai Po District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Island District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Northern District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Sai Kung District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Tuen Mun District
              </option>
              <option v-if="activity.Area === 'New Territories'">
                Yuen Long District
              </option>
            </select>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-md-4 form-group">
            
            <div class="col md-4">
              <label for="">Type</label>
              <div class="checkboxType">
                <input
                  type="checkbox"
                  id="solo"
                  value="Solo"
                  v-model="activity.Type"
                />
                <label for="solo">Solo</label>
                <input
                  type="checkbox"
                  id="couple"
                  value="Couple"
                  v-model="activity.Type"
                />
                <label for="couple">Couple</label>
                <input
                  type="checkbox"
                  id="family"
                  value="Family"
                  v-model="activity.Type"
                />
                <label for="family">Family</label>
                <input
                  type="checkbox"
                  id="friends"
                  value="Friends"
                  v-model="activity.Type"
                />
                <label for="friends">Friends</label>
              </div>

              <!-- <select name="" id="" class="form-control" v-model="type">
              <option>Solo</option>
              <option>Couple</option>
              <option>Friends</option>
              <option>Family</option>
            </select> -->
            </div>
            <!-- <select name="" id="" class="form-control" v-model="activity.Type">
              <option>Solo</option>
              <option>Couple</option>
              <option>Friends</option>
              <option>Family</option>
            </select> -->
          </div>
          <div class="col-md-4 form-group">
            <label for="">Category</label>
            <select
              name=""
              id=""
              class="form-control"
              v-model="activity.Category"
            >
              <option>Natural Attractions</option>
              <option>Cultural and Historical Sites</option>
              <option>Urban Attractions</option>
              <option>Adventure and Outdoor</option>
              <option>Culinary and Food</option>
              <option>Wellness and Retreats</option>
              <option>Theme Park</option>
              <option>Entertainment Complexes</option>
              <option>Shopping</option>
            </select>
          </div>
          <div class="col-md-4 form-group">
            <label for="">Charge</label>
            <input type="text" class="form-control" v-model="activity.Charge" />
          </div>
        </div>

        <div class="row mt-4">
          <label for="">Description</label>
          <textarea
            type="text"
            class="form-control"
            v-model="activity.Description"
          ></textarea>
        </div>

        <div class="row mt-4 mb-4">
          <label for="">Info</label>
          <input type="text" class="form-control" v-model="activity.Info" />
        </div>

        <input
          class="form-check-input"
          type="checkbox"
          id=""
          v-model="activity.Approved"
        />
        <label class="form-check-label" for="">Approved</label>

        <div class="button-row">
          <button class="btn profile-button" type="submit">Update!</button>

          <router-link :to="'/actDetails/' + activity._id"><button class="btn cancel-button">Cancel</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";

export default {
  name: "ActEdit",
  components: {
    NavBar,
  },
  data() {
    return {
      activity: {},
    };
  },
  methods: {
    async UpdateAct(aid) {
      const updateActData = {
        Act_ID: this.activity.Act_ID,
        Act_name: this.activity.Act_name,
        Location: this.activity.Location,
        Area: this.activity.Area,
        District: this.activity.District,
        Type: this.activity.Type,
        Category: this.activity.Category,
        Charge: this.activity.Charge,
        Description: this.activity.Description,
        Info: this.activity.Info,
        Approved: this.activity.Approved,
      };
      await axios
        .put("/api/activities/" + aid, updateActData)
        .then((response) => {
          console.log(response.data);
          alert("Successfully updated!");
          this.$router.push("/actDetails/" + this.activity._id);
        });
    },
  },
  mounted() {
    const route = useRoute();
    axios
      .get("/api/activities/" + route.params.id)
      .then((response) => (this.activity = response.data));
  },
};
</script>

<style scoped>
a {
  color: #016a70;
}
.container {
  background-color: white;
  width: 70%;
  min-height: 500px;
  height: 70%;
  padding-left: 0px;
  padding-right: 0px;
  border-radius: 30px;
  margin-top: 30px;
  padding-bottom: 10px;
  /* padding: 40px; */
}
.checkboxType {
  padding: 5px;
}
.checkboxType input {
  margin-left: 10px;
  margin-right: 3px;
}
.checkboxType label {
  font-size: 18px;
  font-weight: 400;
}
.profile-button {
  margin: 10px;
  background-color: #016a70;
  color: #fff;
}
.profile-button:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.cancel-button{
  margin: 10px;
  background-color: #fff;
  color: #016a70;
  border-color: #016a70;
}
.cancel-button:hover{
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.button-row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="bg">
    <NavBarVue />
    <div class="proposeForm">
      <form @submit.prevent="propose()">
        <div class="row mt-4">
          <label for="">Name*</label>
          <input
            type="text"
            class="form-control"
            v-model="actName"
            placeholder="activity name"
            required
          />
        </div>

        <div class="row mt-4">
          <label for="">Location*</label>
          <textarea
            type="text"
            class="form-control"
            v-model="location"
            placeholder="location"
            required
          ></textarea>
        </div>

        <div class="row mt-4">
          <div class="col md-6">
            <label for="">Area*</label>
            <select name="" id="" class="form-control" v-model="area" required>
              <option selected>Choose the location area</option>
              <option>Hong Kong Island</option>
              <option>Kowloon Area</option>
              <option>New Territories</option>
            </select>
          </div>
          <div class="col md-6">
            <label for="">District*</label>
            <select
              name=""
              id=""
              class="form-control"
              v-model="district"
              required
            >
              <option selected>Choose the location district</option>
              <option v-if="area === 'Hong Kong Island'">
                Central and Western District
              </option>
              <option v-if="area === 'Hong Kong Island'">
                Wan Chai District
              </option>
              <option v-if="area === 'Hong Kong Island'">
                Eastern District
              </option>
              <option v-if="area === 'Hong Kong Island'">
                Southern District
              </option>

              <option v-if="area === 'Kowloon Area'">
                Kowloon City District
              </option>
              <option v-if="area === 'Kowloon Area'">
                Sham Shui Po District
              </option>
              <option v-if="area === 'Kowloon Area'">
                Yau Tsim Mong District
              </option>
              <option v-if="area === 'Kowloon Area'">Kwun Tong District</option>
              <option v-if="area === 'Kowloon Area'">
                Wong Tai Sin District
              </option>

              <option v-if="area === 'New Territories'">
                Kwai Tsing District
              </option>
              <option v-if="area === 'New Territories'">
                Tsuen Wan District
              </option>
              <option v-if="area === 'New Territories'">Shatin District</option>
              <option v-if="area === 'New Territories'">Tai Po District</option>
              <option v-if="area === 'New Territories'">Island District</option>
              <option v-if="area === 'New Territories'">
                Northern District
              </option>
              <option v-if="area === 'New Territories'">
                Sai Kung District
              </option>
              <option v-if="area === 'New Territories'">
                Tuen Mun District
              </option>
              <option v-if="area === 'New Territories'">
                Yuen Long District
              </option>
            </select>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col md-4">
            <label for="">Type</label>
            <select name="" id="" class="form-control" v-model="type">
              <option>Solo</option>
              <option>Couple</option>
              <option>Friends</option>
              <option>Family</option>
            </select>
          </div>
          <div class="col md-4">
            <label for="">Category</label>
            <select name="" id="" class="form-control" v-model="category">
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
          <div class="col md-4">
            <label for="">Charge</label>
            <input
              type="text"
              class="form-control"
              v-model="charge"
              placeholder="charge"
            />
          </div>
        </div>

        <div class="row mt-4">
          <label for="">More information</label>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon3"
                >https://example.com/users/</span
              >
            </div>
            <input
              type="text"
              class="form-control"
              v-model="info"
              placeholder="link.."
            />
          </div>
        </div>

        <div class="row mt-4">
          <label for="">Description*</label>
          <textarea
            type="text"
            class="form-control"
            v-model="description"
            placeholder="why you suggest this activity?"
            required
          ></textarea>
        </div>

        <div class="row mt-4">
          <button type="submit" class="btn">Propose!</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBarVue from "../components/NavBar.vue";
export default {
  name: "ProposeAct",
  components: {
    NavBarVue,
  },
  data() {
    return {
      actName: "",
      location: "",
      area: "",
      district: "",
      type: "",
      category: "",
      charge: "",
      info: "",
      description: "",
    };
  },
  methods: {
    async propose() {
      const response = await axios.post("/api/addAct", {
        actName: this.actName,
        location: this.location,
        area: this.area,
        district: this.district,
        type: this.type,
        category: this.category,
        charge: this.charge,
        info: this.info,
        description: this.description,
      });

      console.log(response);
      if (response.status == 201) {
        alert(response.data);
      } else {
        alert(response.data);
      }
    },
  },
};
</script>

<style scoped>
.bg {
  align-items: center;
  background-image: url("@/assets/Images/green-bg.jpg");
}

.btn {
  border-color: #016a70;
  color: #016a70;
}
.btn:hover {
  border-color: #016a70;
  background-color: #016a70;
  color: #ffffdd;
}

.proposeForm {
  width: 70%;
  background-color: white;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 20px;
  border-style: solid;
  border-color: gray;
}
</style>

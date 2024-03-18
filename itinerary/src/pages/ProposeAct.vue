<template>
  <div class="bg">
    <NavBarVue />
    <div class="container">
      <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Propose Activity
          </li>
        </ol>
      </nav>
      <div class="proposeForm">
        <form @submit.prevent="propose()" enctype="multipart/form-data">
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
              <select
                name=""
                id=""
                class="form-control"
                v-model="area"
                required
              >
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
                <option v-if="area === 'Kowloon Area'">
                  Kwun Tong District
                </option>
                <option v-if="area === 'Kowloon Area'">
                  Wong Tai Sin District
                </option>

                <option v-if="area === 'New Territories'">
                  Kwai Tsing District
                </option>
                <option v-if="area === 'New Territories'">
                  Tsuen Wan District
                </option>
                <option v-if="area === 'New Territories'">
                  Shatin District
                </option>
                <option v-if="area === 'New Territories'">
                  Tai Po District
                </option>
                <option v-if="area === 'New Territories'">
                  Island District
                </option>
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
              <div class="checkboxType">
                <input
                  type="checkbox"
                  id="solo"
                  value="Solo"
                  v-model="checkedType"
                />
                <label for="solo">Solo</label>
                <input
                  type="checkbox"
                  id="couple"
                  value="Couple"
                  v-model="checkedType"
                />
                <label for="couple">Couple</label>
                <input
                  type="checkbox"
                  id="family"
                  value="Family"
                  v-model="checkedType"
                />
                <label for="family">Family</label>
                <input
                  type="checkbox"
                  id="friends"
                  value="Friends"
                  v-model="checkedType"
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
            <!-- <FileInput/> -->
            <input type="file" ref="file" @change="selectFile" name="" id="" />
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
  </div>
</template>

<script>
import axios from "axios";
import NavBarVue from "../components/NavBar.vue";
// import FileInput from "@/components/FileInput.vue";
import { ref } from "vue";

export default {
  name: "ProposeAct",
  components: {
    NavBarVue,
    // FileInput
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
      uploadFile: "",
    };
  },
  methods: {
    selectFile() {
      this.uploadFile = this.$refs.file.files[0];
      console.log(this.uploadFile);
    },
    async propose() {
      const formData = new FormData();
      formData.append("file", this.uploadFile);
      formData.append("actName", this.actName);
      formData.append("location", this.location);
      formData.append("area", this.area);
      formData.append("type", this.checkedType);
      formData.append("district", this.district);
      formData.append("category", this.category);
      formData.append("charge", this.charge);
      formData.append("info", this.info);
      formData.append("description", this.description);

      const response = await axios.post(
        "/api/addAct",
        formData
        // {
        //   actName: this.actName,
        //   location: this.location,
        //   area: this.area,
        //   district: this.district,
        //   type: this.checkedType,
        //   category: this.category,
        //   charge: this.charge,
        //   info: this.info,
        //   description: this.description,
        //   file: this.$refs.file.files[0],
        // }
      );
      console.log(formData);
      console.log(response);
      if (response.status == 201) {
        alert(response.data);
        this.$router.push("/");
      } else {
        alert(response.data);
      }
    },
  },
  setup() {
    const checkedType = ref([]);

    return {
      checkedType,
    };
  },
};
</script>

<style scoped>
.container{
  margin-top: 30px;
}
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
</style>

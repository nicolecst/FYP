<template>
  <div class="outmost-container">
    <NavBar />
    <div class="c">
      <nav
        class="breadcrumb-divider"
        style="--bs-breadcrumb-divider: '>'"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/" style="color: #fff">Home</a>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            style="color: #ffdb64"
          >
            Create Itinerary
          </li>
        </ol>
      </nav>
      <div
        class="row"
        style="
          text-align: center;
          color: #fff;
          font-family: BungeeInline;
          margin-top: 30px;
          margin-bottom: 30px;
        "
      >
        <h1>Lets build your itinerary!</h1>
      </div>

      <div class="container">
        <div class="form-container">
          <form @submit.prevent="create()">
            <div class="buttons">
              <div>
                <button
                  v-if="step != 1"
                  @click.prevent="previousStep()"
                  class="btn"
                >
                  <span style="font-size: 5rem"
                    ><font-awesome-icon
                      :icon="['fas', 'caret-left']"
                      beat
                      style="color: #fff"
                  /></span>
                </button>
              </div>
              <section v-if="step == 1">
                <div class="section-container1">
                  <div class="progress-bar">
                    <div class="progress">1</div>
                    <div class="bar" style="background-color: #d3d3d3"></div>
                    <div class="progress" style="background-color: #d3d3d3">
                      2
                    </div>
                    <div class="bar" style="background-color: #d3d3d3"></div>
                    <div class="progress" style="background-color: #d3d3d3">
                      3
                    </div>
                  </div>

                  <div class="row mt-2">
                    <label for="">Itinerary Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="give a name for your plan.."
                      v-model="iname"
                    />
                  </div>
                  <div class="row mt-2">
                    <div class="col md-6">
                      <label for="">Type</label>
                      <select
                        name=""
                        id=""
                        class="form-control"
                        v-model="itype"
                      >
                        <option disabled>Choose the trip type..</option>
                        <option>Solo</option>
                        <option>Couple</option>
                        <option>Friends</option>
                        <option>Family</option>
                      </select>
                    </div>
                    <div class="col md-6">
                      <label for="">Number of participants</label>
                      <input
                        type="number"
                        v-model="participants"
                        placeholder="how many?"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col md-6">
                      <label for="">From</label>
                      <input
                        required
                        data-format="yyyy/mm/dd"
                        type="date"
                        class="form-control"
                        placeholder="start date"
                        v-model="start"
                      />
                    </div>
                    <div class="col md-6">
                      <label for="">To</label>
                      <input
                        required
                        data-format="yyyy/mm/dd"
                        type="date"
                        class="form-control"
                        placeholder="end date"
                        v-model="end"
                        :min="start"
                        :max="maxEndDate"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section v-if="step == 2">
                <div class="section-container2">
                  <div class="progress-bar">
                    <div class="progress">1</div>
                    <div class="bar"></div>
                    <div class="progress">2</div>
                    <div class="bar" style="background-color: #d3d3d3"></div>
                    <div class="progress" style="background-color: #d3d3d3">
                      3
                    </div>
                  </div>
                  <div class="addButton">
                    <div></div>
                    <div>
                      <button
                        class="btn create-btn"
                        @click.prevent="() => togglePopup('buttonTrigger')"
                      >
                        <span style="font-size: 1.5em; margin-right: 5px">
                          <font-awesome-icon
                            icon="fa-solid fa-calendar-plus"
                          /> </span
                        >Add activities
                      </button>
                    </div>
                  </div>

                  <!-- <p>{{ dateDiff }}</p> -->

                  <div class="scrolls">
                    <PlanCard
                      v-for="(n, i) in dateDiff"
                      :key="n"
                      :n="n"
                      :start="addDays(start, i)"
                      :daysOfWeek="weekdays(start, i)"
                    >
                      <div
                        v-for="(row, rowIndex) in subplancard[i]"
                        :key="rowIndex"
                      >
                        <div
                          v-for="(element, columnIndex) in row"
                          :key="columnIndex"
                        >
                          <SubplanCard
                            :actName="element.act_name"
                            :location="element.location"
                            :sTime="element.startTime"
                            :eTime="element.endTime"
                            :memo="element.memo"
                          ></SubplanCard>
                        </div>
                      </div>
                    </PlanCard>
                  </div>

                  <PopupForm
                    v-if="popupTriggers.buttonTrigger"
                    :togglePopup="() => togglePopup('buttonTrigger')"
                    :n="dateDiff"
                    v-model:act="act"
                    v-model:location="location"
                    v-model:day="day"
                    v-model:sTime="sTime"
                    v-model:eTime="eTime"
                    v-model:memo="memo"
                    @clicked="clicked"
                    ><button
                      class="browse-btn"
                      @click.prevent="() => toggleActPopup('buttonTrigger')"
                    >
                      Browse
                    </button>
                    <PopupAct
                      v-if="popupActTriggers.buttonTrigger"
                      :toggleActPopup="() => toggleActPopup('buttonTrigger')"
                      @add="addAct"
                    />
                  </PopupForm>
                </div>
              </section>

              <section v-if="step == 3">
                <div class="section-container3">
                  <div class="progress-bar">
                    <div class="progress">1</div>
                    <div class="bar"></div>
                    <div class="progress">2</div>
                    <div class="bar"></div>
                    <div class="progress">3</div>
                  </div>
                  <div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="is_public"
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Public
                      </label>
                      <small
                        id="passwordHelpBlock"
                        class="form-text text-muted"
                      >
                        (Check the box if you want your plan to be seen by
                        everyone.)
                      </small>
                    </div>
                  </div>

                  <div class="scrolls">
                    <PlanCard
                      v-for="(n, i) in dateDiff"
                      :key="n"
                      :n="n"
                      :start="addDays(start, i)"
                      :daysOfWeek="weekdays(start, i)"
                    >
                      <div
                        v-for="(row, rowIndex) in subplancard[i]"
                        :key="rowIndex"
                      >
                        <div
                          v-for="(element, columnIndex) in row"
                          :key="columnIndex"
                        >
                          <SubplanCard
                            :actName="element.act_name"
                            :location="element.location"
                            :sTime="element.startTime"
                            :eTime="element.endTime"
                            :memo="element.memo"
                          ></SubplanCard>
                        </div>
                      </div>
                    </PlanCard>
                  </div>
                </div>
              </section>
              <!-- <div class="row mt-2"> -->
              <!-- <div class="buttons">
              <div>
                <button
                  v-if="step != 1"
                  @click.prevent="previousStep()"
                  class="btn btn-primary"
                >
                  Back
                </button>
              </div> -->
              <div>
                <button
                  v-if="step != totalSteps && start != null && end != null"
                  @click.prevent="nextStep()"
                  class="btn"
                >
                  <span style="font-size: 5rem"
                    ><font-awesome-icon
                      :icon="['fas', 'caret-right']"
                      beat
                      style="color: #fff"
                  /></span>
                </button>
                <button
                  v-if="step == totalSteps"
                  class="btn complete-btn"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  <font-awesome-icon :icon="['fas', 'square-check']" />
                </button>

                <!-- Modal -->
                <div
                  class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                          Itinerary Created Successfully!
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        Want to receive the itinerary through Email?
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                          @click="home"
                        >
                          Later
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-dismiss="modal"
                          @click="sendEmail"
                        >
                          Send me!
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PlanCard from "@/components/PlanCard.vue";
import PopupForm from "@/components/PopupForm.vue";
import SubplanCard from "@/components/SubplanCard.vue";
import PopupAct from "@/components/PopupAct.vue";
import { ref } from "vue";
import axios from "axios";
// import 'vue-datepicker/index.css';
export default {
  name: "CreateItinerary",
  components: {
    NavBar,
    PlanCard,
    PopupForm,
    SubplanCard,
    PopupAct,
  },
  data() {
    return {
      step: 1,
      totalSteps: 3,
      participants: 1,
      end: this.end,
      start: this.start,
      days: [],
    };
  },
  methods: {
    clicked() {
      var dailyAct = {
        itin: {
          act_name: this.act,
          location: this.location,
          day: parseInt(this.day),
          startTime: this.sTime,
          endTime: this.eTime,
          memo: this.memo,
        },
      };

      if (this.subplancard.length < this.day) {
        while (this.subplancard.length < this.day) {
          this.subplancard.push([]);
        }
      }
      this.subplancard[this.day - 1].push(dailyAct);
      console.log("aray " + this.subplancard);
      console.log(this.subplancard.length);
      console.log(typeof this.subplancard);

      console.log(this.act != "");
      if (this.act == "" || this.act == null) return;
      // this.dailyItin = [];
      if (this.dailyItin.length < this.day) {
        while (this.dailyItin.length < this.day) {
          this.dailyItin.push([]);
        }
      }
      // this.dailyItin.length = 3
      // this.dailyItin.length = this.dateDiff -1;
      // this.dailyItin.splice(1, 0, {});

      var position = this.day - 1; // Replace with the desired index
      this.dailyItin[position].push(dailyAct);

      // for(let i=0; i<this.dailyItin[position].length; i++){
      //   console.log('starttime: ' + JSON.stringify(this.dailyItin[position]), null, 2);
      //   console.log(this.dailyItin[0].itin.startTime)
      // }
      // this.dailyItin[0].splice(1,0,dailyAct);
      console.log(dailyAct);
      console.log(this.dailyItin);
      // console.log(this.dailyItin.length);
    },
    addAct(a) {
      console.log("Received Data: " + JSON.stringify(a, null, 2));
      console.log(a.Act_name);
      this.act = a.Act_name;
      this.location = a.Location;
      // this.$emit('actN', a.Act_name)
    },
    nextStep() {
      this.step++;
    },
    previousStep() {
      this.step--;
    },
    addDays(date, days) {
      // Function to add Days
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleString();
    },
    weekdays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleString("en-US", { weekday: "long" });
    },
    home() {
      this.$router.push("/");
    },
    sendEmail() {
      const i = localStorage.getItem("userID");
      console.log(i);
      const e = localStorage.getItem("email");
      console.log(e)


      axios
        .get("/api/sendItin", { params: { message: JSON.stringify(this.dailyItin), email: e } })
        .then((response) => console.log(response));
      
        this.$router.push('/')
    },
    updateEndDate() {
      // Reset the end date when the start date changes
      this.end = "";
    },
    async create() {
      const i = localStorage.getItem("userID");
      console.log(i);
      const un = localStorage.getItem("username");
      console.log(un);

      const response = await axios.post("/api/create", {
        author: i,
        authorName: un,
        iname: this.iname,
        itype: this.itype,
        participants: this.participants,
        from: this.start,
        to: this.end,
        dailyItin: this.dailyItin,
        is_public: this.is_public,
      });

      console.log(response);
      if (response.status == 201) {
        alert(response.data);
      } else {
        alert(response.data);
      }
    },
  },
  computed: {
    dateDiff() {
      let day = new Date(this.end).getTime() - new Date(this.start).getTime();
      let diff = Math.floor(day / 86400000) + 1;
      return diff;
    },
    maxEndDate(){
      if(this.start){
        const startDate = new Date(this.start); // Convert start date string to Date object
        const maxEndDate = new Date(startDate.getTime() + 10 * 24 * 60 * 60 * 1000);
        return maxEndDate.toISOString().split("T")[0];
      }return null;
    }
  },
  setup() {
    const act = ref("");
    const location = ref("");
    const day = ref();
    const sTime = ref("");
    const eTime = ref("");
    const memo = ref("");
    const is_public = ref(true);
    let dailyItin = [];
    const subplancard = ref([]);
    // const helloWorld = ref(null);

    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    const popupActTriggers = ref({
      buttonTrigger: false,
    });

    const toggleActPopup = (trigger) => {
      popupActTriggers.value[trigger] = !popupActTriggers.value[trigger];
    };

    // onMounted(()=>{
    //   console.log(helloWorld.value)
    // })
    return {
      popupTriggers,
      togglePopup,
      popupActTriggers,
      toggleActPopup,
      act,
      location,
      day,
      sTime,
      eTime,
      memo,
      is_public,
      dailyItin,
      subplancard,
      // helloWorld
    };
  },
};
</script>
<style scoped>
/* body{
  background-color: #016a70;
} */
.form-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.c {
  margin-top: 30px;
  margin-left: 50px;
}
.container {
  width: 100%;
  /* height: 120vh; */
  display: flex;
  align-content: center;
  justify-content: center;
  /* background-color: #fff;
  border-radius: 20px;
  padding: 50px;
  align-content: center; */
}
.section-container1 {
  background-color: #fff;
  border-radius: 20px;
  height: 50vh;
  width: 80vw;
  padding: 50px;
  transition: 1s ease-out;
}
.section-container2 {
  background-color: #fff;
  border-radius: 20px;
  height: 110vh;
  width: 80vw;
  padding: 50px;
}
.section-container3 {
  background-color: #fff;
  border-radius: 20px;
  height: 110vh;
  width: 80vw;
  padding: 50px;
}

.outmost-container {
  height: 200vh;
  width: 100%;
  margin: 0;
  background-color: #016a70;
  align-content: center;
  justify-content: center;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slider {
  display: block;
  width: 100%;
  color: #016a70;
}

.scrolls {
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  margin: 20px;
}

.addButton {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}
.create-btn {
  border-color: #016a70;
  color: #016a70;
}
.create-btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
.progress {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #016a70;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.bar {
  height: 3px;
  width: 55vh;
  background-color: #016a70;
}
.progress-bar {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}
.complete-btn {
  color: #fff;
  font-size: 4rem;
}
.complete-btn:hover {
  color: #ffdb64;
}
.browse-btn {
  border-radius: 5px;
  background-color: #fff;
  color: #016a70;
  border: solid 1px #016a70;
}
.browse-btn:hover {
  border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
</style>

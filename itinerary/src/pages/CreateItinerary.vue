<template>
  <div>
    <NavBar />
    <h1>Create itinerary</h1>
    <div class="container">
      <form @submit.prevent="create()">
        <section v-if="step == 1">
          <h1>Step 1</h1>
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
              <select name="" id="" class="form-control" v-model="itype">
                <option>Choose the trip type..</option>
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
                :min= start
              />
            </div>
          </div>
        </section>

        <section v-if="step == 2">
          <div class="addButton">
            <div>
              <h1>Step 2</h1>
            </div>
            <div>
              <button
                class="btn create-btn"
                @click.prevent="() => togglePopup('buttonTrigger')"
              >
                <span style="font-size: 1.5em; margin-right: 5px">
                  <font-awesome-icon icon="fa-solid fa-calendar-plus" /> </span
                >Add activities
              </button>
            </div>
          </div>

          <p>{{ dateDiff }}</p>

          <div class="scrolls">
            <PlanCard
              v-for="(n,i) in dateDiff"
              :key="n"
              :n="n"
              :start="addDays(start, i)"
              :daysOfWeek="weekdays(start, i)"
            />
          </div>

          <PopupForm
            v-if="popupTriggers.buttonTrigger"
            :togglePopup="() => togglePopup('buttonTrigger')"
            :n="dateDiff"
            v-model:act="act"
            v-model:day="day"
            v-model:sTime="sTime"
            v-model:eTime="eTime"
            v-model:memo="memo"
            @clicked="clicked"
          />
        </section>

        <section v-if="step == 3">
          <h3>Step 3</h3>
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
                <small id="passwordHelpBlock" class="form-text text-muted">
                  (Check the box if you want your plan to be seen by everyone.)
                </small>
              </div>
            </div>
          <label for="">Confirm</label>
          <input type="text" class="form-control" placeholder="confirm.." />
        </section>
        <div class="row mt-2">
          <div class="buttons">
            <div>
              <button
                v-if="step != 1"
                @click.prevent="previousStep()"
                class="btn btn-primary"
              >
                Back
              </button>
            </div>
            <div>
              <button
                v-if="step != totalSteps && start!=null && end!=null"
                @click.prevent="nextStep()"
                class="btn btn-primary"
              >
                Next
              </button>
              <button
                v-if="step == totalSteps"
                class="btn btn-primary"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PlanCard from "@/components/PlanCard.vue";
import PopupForm from "@/components/PopupForm.vue";
import { ref } from "vue";
import axios from "axios";
// import 'vue-datepicker/index.css';
export default {
  name: "CreateItinerary",
  components: {
    NavBar,
    PlanCard,
    PopupForm,
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
        itin:{
          act_name: this.act,
          day: this.day,
          start: this.sTime,
          end: this.eTime,
          memo: this.memo
        }};

        this.dailyItin.length = this.dateDiff -1;
        this.dailyItin.splice(1,0,dailyAct);
        console.log(dailyAct);
        console.log(this.dailyItin.length)
      
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
    weekdays(date, days){
        var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result.toLocaleString('en-US',{weekday: 'long'});
    },
    async create() {
      const response = await axios.post("/api/create", {
        iname: this.iname,
        itype: this.itype,
        participants: this.participants,
        from: this.start,
        to: this.end,
        dailyItin: this.dailyItin,
        is_public: this.is_public
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
  },
  setup() {

    const act = ref("");
    const day = ref();
    const sTime = ref();
    const eTime = ref();
    const memo = ref("");
    const is_public = ref(true);
    let dailyItin = [];

    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      popupTriggers,
      togglePopup,
      act,
      day,
      sTime,
      eTime,
      memo,
      is_public,
      dailyItin
    };
  },
};
</script>
<style scoped>
.container {
  width: 80%;
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
  border-color: #016a70;
  background-color: #016a70;
  color: #ffffdd;
}
</style>

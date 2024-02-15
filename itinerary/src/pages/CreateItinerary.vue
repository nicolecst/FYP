<template>
  <div>
    <NavBar />
    <h1>Create itinerary</h1>
    <div class="container">
      <form action="">
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
                type="range"
                min="1"
                max="10"
                step="1"
                v-model="participants"
                class="slider mt-2"
                placeholder="how many?"
              />
              <div>Participants: {{ participants }}</div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col md-6">
              <label for="">From</label>
              <input
                data-format="dd/mm/yyyy"
                type="date"
                class="form-control"
                placeholder="start date"
                v-model="start"
              />
            </div>
            <div class="col md-6">
              <label for="">To</label>
              <input
                data-format="dd/mm/yyyy"
                type="date"
                class="form-control"
                placeholder="end date"
                v-model="end"
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
              <button class="btn create-btn" @click.prevent="()=> togglePopup('buttonTrigger')">
                <span style="font-size: 1.5em; margin-right:5px;">
                  <font-awesome-icon icon="fa-solid fa-calendar-plus" /> </span
                >Add activities
              </button>
            </div>
          </div>

          <p>{{ dateDiff }}</p>

          <div class="scrolls">
            <PlanCard v-for="n in dateDiff" :key="n" :n="n" />
          </div>

          <PopupForm v-if="popupTriggers.buttonTrigger" :togglePopup="()=>togglePopup('buttonTrigger')" :n="dateDiff"/>
        </section>

        <section v-if="step == 3">
          <h1>Step 3</h1>
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
                v-if="step != totalSteps"
                @click.prevent="nextStep()"
                class="btn btn-primary"
              >
                Next
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
import {ref} from 'vue';
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
    };
  },
  methods: {
    nextStep() {
      this.step++;
    },
    previousStep() {
      this.step--;
    },
  },
  computed: {
    dateDiff() {
      let day = new Date(this.end).getTime() - new Date(this.start).getTime();
      let diff = Math.floor(day / 86400000) + 1;
      return diff;
    },
  },
  setup(){
    const popupTriggers = ref({
        buttonTrigger: false,
    })

    const togglePopup = (trigger)=>{
        popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    }

    return{
        popupTriggers,
        togglePopup
    }
  }
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
.create-btn{
  border-color: #016a70;
  color: #016a70;
}
.create-btn:hover{
  border-color: #016a70;
  background-color: #016a70;
  color: #ffffdd;
}
</style>

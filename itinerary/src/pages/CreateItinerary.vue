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
              placeholder="give a name for you plan.."
            />
          </div>
          <div class="row mt-2">
            <div class="col md-6">
              <label for="">Type</label>
              <input
                type="text"
                class="form-control"
                placeholder="select a type for you plan.."
              />
            </div>
            <div class="col md-6">
              <label for="">Number of participants</label>
              <input type="text" class="form-control" placeholder="how many?" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col md-6">
              <label for="">From</label>
              <input
                type="text"
                class="form-control"
                placeholder="start date"
              />
            </div>
            <div class="col md-6">
              <label for="">To</label>
              <input type="text" class="form-control" placeholder="end date" />
            </div>
          </div>
        </section>

        <section v-if="step == 2">
          <h1>Step 2</h1>
          <label for="">Duration</label>
          <input
            type="text"
            class="form-control"
            placeholder="how many days.."
          />
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
// import 'vue-datepicker/index.css';
export default {
  name: "CreateItinerary",
  components: {
    NavBar,
  },
  data() {
    return {
      step: 1,
      totalSteps: 3,
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
</style>

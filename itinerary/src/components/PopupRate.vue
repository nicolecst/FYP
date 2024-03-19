<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="popup-header">
        <h1 style="font-family: BungeeInline">Leave your rating!</h1>
        <button class="btn close" @click.prevent="togglePopup()">
          <span style="font-size: 1.5rem"
            ><font-awesome-icon icon="fa-solid fa-circle-xmark" /></span
          ></button>
      </div>

      <div>
        <label>Rating</label>
        <span
          v-for="(star, index) in this.stars"
          :key="index"
          @click="r(index + 1)"
          style="font-size: 1.5em; margin: 8px"
        >
          <font-awesome-icon :icon="starClass(index)"></font-awesome-icon>
        </span>
      </div>
      <!-- <p>Selected Rating: {{ selectedRating }}</p> -->

      <form action="">
        <label for="">Comments</label>
        <textarea
          type="text"
          class="form-control"
          placeholder="say sth.."
          :value="comment"
          @input="$emit('update:comment', $event.target.value)"
        ></textarea>
        <p>{{ comment }}</p>

        <div class="row mt-2">
          <button class="btn rate-btn" @click="$emit('rate')">Rate</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import { ref } from "vue";

export default {
  name: "PopupRate",
  props: ["togglePopup", "comment"],
  emit: ["update:comment", "rating-updated"],
  //   data() {
  //     return {
  //       stars: 5,
  //       selectedRating: 0
  //     };
  //   },
  methods: {
    highlight(rating) {
      this.selectedRating = rating;
    },
    reset() {
      this.selectedRating = 0;
    },
    r(rating) {
      this.selectedRating = rating;
      console.log(this.selectedRating);
      this.$emit("rating-updated", this.selectedRating);

      // Perform any additional logic or actions here, such as sending the rating to the server
    },
    starClass(index) {
      if (this.selectedRating >= index + 1) {
        return ["fas", "star"];
      } else {
        return ["far", "star"];
      }
    },
  },
  setup() {
    const stars = 5;
    const selectedRating = ref(0);

    return {
      stars,
      selectedRating,
    };
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
.popup-inner {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
}
.popup-header{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
label{
  font-size: 20px;
  margin-top: 20px;
  font-weight: bolder;
}
.rate-btn{
  color: #fff;
  background-color: #016a70;
}
.rate-btn:hover{
  border-color: #FFDB64;
  background-color: #FFDB64;
  color: #a08843;
  border-color: #a08843;
}
</style>

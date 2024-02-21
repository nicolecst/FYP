<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="formHeader">
        <div>
          <h1>Add activities</h1>
        </div>
        <div>
          <button class="btn close" @click.prevent="togglePopup()">
            <span style="font-size: 1.5rem"
              ><font-awesome-icon icon="fa-solid fa-circle-xmark"
            /></span>
          </button>
        </div>
      </div>

      <form action="">
        <div class="row mt-2">
          <label for="">Activity</label>
          <input type="text" name="" id="" class="form-control" v-model="activity" />
          <!-- <button>Browse</button> -->
        </div>

        <div class="row mt-2">
          <label for="">Day</label>
          <select name="" id="" class="form-control">
            <option v-for="i in n" :key="i">{{ i }}</option>
          </select>
        </div>

        <div class="row mt-2">
          <div class="col md-6">
            <label for="">Start</label>
            <input type="time" name="" id="" class="form-control" />
          </div>
          <div class="col md-6">
            <label for="">End</label>
            <input type="time" name="" id="" class="form-control" />
          </div>
        </div>

        <div class="row mt-2">
          <label for="">Memo</label>
          <textarea type="text" name="" id="" class="form-control"></textarea>
        </div>

        <div class="row mt-2">
          <button class="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import PopupAct from '@/components/PopupAct.vue';

export default {
  name: "PopupForm",
  props: ["togglePopup", "n"],
  //   component:{
  //     PopupAct
  //   }
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
.formHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}
</style>

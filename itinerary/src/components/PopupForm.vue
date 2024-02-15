<template>
  <div class="popup">
    <div class="popup-inner">
      <div class="formHeader">
        <div>
          <h1>Add activities</h1>
        </div>
        <div>
          <button class="btn close"  @click.prevent="togglePopup()">
            <span style="font-size: 1.5rem"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></span>
          </button>
        </div>
      </div>

      <form action="">
        <label for="">Activity {{ n }}</label>
        <input type="text" name="" id="" class="form-control" />
        <select name="" id="">
            <option></option>
        </select>

        <label for="">Day</label>
        <input type="text" name="" id="" class="form-control" />

        <label for="">Start</label>
        <input type="text" name="" id="" class="form-control" />

        <label for="">End</label>
        <input type="text" name="" id="" class="form-control" />

        <label for="">Memo</label>
        <input type="text" name="" id="" class="form-control" />


      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupForm",
  props: ['togglePopup'],
  props:{
    n: Number
  }
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

<template>
  <div class="popup">
    <div class="popup-inner">
      <h1>Popup Rate form</h1>
      <button class="btn close" @click.prevent="togglePopup()">
            <span style="font-size: 1.5rem"
              ><font-awesome-icon icon="fa-solid fa-circle-xmark"
            /></span>Close
          </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupRate",
  props:["togglePopup"]
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
</style>

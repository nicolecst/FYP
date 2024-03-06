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
          <input type="text" class="form-control" required :value="act" @input = "$emit('update:act', $event.target.value)" />
          <p>{{ act }}</p>
          <!-- <button>Browse</button> -->
        </div>

        <div class="row mt-2">
          <label for="">Day</label>
          <select name="" id="" class="form-control" required :value="day" @input="$emit('update:Day', $event.target.value)">
            <option v-for="i in n" :key="i">{{ i }}</option>
          </select>
          <p>{{ day }}</p>
        </div>

        <div class="row mt-2">
          <div class="col md-6">
            <label for="">Start</label>
            <input type="time" name="" id="" class="form-control" :value="sTime" @input="$emit('update:sTime', $event.target.value)"/>
          </div>
          <div class="col md-6">
            <label for="">End</label>
            <input type="time" name="" id="" class="form-control" :value="eTime" @input="$emit('update:eTime', $event.target.value)"/>
          </div>
        </div>
        <p>{{ sTime }} {{ eTime }}</p>

        <div class="row mt-2">
          <label for="">Memo</label>
          <textarea type="text" name="" id="" class="form-control" :value="memo" @input="$emit('update:Memo', $event.target.value)"></textarea>
        </div>
        <p>{{ memo }}</p>

        <div class="row mt-2">
          <button class="btn btn-primary" @click.prevent="$emit('clicked')">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import PopupAct from '@/components/PopupAct.vue';

export default {
  name: "PopupForm",
  props: ["togglePopup", "n", "act", "day", "sTime", "eTime", "memo"],
  emit:['update:act', 'update:Day', 'update:sTime', 'update:eTime', 'update:Memo', 'clicked'],
  methods:{
    clicked(){
      console.log(123)
    }
  }
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

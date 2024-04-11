<template>
    <div>
        <div class="container">
            <div class="card-body">
              <p class="card-text" style="font-family: BungeeInline">{{ actName }}</p>
              <p class="card-text" style="color:rgb(80, 80, 80)"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'location-dot']" /></span>{{ location }}</p>
              <p class="card-text"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'clock']" /></span> {{ sTime }} - {{ eTime }}</p>
              <p class="card-text"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'note-sticky']" /></span> {{ memo }}</p>
              <button class="btn remove-btn" v-if="showButton" @click.prevent="$emit('removeAct', this.actName)">remove</button>

              <slot></slot>
              <!-- <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a> -->
            </div>
        </div>
            
    </div>
</template>
<script>
export default {
    name: "SubplanCard",
    props:{
        actName: String,
        location: String,
        sTime: String,
        eTime: String,
        memo: String,
        showButton: String
    },
    emit:["removeAct"]
}
</script>
<style scoped>
.card-text{
    font-size: 14px;
    margin: 0.5px
}
.container{
    width: 100%;
    /* box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1); */
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 2px;
}
.remove-btn{
    color: #016a70;
    background-color: #fff;
    border-color: #016a70;
    padding: 2px;
    font-size: 12px;
}
.remove-btn:hover{
border-color: #ffdb64;
  background-color: #ffdb64;
  color: #a08843;
  border-color: #a08843;
}
</style>
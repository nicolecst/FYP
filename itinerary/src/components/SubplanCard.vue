<template>
    <div>
        <div class="container">
            <div class="card-body">
              <p class="card-text" style="font-family: BungeeInline">{{ actName }}</p>
              <p class="card-text" style="color:rgb(80, 80, 80)"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'location-dot']" /></span>{{ location }}</p>
              <p class="card-text"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'clock']" /></span> {{ sTime }} - {{ eTime }}</p>
              <p class="card-text"><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'note-sticky']" /></span> {{ memo }}</p>
              <button>remove</button>

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
        memo: String
    }
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
</style>
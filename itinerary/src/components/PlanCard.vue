<template>
    <div>
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ start }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{daysOfWeek}} (Day {{ n }})</h6>
              <!-- <p class="card-text">Act_Name</p>
              <p class="card-text">Start Time</p>
              <p class="card-text">End Time</p>
              <p class="card-text">Memo</p> -->
              <slot></slot>
              <!-- <SubplanCard v-for="n in actInDay" :key="n"/> -->

            </div>
          </div>
    </div>
</template>

<script>
// import SubplanCard from './SubplanCard.vue';
export default{
    name: "PlanCard",
    props:{
        n: Number,
        start: String,
        daysOfWeek: String,
        actInDay: Number,
    },
    components:{
      // SubplanCard
    }
}
</script>
<style>
.card{
    width: 18rem;
    height: 40rem;
    margin: 10px;
    overflow: scroll;
}
</style>
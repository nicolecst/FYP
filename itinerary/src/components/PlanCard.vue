<template>
    <div>
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ start }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{daysOfWeek}} (Day {{ n }})</h6>
              <p class="card-text">Act_Name</p>
              <p class="card-text">Start Time</p>
              <p class="card-text">End Time</p>
              <p class="card-text">Memo</p>

              <a href="#" class="card-link">Card link</a>
              <a href="#" class="card-link">Another link</a>
            </div>
          </div>
    </div>
</template>

<script>

export default{
    name: "PlanCard",
    props:{
        n: Number,
        start: Date,
        daysOfWeek: String,
    }
}
</script>
<style>
.card{
    width: 18rem;
    height: 30rem;
    margin: 10px;
}
</style>
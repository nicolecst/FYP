<template>
  <div class="card" style="min-width: 18rem">
    <img class="card-img-top" alt="Card image cap" />
    <div class="card-body">
      <img class="card-img-top" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">{{ actname }}</h5>
          <p class="card-text">Area: {{ area }}</p>
          <p class="card-text">District: {{ district }}</p>
          <p class="card-text">Type: {{ type }}</p>
          <p class="card-text">Category: {{ category }}</p>
          <p class="card-text">Charge: {{ charge }}</p>
          <router-link :to="'/actDetails/'+ act_ID"><button class="btn btn-primary">check</button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default{
    name: "CardView",
    props:{
      actname: String,
      area: String,
      district: String,
      type: String,
      category: String,
      charge: String,
      act_ID: String
    }

}
</script>

<style>
.card{
  margin: 10px;
}
</style>

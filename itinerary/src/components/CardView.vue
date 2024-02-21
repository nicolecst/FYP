<template>
  <div class="card" style="min-width: 18rem; max-width: 18rem;">
    <img class="card-img-top" src="@/assets/uploads/victoria_peak.jpg" alt="Card image cap" />
    <div class="card-body">
        <div class="card-body">
          <h5 class="card-title">{{ actname }}</h5>
          <p class="card-text">img: {{ img }}</p>
          <p class="card-text">Area: {{ area }}</p>
          <p class="card-text">District: {{ district }}</p>
          <p class="card-text">Type: {{ type }}</p>
          <p class="card-text">Category: {{ category }}</p>
          <p class="card-text">Charge: {{ charge }}</p>
          <p class="card-text">Approved: {{ approved }}</p>
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
      act_ID: String,
      img: String,
      approved: Boolean
    }

}
</script>

<style scoped>
.card{
  margin: 10px;
  height: auto;
}
.btn{
  background-color: #016a70;
  color: #ffffdd;
  border-color: #016a70;
}
.btn:hover{
  background-color: #ffffdd;
  color: #016a70;
  border-color: #016a70;
}
</style>

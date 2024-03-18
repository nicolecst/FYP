<template>
  <div class="card" style="min-width: 18rem; max-width: 18rem;">
    <img class="card-img-top" src="@/assets/uploads/victoria_peak.jpg" alt="Card image cap" />
    <!-- <img class="card-img-top" :src="`http://localhost:3000/${img}`" alt="Card image cap" /> -->
    <!-- <img class="card-img-top" src="" alt="Card image cap" /> -->
    <div class="card-body">
        <div class="card-body">
          <h5 class="card-title">{{ actname }}</h5>
          <p class="card-text">img: {{ img }}</p>
          <p class="card-text">Area: {{ area }}</p>
          <p class="card-text">District: {{ district }}</p>
          <slot name="type"></slot>
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
  background-color: #1FBFAF;
  color: #fff;
  border-color: #1FBFAF;
}
.btn:hover{
  border-color: #FFDB64;
  background-color: #FFDB64;
  color: #a08843;
  border-color: #a08843;
}
</style>

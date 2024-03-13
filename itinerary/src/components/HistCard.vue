<template>
  <div class="container">
        <div class="left">
          <div class="square"></div>  
        </div>
      
      <div class="right">
        <p>{{ id }}</p>
        <p>Plan name: {{ name }}</p>
        <p>Type: {{ type }}</p>
        <p>Participants: {{ participants }}</p>
        <p>Date: From {{ start }} to {{ end }}</p>
        <p>Ratings: </p>
        <p>View: {{ view }}</p>
        <router-link :to="/history/+id"><button class="btn btn-primary">View</button></router-link>
      </div>
    </div>
</template>
<script>
export default {
  name: "HistCard",
  props: {
    id: String,
    name: String,
    type: String,
    participants: Number,
    start: String,
    end: String,
    view: String,
  },
  methods:{
    // details(){
    //     this.$router.push('/history/:id')
    // }
  }
};
</script>
<style scoped>
.container {
  width: 70%;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.square {
  background-color: burlywood;
  background-image: url("@/assets/Images/Temporary_img.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 300px;
  width: 300px;
}
.left{
    flex: 0 0 30%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.right{
    flex: 0 0 70%;
}
</style>

<template>
  <div>
    <h1>Hello world</h1>
    <button @click="sendEmail">Send</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "TestEmail",
  data() {},
  methods:{
    sendEmail(){
        const i = localStorage.getItem("userID");
    console.log(i);
    axios.get("/api/sendmail", {params: {message: "say Hello!"} }).then((response) => console.log(response));
    }
  },

};
</script>
<style scoped></style>

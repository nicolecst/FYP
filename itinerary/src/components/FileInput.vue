<template>
  <div class="hello">
    <form action="" @submit.prevent="sendFile" enctype="multipart/form-data">
      <input type="file" ref="file" @change="selectFile" name="" id="" />
      <button class="btn btn-primary">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "FileInput",
  data() {
    return {
      uploadFile: "",
    };
  },
  methods: {
    selectFile() {
      this.uploadFile = this.$refs.file.files[0];
      console.log(this.uploadFile);
    },
    async sendFile(){
        const formData = new FormData(); 

        formData.append('file', this.uploadFile);

        try {
           await axios.post('/api/upload', formData) 
        } catch (error) {
            console.log(error)
        }
        
    }
  },
};
</script>

<style scoped></style>

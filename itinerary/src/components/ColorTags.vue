<template>
  <div>
    <p><span class="tags" :style="{backgroundColor: color}">{{ text }}</span></p>
  </div>
</template>

<script>
export default {
  name: "ColorTags",
  props: {
    text: String,
    color: String,
  },
};
</script>

<style>
.tags {
  background-color: cadetblue;
  margin-top: 5px;
  padding: 7px;
  border-radius: 5px;
}
</style>

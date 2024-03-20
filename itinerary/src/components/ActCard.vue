<template>
  <div class="container">
    <div class="left">
      <p style="font-family: BungeeInline;">{{ actname }}</p>
      <p><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'location-dot']" /></span>{{ location }}</p>
      <p><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'map']" /></span>{{ area }}</p>
      <p><span style="margin-right:5px;"><font-awesome-icon :icon="['fas', 'people-robbery']" /></span>{{ category }}</p>
    </div>
    <div class="right">
      <slot></slot>  
    </div>
    
  </div>
</template>
<script>
export default {
  name: "ActCard",
  props: {
    actname: String,
    location: String,
    area: String,
    category: String,
  },
};
</script>

<style scoped>
p {
  margin: 2px;
}
.container {
  border-bottom: solid 1px #d3d3d3;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
}
.left{
    width: 80%
}
</style>

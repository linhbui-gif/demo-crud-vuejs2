<template>
  <button @click="handlerClick" :class="'btn' + ' ' + className" :type="type">{{title}}</button>
</template>
<script>
   export default {
     name:"ButtonComponent",
     props:["title", "type","className", "handlerClick"]
   }
</script>
<style>
  .btn{
    outline: none;
    border:unset;
    color: white;
    border-radius: 5px;
    padding: 10px 15px;
  }
  .btn.btn-primary{
    background-color: blueviolet;
  }
</style>
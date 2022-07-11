<template>
  <el-dialog :visible="visible" width="80vw"  center>
    hello
    <slot name="dialog-content" />
    <slot name="dialog-footer" />
    <el-button @click="close">Cancel</el-button>
    <el-button type="primary" @click="handlerSubmit">Submit</el-button>
  </el-dialog>
</template>
<script>
export default {
  name:"ModalComponent",
  props: ['visible','close', 'onSubmit'],
  data(){

  },
  methods:{
    handlerSubmit(){
      this.$emit('onSubmit', "hello")
    }
  }
}
</script>
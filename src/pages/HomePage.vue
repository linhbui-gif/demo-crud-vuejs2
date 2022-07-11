<template>
  <div class="home-page">
    <div style="text-align: left; margin-bottom: 20px">
      <ButtonComponent :handlerClick="onShowDialog" class-name="btn-primary" type="button" title="Add Item"/>
    </div>
    <ModalComponent @onSubmit="onSubmit" :visible="dialogVisible" :close="onCloseDialog" />
    <TableComponent :data="users" />
  </div>
</template>

<script>
import {  userApi } from "@/services/Api";
import TableComponent from "@/components/Table";
import ButtonComponent from "@/components/Button";
import ModalComponent from "@/components/Modal";
export default {
  components:{
    ModalComponent,
    ButtonComponent,
    TableComponent
  },
  name: 'HomePage',
  props: {
    msg: String
  },
  data() {
    return {
      users: [],
      dialogVisible: false
    }
  },
  mounted() {
    // fetch on init
    this.getUsers();
  },
  watch: {
    // re-fetch whenever currentBranch changes
    shaFirst: 'fetchData',
  },
  methods: {
    async getUsers() {
      try{
        const response = await userApi.getList();
        this.users = response;
      } catch (e) {
        alert(e)
      }
    },
    onShowDialog(){
      this.dialogVisible = true;
    },
    onCloseDialog () {
      this.dialogVisible = false;
    },
    onSubmit(data){
      console.log("data component child", data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
a {
  text-decoration: none;
  color: #42b883;
}

li {
  line-height: 1.5em;
  margin-bottom: 20px;
}

.author,
.date {
  font-weight: bold;
}
</style>

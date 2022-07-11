<template>
  <AdminLayout>
    <el-form :model="customerForm" status-icon  ref="customerForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="Name" prop="name">
        <el-input type="text" v-model="customerForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input type="text" v-model="customerForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Phone" prop="tel">
        <el-input v-model.number="customerForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="Address" prop="address">
        <el-input v-model.number="customerForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click.prevent="submitCustomer('customerForm')" type="primary">Update</el-button>
        <el-button @click="doCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </AdminLayout>

</template>
<script>
  import {customerApi} from "@/services/Api";
  import AdminLayout from "@/layouts/adminLayout";

  export default {
    name: "CustomerEdit",
    components: {AdminLayout},
    data() {

      return {
        customerForm: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },

      };
    },
    mounted() {
      this.getCustomerById();
    },
    methods:{
      async getCustomerById(){
        const response = await customerApi.findById(this.$route.params.id);
        if(response.success){
          this.customerForm = response.data;
        }
      },
      submitCustomer(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.update();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showNotification(title, message, type) {
        this.$notify({
          title: title,
          message: message,
          type: type
        });
      },
      loading() {
        const loading = this.$loading({
          lock: true,
          text: "Vui lòng chờ...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        return loading;
      },
      async update () {
        const loadingControl = this.loading();
        const response = await customerApi.update(this.$route.params.id, this.customerForm)
        if(response.success){
          loadingControl.close();
          this.showNotification("Update customer success !", response.message, "success");
        }

      },
      doCancel() {
        this.$router.push({'path': '/admin'})
      }
    }
  }
</script>
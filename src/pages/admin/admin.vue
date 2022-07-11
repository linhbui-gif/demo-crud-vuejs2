<template>
  <AdminLayout>
    <div style="text-align: left">
      <el-button
          size="mini"
          type="primary"
          @click="handlerShowDialogAdd()"
      >Add Item
      </el-button>
    </div>
    <el-table
        :data="tableData"
        :lazy="true"
        style="width: 100%">
      <el-table-column
          label="#ID"
          prop="id">
      </el-table-column>
      <el-table-column
          label="Name"
          prop="name">
      </el-table-column>
      <el-table-column
          label="Email"
          prop="email">
      </el-table-column>
      <el-table-column
          label="Phone"
          prop="tel">
      </el-table-column>
      <el-table-column
          label="Address"
          prop="address">
      </el-table-column>

      <el-table-column
          label="Action"
          prop="action">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handlerShowDialog(scope.row)"
          >Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="this.params.page"
        :page-size="this.params.size"
        :total="30"
        background
        layout="prev, pager, next"
        @current-change="handlePaginationChange">
    </el-pagination>
    <el-dialog
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        title="Confirm delete item"
        width="30%">
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="handlerSubmitDelete">Confirm</el-button>
  </span>
    </el-dialog>
    <el-dialog
        :before-close="handleCloseDialog"
        :visible.sync="dialogCustomerVisible"
        title="Add Customer"
        width="30%">
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
<!--        <el-upload-->
<!--            class="upload-demo"-->
<!--            drag-->
<!--            action="http://academy.hobasoft.com/api/v1/customer/save"-->
<!--            :on-preview="handlePreview"-->
<!--            :on-remove="handleRemove"-->
<!--            >-->
<!--          <i class="el-icon-upload"></i>-->
<!--          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>-->
<!--        </el-upload>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCustomerVisible = false">Cancel</el-button>
        <el-button @click.prevent="onSubmitCustomer('customerForm')" type="primary" >Save</el-button>
       </span>
    </el-dialog>
  </AdminLayout>

</template>
<script>

import AdminLayout from "@/layouts/adminLayout";
import {PATH_LIST} from "@/helper";
import {customerApi} from "@/services/Api";

export default {
  name: "AdminPage",
  components: {AdminLayout},
  data() {
    return {
      tableData: [],
      search: '',
      customerForm: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      loading: false,
      dialogVisible: false,
      dialogCustomerVisible: false,
      idDelete: 1,
      fileName:"",
      params: {
        page: 1,
        size: 10,
        keyword: '',
      }
    }
  },
  computed: {
    namespace: () => "customer",
  },
  created() {
    this.getListCustomer();
  },

  watch: {
    params: 'getListCustomer',
  },
  methods: {
    handleClose(done) {
      done();
    },
    uploadFileUrl(){

    },
    onSubmitCustomer(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSave();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
     this.fileName = file.name;
    },
    async onSave(){
      const loadingHandler = this.loadingHandler();
      try{
        this.customerForm = {
          ...this.customerForm,
          avatar: "a.png",
          description: "demo"
        }
        const response = await customerApi.save(this.customerForm);
        if(response.success){
          this.showNotification("Save customer success !", response.message, "success");
          loadingHandler.close();
          this.dialogCustomerVisible =  false;
          this.getListCustomer();
        }
      }catch (e) {
        console.log(e);
        loadingHandler.close();
      }
    },
    handlerShowDialogAdd(){
      this.dialogCustomerVisible = true;
    },
    handleCloseDialog(done) {
      done();
    },
    handlerShowDialog(row) {
      this.dialogVisible = true;
      this.idDelete = row.id;
    },
    handlerSubmitDelete() {
      this.deleteItem(this.idDelete);
      this.dialogVisible = false;
    },
    async deleteItem(id) {
      const loadingHandler = this.loadingHandler();
      try {
        const response = await customerApi.delete(id);
        if (response.success) {
          this.showNotification("Delete customer success !", response.message, "success");
          loadingHandler.close();
          this.getListCustomer();
        }
      } catch (e) {
        this.showNotification("Delete customer Fail !", e, "warning");
        loadingHandler.close();
      }

    },
    loadingHandler() {
      const loading = this.$loading({
        lock: true,
        text: "Vui lòng chờ...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      return loading;
    },
    handleEdit(index, row) {
      this.$router.push(
          `/${this.namespace}${PATH_LIST.EDIT}/${row.id}`
      );
    },
    showNotification(title, message, type) {
      this.$notify({
        title: title,
        message: message,
        type: type
      });
    },
    handlePaginationChange(page, size) {
      this.params = {
        ...this.params,
        page,
        size
      }
    },
    async getListCustomer() {
      try {
        this.loading = true;
        const response = await customerApi.getList(this.params)
        if (response.success) {
          this.loading = false;
          this.tableData = response.data.result;
          this.showNotification("Get customer list success !", response.message, "success");
        }
      } catch (e) {
        this.showNotification("Get customer list fail !", e, "warning");
      }
    }
  },

}
</script>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
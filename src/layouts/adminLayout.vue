<template>
  <div class="admin-layout">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
       asie menu layout
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-button
              type="primary"
              native-type="submit"
              id="form-submit"
              @click.prevent="logout"
          >Logout</el-button>
        </el-header>
        <el-main>
          <slot></slot>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
    import Auth from "@/services/Auth";

    export default {
      methods:{
        logout(){
          Auth.removeAccessToken();
          this.$router.push({"path": "/login"})
        }
      }
    }
</script>
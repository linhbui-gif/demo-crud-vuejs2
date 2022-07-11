<template>
  <div>
    <div>
      <el-main style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-header height="200px">
          Login Pages
        </el-header>
        <el-form
            :model="loginForm"
            :rules="loginRules"
            ref="loginForm"
            @submit.native.prevent="signIn"
        >
          <el-form-item id="email" class="input" label="Email" prop="email">
            <el-input placeholder="Please input email" v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item id="password" class="input" label="Password" prop="password">
            <el-input
                placeholder="Please input password"
                show-password
                v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                native-type="submit"
                id="form-submit"
                @click.prevent="signIn"
            >Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </div>
</template>

<script>
// import Config from "@/config/Config";
import Auth from "@/services/Auth";
import {authApi} from "@/services/Api";
import {
  email,
  required,
  lengthRange
} from "@/config/ValidatotionRule";

const emailRule = [
  required("Email "),
  lengthRange("ログインID(メールアドレス)", {max: 128}),
  email
];
export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      loginRules: {
        email: emailRule,
        password: required("Password ")
      },
      resetForm: {
        email: ""
      },
      resetRules: {
        email: emailRule
      },
    }
  },
  methods: {
    signIn() {
      this.errMsg = null;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
           this.handlerSignIn();
        }
      });
    },
    async handlerSignIn(){
      const loadingControl = this.loading();
      try {
     await authApi.signIn({email: this.loginForm.email, password: this.loginForm.password})
            .then(result => {
              if (result.success) {
                console.log("result.data.access_token", result.data.access_token)
                Auth.storeAccessToken(result.data.access_token);
                this.$refs.loginForm.resetFields();
                loadingControl.close();
                // this.showNotification("Login success !", result.message, "success");
                this.$router.push({path: '/admin'});
              }
            })
            .catch(e => {
              this.showNotification("Error", e, "warning");
            })
      } catch (e) {
        this.showNotification("Error", e, "warning");
      }
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
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* ロゴ、システム名とログインIDのテキストボックスの間隔を調整するcss */
header {
  margin-bottom: 15px;
}

/* ロゴを調整するcss */
.logo {
  width: auto;
  height: 265px;
  vertical-align: top;
  object-fit: cover;
}

/* ラベルの位置を調整するcss */
.input >>> .el-form-item__label {
  width: 30%;
}

/* テキストボックスの表示位置を調整するcss */
.input >>> .el-form-item__content {
  text-align: left;
}

/* テキストボックス、セレクトボックスのサイズを調整するcss*/
.input >>> .el-input {
  width: 45%;
}

/* バリデーションエラーの表示領域を調整するcss */
/* ラベルのwidthと同値を指定 */
.input >>> .el-form-item__error {
  margin-left: 30%;
}

/* 入力フォームのラッパーを調整するcss */
.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  margin: 100px 300px 100px 300px;
  display: flex;
  flex-direction: column;
  min-height: 32vh;
  min-width: 500px;
  flex: 0 0 auto;
}

/* パスワードのテキストボックスとログインボタンの間隔を調整するcss */
#form-submit {
  margin-top: 5px;
}

.rexev-caption {
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  top: 100%;
  left: 0;
}

/* .center {
  margin: 0px 300px 0px 300px;
} */
</style>

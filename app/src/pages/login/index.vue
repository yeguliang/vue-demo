<template>
  <div class="page">
    <div class="input-box">
      <div class="title">{{status == 0?"登录":status == 1?"注册":"发送邮件"}}</div>
      <el-input
        v-model="ObjInput.email"
        input="regEmail"
        type="email"
        :class="{ borred:true}"
        placeholder="邮箱地址"
      ></el-input>
      <el-input
        v-model="ObjInput.name"
        v-show="status == 1"
        type="text"
        :class="{ borred:true }"
        placeholder="用户名"
      ></el-input>
      <el-input
        v-model="ObjInput.pas"
        show-password
        type="password"
        v-show="status !== 2"
        :class="{ borred:true }"
        placeholder="密码"
      ></el-input>
      <div class="reg" v-show="status !== 0">
        <el-input
          v-model="ObjInput.reg"
          type="text"
          style="margin-top:0"
          :class="{ borred:true }"
          placeholder="验证码"
        ></el-input>
        <div class="coderight" @click="refreshCode">
          <SIdentify :identifyCode="identifyCode"></SIdentify>
        </div>
      </div>
      <el-button
        type="primary"
        @click="submit"
        class="register"
      >{{status == 0?"登录":status == 1?"注册":"发送邮件"}}</el-button>
      <div class="bottom">
        <el-button type="info" @click="switchModel(1)">{{status == 0?"注册":"登录"}}</el-button>
        <el-button type="info" @click="switchModel(2)">忘记密码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "@/components/canvasCode";
import RegExp_ from "@/utils/RegExp"
export default {
  components: {
    SIdentify,
  },
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      ObjInput: {
        email: "",
        emailreg: false,
        name: "",
        pas: "",
        reg: "",
        reg_: false,
      },
      status: 0,
    };
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
      console.log(this.identifyCode);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode);
    },
    switchModel(event) {
      console.log("event", event);
      switch (event) {
        case 1:
          if (this.status === 0) {
            this.status = 1;
          } else {
            this.status = 0;
          }
          break;
        case 2:
          this.status = 2;
          break;
      }
    },
    submit() {
      switch (this.status) {
        case 0:
          if (!this.ObjInput.email || !this.ObjInput.pas) {
            this.$message({
              message: "请填写邮箱密码",
              type: "warning",
            });
          } else {
            if (this.ObjInput.emailreg) {
              console.log("=>this.ObjInput", this.ObjInput);
            }
          }
          break;
        case 1:
          console.log(1);
          break;
        case 2:
          console.log(2);
          break;
      }
    },
    regEmail(e) {
      console.log(e, "555555555555");
    },
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  watch: {
    ObjInput: {
      // 数据变化时执行的逻辑代码
      handler(newData, oldData) {
        console.log(newData, oldData,RegExp_)
        if (RegExp_.regEmale.test(this.ObjInput.email)) {
          this.ObjInput.emailreg = true;
        } else {
          this.ObjInput.emailreg = false;
        }
        if (this.identifyCode === this.ObjInput.reg) {
          this.ObjInput.reg_ = true;
        } else {
          this.ObjInput.reg_ = false;
        }
      },
      deep: true,
    },
  },
};
</script>

<style lang='less'>
.el-input {
  margin-top: 20px;
}
@import "./index.less";
</style>
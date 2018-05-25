<template>
    <div>

        <div style="margin: 0 0;text-align: center;font-size: 50px;font-weight: bold;color: darkcyan;">注册系统</div>

        <div style="width: 60vw;margin-left: 20vw;text-align:center;height: 3px;background-color: gray;"></div>


        <div style="margin-top: 30px;margin-left: 35vw;width: 30vw;font-weight: bold">
            <el-input placeholder="email" v-model="email">
                <template slot="prepend" >邮箱:</template>
            </el-input>
        </div>


        <div style="margin-top: 30px;margin-left: 35vw;width: 30vw;font-weight: bold">
            <el-input placeholder="userName" v-model="userName">
                <template slot="prepend" >用户名:</template>
            </el-input>
        </div>


        <div style="margin-top: 30px;margin-left: 35vw;width: 30vw;font-weight: bold">
            <el-input placeholder="password" v-model="password"  type="password">
                <template slot="prepend" >密码:</template>
            </el-input>
        </div>

        <div style="margin-top: 30px;margin-left: 35vw;width: 30vw;font-weight: bold">
            <el-input placeholder="confirm-password" v-model="confirm_password"  type="password">
                <template slot="prepend" >确认密码:</template>
            </el-input>
        </div>



            <el-col :span="4" style="margin-left: 48vw;margin-top: 30px;">
                <el-button type="primary" @click="toLogin">登录</el-button>
            </el-col>

    </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  export default {
    components: { SystemInformation },
    data: function () {
      return {
        email: '',
        password: '',
        confirm_password: '',
        userName: ''
      }
    },
    methods: {
      toLogin () {
        this.$emit('child-say', '1')
      }
    }
}
</script>
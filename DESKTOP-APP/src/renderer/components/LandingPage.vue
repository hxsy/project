<template>
  <div id="wrapper">
    <!--<img id="logo" src="~@/assets/logo.png" alt="electron-vue">-->
    <!--<main>-->
      <!--<div class="left-side">-->
        <!--<span class="title">-->
          <!--Welcome to your new project!-->
        <!--</span>-->
        <!--<system-information></system-information>-->
      <!--</div>-->



      <!--<div class="right-side">-->
        <!--<div class="doc">-->
          <!--<div class="title">Getting Started</div>-->
          <!--<p>-->
            <!--electron-vue comes packed with detailed documentation that covers everything from-->
            <!--internal configurations, using the project structure, building your application,-->
            <!--and so much more.-->
          <!--</p>-->
          <!--<button @click="open('https://simulatedgreg.gitbooks.io/electron-vue/content/')">Read the Docs</button><br><br>-->
        <!--</div>-->
        <!--<div class="doc">-->
          <!--<div class="title alt">Other Documentation</div>-->
          <!--<button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>-->
          <!--<button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</main>-->

    <div style="margin: 0 0;text-align: center;font-size: 50px;font-weight: bold;color: darkcyan;">签到秘书</div>

    <div style="width: 60vw;margin-left: 20vw;text-align:center;height: 3px;background-color: gray;"></div>

    <el-switch style="margin-top: 50px;margin-left: 45vw;width: 30vw;font-weight: bold"
            v-model="stuOrTeac"
            active-text="教师登录"
            inactive-text="学生登录">
    </el-switch>



    <div style="margin-top: 50px;margin-left: 35vw;width: 30vw;font-weight: bold">
      <el-input placeholder="请输入邮箱" v-model="email">
        <template slot="prepend">邮箱：</template>
      </el-input>
    </div>

    <div style="margin-top: 30px;margin-left: 35vw;width: 30vw;font-weight: bold">
      <el-input placeholder="请输入密码" v-model="password" type="password">
        <template slot="prepend" >密码：</template>
      </el-input>
    </div>


    <el-row style="margin-top:30px;margin-left:40vw;text-align: center">
      <el-col :span="4">
        <el-button type="primary" @click="login">登录</el-button>
      </el-col>

      <el-col :span="4">
        <el-button type="warning" @click="register">注册</el-button>
      </el-col>

    </el-row>



    <!--<el-tag type="success">标签二</el-tag>-->
    <!--<el-button type="primary">主要按钮</el-button>-->

  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import axios from 'axios'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data: function () {
      return {
        email: '',
        password: '',
        stuOrTeac: false
      }
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      register () {
        this.$emit('child-say', '2')
      },
      login () {
        var qs = require('qs')
        axios.post('172.21.11.90:8080/sas-manager-web/login', qs.stringify({
          username: 'xie'
        }))
          .then(function (response) {
            alert(response['data']['Success'])
            this.$emit('to-home', '3')
          })
      }
    }
  }
</script>

<!--<style>-->
  <!--@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');-->

  <!--* {-->
    <!--box-sizing: border-box;-->
    <!--margin: 0;-->
    <!--padding: 0;-->
  <!--}-->

  <!--body { font-family: 'Source Sans Pro', sans-serif; }-->

  <!--/*#wrapper {*/-->
    <!--/*background:*/-->
      <!--/*radial-gradient(*/-->
        <!--/*ellipse at top left,*/-->
        <!--/*rgba(255, 255, 255, 1) 40%,*/-->
        <!--/*rgba(229, 229, 229, .9) 100%*/-->
      <!--/*);*/-->
    <!--/*height: 100vh;*/-->
    <!--/*padding: 60px 80px;*/-->
    <!--/*width: 100vw;*/-->
  <!--/*}*/-->

  <!--#logo {-->
    <!--height: auto;-->
    <!--margin-bottom: 20px;-->
    <!--width: 420px;-->
  <!--}-->

  <!--main {-->
    <!--display: flex;-->
    <!--justify-content: space-between;-->
  <!--}-->

  <!--main > div { flex-basis: 50%; }-->

  <!--.left-side {-->
    <!--display: flex;-->
    <!--flex-direction: column;-->
  <!--}-->

  <!--.welcome {-->
    <!--color: #555;-->
    <!--font-size: 23px;-->
    <!--margin-bottom: 10px;-->
  <!--}-->

  <!--.title {-->
    <!--color: #2c3e50;-->
    <!--font-size: 20px;-->
    <!--font-weight: bold;-->
    <!--margin-bottom: 6px;-->
  <!--}-->

  <!--.title.alt {-->
    <!--font-size: 18px;-->
    <!--margin-bottom: 10px;-->
  <!--}-->

  <!--.doc p {-->
    <!--color: black;-->
    <!--margin-bottom: 10px;-->
  <!--}-->

  <!--.doc button {-->
    <!--font-size: .8em;-->
    <!--cursor: pointer;-->
    <!--outline: none;-->
    <!--padding: 0.75em 2em;-->
    <!--border-radius: 2em;-->
    <!--display: inline-block;-->
    <!--color: #fff;-->
    <!--background-color: #4fc08d;-->
    <!--transition: all 0.15s ease;-->
    <!--box-sizing: border-box;-->
    <!--border: 1px solid #4fc08d;-->
  <!--}-->

  <!--.doc button.alt {-->
    <!--color: #42b983;-->
    <!--background-color: transparent;-->
  <!--}-->
<!--</style>-->

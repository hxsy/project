<template>

<div>


<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">


<template v-if="personData.roleid == 38">

	<el-menu-item index="1" @click="toSignIn">
        <i class="el-icon-document"></i>
        <span slot="title">签到管理</span>
    </el-menu-item>
    
    <el-menu-item index="2" @click="toLeave">
        <i class="el-icon-bell"></i>
        <span slot="title">旷课管理</span>
    </el-menu-item>
    
    <el-menu-item index="5" @click="toSubject">
        <i class="el-icon-date"></i>
        <span slot="title">开课授课</span>
    </el-menu-item>
    
    </template>
<template v-else>
	<el-menu-item index="6" @click="mySignIn">
        <i class="el-icon-document"></i>
        <span slot="title">我要签到</span>
    </el-menu-item>

    

    <el-menu-item index="7" @click="myToLeave">
        <i class="el-icon-bell"></i>
        <span slot="title">我要请假</span>
    </el-menu-item>
    
</template>
    

    <el-menu-item index="3"  @click="toInformation">
        <i class="el-icon-edit"></i>
        <span slot="title">信息修改</span>
    </el-menu-item>


    


    <el-menu-item index="4" @click="exit">
        <i class="el-icon-d-arrow-left" aria-hidden="true"></i>
        <span slot="title">安全退出</span>

    </el-menu-item>


</el-menu>
</div>
</template>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 150px;
        min-height: 80vh;
    }
</style>
<script>
//  import 'bootstrap/dist/css/bootstrap.min.css'
//  import 'bootstrap/dist/js/bootstrap.min'

  export default {
    data () {
      return {
        isCollapse: false
      }
    },
    props:[
            'personData'
        ],
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      exit () {
        this.$emit('exit')
      },
      toSignIn () {
        this.$emit('toSignIn')
      },
      toInformation () {
        this.$emit('Information')
      },
      toLeave () {
        this.$emit('toLeave')
      },
        toSubject() {
            this.$emit('toSubject');
        },
        mySignIn () {
            this.$emit('mySignIn')
        },
        myToLeave () {
            this.$emit('myToLeave')
        }
    }
  }
</script>

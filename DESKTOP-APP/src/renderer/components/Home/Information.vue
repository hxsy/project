<template>
    <div style="margin-left: 30vw;margin-top: 20vh;">

        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">邮箱:</el-tag>
            </el-col >

            <el-col :span="16">
                <span>{{email}}</span>
            </el-col>

            <el-col :span="2">
                <el-button type="warning">修改邮箱</el-button>
            </el-col>
        </el-row>




        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">昵称:</el-tag>
            </el-col >

            <el-col :span="16">
                <span>{{userName}}</span>
            </el-col>

            <el-col :span="2">
                <el-button type="warning">修改昵称</el-button>
            </el-col>
        </el-row>



        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">密码:</el-tag>
            </el-col >

            <el-col :span="16">
                <span>*******</span>
            </el-col>

            <el-col :span="2">
                <el-button type="warning">修改密码</el-button>
            </el-col>
        </el-row>

        <el-button type="primary" style="margin-left: 8vw;margin-top: 3vh;">提交修改</el-button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '1130600679@qq.com',
        userName: 'maskerk',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        time: ''
      }
    }
  }
</script>
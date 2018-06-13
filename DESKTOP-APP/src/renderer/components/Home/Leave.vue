<template>
    <div style="margin-left: 30vw;margin-top: 20vh;">

        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">时间:</el-tag>

            </el-col >

            <el-col :span="18">
                <el-select v-model="time" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>




        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">教室:</el-tag>

            </el-col >

            <el-col :span="18">
                <el-input
                        placeholder="请输入内容"
                        v-model="classRoom"
                        clearable>
                </el-input>
            </el-col>
        </el-row>

        <el-row style="line-height: 80px">
            <el-col :span="6">
                <el-tag style="font-size: 15px;">位置:</el-tag>

            </el-col >

            <el-col :span="18">
                <el-select v-model="time" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>

        <el-row style="line-height: 80px">
            <el-col :span="8">
                <el-tag style="font-size: 15px;">请假原因:</el-tag>

            </el-col >

            <el-col :span="16">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="reason">
                </el-input>
            </el-col>
        </el-row>

        <el-button type="primary" style="margin-left: 7vw;margin-top: 5vh;">提交请假</el-button>
    </div>
</template>

<script>
  export default {
    data () {
      return {
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
        time: '',
        reason: '',
        classRoom: ''
      }
    }
  }
</script>
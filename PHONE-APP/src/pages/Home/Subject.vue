<template>
    <div id="subject" style="width: 100%">
        <el-button type="success" style="float: right;" @click="addSubject">添加课程</el-button>
        <el-table
                :data="classContent"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="coursename"
                    label="课程名称"
                    >
            </el-table-column>


            <el-table-column
                    prop="starttime"
                    label="开始时间"
            >
            </el-table-column>

            <el-table-column
                    prop="endtime"
                    label="结束时间"
            >
            </el-table-column>

            <el-table-column
                    prop="classroomname"
                    label="上课地点"
            >
            </el-table-column>

            <el-table-column
                    prop="schooltime"
                    label="上课时间"
            >
            </el-table-column>

            <el-table-column
                    prop="dayofweek"
                    label="星期几"
            >
            </el-table-column>

            <el-table-column
                    prop="teachername"
                    label="教师"
            >
            </el-table-column>
            
               <el-table-column
                    label="删除课程">
                <template slot-scope="scope">
                	<el-button type="danger" @click="delCourse(scope.row)">删除本课程</el-button>
                </template>
            </el-table-column>
            

        </el-table>










        <el-dialog
                title="开课"
                :visible.sync="dialogVisible"
                width="30%"
                top="5vh"
                :before-close="handleClose">
            <!--<span>这是一段信息</span>-->

            <el-steps :active="active" finish-status="success">

                <el-step title="步骤 1">
                </el-step>
                <el-step title="步骤 2">
                </el-step>
                <el-step title="步骤 3">
                </el-step>
            </el-steps>

            <div>
                <template v-if="active == 0">

                        <el-row style="line-height: 50px;margin-left: 6%;">
                            <span :span="12" style="font-weight: bold">课程:</span>

                        <el-select v-model="mySubject" value-key="cid" placeholder="请选择" filterable clearable>
                            <el-option

                                    v-for="item in subjectContent"
                                    :key="item.cid"
                                    :label="item.cname"
                                    :value="item">

                            </el-option>
                        </el-select>
                        </el-row>

                    <el-row style="line-height: 50px;margin-left: 6%;">
                        <span :span="12" style="font-weight: bold">周几:</span>

                        <el-select v-model="myWeek" value-key="value" placeholder="请选择" filterable clearable>
                            <el-option

                                    v-for="item in weekContent"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item">

                            </el-option>
                        </el-select>
                    </el-row>


                    <div class="block" style="line-height: 50px">
                        <span class="demonstration" style="font-weight: bold">开始时间:</span>
                        <el-date-picker
                                v-model="startTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>


                    <div class="block" style="line-height: 50px">
                        <span class="demonstration" style="font-weight: bold">结束时间:</span>
                        <el-date-picker
                                v-model="endTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>

                    <div style="line-height: 50px">

                        <el-row>
                            <el-col :span="4">
                                <span style="font-weight: bold">节次:</span>
                            </el-col>

                            <el-col :span="4">
                                <el-input v-model="subjectNumStart" placeholder=""></el-input>
                            </el-col>

                            <el-col :span="2">
                                至
                            </el-col>

                            <el-col :span="4">
                                <el-input v-model="subjectNum" placeholder=""></el-input>
                            </el-col>
                        </el-row>


                    </div>
                </template>
                <template v-if="active == 1">


                    <el-row style="line-height: 50px;margin-left: 6%;">
                        <span :span="12" style="font-weight: bold">可选教室:</span>

                        <el-select v-model="myClassroom" value-key="classroomid" placeholder="请选择" filterable clearable>
                            <el-option

                                    v-for="item in classroomContent"
                                    :key="item.classroomid"
                                    :label="item.classroomname+'---'+'座位数:'+item.galleryful"
                                    :value="item">

                            </el-option>
                        </el-select>
                    </el-row>


                </template>
                <template v-if="active == 2">


                    <el-table
                            ref="multipleTable"
                            :data="studentContent"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="姓名"
                                prop="name"
                                width="120">
                            <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                        </el-table-column>
                        <el-table-column
                                prop="jobnum"
                                label="学号"
                                width="120">
                        </el-table-column>

                    </el-table>




                </template>
            </div>
            <template v-if="active < 2">
                <el-button style="margin-top: 12px;margin-left: 10vw;font-weight: bold;" @click="next">下一步</el-button>
            </template>



            <span slot="footer" class="dialog-footer">
            <template v-if="active == 2">

                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="commitData">上 传</el-button>
            </template>

          </span>
        </el-dialog>

    </div>


</template>


<script>
    import axios from 'axios'
    export default {

        name:'subject',
        data () {
            return {
                mySubject:'',
                myWeek:'',
                weekContent: [{
                    value: '星期一',
                    label: '星期一'
                }, {
                    value: '星期二',
                    label: '星期二'
                }, {
                    value: '星期三',
                    label: '星期三'
                }, {
                    value: '星期四',
                    label: '星期四'
                }, {
                    value: '星期五',
                    label: '星期五'
                }, {
                    value: '星期六',
                    label: '星期六'
                }, {
                    value: '星期日',
                    label: '星期日'
                }],
                myStudent: [],

                classroomValid:"",
                startTime:'',
                endTime:'',
                subjectNumStart:'',
                subjectNum:'',
                active: 0,
                dialogVisible: false,
                teacherId:this.personData.id,
                classContent:'',
                subjectContent:'',
                classroomContent:'',
                myClassroom:'',
                studentContent:'',
            }
        },
        props:[
            'personData'
        ],
        created(){
            this.updateData();
        },
        watch: {
            dialogVisible:function () {
                if(this.dialogVisible == true)
                {
                    var self = this;
                    var qs = require('qs');
                    axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/selectByOid', qs.stringify({
                        organizationid: self.personData.organizationid,

                    }))
                        .then(function (response) {
                            self.subjectContent = response.data.data;
//                    if (self.isLogin === 'success') {
//
//                    }
//                    else{
//                        self.$notify.error({
//                            title: '错误',
//                            message: '用户名或密码有误！'
//                        });
//                    }
                        })
                }else{
                	this.active = 0;
                }
            }
        },
        methods:{
        	delCourse(delCourseRow){
        		var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/deleteById', qs.stringify({
                    courseid: delCourseRow.courseid,
                }))
                    .then(function (response) {
                    	self.updateData();
                        self.active = 0;
                            self.$notify.info({
                            title: '提示',
                            message: response.data.msg,
                        });
                    })
        	},
            updateData () {
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/selectByTeacher', qs.stringify({
                    teacherid: self.teacherId,
                }))
                    .then(function (response) {
                        self.classContent = response.data.data;
                        
                    })
            },
            commitData () {
                this.dialogVisible = false;
                var self = this;
                var qs = require('qs');
                var studentCommit =',';
                var classNumCommit = ',';
                for(var i = 0;i < self.myStudent.length;i++)
                {
                    studentCommit = studentCommit + self.myStudent[i].id + ',';
                }
                for(var j = Number(self.subjectNumStart);j <= Number(self.subjectNum);j++)
                {
                    classNumCommit = classNumCommit + j + ',';
                }
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/insert', qs.stringify({
                    organizationid: self.personData.organizationid,
                    classroomid: self.myClassroom.classroomid,
                    teacherid: self.personData.id,
                    coursename: self.mySubject.cname,
                    starttime:self.startTime,
                    endtime:self.endTime,
                    schooltime:classNumCommit,
                    dayofweek:self.myWeek.value,
                    studentnum: self.myStudent.length,
                    teachername: self.personData.name,
                    studentidlist: studentCommit,
                    courseadminid: self.mySubject.cid,
                    
                    classroomname: self.myClassroom.classroomname,
                    classroomsize: self.myClassroom.galleryful,
                    

                }))
                    .then(function (response) {
//                        self.subjectContent = response.data.data;
                        self.active = 0;
                            self.$notify.info({
                            title: '提示',
                            message: response.data.msg,
                        });
                        self.updateData();
                    })


            },
            addSubject() {
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            next() {
                //步骤1
                if(this.active == 0){

                    var self = this;
                    var qs = require('qs');
                    axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumClassRoomController/selectClassRoomByToUse', qs.stringify({
                        organizationid: self.personData.organizationid,
                        start:self.startTime,
                        end:self.endTime,
                        coursetime:','+self.subjectNum+',',
                        dayofweek:self.myWeek.value

                    }))
                        .then(function (response) {
                            self.classroomContent = response.data.data;
                        })

                }else if(this.active == 1)//步骤2
                {
                    var self = this;
                    var qs = require('qs');
                    axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumPersonnelController/selectAllStudent', qs.stringify({
                        organizationid: self.personData.organizationid,
                        roleid: 36,
                    }))
                        .then(function (response) {
                            self.studentContent = response.data.data;
                        })
                }

                if (this.active++ > 1) this.active = 0;
//
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.myStudent.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.myStudent.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.myStudent = val;
            },
        }
    }
</script>
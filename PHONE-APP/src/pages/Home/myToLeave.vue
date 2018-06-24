<template>
    <div id="myToLeave" style="width: 100%;">
    	
        <el-button icon="el-icon-tickets" style="float: right;" @click="myLeaveHistoryFunc">我的请假记录</el-button>
        <el-button icon="el-icon-tickets" style="float: right;" @click="myAbsentHistoryFunc">我的旷课记录</el-button>

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
                    label="上课节次"
            >
            </el-table-column>

            <el-table-column
                    prop="dayofweek"
                    label="星期几"
            >
            </el-table-column>


            <el-table-column
                    label="请假">
                <template slot-scope="scope">
                    <!--<span v-if="scope.row.isattendance == 0"><span style="color: red;font-weight: bold"><el-button type="danger" disabled>不可签到</el-button></span></span>-->
                    <span style="color: #409EFF;font-weight: bold"><el-button type="primary" @click="myToLeave(scope.row)">我要请假</el-button></span>
                </template>
            </el-table-column>
        </el-table>




        <el-dialog
                title="请假"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>姓名：</span>{{personData.name}}
            <div>学号：{{personData.jobnum}}</div>
            <div>课程：{{myRow.coursename}}</div>
              <div class="block" style="line-height: 50px;">
			    <span class="demonstration">请假日期：</span>
			    <el-date-picker
			      v-model="leaveDate"
			      type="date"
			      value-format="yyyy-MM-dd"
			      placeholder="选择日期">
			    </el-date-picker>
			  </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="commitMyLeave">提交请假</el-button>
          </span>
        </el-dialog>
        
        <el-dialog
		  title="我的请假记录"
		  :visible.sync="histroyDialogVisible"
		  width="30%"
		  :before-close="handleClose">		  
		   <el-table
                :data="myLeaveHistory"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="coursename"
                    label="课程名称"
            >
            </el-table-column>

            <el-table-column
                    prop="createdate"
                    label="请假时间"
            >
            </el-table-column>
         </el-table>
        
		  <span slot="footer" class="dialog-footer">
		    <!--<el-button @click="histroyDialogVisible = false">取 消</el-button>-->
		    <el-button type="primary" @click="histroyDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		<el-dialog
		  title="我的旷课记录"
		  :visible.sync="absentDialogVisible"
		  width="30%"
		  :before-close="handleClose">		  
		   <el-table
                :data="myAbsentHistory"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="coursename"
                    label="课程名称"
            >
            </el-table-column>

            <el-table-column
                    prop="createdate"
                    label="旷课时间"
            >
            </el-table-column>
         </el-table>
        
		  <span slot="footer" class="dialog-footer">
		    <!--<el-button @click="histroyDialogVisible = false">取 消</el-button>-->
		    <el-button type="primary" @click="absentDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		






    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'myToLeave',
        props:[
            'personData'
        ],
        data () {
            return {
            	myAbsentHistory:'',
            	absentDialogVisible:false,
            	histroyDialogVisible:false,
            	myLeaveHistory:'',
                dialogVisible:false,
                classContent:'',
                teacherId:this.personData.id,
                myRow:'',
                leaveDate:'',
            }
        },
        created () {
            this.updateData();
        },
        methods:{
        	myAbsentHistoryFunc () {
        		 var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectAllKuangKe', qs.stringify({
                    studentid:self.personData.id,
    
                }))
                    .then(function (response) {
                    	self.myAbsentHistory = response.data.data;
                    	self.absentDialogVisible = true;
                    })

        	},
        	myLeaveHistoryFunc(){
        		 var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectAllLeave', qs.stringify({
                    studentid:self.personData.id,
    
                }))
                    .then(function (response) {
                    	self.myLeaveHistory = response.data.data;
                    	self.histroyDialogVisible = true;
                    	
//                      self.$notify.info({
//                      title: '消息',
//                      message: response.data.msg
//                  	});
                    })
        	},
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            commitMyLeave () {
                this.dialogVisible=false;
                
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/insertAttendanceByLeave', qs.stringify({
                    courseid:self.myRow.courseid,
                    studentid:self.personData.id,
                    studentname:self.personData.name,
                    coursename:self.myRow.coursename,
                    date:self.leaveDate,
                }))
                    .then(function (response) {
                        self.$notify.info({
                        title: '消息',
                        message: response.data.msg
                    	});
                    })
                    
                    
            },
            myToLeave (myRow) {
                this.dialogVisible = true;
                this.myRow = myRow;
            },
            updateData(){
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectAllCourseByStudent', qs.stringify({
                    studentid: self.teacherId,
                }))
                    .then(function (response) {
                        self.classContent = response.data.data;
                    })
            },
        }
    }
</script>
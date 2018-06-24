<template>
    <div style="width: 100%">


        <el-button icon="el-icon-refresh" style="float: right;" @click="updateData">刷新页面</el-button>

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
                    label="签到状态">
                <template slot-scope="scope">
                    <span v-if="scope.row.isattendance == 0"><span style="color: red;font-weight: bold">不可签到</span></span>
                    <span v-else ><span style="color: #409EFF;font-weight: bold">可签到</span></span>
                </template>
            </el-table-column>

            <el-table-column label="开启/关闭签到">
                <template slot-scope="scope">
                    <span v-if="scope.row.isattendance == 0">
                        <el-button type="primary" @click="startSignIn(scope.row.courseid)">开启签到</el-button>
                    </span>
                    <span v-else>
                        <el-button type="danger" @click="endSignIn(scope.row)">关闭签到</el-button>
                    </span>
                </template>
            </el-table-column>


            <el-table-column label="查看签到">
                <template slot-scope="scope">

                    <span v-if="scope.row.isattendance == 0">
                        <el-button type="danger" plain disabled>不可查看</el-button>
                    </span>
                    <span v-else>
                        <el-button type="success" plain @click="checkSignIn(scope.row)">查看签到</el-button>
                    </span>
                </template>
            </el-table-column>



        </el-table>




        <el-dialog
                title="签到情况"
                :visible.sync="checkDialogVisible"
                width="30%"
                top="3vh"
                :before-close="handleClose">
 <el-button icon="el-icon-refresh" style="float: right;" @click="updateCheckList">刷新页面</el-button>
            <el-table
                :data="studentCheckSignIn"
                stripe
                height="50vh"
                style="width: 100%">
            <el-table-column
                    prop="seatnumber"
                    label="座号"
            >
            </el-table-column>

            <el-table-column
                    prop="studentname"
                    label="姓名"
            >
            </el-table-column>

    

            <el-table-column label="虚假位置信息修改">
                <template slot-scope="scope">
                    <!--<span v-if="scope.row.isattendance == 0">
                        <el-button type="primary" @click="startSignIn(scope.row.courseid)">开启签到</el-button>
                    </span>
                    <span v-else>
                        <el-button type="danger" @click="endSignIn(scope.row.courseid)">关闭签到</el-button>
                    </span>-->
                    <el-button type="primary" @click="delSeat(scope.row)">删除该位置</el-button>
                </template>
            </el-table-column>


        </el-table>
            
            <span slot="footer" class="dialog-footer">
            <el-button @click="checkDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>




    </div>
    </template>

<script>
    import axios from 'axios'
  export default {
    data () {
      return {
          checkDialogVisible:false,
          courseid:'',
          classContent:'',
          teacherId:this.personData.id,
          myRow:'',
          studentCheckSignIn:'',
          mySeatRow:'',

      }
    },
    props:[
      'personData'
    ],

    created(){
      this.updateData();
    },
      methods:{
      	delSeat(mySeatRow) {
      		 var self = this;
              var qs = require('qs');
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/deleteAttendance', qs.stringify({
                  aid: mySeatRow.aid
              }))
                  .then(function (response) {
                      self.$notify.info({
                        title: '消息',
                        message: response.data.msg
                    	});
                      self.updateCheckList();
                  })
      	},
          handleClose(done) {
              this.$confirm('确认关闭？')
                  .then(_ => {
                      done();
                  })
                  .catch(_ => {});
          },
          checkSignIn (myRow) {
              this.myRow = myRow;
              this.courseid = myRow.courseid;
              
              
              var self = this;
              var qs = require('qs');
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/selectAttendanceByState', qs.stringify({
                  courseid: self.courseid,
                  state:0,
              }))
                  .then(function (response) {
                      self.studentCheckSignIn = response.data.data;
                      self.checkDialogVisible = true;
                  })
                  
              
              
              
              
          },
          //刷新查看签到列表
          updateCheckList () {
          		var self = this;
              	var qs = require('qs');
          		axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/selectAttendanceByState', qs.stringify({
		                  courseid: self.courseid,
		                  state:0,
		              }))
		                  .then(function (response) {
		                      self.studentCheckSignIn = response.data.data;
		                      self.checkDialogVisible = true;
		                  })
          },
          updateData(){
              var self = this;
              var qs = require('qs');
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/selectByTeacher', qs.stringify({
                  teacherid: self.teacherId,
              }))
                  .then(function (response) {
                      self.classContent = response.data.data;
                  })
          },
          startSignIn (courseid) {
            var self = this;
            var qs = require('qs');
            self.courseid = courseid;
            axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/updateFlagById', qs.stringify({
                Flag: 1,
                courseid:courseid
            }))
                .then(function (response) {
                	if(response.data.code != 200)
                	{
                		//已经存在签到数据，是否覆盖
        		       self.$confirm('已有今日签到数据，是否覆盖?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
//				          self.$message({
//				            type: 'success',
//				            message: '删除成功!'
//				          });
							self.delCheckConfirmFunc();

			              
                  
                  
                  
				        }).catch(() => {
				          self.$message({
				            type: 'info',
				            message: '已取消操作'
				          });          
				        });
        
                	}else{
                		self.$notify.info({
                        title: '消息',
                        message: response.data.msg
                    	});
                    	self.updateData();
                	}
                    

                })
        },
        delCheckConfirmFunc(){
        	var self = this;
            var qs = require('qs');
        	axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/deleteAbsenteeism', qs.stringify({
			                  courseid:self.courseid
			              }))
			                  .then(function (response) {
			                      self.$message({
							            type: 'success',
							            message: response.data.msg
							          });
			                  })
        },
          endSignIn (myRow) {
              var self = this;
              var qs = require('qs');
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/updateFlagClose', qs.stringify({
                  Flag: 0,
                  courseid:myRow.courseid
              }))
                  .then(function (response) {
                      self.$notify.info({
                          title: '消息',
                          message: response.data.msg
                      });
                      self.updateData();

                  })
                  
                  
                  
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumCourseController/insertAbsenteeism', qs.stringify({
                  courseid:myRow.courseid,
                  coursename:myRow.coursename,
              }))
//                .then(function (response) {
//                    self.$notify.info({
//                        title: '消息',
//                        message: response.data.msg
//                    });
//                    self.updateData();

//                })
                  
                  
          }
      }
  }
</script>
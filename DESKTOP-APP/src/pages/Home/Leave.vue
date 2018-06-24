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


            <el-table-column label="查看签到">
                <template slot-scope="scope">

                    <!--<span v-if="scope.row.isattendance == 0">
                        <el-button type="danger" plain disabled>不可查看</el-button>
                    </span>
                    <span v-else>-->
                        <el-button type="success" plain @click="checkSignIn(scope.row)">旷课统计</el-button>
                    <!--</span>-->
                </template>
            </el-table-column>



        </el-table>
        
        <el-dialog
		  title="选择日期"
		  :visible.sync="dateDialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="block">
		    <span class="demonstration">选择需要查询签到的日期</span>
		    <el-date-picker
		      v-model="date"
		      type="date"
		      value-format="yyyy-MM-dd"
		      placeholder="选择日期">
		    </el-date-picker>
		  </div>
		  
  
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dateDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="commitDate">确 定</el-button>
		  </span>
		</el-dialog>
		
		
		
		 <el-dialog
		  title="请假详情"
		  :visible.sync="detailDialogVisible"
		  width="30%"
		  height='60vh'
		  
		  :before-close="handleClose">

		  <div style="font-weight: bold;">旷课人数{{absenteeismnum}},出勤人数{{atteancenum}}，请假人数{{leavenum}}</div>
  
   <el-table
                :data="detail.data"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="旷课名单"
            >
            </el-table-column>

        </el-table>
        
           <el-table
                :data="detail.attendancesQingJia"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="studentname"
                    label="请假名单"
            >
            </el-table-column>

        </el-table>

  
  
		  <span slot="footer" class="dialog-footer">
		    <!--<el-button @click="detailDialogVisible = false">取 消</el-button>-->
		    <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		
		


    </div>
</template>

<script>
	import axios from 'axios'
  export default {
    data () {
      return {
 		date:'',
        dateDialogVisible:false,
        detailDialogVisible:false,
        classContent:'',
        myRow:'',
        
        teacherId:this.personData.id,
        detail:'',
        absenteeismnum:'',
        atteancenum:'',
        leavenum:"",
      }
    },
    props:[
      'personData'
    ],
    created(){
    	this.updateData();
    },
    
    methods:{
    	handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
     },
    	checkSignIn (myRow) {
    		this.myRow = myRow;
    		
    		this.dateDialogVisible = true;
	        
        
//  		var self = this;
//            var qs = require('qs');
//            axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumPersonnelController/selectAllLeaveStudentTime', qs.stringify({
//                courseid: self.myRow.courseid,
//            }))
//                .then(function (response) {
////                    self.classContent = response.data.data;
//                })
//                
                  
    	},
    	commitDate () {
    		var self = this;
              var qs = require('qs');
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumPersonnelController/selectAllLeaveStudentOnDay', qs.stringify({
                  courseid: self.myRow.courseid,
                  date:self.date,
                  state:1,
              }))
                  .then(function (response) {
                  	self.dateDialogVisible = false;
                  	self.detailDialogVisible = true;
                  	self.detail = response.data;
                  	self.absenteeismnum=self.detail.absenteeisms.absenteeismnum;
			        self.atteancenum=self.detail.absenteeisms.atteancenum;
			        self.leavenum=self.detail.absenteeisms.leavenum;
//                	alert(response.data);
                  	
//                    self.classContent = response.data.data;
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
    },
  }
</script>
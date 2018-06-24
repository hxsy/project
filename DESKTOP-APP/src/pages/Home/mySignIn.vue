<template>
    <div id="mySignIn" style="width: 100%">
    	<!--{{classRoomGalleryFul}}---{{validSeat}}---{{noValidSeat}}-->
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
                    label="签到">
                <template slot-scope="scope">
                    <span v-if="scope.row.isattendance == 0"><span style="color: red;font-weight: bold"><el-button type="danger" disabled>不可签到</el-button></span></span>
                    <span v-else ><span style="color: #409EFF;font-weight: bold"><el-button type="primary" @click="nowSingIn(scope.row)">现在签到</el-button></span></span>
                </template>
            </el-table-column>
        </el-table>



        <el-dialog
                title="签到"
                :visible.sync="signInDialogVisible"
                width="30%"
                :before-close="handleClose">

            <div style="margin-left: 9vw;">
                {{info}}
                <template v-if="Latitude != ''" >
                    <div style="margin-left: -1vw;">经度：{{Longitude}}</div>
                    <div style="margin-left: -1vw;">纬度：{{Latitude}}</div>
                </template>
                <div style="margin-left: -1.7vw;line-height: 80px;"><el-button @click="getLocation" type="success" plain icon="el-icon-location-outline">定位当前经纬度</el-button></div>
                <template v-if="Latitude == ''">
                    <div><el-button type="primary" disabled>现在签到</el-button></div>
                    <span style="color: red;font-size: 10px;">注:不定位无法签到</span>
                </template>
                <template v-else>
                    <span>姓名：</span>{{personData.name}}
                    <div>学号：{{personData.jobnum}}</div>
                    <div>课程：{{myRow.coursename}}</div>
                    <div>上课地点：{{myRow.classroomname}}</div>
                   <el-row style="line-height: 50px;">
                    <span :span="12" style="font-weight: bold">选择位置:</span>

                        <el-select v-model="mySeat" value-key="" placeholder="请选择" filterable clearable>
                            <el-option

                                    v-for="item in validSeat"
                                    :key="item"
                                    :label="item"
                                    :value="item">

                            </el-option>
                        </el-select>
                        </el-row>
                    <div><el-button type="primary" @click="commitMySingIn" style="margin-top: 1vh;">现在签到</el-button></div>
                </template>
            </div>

            <span slot="footer" class="dialog-footer">
            <!--<el-button @click="signInDialogVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="signInDialogVisible = false">确 定</el-button>-->
          </span>
        </el-dialog>




    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'mySignIn',
        data () {
            return {
            	mySeat:'',
            	classRoomGalleryFul:'',
                myRow:'',
                signInDialogVisible:false,
                location:'',
                info:'',
                Longitude:'',
                Latitude:'',

                classContent:'',
                teacherId:this.personData.id,
                validSeat:'',
                noValidSeat:'',
                addressOK:false,
            }
        },
        props:[
            'personData'
        ],
        created(){
            this.updateData();
        },
        watch:{
            signInDialogVisible(){
                if(this.signInDialogVisible == true)
                {
                    this.Longitude='';
                    this.Latitude='';
                }
            }
        },
        methods:{
        	addressOkFunc(){
        		var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectInfo', qs.stringify({
                    classroomid: self.myRow.classroomid,
                    longitude:self.Longitude,
                    latitude:self.Latitude,
                }))
                    .then(function (response) {
//                  	self.commitMySingIn();
                        if(response.data.code == 200)
                        {
                        	self.addressOK = true;
                        	self.commitMySingIn();
                        }else{
                        	self.addressOK = false;
                        	
                        	self.$notify.info({
					          title: '消息',
					          message: response.data.msg
					        });
                        }
                    })
        	},
            commitMySingIn () {
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/insertAttendance', qs.stringify({
                    courseid:self.myRow.courseid,
                    studentid:self.personData.id,
                    studentname:self.personData.name,
                    seatnumber:self.mySeat,
                    coursename:self.myRow.coursename,
                }))
                    .then(function (response) {
//                      if(response.data.code == 200)
//                      {
//                      	alert('0k');
//                      }else{
//                      	alert('no OK');
//                      }

							self.$notify.info({
					          title: '消息',
					          message: response.data.msg
					        });
					    self.signInDialogVisible = false;
                        self.addressOK = false;
                    })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            updateData(){
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectAllOpenAttendanceCourse', qs.stringify({
                    studentid: self.teacherId,
                    isattendance:1,
                }))
                    .then(function (response) {
                        self.classContent = response.data.data;
                    })
            },
            nowSingIn (myRow) {
                this.myRow = myRow;
                //判断是否已经签到
                var self = this;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectIsAttendance', qs.stringify({
                    studentid: self.teacherId,
                    courseid:myRow.courseid,
                }))
                    .then(function (response) {
                        if(response.data.code == 200)
                        {
                        	self.noValidSeatFunc();
                        	self.signInDialogVisible = true;
                        }
                        else{
                        	self.$notify.info({
					          title: '消息',
					          message: response.data.msg
					        });
                        }
                    })
                    
                    
                
            },
            //查询不可用座位
            noValidSeatFunc(){
            	var self = this;
            	self.classRoomGalleryFul = self.myRow.studentnum;
                var qs = require('qs');
                axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumStudentController/selectOkToSeatNum', qs.stringify({
                    courseid:self.myRow.courseid,
                }))
                    .then(function (response) {
                        if(response.data.code == 200)
                        {
                        	self.noValidSeat = response.data.data;
                        	//查询可用座位
//                      	for(var j = 0;j < self.noValidSeat.length;j++)
//                      	{
//                      		for(var i = 1;i < self.classRoomGalleryFul;i++)
//	                        	{
//	                        		if(self.noValidSeat[j] == i)
//	                        		{
//	                        			
//	                        		}
//	                        	}
//                      	}
							self.validSeat = new Array();
							for(var i = 0;i < self.classRoomGalleryFul;i++)
							{
								self.validSeat[i] = i+1;
							}
							for(var i=0;i<self.noValidSeat.length;i++)  
						    {  
						      for(var j=0;j<self.validSeat.length;j++)  
						      {  
						        if(self.validSeat[j]==self.noValidSeat[i]){  
						          self.validSeat.splice(j,1);  
						          j=j-1;  
						        }  
						      }  
						    }   
						            	
                        }
                        else{
//                      	self.$notify.info({
//					          title: '消息',
//					          message: '您已签到，请勿重复签到'
//					        });
                        }
                    })
            },
            getLocation()
            {
                if (navigator.geolocation)
                {
                    navigator.geolocation.getCurrentPosition(this.showPosition);
                }
                else{
                    this.info="Geolocation is not supported by this browser.";
                }
            },
            showPosition(position)
            {
                this.Latitude = position.coords.latitude;
                this.Longitude = position.coords.longitude;
                if(this.Longitude == ''){}
                else{
                    this.info = '';
                }
            },


        }
    }
</script>
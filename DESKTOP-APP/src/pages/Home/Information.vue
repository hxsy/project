<template>
    <div style="margin-left: 30vw;margin-top: 10vh;">
        <el-row style="line-height: 20px">
            <el-col :span="6">
                	邮箱:
            </el-col >


            <el-col :span="16">
                <el-input v-model="email" placeholder="email"></el-input>
            </el-col>

        </el-row>


        <el-row style="line-height: 80px">
            <el-col :span="6">
                	身份证:
            </el-col >

            <el-col :span="16">
                <el-input v-model="personalID" placeholder="personalID"></el-input>
            </el-col>
        </el-row>

        <el-row style="line-height: 80px">
            <el-col :span="6">
                	年龄:
            </el-col >

            <el-col :span="16">
                <el-input v-model="age" placeholder="age"></el-input>
            </el-col>
        </el-row>

        <el-row style="line-height: 80px">
            <el-col :span="6">
                	性别:
            </el-col >

            <el-col :span="16">
                <!--<el-input v-model="sex" placeholder="sex"></el-input>-->
                <el-select v-model="mySex" value-key="value" placeholder="请选择" filterable clearable>
                    <el-option

                            v-for="item in sexContent"
                            :key="item.value"
                            :label="item.label"
                            :value="item">
                    </el-option>
                </el-select>

            </el-col>
        </el-row>





        <!--<el-row style="line-height: 80px">-->
            <!--<el-col :span="6">-->
                <!--<el-tag style="font-size: 15px;">密码:</el-tag>-->
            <!--</el-col >-->

            <!--<el-col :span="16">-->
                <!--<span>*******</span>-->
            <!--</el-col>-->

            <!--<el-col :span="2">-->
                <!--<el-button type="warning">修改密码</el-button>-->
            <!--</el-col>-->
        <!--</el-row>-->

        <el-button type="primary" style="margin-left: 6vw;margin-top: 3vh;" @click="commitChange">提交修改</el-button>
        <div>
            <!--{{dialogVisible}}-->
            <el-button type="danger" style="margin-left: 6vw;margin-top: 3vh;" @click="changePassword">修改密码</el-button>
        </div>
        
        <div style="margin-left: 5vw;margin-top: 3vh;font-size:10px;color: red;">
            <span>注:以上信息重新登录后生效</span>
        </div>
        

        <el-dialog
                title="修改密码"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <div>
                <el-input placeholder="请输入原密码" v-model="oldPassword" type="password">
                    <template slot="prepend">原密码:</template>
                </el-input>
            </div>
            <div>
                <el-input placeholder="请输入新密码" v-model="newPassword" type="password">
                    <template slot="prepend">新密码:</template>
                </el-input>
            </div>
            <div>
                <el-input placeholder="请确认新密码" v-model="newPasswordAgain" type="password">
                    <template slot="prepend">确认新密码:</template>
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="commitPassword">确 定</el-button>
          </span>
        </el-dialog>


    </div>
</template>

<script>
    import axios from 'axios'
  export default {
    data () {
      return {
          oldPassword:'',
          newPassword:'',
          newPasswordAgain:'',
          dialogVisible:false,
          email: this.personData.email,
          personalID:this.personData.peoplenum,
          age:this.personData.age,
          sex:this.personData.sex,
          mySex:this.personData.sex?'男':'女',
          sexContent:[{
              value:'男',
              label:'男'
          },{
              value:'女',
              label:'女'
          }]
      }
    },
      props:[
          'personData',
      ],
      watch:{
          dialogVisible()
          {
              if(this.dialogVisible == false){
                  this.oldPassword='';
                  this.newPassword='';
                  this.newPasswordAgain='';
              }
          }
      },
      methods:{
          handleClose(done) {
              this.$confirm('确认关闭？')
                  .then(_ => {
                      done();
                  })
                  .catch(_ => {});
          },
        updateData () {

        },

          commitPassword () {
              if(this.newPassword =='' || this.newPasswordAgain== '' || this.oldPassword == '')
              {
                  this.$notify.error({
                      title: '错误',
                      message: '填写数据不完整'
                  });
              }
            else if(this.newPassword != this.newPasswordAgain)
            {
                this.$notify.error({
                    title: '错误',
                    message: '输入两次新密码不一致'
                });
            }else{
					var self = this;
	              var qs = require('qs');
	              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumPersonnelController/updatePassword', qs.stringify({
	                  password:self.oldPassword,
	                  newpassword:self.newPassword,
	                  id:self.personData.id,
	              }))
	                  .then(function (response) {
						if(response.data.code == 200)
						{
							self.$notify({
					          title: '操作成功',
					          message: response.data.msg,
					          type: 'success'
					        });
					        self.dialogVisible = false;
						}else{
							self.$notify({
					          title: '操作失败',
					          message: response.data.msg,
					          type: 'error'
					        });
						}
	                  })
            }
          },
          changePassword () {
              this.dialogVisible = true;
          },
          commitChange(){
              var self = this;
              var qs = require('qs');
              var commitSex=self.mySex.value=='男'?1:0;
              axios.post('http://www.thinkingfastandslow.xyz:8080/sas-manager-web/prosceniumPersonnelController/updatePersonInfo', qs.stringify({
                  id: self.personData.id,
                  age:self.age,
                  email:self.email,
                  peoplenum:self.personalID,
                  sex:commitSex,
              }))
                  .then(function (response) {
						if(response.data.code == 200)
						{
							self.$notify({
					          title: '操作成功',
					          message: response.data.msg,
					          type: 'success'
					        });
						}else{
							self.$notify({
					          title: '操作失败',
					          message: response.data.msg,
					          type: 'error'
					        });
						}
                  })
          },
      }
  }
</script>
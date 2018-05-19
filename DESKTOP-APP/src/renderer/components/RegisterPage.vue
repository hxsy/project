<template>
    <div>
        <!--This is RegisterPage!-->
        <div style="margin: 0 0;text-align: center;font-size: 50px;font-weight: bold;color: darkcyan;">«©µΩ√ÿ È◊¢≤·</div>

        <div style="width: 60vw;margin-left: 13vw;text-align:center;height: 3px;background-color: gray;"></div>


        <div style="margin-top: 50px;margin-left: 30vw;width: 30vw;font-weight: bold">
            <el-input placeholder="«Î ‰»Î” œ‰" v-model="email">
                <template slot="prepend">” œ‰£∫</template>
            </el-input>
        </div>

        <div style="margin-top: 30px;margin-left: 30vw;width: 30vw;font-weight: bold">
            <el-input placeholder="«Î ‰»Î√‹¬Î" v-model="password" type="password">
                <template slot="prepend" >√‹¬Î£∫</template>
            </el-input>
        </div>


            <el-col :span="4" style="margin-left: 40vw;margin-top: 30px;">
                <el-button type="primary" @click="toLogin">»•µ«¬º</el-button>
            </el-col>

    </div>
</template>

<script>
    export default {
      data: function () {
        return {
          email: '',
          password: ''
        }
      },
      methods: {
        toLogin () {
          this.$emit('child-say', '1')
        }
      }
    }
</script>
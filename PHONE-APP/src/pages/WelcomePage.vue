<template>
    <div>
        <template v-if="pageCnt == '1'">
            <LandingPage v-on:child-say="toRegister" v-on:to-home="toHome"></LandingPage>
        </template>
        <template v-else-if="pageCnt == '2'">
            <RegisterPagte v-on:child-say="toLogin"></RegisterPagte>
        </template>

        <template v-else-if="pageCnt == '3'" >
            <home-page v-on:exit="exit" :personData="personData"></home-page>
        </template>
    </div>
</template>

<script>
  import RegisterPagte from './RegisterPage.vue'
  import LandingPage from './LandingPage.vue'
  import HomePage from './Home/HomePage.vue'

  export default {
    components: { RegisterPagte, LandingPage, HomePage },
    data: function () {
      return {
            pageCnt: '1',
            isLogin: false,
            personData:'',
      }
    },
    methods: {
      toRegister () {
        this.pageCnt = '2'
      },
      toLogin () {
        this.pageCnt = '1'
      },
      toHome (allData) {
        this.pageCnt = '3';
        this.personData = allData;
      },
      exit () {
        this.isLogin = false;
        this.pageCnt = '1'
      }
    }
  }
</script>
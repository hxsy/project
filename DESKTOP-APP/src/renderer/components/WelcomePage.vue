<template>
    <div>
        <template v-if="pageCnt == '1'">
            <LandingPage v-on:child-say="toRegister"></LandingPage>
        </template>
        <template v-else-if="pageCnt == '2'">
            <RegisterPagte v-on:child-say="toLogin"></RegisterPagte>
        </template>
    </div>
</template>

<script>
  import RegisterPagte from './RegisterPage.vue'
  import LandingPage from './LandingPage.vue'

  export default {
    components: { RegisterPagte, LandingPage },
    data: function () {
      return {
        pageCnt: '1'
      }
    },
    methods: {
      toRegister () {
        this.pageCnt = '2'
      },
      toLogin () {
        this.pageCnt = '1'
      }
    }
  }
</script>
<template>
    <div id="homePage">
        <el-container>
            <Left v-on:exit="exit" v-on:toSignIn="toSignIn" v-on:Information="Information" v-on:toLeave="toLeave"></Left>
            <template v-if="currentPage=='toSignIn'">
                <SignIn></SignIn>
            </template>

            <template v-else-if="currentPage=='Information'">
                <Information></Information>
            </template>

            <template v-else-if="currentPage=='Leave'">
                <Leave></Leave>
            </template>

        </el-container>


    </div>

</template>

<script>
    import Nav from './Nav.vue'
    import Left from './Left.vue'
    import SignIn from './SignIn.vue'
    import Information from './Information.vue'
    import Leave from './Leave.vue'
    export default {
      components: {Nav, Left, SignIn, Information, Leave},
      name: 'homePage',
      data () {
        return {
          currentPage: ''
        }
      },
      methods: {
        exit () {
          this.$emit('exit')
        },
        toSignIn () {
          this.currentPage = 'toSignIn'
        },
        Information () {
          this.currentPage = 'Information'
        },
        toLeave () {
          this.currentPage = 'Leave'
        }
      }

    }
</script>


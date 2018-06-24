<template>
    <div id="homePage">
        <el-container>
            <Left :personData="personData" v-on:exit="exit" v-on:toSignIn="toSignIn" v-on:Information="Information" v-on:toLeave="toLeave" v-on:toSubject="toSubject" v-on:mySignIn="mySignIn"
                  v-on:myToLeave="myToLeave"></Left>

            <template v-if="currentPage=='mySignIn'">
                <mySignIn :personData="personData"></mySignIn>
            </template>

            <template v-if="currentPage=='toSignIn'">
                <SignIn :personData="personData"></SignIn>
            </template>

            <template v-else-if="currentPage=='Information'" >
                <Information :personData="personData"></Information>
            </template>

            <template v-else-if="currentPage=='myToLeave'">
                <myToLeave :personData="personData"></myToLeave>
            </template>

            <template v-else-if="currentPage=='Leave'">
                <Leave :personData="personData"></Leave>
            </template>

            <template v-else-if="currentPage=='Subject'" >
                <Subject :personData="personData"></Subject>
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
    import Subject from './Subject.vue'
    import mySignIn from './mySignIn.vue'
    import myToLeave from './myToLeave.vue'
    export default {
      components: {Nav, Left, SignIn, Information, Leave, Subject, mySignIn, myToLeave},
      name: 'homePage',
	  
		props:[
		    'personData',
		],
		data(){
		  	return {
		  		currentPage: '',
	  	}
	  },
	  create(){
  		if(this.personData.roleid == 38)
    	{
    		this.currentPage = 'SignIn';
    	}else{
    		this.currentPage = 'mySignIn';
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
			},
          toSubject () {
              this.currentPage = 'Subject'
          },
          mySignIn () {
              this.currentPage = 'mySignIn'
          },
          myToLeave () {
              this.currentPage = 'myToLeave'
          }

      },
      

    }
</script>


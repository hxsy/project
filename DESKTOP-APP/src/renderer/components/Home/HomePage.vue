<template>
    <div id="homePage">
        <Nav></Nav>
        <Left v-on:exit="exit"></Left>

    </div>

</template>

<script>
    import Nav from './Nav.vue'
    import Left from './Left.vue'
    export default {
      components: { Nav, Left },
      name: 'homePage',
      methods: {
        exit () {
          this.$emit('exit')
        }
      }

    }
</script>


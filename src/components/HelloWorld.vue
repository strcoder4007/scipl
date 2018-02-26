<template>
  <div class="hello">
      <div class = "row">
          <div class="col-md-6" style="background-color: red; height: 40px;"></div>
          <div class="col-md-6" style="background-color: blue; height: 40px;"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

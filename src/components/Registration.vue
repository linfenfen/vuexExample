<template>
  <div id='registration'>
    <h3>Registration here</h3>
    <hr>
    <div class='row' v-for='user in users'>
      <h4>{{user.name}}</h4>
      <button :disabled='user.disable' @click='registerUser(user)'>registerUser</button>
    </div>
  </div>
</template>

<script>
export default{
  computed:{
    users(){
      return this.$store.getters.unregisteredUser;
    }
  },
  methods:{ 
    registerUser(user){
      this.$store.dispatch('registered',user.id)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

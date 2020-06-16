<template>
   <v-container fluid >
    <v-row class = "justify-md-center">
      <v-col cols="3">
        <v-card>
          <v-card-title>Sign in</v-card-title>
          <v-card-text>
            <v-form class="login" @submit.prevent="login">
              <v-text-field required v-model="username" type="username" placeholder="Username" />
              <v-text-field required v-model="password" type="password" placeholder="Password" />
              <v-btn type="submit">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let username = this.username
      let password = this.password
      this.$store
        .dispatch('login', { username, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

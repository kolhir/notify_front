<template>
  <v-container fluid >
    <v-row class = "justify-md-center">
      <v-col cols="3">
        <v-card>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field id="name" type="text" v-model="name" required autofocus placeholder="Username"/>
              <v-text-field id="email" type="email" v-model="email" required placeholder="E-Mail Address"/>
              <v-text-field id="password" type="password" v-model="password1" required  placeholder="Password"/>
              <v-text-field id="password-confirm" type="password" v-model="password2" required placeholder="Confirm Password"/>
              <v-btn type="submit">Register</v-btn>
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
      name: '',
      email: '',
      password1: '',
      password2: ''
    }
  },
  methods: {
    register () {
      let data = {
        username: this.name,
        email: this.email,
        password1: this.password1,
        password2: this.password2
      }
      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<template>
  <v-app-bar app color="white">
<img src="../assets/godfather_image.jpg" height="60px">
    <v-toolbar-title>Review Service</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/send_review" text>Оставить отзыв</v-btn>
    <v-btn to="/reviews" text>Отзывы</v-btn>
    <div v-if="auth">
      <v-btn @click="logout" text>Выйти</v-btn>
    </div>

    <v-btn v-else text>Войти</v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    auth () {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  mounted () {}
}
</script>
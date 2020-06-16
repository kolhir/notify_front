<template>
  <v-container fluid>
    <v-row class="justify-md-center">
      <v-col cols="3">
        <v-card>
          <v-card-title>Оставить отзыв</v-card-title>
          <v-card-text>
            <v-form class="login" @submit.prevent="sendReview">
              <v-text-field required type="text" v-model="review.ads_account" placeholder="Брали рекламу у" />
              <v-text-field required type="text" v-model="review.user_account" placeholder="Мой аккаунт" />
              <v-row class="justify-md-center align-center">
                <h3>Оценка</h3>
               <v-rating
                  v-model="review.rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                ></v-rating>
                </v-row>
                  <v-select
                    :items="items"
                    v-model="review.theme"
                    label="Тема аккаунта"
                    item-text="name"
                    item-value="id"
                  ></v-select>
              <v-btn type="submit">Отправить</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      items: null,
      review: {
        ads_account: null,
        user_account: null,
        rating: null,
        theme: null
      }
    }
  },
  methods: {
    getItems () {
      axios.get('reviews/theme')
        .then(response => {
          console.log(response.data)
          this.items = response.data
        })
    },
    sendReview () {
      axios.post('reviews/', this.review)
        .then(response => {
          this.$router.push('/reviews')
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>

<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title>
          <v-row>
            <v-col class="text-left">
              Отзывы
            </v-col>
          </v-row>
        </v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">У кого брали рекламу</th>
                  <th class="text-left">Мой аккаунт</th>
                  <th class="text-left">Оценка</th>
                  <th class="text-left">Тема аккаунта</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td class="text-left">{{ item.ads_account }}</td>
                  <td class="text-left">{{ item.user_account }}</td>
                  <td class="text-left">{{ item.rating }}</td>
                  <td class="text-left">{{ item.theme.name }}</td>

                  <td>
                    <v-btn text color="red" @click="hideAccount(item.ads_account)">Скрыть у кого брали рекламу</v-btn>
                    <v-btn text color="red" @click="hideAccount(item.user_account)">Скрыть кто брал рекламу</v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Reviews',
  data () {
    return {
      items: null
    }
  },
  methods: {
    getReview () {
      axios.get('reviews/')
        .then(response => {
          console.log(response.data)
          this.items = response.data
        })
    },
    hideAccount (account_name) {
      axios.post('reviews/hide_reviews/', { account_name: account_name })
        .then(response => {
          console.log(response.data)
          this.getReview()
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    this.getReview()
  }
}
</script>

<template>
<v-container>
  <v-row>

      <v-col cols="4">
       <v-text-field
            v-model="search"
            label="Поиск"
            type="text"
          >
          <template v-slot:append-outer>
            <div>
            <v-btn @click="searchEvent()">Поиск</v-btn></div>
          </template>
          </v-text-field>
      </v-col>
      <v-col cols="5">

      </v-col>
    <v-col cols="12">
      <v-card class="mx-auto">
        <v-card-title>
          <v-row>
            <v-col class="text-left">
              События
                <v-btn class="mx-3" @click="getNotifications('date_range=today')">Сегодня</v-btn></div>
                <v-btn class="mx-3" @click="getNotifications('date_range=week')">Неделя</v-btn></div>
                <v-btn class="mx-3" @click="getNotifications('date_range=month')">Месяц</v-btn></div>

            </v-col>
            <v-col class="text-right">
              <v-btn color="green" dark @click="event_dialog=true">Добавить новое</v-btn>
            </v-col>
          </v-row>
          
        </v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Название</th>
                  <th class="text-left">Описание</th>
                  <th class="text-left">Дата</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td class="text-left">{{ item.title }}</td>
                  <td class="text-left">{{ item.description }}</td>
                  <td class="text-left">{{ new Date(item.date).toLocaleString()}}</td>
                  <th>
                    <v-btn icon large @click="editEvent(index)"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn icon large @click="deleteEvent(index)"><v-icon>mdi-delete</v-icon></v-btn>
                  </th>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
      </v-card>
    </v-col>
    <v-dialog
    v-model="event_dialog"
    max-width="400"
    >
      <v-card>
      <v-card-title>
        Событие
      </v-card-title>
      <v-card-text>
      <v-text-field
        v-model="event.title"
        :counter="120"
        label="Название"
        required
      ></v-text-field>
      <v-textarea
        v-model="event.description"
        label="Описание"
      ></v-textarea>
       <v-menu
        v-model="datemenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Выберете дату"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="datemenu = false"></v-date-picker>
      </v-menu>
      <v-menu
        ref="menu"
        v-model="timemenu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Выберете время"
            prepend-icon="mdi-clock"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="timemenu"
          v-model="time"
          full-width
          format="24hr"
          @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
      </v-menu>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="saveEvent()" text>Сохранить</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
  </v-row>
</v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'Notify',
  data () {
    return {
      items: null,
      event_dialog: false,
      search: null,
      event:
        {
          title: '',
          discription: '',
          date: ''
        },
      date: '',
      time: '',
      datemenu: false,
      timemenu: false
    }
  },
  methods: {
    getNotifications (query_params) {
      let url = query_params ? `notifications?${query_params}` : 'notifications'
      console.log(url)
      axios.get(url)
        .then(response => {
          console.log(response)
          this.items = response.data
        })
    },
    saveEvent () {
      this.event.date = new Date(this.date + ' ' + this.time)
      if (this.event.id) {
        axios.put(`notifications/${this.event.id}/`, this.event)
          .then(response => {
            this.cleanModal()
            this.getNotifications()
          })
      } else {
        axios.post('notifications/', this.event)
          .then(response => {
            this.cleanModal()
            this.getNotifications()
          })
      }
    },
    editEvent (index) {
      this.event = Object.assign({}, this.items[index])
      this.date = moment(this.event.date).format('YYYY-MM-DD')
      this.time = moment(this.event.date).format('HH:mm')
      console.log(this.event)
      this.event_dialog = true
    },
    deleteEvent (index) {
      axios.delete(`notifications/${this.items[index].id}/`)
        .then(response => {
          this.getNotifications()
        })
    },
    searchEvent () {
      this.getNotifications(`search=${this.search}`)
    },
    cleanModal () {
      this.event = {
        title: '',
        discription: '',
        date: ''
      }
      this.date = ''
      this.time = ''
      this.event_dialog = false
    }
  },
  mounted () {
    this.getNotifications()
  }
}
</script>

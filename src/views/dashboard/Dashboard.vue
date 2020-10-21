<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row justify="space-around">
      <h4 class="ma-5">
        Twitter Popular Hastag#
      </h4>
    </v-row>

    <v-row
      v-if="hstagloading"
      justify="center"
    >
      <loading />
    </v-row>

    <v-row
      v-else
      justify="center"
      class="ml-10 mr-10"
    >
      <v-card
        v-for="hastag in allhashtag"
        :key="hastag.tag"
        class="ma-1 pa-1"
      >
        <a
          :href="'https://twitter.com/search?q=%23' + hastag.substring(1, 100) + '&src=typeahead_click'"
          target="_blank"
        >{{ hastag }}</a>
      </v-card>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="12"
      >
        <base-material-chart-card
          :data="mostTweetsoftheMonth.data"
          :options="mostTweetsoftheMonth.options"
          :responsive-options="mostTweetsoftheMonth.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            The Most tweet of the Month
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Total Tweet {{ datatwitter.length }}
          </p>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            & Total Hastag {{ databyhashtag.length }}
          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-clock-outline
            </v-icon>
            <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="6"
      >
        <v-card>
          <v-row justify="center">
            <h3 class="ma-5">
              Top Hastag with more then 50 tweets
            </h3>
          </v-row>

          <v-row
            v-if="hstagloading"
            justify="center"
          >
            <loading class="ma-5" />
          </v-row>
          <v-row
            v-else
            justify="left"
          >
            <v-col
              cols="4"
            >
              <v-card
                v-for="hastagcount in hastagcounttweet"
                :key="hastagcount.key"
                class="ma-5"
                elevation="3"
              >
                <h4
                  class="ml-3 mr-3 mt-5"
                >
                  <a @click="getHastagData">{{ hastagcount.hastag }}</a>
                </h4>
                <p class="ml-3 mr-3 mb-3">
                  Total Tweets: {{ hastagcount.counttweet }}
                </p>
                <p class="ml-3 mr-3 mb-3">
                  <a
                    :href="'https://twitter.com/search?q=%23' + hastagcount.hastag.substring(1, 100) + '&src=typeahead_click'"
                    target="_blank"
                    style="text-decoration:none;"
                  >
                    View on Twitter
                  </a>
                </p>
              </v-card>
            </v-col>

            <v-col
              cols="8"
            >
              <v-row
                v-if="datatweetlistbyhastag.length == 0"
                justify="center"
              >
                <p>Top 10 User on Hastag</p>
              </v-row>

              <v-row
                v-else
                class="mr-5 mt-5"
              >
                <v-row
                  v-if="loading"
                >
                  <loading />
                </v-row>
                <v-row
                  v-else
                  justify="space-around"
                >
                  <v-col>
                    <div
                      v-for="user in datausertweet"
                      :key="user.key"
                    >
                      <user-list :usertweet="user" />
                    </div>
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import Loading from '../dashboard/component/Loading'
  // import TableUser from '../dashboard/component/TableUser'
  import UserList from '../dashboard/component/UserList'
  import api from '../../services/api'

  export default {
    name: 'DashboardDashboard',
    components: {
      Loading,
      UserList,
    },
    data () {
      return {
        datatweetlistbyhastag: [],
        datausertweet: [],
        loading: false,
        datatwitter: [],
        databyhashtag: [],
        toptenhastag: [],
        hastagcounttweet: [],
        popularHastag: '#',
        hstagloading: false,
        allhashtag: [],
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        mostTweetsoftheMonth: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'ID',
            value: 'id',
          },
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Salary',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Country',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'City',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            id: 1,
            name: 'Dakota Rice',
            country: 'Niger',
            city: 'Oud-Tunrhout',
            salary: '$35,738',
          },
          {
            id: 2,
            name: 'Minerva Hooper',
            country: 'Curaçao',
            city: 'Sinaai-Waas',
            salary: '$23,738',
          },
          {
            id: 3,
            name: 'Sage Rodriguez',
            country: 'Netherlands',
            city: 'Overland Park',
            salary: '$56,142',
          },
          {
            id: 4,
            name: 'Philip Chanley',
            country: 'Korea, South',
            city: 'Gloucester',
            salary: '$38,735',
          },
          {
            id: 5,
            name: 'Doris Greene',
            country: 'Malawi',
            city: 'Feldkirchen in Kārnten',
            salary: '$63,542',
          },
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: false,
            },
            {
              text: 'Create 4 Invisible User Experiences you Never Knew About',
              value: true,
            },
          ],
          1: [
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: false,
            },
          ],
          2: [
            {
              text: 'Lines From Great Russian Literature? Or E-mails From My Boss?',
              value: false,
            },
            {
              text: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
              value: true,
            },
            {
              text: 'Sign contract for "What are conference organizers afraid of?"',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },
    async created () {
      this.hstagloading = true
      await this.getAllData()
      this.databyhashtag = await this.getByHastag()
      this.hastagcounttweet = await this.countTweetbyTag()
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      async getAllData () {
        // var date = new Date()
        await axios.post('http://localhost:8080/medsos/set', {
          type: 'twitter',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .catch(err => console.log(err))
          .then(res => {
            var response = res.data.data
            this.datatwitter = response
            var hstag = []
            this.mostTweetsoftheMonth.data.labels.forEach(month => {
              var count = []
              response.forEach(element => {
                if (month === element.tanggal.split(' ')[3]) {
                  count.push(element)
                  this.mostTweetsoftheMonth.data.series[0][this.mostTweetsoftheMonth.data.labels.indexOf(month)] = count.length
                }
                hstag.push(element.hashtag)
              })
            })

            this.allhashtag = this.getUnique(hstag)
            this.mostTweetsoftheMonth.options.high = response.length + 200
            this.hstagloading = false
          })
      },
      getByHastag () {
        var response = this.datatwitter
        var hstag = []
        var renewdata = []
        response.forEach(tweet => {
          hstag.push(tweet.hashtag)
        })
        hstag = this.getUnique(hstag)
        hstag.forEach(ht => {
          var data = {
            hastag: ht,
            tweets: [],
          }

          response.forEach(tweet => {
            if (ht === tweet.hashtag) {
              data.tweets.push(tweet)
            }
          })

          renewdata.push(data)
        })
        return renewdata
      },
      countTweetbyTag () {
        var counttweetbytag = []
        this.getByHastag().forEach(tweet => {
          var data = {
            hastag: tweet.hastag,
            counttweet: tweet.tweets.length,
          }
          if (tweet.tweets.length > 50) {
            counttweetbytag.push(data)
          }
        })
        return counttweetbytag
      },
      async getHastagData (event) {
        this.loading = true
        // this.datatweetlistbyhastag = await api.methods.getDatabyHastag(event.target.innerHTML)
        await api.methods.getDatabyHastag(event.target.innerHTML)
          .then(res => {
            this.datatweetlistbyhastag = res
            var tempdata = []

            res.forEach(user => {
              var data = {
                name: user.name,
                username: user.username,
                url: user.url,
              }
              this.datausertweet = null
              tempdata.push(data)
            })

            var j = tempdata.length
            j = Math.max(10)
            var tempdatalagi = []
            for (var i = 0; i < j; i++) {
              tempdatalagi.push(tempdata[i])
            }

            this.datausertweet = tempdatalagi
            this.loading = false
          })
      },
      getUnique (array) {
        var uniqueArray = []
        for (var value of array) {
          if (uniqueArray.indexOf(value) === -1) {
            uniqueArray.push(value)
          }
        }
        return uniqueArray
      },
    },
  }
</script>
<style>

</style>

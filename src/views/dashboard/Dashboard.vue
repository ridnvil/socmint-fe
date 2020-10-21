<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
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
        lg="12"
      >
        <base-material-chart-card
          :data="TweetOnThisDay.data"
          :options="TweetOnThisDay.options"
          :responsive-options="TweetOnThisDay.responsiveOptions"
          color="#42a5f5"
          hover-reveal
          type="Line"
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
                v-if="loadingtoptenuser"
                justify="center"
              >
                <template>
                  <loading />
                </template>
              </v-row>

              <!-- <v-row
                v-if="datatweetlistbyhastag.length == 0"
                justify="center"
              >
                <p>Top 10 User on Hastag</p>
              </v-row> -->

              <v-row
                v-else
                class="mr-5 mt-5"
              >
                <v-row
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
        loadingtoptenuser: false,
        datatwitter: [],
        databyhashtag: [],
        toptenhastag: [],
        hastagcounttweet: [],
        popularHastag: '#',
        hstagloading: false,
        allhashtag: [],
        databyhours: [],
        headerdatabyhours: [],
        mostTweetsoftheMonth: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
          },
          options: {
            axisX: {
              showGrid: true,
            },
            low: 0,
            high: 2000,
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
        TweetOnThisDay: {
          data: {
            labels: [
              // '00',
              // '01',
              // '02',
              // '03',
              // '04',
              // '05',
              // '06',
              // '07',
              // '08',
              // '09',
              // '10',
              // '11',
              // '12',
            ],
            series: [
              // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

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
      }
    },
    async created () {
      this.hstagloading = true
      await this.getAllData()
      this.databyhashtag = await this.getByHastag()
      this.hastagcounttweet = await this.countTweetbyTag()
      this.getDataByHours()
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
        this.loadingtoptenuser = true
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
            this.loadingtoptenuser = false
          })
      },
      async getDataByHours () {
        // this.databyhours = await api.methods.getallData()
        // this.headerdatabyhours
        var date = new Date()
        var dataperdate = []
        await api.methods.getallData().then(res => {
          res.forEach(tweet => {
            // console.log(tweet.tanggal.split(' '))
            // console.log(date.toString().split(' '))
            // Local Time
            // var localhour = this.formatAMPM(date)
            // var localmonth = date.toString().split(' ')[1]
            var localday = date.toString().split(' ')[2]
            // var localyear = date.toString().split(' ')[3]

            // // Data Time
            // var hours = tweet.tanggal.split(' ')[0] + tweet.tanggal.split(' ')[1]
            // var month = tweet.tanggal.split(' ')[3]
            var day = tweet.tanggal.split(' ')[4]
            // var year = tweet.tanggal.split(' ')[6]

            // localhour = localhour.split(':')

            if ((parseInt(localday) - 1) === parseInt(day)) {
              // if () {

              // }
              if (parseInt(tweet.retweets) > 0) {
                console.log(this.TweetOnThisDay.data)
                if (parseInt(tweet.retweets) >= 20) {
                  console.log(tweet.retweets)
                  dataperdate.push(tweet.hashtag)
                }
              }
              // console.log('Today')
              // console.log(hours + '/' + day + '/' + month + '/' + year)
              // console.log(localhour + '/' + localday + '/' + localmonth + '/' + localyear)
            }
            // console.log(this.formatAMPM(date))
          })
        })
        dataperdate = this.getUnique(dataperdate)
        console.log(dataperdate)
      },
      formatAMPM (date) {
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours || 12 // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes
        var strTime = hours + ':' + minutes + '' + ampm
        return strTime
      },
      sortNumber (a, b) {
        return b - a
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

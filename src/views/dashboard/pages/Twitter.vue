<template>
  <v-container
    id="twitter-page"
    tag="section"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-row
          v-if="accounttwitter==null && hastagdata==null"
          justify="space-around"
        >
          <v-col
            cols="6"
          >
            <v-row
              v-if="loading"
              justify="center"
            >
              <loading />
            </v-row>
            <v-row
              v-else
              justify="space-around"
            >
              <v-text-field
                v-model="userid"
                label="Find with (e.g @username/#hastag)"
                color="secondary"
                hide-details
              >
                <template
                  v-if="$vuetify.breakpoint.mdAndUp"
                  v-slot:append-outer
                >
                  <v-btn
                    class="mt-n2"
                    elevation="1"
                    color="primary"
                    fab
                    small
                    @click="initDdata"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-row>
            <v-row
              v-if="!loading"
              justify="left"
            >
              <h3 v-if="!notfounddata">
                Find a content to see the analitic..!!
              </h3>
              <h3 v-else>
                Not Found.
              </h3>
            </v-row>

            <v-row
              v-else
              justify="center"
            >
              Please wait..
            </v-row>
          </v-col>
        </v-row>

        <template v-else-if="accounttwitter!=null">
          <v-row>
            <v-col>
              <v-row justify="right">
                <v-col cols="11" />
                <v-col cols="1">
                  <v-icon
                    dark
                    color="primary"
                    @click="resetData"
                  >
                    mdi-close
                  </v-icon>
                </v-col>
              </v-row>
              <v-row justify="space-around">
                <v-avatar
                  color="indigo"
                  size="100"
                >
                  <img
                    alt="John"
                  >
                </v-avatar>
              </v-row>
              <v-row justify="space-around">
                <h2>{{ accounttwitter.account.username }}</h2>
              </v-row>
              <v-row justify="space-around">
                <h3>{{ accounttwitter.account.name }}</h3>
              </v-row>

              <v-row justify="space-around">
                <h4><v-icon>mdi-cellphone</v-icon> From {{ accounttwitter.account.device }}</h4>
              </v-row>

              <v-row
                class="mt-10"
                justify="space-around"
              >
                <h4>{{ accounttwitter.account.name }} Tweets</h4>
              </v-row>

              <div
                v-for="tweet in accounttwitter.tweets"
                :key="tweet.key"
              >
                <card-tweets :tweet="tweet" />
              </div>
            </v-col>
          </v-row>
        </template>

        <template v-else-if="hastagdata!=null">
          {{ hastagdata }}
        </template>
        <template v-else>
          Not Found..
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  // import * as d3 from 'd3'
  import dataset from '../../../tweets.json'
  import axios from 'axios'

  const d3 = require('d3')

  export default {
    name: 'TwitterPage',

    components: {
      Loading: () => import('../component/Loading'),
      CardTweets: () => import('../component/CardTweets'),
    },

    props: {
      user: {
        type: String,
        default: 'ridwan',
      },
    },

    data () {
      return {
        userid: '',
        userhastag: null,
        notfounddata: false,
        accounttwitter: null,
        hastagdata: null,
        value: 100,
        loading: false,
        connection: false,
        open: true,
        width: 400,
        height: 200,
        margin: {
          top: 50,
          right: 50,
          left: 50,
          bottom: 50,
        },
        monthlyChart: {
          data: null,
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
        weeklyChart: {
          data: null,
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 50,
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
    computed: {
      ...mapState(['username']),
      username: {
        get () {
          return this.$store.state.username
        },
      },
    },
    created () {

    },
    methods: {
      async initDdata () {
        this.loading = true
        await this.initChart(false)
        await this.getData()
        await this.initChart(this.open)
        this.userid = ''
        // this.open = false
      },
      async getAllHastag (valHastag) {
        var hstag = []
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

            response.forEach(tweet => {
              // console.log(tweet)
              if (tweet.hashtag === valHastag) {
                hstag.push(tweet)
              }
            })
            this.loading = false
          })
        return hstag
      },
      async getDataUser (username) {
        var user
        await axios.post('http://localhost:8080/medsos/set', {
          type: 'twitter' + username,
          where: "username='" + username + "'",
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .catch(err => console.log(err))
          .then(res => {
            var response = res.data.data
            if (response != null) {
              user = {
                account: {},
                tweets: [],
              }
              response.forEach(tweet => {
                if (username === tweet.username) {
                  user.account = {
                    username: tweet.username,
                    device: tweet.device,
                    name: tweet.name,
                  }
                  user.tweets.push(tweet)
                  this.loading = false
                }
              })
            }
          })
        return user
      },
      async getData () {
        this.loading = true
        if (this.userid.includes('@')) {
          this.accounttwitter = await this.getDataUser(this.userid)
          console.log(this.accounttwitter)
        } else if (this.userid.includes('#')) {
          this.hastagdata = await this.getAllHastag(this.userid)
          console.log(this.hastagdata)
        } else {
          this.notfounddata = true
          this.loading = false
          console.log('Incorrect Value')
        }
      },
      initChart (show) {
        const width = this.width
        const height = this.height

        const nodes = dataset.nodes.map(d => Object.create(d))
        const links = dataset.links.map(d => Object.create(d))

        if (show) {
          var simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 2, height / 2))

          var svg = d3.select('#chart')
            .append('svg')
            .attr('viewBox', [0, 0, width, height])

          var link = svg.append('g')
            .attr('stroke', 'black')
            .selectAll('line')
            .data(links)
            .join('line')
            .attr('class', 'link')
            .attr('stroke-width', d => d.value)

          var node = svg.append('g')
            .selectAll('image')
            .data(nodes)
            .join('image')
            .attr('xlink:href', d => d.image)
            .attr('x', -15)
            .attr('y', -15)
            .attr('width', 25)
            .attr('height', 25)
            .attr('class', 'node')
            .call(this.drag(simulation))

          node.append('title').text(d => d.id)

          node.on('mouseover', action => {
            action.target.style.width = 27
            action.target.style.height = 27
          })

          node.on('mouseout', action => {
            action.target.style.width = 25
            action.target.style.height = 25
          })

          node.on('click', action => {
            window.open('https://twitter.com/' + action.target.textContent, '_blank')
          })

          simulation.on('tick', () => {
            link
              .attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y)

            node.attr('transform', d => 'translate(' + d.x + ', ' + d.y + ')')
          })
        } else {
          d3.selectAll('#chart > *').remove()
        }
      },
      resetData () {
        this.hastagdata = null
        this.accounttwitter = null
        this.userexist = true
        this.loading = false
      },
      drag (simulation) {
        var dragstarted = (event) => {
          if (!event.active) simulation.alphaTarget(0.3).restart()
        }

        var dragged = (event) => {
          event.subject.fx = event.x
          event.subject.fy = event.y
        }

        var dragended = (event) => {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
        }

        return d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended)
      },
    },
  }
</script>

<style>
  .node {
    object-fit: cover;
  }

  .node text {
    pointer-events: none;
    font: 10px sans-serif;
  }

  .link {
    stroke: #ccc;
  }
</style>

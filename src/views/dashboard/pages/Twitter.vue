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
          v-if="account==null"
          justify="space-around"
        >
          <v-col
            class="justify"
            cols="6"
          >
            <v-text-field
              v-model="userid"
              :label="$t('Find by twitter username (e.g @username)')"
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
                  fab
                  small
                  @click="initDdata"
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-row justify="space-around">
              <h3>
                The Twitter Account to see the analitic..!
              </h3>
            </v-row>
          </v-col>
        </v-row>

        <v-row v-else>
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
              />
            </v-row>
            <v-row justify="space-around">
              <h2>{{ account.username }}</h2>
            </v-row>
            <v-row justify="space-around">
              <h4><v-icon>mdi-map-marker</v-icon><a :href="account.location.url">{{ account.location.name }}</a></h4>
            </v-row>
            <v-row justify="space-around">
              <h4><v-icon>mdi-cellphone</v-icon> From {{ account.devices }}</h4>
            </v-row>
            <v-row justify="space-around">
              <v-col>
                <base-material-stats-card
                  color="primary"
                  icon="mdi-twitter"
                  title="Followers"
                  :value="account.followers.length.toString()"
                  sub-icon="mdi-clock"
                  sub-text="Just Updated"
                />
              </v-col>
              <v-col>
                <base-material-stats-card
                  color="primary"
                  icon="mdi-twitter"
                  title="Following"
                  :value="account.following.length.toString()"
                  sub-icon="mdi-clock"
                  sub-text="Just Updated"
                />
              </v-col>
            </v-row>

            <v-row justify="space-around">
              <h4>Popular Hastag#</h4>
            </v-row>

            <v-row>
              <v-col />
              <v-card
                v-for="hastag in userhastag"
                :key="hastag.tag"
                class="ma-1 pa-1"
              >
                <a :href="hastag.url">{{ hastag.tag }}</a>
              </v-card>
              <v-col />
            </v-row>

            <v-row>
              <v-col>
                <base-material-chart-card
                  :data="monthlyChart.data"
                  :options="monthlyChart.options"
                  :responsive-options="monthlyChart.responsiveOptions"
                  color="#E91E63"
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
                    Monthly Tweets Statistic
                  </h4>

                  <p class="d-inline-flex font-weight-light ml-2 mt-1">
                    Last Tweets By Monthly..
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
            </v-row>

            <v-row>
              <v-col>
                <base-material-chart-card
                  :data="weeklyChart.data"
                  :options="weeklyChart.options"
                  :responsive-options="weeklyChart.responsiveOptions"
                  color="#3f51b5"
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
                    Weekly Tweets Statistic
                  </h4>

                  <p class="d-inline-flex font-weight-light ml-2 mt-1">
                    Last Tweets By Weekly..
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
            </v-row>

            <v-card>
              <v-card-title>
                Connection
              </v-card-title>
              <v-card-text>
                <div
                  id="chart"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import dummy from '../../../dummy'
  // import * as d3 from 'd3'
  import dataset from '../../../tweets.json'
  const d3 = require('d3')

  export default {
    name: 'TwitterPage',

    components: {
      // Loading: () => import('../component/Loading'),
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
        account: null,
        loadAccount: dummy,
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
    methods: {
      async initDdata () {
        await this.initChart(false)
        await this.getData()
        await this.initChart(this.open)
        this.userid = ''
        // this.open = false
      },
      getData () {
        this.loading = true
        for (let index = 0; index < this.loadAccount.length; index++) {
          if (this.loadAccount[index].username === this.userid) {
            this.account = this.loadAccount[index]
            this.monthlyChart.data = this.loadAccount[index].monthlytweet
            this.weeklyChart.data = this.loadAccount[index].weeklytweet
            this.userhastag = this.loadAccount[index].hastag
            console.log(this.monthlyChart)
          }
        }
      },
      initChart (show) {
        const width = this.width
        const height = this.height

        const nodes = dataset.nodes.map(d => Object.create(d))
        const links = dataset.links.map(d => Object.create(d))

        if (show) {
          // var svg = d3.select('#chart').append('svg')
          //   .attr('width', width)
          //   .attr('height', height)

          // var force = d3.layout.force()
          //   .gravity(0.05)
          //   .distance(100)
          //   .charge(-100)
          //   .size([width, height])

          // d3.json('../../../tweets.json', (dt) => {
          //   console.log(dt)
          //   force.nodes(dt.nodes)
          //     .links(dt.links)
          //     .start()

          //   var link = svg.selectAll('.link')
          //     .data(dt.links)
          //     .enter().append('line')
          //     .attr('class', 'link')

          //   var node = svg.selectAll('.node')
          //     .data(dt.nodes)
          //     .enter().append('g')
          //     .attr('class', 'node')
          //     .call(force.drag)

          //   node.append('image')
          //     .attr('xlink:href', 'https://github.com/favicon.ico')
          //     .attr('x', -8)
          //     .attr('y', -8)
          //     .attr('width', 16)
          //     .attr('height', 16)

          //   node.append('text')
          //     .attr('dx', 12)
          //     .attr('dy', '.35em')
          //     .text(d => d.id)

          //   force.on('tick', () => {
          //     link.attr('x1', d => d.source.x)
          //       .attr('y1', d => d.source.y)
          //       .attr('x2', d => d.target.x)
          //       .attr('y2', d => d.target.y)

          //     node.attr('transform', d => 'translate(' + d.x + ', ' + d.y + ')')
          //   })
          // })

          console.log(nodes)
          console.log(links)
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
            .attr('width', 30)
            .attr('height', 30)
            .attr('class', 'node')
            .call(this.drag(simulation))

          // node.append('svg:image')
          //   .attr('xlink:href', 'https://github.com/favicon.ico')
          //   .attr('width', 16)
          //   .attr('height', 16)

          node.append('title').text(d => d.id)

          node.on('load', action => {
            action.target.style.borderRadius = '50%'
          })

          node.on('mouseover', action => {
            action.target.style.width = 40
            action.target.style.height = 40
          })

          node.on('mouseout', action => {
            action.target.style.width = 30
            action.target.style.height = 30
          })

          node.on('click', action => {
            console.log(action)
            window.open('https://twitter.com/' + action.target.textContent, '_blank')
          })

          simulation.on('tick', () => {
            link
              .attr('x1', d => d.source.x)
              .attr('y1', d => d.source.y)
              .attr('x2', d => d.target.x)
              .attr('y2', d => d.target.y)

            // node
            //   .attr('cx', d => d.x)
            //   .attr('cy', d => d.y)

            node.attr('transform', d => 'translate(' + d.x + ', ' + d.y + ')')
          })
        } else {
          console.log('Chart Remove..')
          d3.selectAll('#chart > *').remove()
        }
      },
      follower (event) {
        console.log(event)
      },
      resetData () {
        this.account = null
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

<template>
  <div>
    <h1>Circle Pack in D3</h1>
    <h2>{{ msg }}</h2>
    <svg
      :height="height"
      :width="width"
    >
      <g transform="translate(50,50)">
        <circle
          v-for="c in output"
          :key="c.id"
          :r="c.r"
          :cx="c.x"
          :cy="c.y"
          :fill="c.fill"
          :stroke="c.stroke"
        />
      </g>
    </svg>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'PackChart',
    // eslint-disable-next-line vue/require-prop-types
    props: ['tweetData'],
    data () {
      return {
        msg: 'from the chart Component',
        height: 600,
        width: 600,
      }
    },
    computed: {
      packData () {
        const nestedTweet = d3.nest().key(d => d.user).entries(this.tweetData)
        const packableTweets = {
          id: 'All Tweets',
          values: nestedTweet,
        }
        return d3.hierarchy(packableTweets, d => d.values).sum(d => d.retweets ? d.retweets.length + d.favorites.length + 1 : 1)
      },
      output () {
        return this.packChart()
      },
    },
    created () {
      this.colourScale = d3.scaleOrdinal().range(['#5EAFC6', '#FE9922', '#93c464', '#75739F'])
    },
    methods: {
      packChart () {
        const packChart = d3.pack()
        packChart.size([500, 500])
        packChart.padding(10)
        const output = this.packChart(packChart).descendants()
        return output.map((d, i) => {
          const fill = this.colourScale(d.depth)
          return {
            id: i + 1,
            r: d.r,
            x: d.x,
            y: d.y,
            fill,
            stroke: 'grey',
          }
        })
      },
    },
  }
</script>

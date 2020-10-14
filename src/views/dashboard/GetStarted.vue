<template>
  <div />
</template>
<script>
  const d3 = require('d3')

  export default {
    data () {
      return {
        i: 0,
        items: [
          {
            icon: 'mdi-view-dashboard',
            title: 'dashboard',
            to: '/',
          },
          {
            icon: 'mdi-twitter',
            title: 'Twitter',
            to: '/pages/twitter',
          },
        ],
      }
    },
    computed: {
      computedItems () {
        return this.items.map(this.mapItem)
      },
    },
    created () {
      this.initSvg()
    },
    methods: {
      initSvg () {
        var width = innerWidth
        var height = innerHeight
        var size = Math.max(height, width)

        console.log(size)

        const circles = d3.packSiblings(d3.range(50)
          .map(d3.randomUniform(8, 10))
          .map(r => ({ r })))
          .filter(d => d.x > -500 && d.x < 500 && d.y > -500 && d.y < 500)

        var color = d3.scaleSequential([0, 2 * Math.PI], d3.interpolateRainbow)
        console.log(color)

        var svg = d3.select('body').append('svg')
          .attr('viewBox', [-width / 2, -height / 2, width, height])
          .attr('stroke', 'currentColor')
          .attr('stroke-width', 1.5)

        svg.selectAll('circle')
          .data(circles)
          .join('circle')
          .attr('fill', d => color(d.angle = Math.atan2(d.y, d.x)))
          .attr('cx', d => Math.cos(d.angle) * (size / Math.SQRT2 + 30))
          .attr('cy', d => Math.sin(d.angle) * (size / Math.SQRT2 + 30))
          .attr('r', d => d.r - 0.25)
          .transition()
          .ease(d3.easeCubicOut)
          .delay(d => Math.sqrt(d.x * d.x + d.y * d.y) * 10)
          .duration(1000)
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)

        svg.append('text')
          .attr('y', -100)
          .attr('x', -200)
          .attr('color', 'white')
          .attr('fill', 'white')
          .attr('font-size', '100px')
          .text('SOCMINT')

        var btn = svg.append('a')
          .on('click', (event) => {
            console.log(process.env.BASE_URL)
          })

        btn.append('text')
          .attr('color', 'white')
          .attr('y', 150)
          .attr('x', -60)
          .attr('font-size', '30px')
          .text('Get Started')
      },
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>
<style>
    body {
        margin: 0;
        background: #222;
    }

    rect {
        fill: none;
        pointer-events: all;
    }
</style>

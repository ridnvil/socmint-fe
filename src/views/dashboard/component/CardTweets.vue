<template>
  <v-row justify="space-around">
    <v-card class="ma-3">
      <div class="ma-5">
        <p>Tweet on hastag: {{ data.hashtag }}</p>
        <p>Tweet content: {{ data.content }}</p>
        <p>Tweet Post date: {{ data.tanggal }}</p>
      </div>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    props: {
      tweet: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        data: {},
      }
    },
    async created () {
      this.data = await this.tweet
      console.log(this.data)
    },
  }
</script>

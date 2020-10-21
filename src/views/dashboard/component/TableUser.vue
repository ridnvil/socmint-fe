<template>
  <v-data-table
    :headers="headers"
    :items="user"
    :items-per-page="5"
    class="elevation-1"
  />
</template>
<script>
  export default {
    props: {
      usertweet: {
        type: Array,
        default: null,
      },
    },
    data () {
      return {
        headers: [
          {
            text: 'Name',
            align: 'center',
            value: 'name',
          },
          {
            text: 'Link',
            align: 'center',
            value: 'link',
          },
        ],
        user: [],
      }
    },
    created () {
      this.user = this.usertweet
      console.log(this.user)
    },
  }
</script>

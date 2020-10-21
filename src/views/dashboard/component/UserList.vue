<template>
  <v-row>
    <v-avatar
      color="black"
      size="50"
      class="mr-1"
    >
      <img
        alt="Picture"
      >
    </v-avatar>
    <div class="mt-1">
      <p class="ma-0">
        <span>{{ user.username }}</span>
      </p>
      <p class="ma-0">
        <span>{{ user.name }}</span>
      </p>
    </div>
    <a
      :href="user.url"
      style="text-decoration:none;"
      target="_blank"
      class="ma-3"
    >
      <p>Open On Twitter <v-icon>mdi-open-in-new</v-icon></p>
    </a>
  </v-row>
</template>
<script>
  export default {
    props: {
      usertweet: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        user: {},
      }
    },
    created () {
      this.user = this.usertweet
      console.log(this.user)
    },
  }
</script>

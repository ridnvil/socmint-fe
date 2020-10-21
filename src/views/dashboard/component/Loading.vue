<template>
  <v-progress-circular
    :active="loading"
    color="primary"
    :indeterminate="true"
    :size="50"
  />
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
      }
    },
  }
</script>

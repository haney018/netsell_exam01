<template>
  <v-app id="app">
    <div id="nav pa-5">
      <v-toolbar class="px-8">
        <v-toolbar-title>GAM3XP</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items>
          <div class="pt-1">
          <v-text-field
            v-model="searchArticle"
            solo
            label="Seach Article"
            append-icon="mdi-magnify"
            @click:append="search"
          ></v-text-field>
          </div>
        </v-toolbar-items>
        
      </v-toolbar>
    </div>
    <transition
      :name="'fade'"
      :mode="'out-in'"
    >
      <router-view ref="currentComponent" :key="$route.fullPath" />
    </transition>
  </v-app>
</template>

<script>

export default {
  computed: {
    searchArticle: {
      set(value) {
        this.$store.commit('updateState', {
          type: 'searchArticle',
          data: value
        })
      },
      get() {
        return this.$store.state.searchArticle
      }
    },
    currentPage: {
      set(value) {
        this.$store.commit('updateState', {
          type: 'currentPage',
          data: value
        })
      },
      get() {
        return this.$store.state.currentPage
      }
    }
  },
  methods: {
    async search() {
      if (this.$route.name !== 'Home') {
        this.$router.push('/')
        return
      }
      this.currentPage = 1
      if (this.searchArticle.length) {
        await this.$store.dispatch('searchArticles')
      } else {
        await this.$store.dispatch('getArticles')
      }
    }
  }
}
</script>


<style lang="scss">
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

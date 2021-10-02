<template>
    <v-container class="home" grid-list-lg>
      <img class="articles-background"
        :src="require('@/assets/grey.webp')"
      />
      <div class="articles-wrap">
        <h1 class="pa-3 mt-2 mb-6" v-html="headerLabel"/>
        <v-row no-gutters justify="center">
          <v-col :xs="12" :sm="12" :md="12" :lg="12">
            <v-row no-gutters justify="center">
              <v-col
                v-for="(article) in articles"
                :key="article.id"
                cols="12"
                :xs="12" :sm="6" :md="6" :lg="4"
                class="pa-3"
              >
                <article-card :article="article" />
              </v-col>
              <div v-if="articles.length === 0 && hadSearch" class="text-center mt-5">
                <h4>No Article Found</h4>
              </div>
            </v-row>
          </v-col>
        </v-row>
        
        <div class="text-center mt-5">
          <v-pagination
            v-model="currentPage"
            :length="articles.length ? 4 : 1"
            circle
          ></v-pagination>
        </div>
      </div>
    </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ArticleCard: () => import('@/components/ArticleCard')
  },
  mounted() {
    // this.loading = true
  
    setTimeout(() => {
      if (this.searchArticle.length) {
        this.searchArticles()
      } else {
        this.getArticles()
      }
      // this.loading = false
    }, 1000);
  },
  watch: {
    currentPage() {
      this.changePage()
    }
  },
  computed: {
    ...mapState(['apiUrl', 'loading', 'searchArticle', 'hadSearch', 'articles']),
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
    },
    headerLabel() {
      if (this.hadSearch) {
        return 'Search<br/>Result'
      } else {
        return 'Latest<br/>Articles'
      }
    }
  },
  methods: {
    async getArticles() {
      await this.$store.dispatch('getArticles')
    },
    async searchArticles() {
      await this.$store.dispatch('searchArticles')
    },
    async changePage() {
      if (this.searchArticle.length) {
        await this.$store.dispatch('searchArticles')
      } else {
        await this.$store.dispatch('getArticles')
      }
      window.scrollTo(0,0);
    }
  }
}
</script>

<style lang="scss">
.home {
  position: relative;

  h1 {
    text-align: left;
  }

  .justify-center {
      -webkit-box-pack: center!important;
      -ms-flex-pack: center!important;
      justify-content: center!important;
  }

  .articles-wrap {
    position: relative;
    z-index: 10;
  }

  .articles-background {
    position: absolute;
    width: 105%;
    height: 500px;
    top: 60px;
    left: -2%;
    background-size: cover;
    border-radius: 10px;
    pointer-events: none;
  }
}
</style>
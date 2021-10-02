<template>
  <v-container class="article" grid-list-lg>
    <v-row v-if="currentArticle" class="pt-12" no-gutters justify="center">
      <v-col :xs="12" :sm="12" :md="12" :lg="12">
          <v-row no-gutters justify="center">
            <v-col class="pt-4" :xs="12" :sm="12" :md="6" :lg="6">
              <div class="art-date">{{ currentArticle.createdAt }}</div>
              <h1>{{ currentArticle.title }}</h1>
              <div class="art-author py-5">{{ currentArticle.author }}</div>
              <div class="art-text">{{ currentArticle.text }}</div>
            </v-col>
            <v-col class="pt-4" :xs="12" :sm="12" :md="6" :lg="6">
              <img :src="currentArticle.image" />
            </v-col>
            
          </v-row>
        </v-col>
    </v-row>
    <!-- <div class="about">
      <h1>This is an about page</h1>
      <div>ID: {{ $route.params.id }}</div>
      <div>{{ currentArticle }}</div>
    </div> -->
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Article',
  components: {},
  computed: {
    ...mapState(['currentArticle']),
    articleId: {
      set(value) {
        this.$store.commit('updateState', {
          type: 'articleId',
          data: value
        })
      },
      get() {
        return this.$store.state.articleId
      }
    }
  },
  created() {
    this.articleId = this.$route.params.id
    this.getArticle()
  },
  methods: {
    async getArticle() {
      await this.$store.dispatch('getArticleByID')
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  text-align: left;
  .art-date {
    
  }

  img {
    width: 100%;
  }
}
</style>

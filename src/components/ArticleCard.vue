<template>
    <v-card class="article-card" @click="openArticle">
        <div
            :style="{ backgroundImage: `url(${article.image})` }"
            class="art-image"
        >
            <div class="art-title pt-12 px-4 pb-2">
                <h4>{{ article.title }}</h4>
            </div>
            <div class="art-intro pt-12 px-4 pb-2">
                <p>{{ article.intro }}</p>
            </div>
        </div>
        <v-divider />
        <div class="art-text pa-2">
            <v-card-actions>
                <div>
                    {{ article.author }}
                    <br/>
                    <span>{{ article.createdAt }}</span>
                </div>
                <v-spacer/>
                <v-card class="profile"
                    :style="{ backgroundImage: `url(${require('@/assets/profile.png')})` }"
                >
                    <!-- <img src="@/assets/profile.png" /> -->
                </v-card>
            </v-card-actions>
        </div>
    </v-card>
</template>

<script>
export default {
  name: 'ArticleCard',
  data () {
    return {
      loading: false
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
  },
  methods: {
      openArticle() {
        this.$router.push('/article/' + this.article.id)
      }
  }
}
</script>

<style lang="scss" scoped>
.article-card {
    overflow: hidden;
    cursor: pointer;

    .art-image {
        overflow: hidden;
        position: relative;
        background-size: cover;
        height: 250px;
        transition: 0.5s ease-in-out;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:hover {
        .art-title {
            bottom: -100%;
        }
        .art-intro {
            bottom: 0%;
        }
    }

    .art-title {
        text-align: left;
        background: linear-gradient(to top, white, transparent);
        position: absolute;
        bottom: 0px;
        width: 100%;
        transition: 0.5s ease-in-out;
    }

    .art-intro {
        text-align: left;
        background: linear-gradient(to top, white, transparent);
        position: absolute;
        bottom: -100%;
        width: 100%;
        transition: 0.5s ease-in-out;
    }

    .art-text {
        text-align: left;

        .profile {
            height: 50px;
            width: 50px;
            background-size: cover;
        }

    }

    
}
</style>

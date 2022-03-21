<template>
  <v-container>
    <v-row
      v-for="card in cardlist"
      :key="card.id"
      justify="center"
      align="center"
    >
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-row align="center" class="spacer" no-gutters>
              <v-col cols="1">
                <v-avatar size="42px">
                  <v-img alt="Avatar" :src="card.user.avatar" />
                </v-avatar>
              </v-col>
              <v-col class="pa-2">
                <strong>{{ card.user.name }}</strong>
                <br />
                <span class="grey--text">{{ $getTime(card.timestamp) }}</span>
              </v-col>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              <v-col class="pa-2 text-pre-wrap">{{ card.text }} </v-col>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              <v-col
                v-for="pic in card.pictures"
                :key="pic.img_src"
                cols="6"
                class="pa-1"
              >
                <v-img :src="pic.img_src" aspect-ratio="1" />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-lazy
          v-model="isScrollDown"
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
        >
          <v-card class="mx-auto" max-width="336">
            <v-card-title>{{ loadingCardText[0] }}</v-card-title>
            <v-card-text> {{ loadingCardText[1] }} </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                dark
                :disabled="loadingCardText[0] != '加载失败'"
                @click="getThisPage"
              >
                <v-icon left>mdi-refresh</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      cardlist: [],
      page: 1,
      isScrollDown: false,
      loadingCardText: ['加载中...', '加载中...'],
    }
  },
  watch: {
    async isScrollDown(val) {
      if (val) {
        await this.getThisPage()
      }
    },
  },
  async mounted() {
    // await this.getThisPage()
  },
  methods: {
    async fetchData(page) {
      try {
        const data = await this.$axios.get(
          process.env.BASE_API_URL + `/fanartList?page=${page}`
        )
        return data.data
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async getThisPage() {
      this.loadingCardText = ['加载中...', '加载中...']
      const data = await this.fetchData(this.page)
      if (data.message) {
        this.loadingCardText = ['加载失败', data.message]
        return
      }
      if (data === []) {
        this.loadingCardText = ['加载完毕', '没有更多了']
        return
      }
      this.cardlist = this.cardlist.concat(data)
      this.page += 1
      this.isScrollDown = false
    },
  },
}
</script>

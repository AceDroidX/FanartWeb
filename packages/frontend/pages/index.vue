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
              <v-col cols="auto">
                <a
                  target="_blank"
                  :href="'https://space.bilibili.com/' + card.user.id"
                >
                  <v-avatar size="42px">
                    <v-img alt="Avatar" :src="card.user.avatar" />
                  </v-avatar>
                </a>
              </v-col>
              <v-col class="pa-2">
                <a
                  target="_blank"
                  :href="'https://space.bilibili.com/' + card.user.id"
                  class="text-decoration-none white--text"
                >
                  <strong>{{ card.user.name }}</strong>
                </a>
                <br />
                <span class="grey--text text-no-wrap">{{
                  $getTime(card.timestamp)
                }}</span>
              </v-col>
              <v-spacer />
              <v-btn
                text
                target="_blank"
                :href="'https://t.bilibili.com/' + card.id"
                class="grey--text"
                >原动态></v-btn
              >
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
            <v-row
              v-if="card.isliked"
              align="center"
              class="mt-1 ml-2"
              no-gutters
            >
              <v-col>
                <v-icon color="grey darken-1" small>mdi-thumb-up</v-icon>
                <span class="text-caption grey--text"
                  >七海Nana7mi赞了
                </span></v-col
              >
            </v-row>
            <v-row v-if="cardsViewType.value !== CardsViewTypes.NORMAL.value">
              <v-divider />
            </v-row>
            <v-row v-if="cardsViewType.value !== CardsViewTypes.NORMAL.value">
              <v-col>
                <span class="text-caption grey--text">
                  审核状态：{{
                    checkedStatus(card.checked)
                  }}
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;黑/白名单：{{
                    userInfo(card.user.id)
                  }}</span
                >
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
import { CardsViewTypes } from 'fanartweb-shared'
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      cardlist: [],
      page: 0,
      isScrollDown: false,
      loadingCardText: ['加载中...', '加载中...'],
      CardsViewTypes,
      userlist: { blacklist: [], whitelist: [] },
    }
  },
  computed: {
    isAdmin() {
      return 'token' in localStorage
    },
    ...mapState({
      cardsViewType: (state) => state.config.cardsViewType,
    }),
  },
  watch: {
    async isScrollDown(val) {
      if (val) {
        await this.getThisPage()
      }
    },
    async cardsViewType(val, old) {
      const valueSameType = [
        CardsViewTypes.NORMAL.value,
        CardsViewTypes.DETAIL.value,
      ]
      if (
        !(
          valueSameType.includes(old.value) && valueSameType.includes(val.value)
        )
      ) {
        await this.getPagesTo(this.page)
      }
      if (val.value !== CardsViewTypes.NORMAL.value) {
        await this.getUserList()
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
          this.$config.BASE_API_URL +
            `/fanartList?page=${page}&type=${this.cardsViewType.value}`,
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        return data.data
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async getThisPage() {
      const i = this.page + 1
      this.loadingCardText = ['加载中...', '加载中...']
      const data = await this.fetchData(i)
      if (data.message) {
        this.loadingCardText = ['加载失败', data.message]
        return
      }
      if (data === []) {
        this.loadingCardText = ['加载完毕', '没有更多了']
        return
      }
      this.cardlist = this.cardlist.concat(data)
      this.page = i
      this.isScrollDown = false
    },
    async getPagesTo(page) {
      this.loadingCardText = ['加载中...', '加载中...']
      let datalist = []
      let i = 0
      while (i < page) {
        i++
        const data = await this.fetchData(i)
        if (data.message) {
          this.loadingCardText = ['加载失败', data.message]
          break
        }
        if (data === []) {
          this.loadingCardText = ['加载完毕', '没有更多了']
          break
        }
        datalist = datalist.concat(data)
      }
      this.page = i
      this.isScrollDown = false
      this.cardlist = datalist
    },
    async getUserList() {
      try {
        const data = await this.$axios.get(
          this.$config.BASE_API_URL + '/userlist',
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        this.userlist = data.data.data
        return data.data.data
      } catch (error) {
        console.error(error)
        return error
      }
    },
    checkedStatus(checked) {
      if (checked === undefined) {
        return '未审核'
      } else if (checked) {
        return '✔️已通过'
      } else {
        return '❌未通过'
      }
    },
    userInfo(uid) {
      return this.userlist.blacklist?.includes(uid)
        ? '❌黑名单'
        : this.userlist.whitelist?.includes(uid)
        ? '✔️白名单'
        : '未标记用户'
    },
  },
}
</script>

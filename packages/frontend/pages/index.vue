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
            <v-row
              v-if="cardsViewType.value !== CardsViewTypes.NORMAL.value"
              align="center"
              class="spacer"
            >
              <v-col cols="auto">
                <span class="text-caption grey--text"> 审核状态：</span>
              </v-col>
              <v-col cols="auto">
                <v-menu offset-x>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      text
                      class="text-caption grey--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ checkedStatus(card.checked) }}
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item-group
                      :value="
                        Object.values(CheckedTypes)
                          .map((item) => item.name)
                          .indexOf(checkedStatus(card.checked))
                      "
                      color="primary"
                    >
                      <v-list-item
                        v-for="(item, index) in Object.values(CheckedTypes)"
                        :key="index"
                        class="text-caption grey--text"
                        @click="
                          updateChecked(card.id, item.value, card.checked)
                          card.checked = item.value
                        "
                      >
                        <v-list-item-title class="text-caption grey--text">{{
                          item.name
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <span class="text-caption grey--text"> 黑/白名单：</span>
              </v-col>
              <v-col cols="auto">
                <v-menu offset-x>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      outlined
                      text
                      class="text-caption grey--text"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ userInfo(card.user.id) }}
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item-group
                      :value="
                        Object.values(UserTypes)
                          .map((item) => item.name)
                          .indexOf(userInfo(card.user.id))
                      "
                      color="primary"
                    >
                      <v-list-item
                        v-for="(item, index) in Object.values(UserTypes)"
                        :key="index"
                        class="text-caption grey--text"
                        @click="
                          updateUserInfo(
                            card.user,
                            item.value,
                            userInfo(card.user.id)
                          )
                        "
                      >
                        <v-list-item-title class="text-caption grey--text">{{
                          item.name
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
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
import { CardsViewTypes, CheckedTypes, UserTypes } from 'fanartweb-shared'
import { mapState } from 'vuex'
export default {
  name: 'IndexPage',
  data() {
    return {
      cardlist: [],
      page: 0,
      isScrollDown: false,
      loadingCardText: ['加载中...', '加载中...'],
      userlist: { blacklist: [], whitelist: [] },
      CardsViewTypes,
      CheckedTypes,
      UserTypes,
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
          this.$config.BASE_API_URL + '/user/alllist',
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
      if (checked === undefined || checked === CheckedTypes.UNDF.value) {
        return CheckedTypes.UNDF.name
      } else if (checked) {
        return CheckedTypes.TRUE.name
      } else {
        return CheckedTypes.FALSE.name
      }
    },
    userInfo(uid) {
      return this.userlist.blacklist?.includes(uid)
        ? UserTypes.BLACKLIST.name
        : this.userlist.whitelist?.includes(uid)
        ? UserTypes.WHITELIST.name
        : UserTypes.UNDF.name
    },
    async updateChecked(id, val, old) {
      console.log(id, val, old)
      try {
        const data = await this.$axios.put(
          this.$config.BASE_API_URL + `/fanart/checked`,
          {
            id,
            checked: val,
          },
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        console.log(data.data.data)
        return data.data
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async updateUserInfo(user, val, old) {
      console.log(user, val, old)
      try {
        const data = await this.$axios.put(
          this.$config.BASE_API_URL + `/user${val ? '?type=' + val : ''}`,
          user,
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        console.log(data.data)
      } catch (error) {
        console.error(error)
        return error
      }
      if (val === UserTypes.BLACKLIST.value) {
        this.userlist.whitelist.splice(this.userlist.whitelist.indexOf(user.id), 1)
        this.userlist.blacklist.push(user.id)
      } else if (val === UserTypes.WHITELIST.value) {
        this.userlist.blacklist.splice(this.userlist.blacklist.indexOf(user.id), 1)
        this.userlist.whitelist.push(user.id)
      } else {
        this.userlist.blacklist.splice(this.userlist.blacklist.indexOf(user.id), 1)
        this.userlist.whitelist.splice(this.userlist.whitelist.indexOf(user.id), 1)
      }
    },
  },
}
</script>

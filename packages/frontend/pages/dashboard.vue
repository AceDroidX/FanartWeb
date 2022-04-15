<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-list dense>
              <v-subheader>黑名单用户</v-subheader>
              <v-list-item v-for="(item, i) in userlist.blacklist" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.id"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="setUserInfo({ id: item.id, name: item.name })"
                  >
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-list dense>
              <v-subheader>白名单用户</v-subheader>
              <v-list-item v-for="(item, i) in userlist.whitelist" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.id"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="setUserInfo({ id: item.id, name: item.name })"
                  >
                    <v-icon>mdi-close-circle-outline</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-row align="center" class="spacer" no-gutters>
              uid：<v-text-field v-model="uid"></v-text-field>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              账号名：<v-text-field v-model="username"></v-text-field>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              黑/白名单：<v-select
                v-model="type"
                :items="[UserTypes.BLACKLIST, UserTypes.WHITELIST]"
                item-text="name"
              ></v-select>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              <v-spacer />
              <v-btn
                @click="
                  setUserInfo({ id: Number(uid), name: username }, type)
                "
                >添加</v-btn
              >
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-card-title> 全局设置 </v-card-title>
            <v-card-text> 新动态的开始时间戳: </v-card-text>
            <v-text-field v-model="new_card_time"></v-text-field>
            <v-btn @click="setGlobalConfig()">确定</v-btn>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { UserTypes } from 'fanartweb-shared'
export default {
  name: 'DashboardPage',
  data() {
    return {
      userlist: { blacklist: [], whitelist: [] },
      uid: undefined,
      username: undefined,
      type: undefined,
      new_card_time: '',
      snackbar: false,
      timeout: 5000,
      snackbarText: '',
      UserTypes,
    }
  },
  watch: {},
  async mounted() {
    await Promise.all([this.fetchUserListRaw(), this.getGlobalConfig()])
  },
  methods: {
    async fetchUserListRaw() {
      try {
        const data = await this.$axios.get(
          this.$config.BASE_API_URL + '/user/listraw',
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
        const errmsg = error.response?.data?.msg
        if (error.response?.data?.code === 1) {
          this.$router.push('/login')
        }
        if (errmsg) {
          this.snackbarText = errmsg
          this.snackbar = true
        } else {
          this.snackbarText = error.message
        }
        console.error(errmsg)
        console.error(error)
        return error
      }
    },
    async setUserInfo(user, type) {
      try {
        const data = await this.$axios.put(
          this.$config.BASE_API_URL + `/user${type ? '?type=' + type : ''}`,
          user,
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        console.log(data.data)
        await this.fetchUserListRaw()
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async getGlobalConfig() {
      try {
        const data = await this.$axios.get(
          this.$config.BASE_API_URL + `/config/global`,
          {
            headers:
              'token' in localStorage
                ? { Authorization: `Bearer ${localStorage.token}` }
                : {},
          }
        )
        console.log(data.data.data)
        this.new_card_time = data.data.data.new_card_time
        return data.data
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async setGlobalConfig() {
      try {
        const data = await this.$axios.put(
          this.$config.BASE_API_URL + `/config/global`,
          {
            new_card_time: this.new_card_time,
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
  },
}
</script>

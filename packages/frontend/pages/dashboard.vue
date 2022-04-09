<template>
  <v-container>
    <v-card class="mx-auto" max-width="300">
      <v-container>
        <v-list dense>
          <v-subheader>黑名单用户</v-subheader>
          <v-list-item v-for="(item, i) in blacklist" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item.id"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="delBlacklist(item.id)">
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
    <v-card class="mx-auto" max-width="300">
      <v-container>
        <v-row align="center" class="spacer" no-gutters>
          uid：<v-text-field v-model="uid"></v-text-field>
        </v-row>
        <v-row align="center" class="spacer" no-gutters>
          账号名：<v-text-field v-model="username"></v-text-field>
        </v-row>
        <v-row align="center" class="spacer" no-gutters>
          <v-spacer />
          <v-btn @click="addBlacklist">添加</v-btn>
        </v-row>
      </v-container>
    </v-card>
    <v-card class="mx-auto" max-width="300">
      <v-container>
        <v-card-title> 全局设置 </v-card-title>
        <v-card-text> Work In Progress </v-card-text>
      </v-container>
    </v-card>
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
export default {
  name: 'DashboardPage',
  data() {
    return {
      blacklist: [],
      uid: undefined,
      username: undefined,
      snackbar: false,
      timeout: 5000,
      snackbarText: '',
    }
  },
  watch: {},
  async mounted() {
    await this.getBlacklist()
  },
  methods: {
    async getBlacklist() {
      try {
        this.loading = true
        const data = await this.$axios.get(
          this.$config.BASE_API_URL + `/blacklist?token=${localStorage.token}`
        )
        if (data.data.code !== 0) {
          return
        }
        console.log(data.data)
        this.blacklist = data.data.data
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
    async addBlacklist() {
      try {
        this.loading = true
        const data = await this.$axios.post(
          this.$config.BASE_API_URL + `/blacklist?token=${localStorage.token}`,
          {
            id: parseInt(this.uid),
            name: this.username,
          }
        )
        if (data.data.code !== 0) {
          return
        }
        console.log(data.data)
        this.blacklist = data.data.data
      } catch (error) {
        console.error(error.response?.data?.msg)
        console.error(error)
        return error
      }
    },
    async delBlacklist(uid) {
      try {
        this.loading = true
        const data = await this.$axios.delete(
          this.$config.BASE_API_URL +
            `/blacklist?token=${localStorage.token}&id=${uid}`
        )
        if (data.data.code !== 0) {
          return
        }
        console.log(data.data)
        this.blacklist = data.data.data
      } catch (error) {
        console.error(error.response?.data?.msg)
        console.error(error)
        return error
      }
    },
  },
}
</script>

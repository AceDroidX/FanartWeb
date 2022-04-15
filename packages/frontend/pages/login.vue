<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-container>
            <v-row align="center" class="spacer" no-gutters>
              账号：<v-text-field v-model="username"></v-text-field>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              密码：<v-text-field
                v-model="password"
                :append-icon="showPW ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPW ? 'text' : 'password'"
                @click:append="showPW = !showPW"
              ></v-text-field>
            </v-row>
            <v-row align="center" class="spacer" no-gutters>
              <v-alert v-if="alertType" dense text :type="alertType">{{
                alertText
              }}</v-alert>
              <v-spacer />
              <v-btn text :loading="loading" @click="login">登录</v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      showPW: false,
      loading: false,
      alertType: '',
      alertText: '',
    }
  },
  watch: {},
  async mounted() {
    // await this.getThisPage()
  },
  methods: {
    async login() {
      try {
        this.loading = true
        const data = await this.$axios.post(
          this.$config.BASE_API_URL + `/adminuser/login`,
          {
            username: this.username,
            password: this.password,
          }
        )
        if (data.data.code !== 0) {
          this.alertType = 'error'
          this.alertText = data.data.msg
          this.loading = false
          return
        }
        this.loading = false
        this.alertType = 'success'
        this.alertText = data.data.msg
        localStorage.setItem('token', data.data.data.token)
        this.$router.push('/')
      } catch (error) {
        this.loading = false
        this.alertType = 'error'
        this.alertText = error.response?.data?.msg
        console.error(error.response?.data?.msg)
        console.error(error)
        return error
      }
    },
  },
}
</script>

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="false"
      :clipped="true"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :href="item.href"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-divider class="py-2" />
        <v-list-item>
          <IntroText />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <span v-if="$config.NODE_ENV !== 'production'">{{
        $vuetify.breakpoint.name
      }}</span>
      <v-col cols="4" sm="3" md="2" lg="1">
        <v-select
          v-model="cardsViewType"
          hide-details
          return-object
          :items="viewTypes"
          item-text="name"
        ></v-select>
      </v-col>
      <v-btn v-if="isAdmin" to="/dashboard"> 管理员后台 </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { CardsViewTypes } from 'fanartweb-shared'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      viewTypes: Object.values(CardsViewTypes),
      items: [
        {
          icon: 'mdi-apps',
          title: '鲨画',
          to: '/',
        },
        {
          icon: 'mdi-chat',
          title: 'BiliSC - 七海的SC存档',
          href: 'https://bsc.acedroidx.top',
        },
      ],
      title: '#鲨画',
    }
  },
  computed: {
    isAdmin() {
      return 'token' in localStorage
    },
    cardsViewType: {
      get() {
        return this.$store.state.config.cardsViewType
      },
      set(value) {
        this.$store.commit('config/setCardsViewType', value)
      },
    },
  },
}
</script>

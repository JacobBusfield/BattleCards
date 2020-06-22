<template>
  <v-app>
    <v-app-bar app flat color="white">
      <v-btn @click='() => { if ($route.path !== "/"){$router.push("/")}}' text>
        Battle Cards
      </v-btn>

      <v-spacer></v-spacer>

      <div v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn v-for='link in links' :key='link.name' :to='link.url' text>
          <span>{{link.name}}</span>
        </v-btn>
      </div>

      <v-btn v-else text @click.stop="drawer = !drawer">
        <v-icon style="font-size:24pt">
          mdi-menu
        </v-icon>
      </v-btn>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item v-for="link in links" :key="link.name" link :to="link.url">
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import Vue from 'vue';

  export default Vue.extend({
    name: 'App',

    data: () => ({
      drawer: false,
      links: [{
          name: 'Home',
          url: '/',
        },
        {
          name: 'Help',
          url: 'help',
        },
      ],
    }),
    mounted() {
      this.connectRedirect()
    },
    methods: {
      connectRedirect() {
        let path = this.$route.fullPath
        let isConnectPath = path.split("/")[1] === "connect"
        let id = path.split("/")[2]
        if (isConnectPath) {
          if (id) {
            console.log("I should connect to: " + id)
            console.log("this:")
            console.log(this)
            this.$store.commit('connect', id)
          }
          this.$router.push("/")
        }
      }
    }
  });
</script>
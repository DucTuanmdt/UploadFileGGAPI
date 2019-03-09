<template>
  <v-app>
    <!-- <v-navigation-drawer dense fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->
    <v-toolbar color="teal" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Upload file example</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <AppHome />
    </v-content>
    <v-footer color="teal" app inset>
      
    </v-footer>
  </v-app>
</template>

<script>
  import AppHome from './components/AppHome'

  export default {
    name: 'App',
    components: {
      AppHome
    },
    data() {
      return {
        drawer: null,

        //
      }
    }
  }
</script>
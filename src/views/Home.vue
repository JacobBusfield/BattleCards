<template>
  <Page :loading="!url">
    <v-btn color="primary" :loading="!url" height="100" @click="copy()">
      <span
        style="position: absolute; top:-20px; left:0; text-transform: capitalize; font-weight: 300; font-size: 12px;">
        Give your freind this link:
      </span>
      <span ref="urlToCopy">{{ url }}</span>
      <span
        style="position: absolute; bottom:-20px; right:0; text-transform: capitalize; font-weight: 300; font-size: 12px;">
        Click to Copy
      </span>
    </v-btn>

    <div>
      {{ messages }}
    </div>

    <!-- <v-btn @click="peer.send()">
      send a message
    </v-btn> -->
  </Page>
</template>

<script>
  // @ is an alias to /src
  import Page from '@/components/Page.vue';

  export default {
    name: 'Home',
    components: {
      Page,
    },
    data: () => ({
      baseURL: window.location.href.split('#')[0],
    }),
    computed: {
      messages() {
        return this.$store.state.messages;
      },
      url() {
        let id = this.$store.getters.peerID;
        return id ? this.baseURL + '#/connect/' + id + '/' : '';
      },
    },
    methods: {
      copy() {
        navigator.clipboard.writeText(this.url);
      },
    },
  };
</script>
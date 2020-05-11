<template>
  <div class="tipster-list">
    <v-card v-for="tipster in tipsters" :key="tipster.id" class="mx-auto mb-3" color="white">
        <router-link :to="{ name: 'Profile', params: { id: tipster.id }}" tag="div">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="tipster.photoUrl" alt="">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{tipster.name}}</v-list-item-title>
          <div class="d-flex">
          <v-list-item-subtitle class="caption"><v-icon size="12">mdi-account-group</v-icon> {{tipster.followers && tipster.followers.length > 0 ? tipster.followers.length : '0'}}</v-list-item-subtitle>
          <v-list-item-subtitle class="caption"><v-icon size="12">mdi-account-group</v-icon> {{tipster.followers && tipster.followers.length > 0 ? tipster.followers.length : '0'}}</v-list-item-subtitle>
          </div>
        </v-list-item-content>
        </v-list-item>
        </router-link>
    </v-card>
  </div>
</template>

<script>
export default {
props: {
  tipsters: Array
}
}
</script>

<style>

</style>
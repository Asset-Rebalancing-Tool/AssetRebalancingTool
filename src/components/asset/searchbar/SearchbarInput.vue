<template>
  <label>
    <input
      type="text"
      placeholder="Nach Asset suchen (Bezeichnung, WKN oder ISIN)"
      @focus="showModalUnderlay"
      @blur="hideModalUnderlay"
      @input="searchAssets($event.target.value)"
    />
    <span class="icon"></span>
    <SearchbarContentWrapper
      :resultCount="state.resultCount"
      :fetchedAssets="state.publicAssets"
    />
  </label>
</template>

<script setup>
import SearchbarContentWrapper from '@/components/asset/searchbar/SearchbarContentWrapper.vue'
import axios from 'axios';
import { reactive } from 'vue'
import { useAssetStore } from "@/stores/AssetStore";

const assetStore = useAssetStore()

const state = reactive({
  publicAssets: [],
  resultCount: 0,
  cancelSource: null,
  timer: null
})

function searchAssets(inputValue) {

  // Don't fetch if the user input is smaller than 3 characters
  if (inputValue.length < 3) {
    return;
  }

  // Cancel the latest request and reset the timer, if searchAssets() is called again before the ongoing timer has expired
  if (state.timer) {
    cancelRequest();
    clearTimeout(state.timer)
    state.timer = null
  }

  // Set a timer of 500ms before firing the fetch request
  state.timer = setTimeout(async () => {
    state.cancelSource = axios.CancelToken.source();
    axios.post(
      '/asset_api/asset/search',
      { SearchString: inputValue },
      { cancelToken: state.cancelSource.token }
    ).then((response) => {
      if (response.data !== '') {
        state.publicAssets = JSON.parse(JSON.stringify(response.data));
        state.resultCount = response.data.length
        state.cancelSource = null;
      } else {
        console.log('empty')
      }
    });
  }, 500)
}

function cancelRequest() {
  if (state.cancelSource) {
    state.cancelSource.cancel();
    state.cancelSource = null;
  }
}

// Show the modal underlay when focussing the searchbar
const showModalUnderlay = () => {
  assetStore.activeModalUnderlay = true
}

// Hide the modal underlay when focussing the searchbar
const hideModalUnderlay = () => {
  assetStore.activeModalUnderlay = false
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/components/asset/searchbar/searchbar-input.scss';
</style>

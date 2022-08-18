<form>


<BaseInput
    v-model="event.title"
    label="Title"
    type="text"
/>

<button type="submit">Submit</button>
</form>

<script setup>
import BaseInput from 'src/components/forms/fields/BaseInput.vue'
import { reactive } from "vue/dist/vue";


// The components reactive state object
const state = reactive({
  publicAssets: [],
  resultCount: 0,
  timer: null,
  isLoading: false,
})
</script>

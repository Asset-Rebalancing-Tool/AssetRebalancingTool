<template>
  <div class="button-wrapper">
    <div class="button">
      <div class="icon edit"></div>
    </div>
    <div class="button group">
      <div class="icon group"></div>
      <div class="icon" :class="(isActive) ? 'arrow-down' : 'arrow-up'"></div>
    </div>
    <div class="button">
      <div class="icon delete"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  data() {
    return {
      isActive: true
    }
  }
}
</script>

<template>
  <div class="list-entry-skeleton"></div>
</template>

<style lang="scss">
.list-entry-skeleton {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: $inner-holding-row-height + 12px;
  padding: 6px;
  background-color: #292e33;
  border-radius: $secondary-border-radius;
  margin-bottom: 15px;
}

.list-entry-skeleton:before {
  content: '';
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, transparent, #31353f, transparent);
  transform: translateX(-100%);
  animation: loading 1s infinite;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>

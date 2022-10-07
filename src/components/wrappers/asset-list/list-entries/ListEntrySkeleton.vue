<template>

  <div class="list-entry-skeleton">
  </div>

<!--  <div class="list-entry-skeleton">
    <div class="skeleton-logo"></div>
    <div class="skeleton-info-wrapper">
      <div class="name"></div>
      <div class="info"></div>
    </div>
    <div class="skeleton-price"></div>
    <div class="skeleton-quantity"></div>
    <div class="skeleton-value"></div>
    <div class="skeleton-target-percentage"></div>
    <div class="skeleton-target-deviation"></div>
  </div>-->
</template>

<style lang="scss">
//@import '../../../../assets/scss/wrappers/skeleton-loader';

.list-entry-skeleton {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: $inner-holding-row-height + 12px;
  padding: 6px;
  background-color: #292E33;
  border-radius: $primary-border-radius;
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

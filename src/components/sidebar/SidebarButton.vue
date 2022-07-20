<template>
  <button class="button" :class="activeButton">
    <span class="icon" :class="iconClass"></span>
    <span>{{title}}</span>
  </button>
</template>

<script>
export default {
  name: 'SidebarButton',
  props: [
      'iconClass',
      'title',
      'isActive'
  ],
  computed: {
    activeButton() {
      return (this.isActive) ? 'active' : '';
    }
  }
}
</script>

<style scoped>
  button {
    position: relative;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border: none;
    border-right: 5px solid var(--secondary-background-color);
    background-color: transparent;
    cursor: pointer;
  }

  button.active {
    border-color: var(--main-color);
  }

  button.active:before {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80%;
    content: "";
    background-image: linear-gradient(90deg, rgba(25, 179, 153, 0), rgba(25, 179, 153, 0.24));
  }

  .icon {
    width: 22px;
    height: 22px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.6;
    z-index: 10;
  }

  button.active  .icon {
    opacity: 1;
  }

  .icon.overview { background-image: var(--icon-overview-tab); }
  .icon.asset    { background-image: var(--icon-asset-tab);    }
  .icon.broker   { background-image: var(--icon-broker-tab);   }
  .icon.history  { background-image: var(--icon-history-tab);  }

  span {
    color: var(--secondary-text-color);
    margin-left: 20px;
    cursor: pointer;
  }

  button.active span {
    color: var(--primary-text-color);
  }
</style>
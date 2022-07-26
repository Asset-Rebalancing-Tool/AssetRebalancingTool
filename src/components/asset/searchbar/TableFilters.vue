<template>
  <div class="filter-grid">
    <span class="align-left">
      <span class="label">Asset Bezeichnung<span class="icon"></span></span>
    </span>
    <span>
      <span class="label">Kurswert<span class="icon"></span></span>
    </span>
    <span>
      <span class="label">gehaltene Anteile<span class="icon"></span></span>
    </span>
    <span>
      <span class="label">aktueller Ist-Wert<span class="icon"></span></span>
    </span>
    <span>
      <span class="label">Soll-Wert<span class="icon"></span></span>
    </span>
    <span>
      <span class="label">Abweichung<span class="icon"></span></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ViewleFilters'
}
</script>

<style scoped>
  .filter-grid {
    width: 100%;
    height: 30px;
    display: grid;
    grid-template-columns: auto 102px 165px 250px 165px 102px;
    border-bottom: 1px solid var(--tertiary-background-color);
    margin-bottom: 25px;
  }

  span {
    display: flex;
    justify-content: center;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .label {
    cursor: pointer;
  }

  .icon {
    width: 16px;
    height: 16px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: var(--icon-sort);
    margin-left: 5px;
    margin-top: 5px;
  }

  .align-left {
    justify-content: flex-start;
  }
</style>
<template>
  <div class="filter-grid">
    <div
      v-for="filter in filters"
      :key="filter.columnClass"
      :class="filter.columnClass"
    >
      <span class="label">{{ filter.label }}
        <span class="icon"></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const filters = [
    { columnClass: 'info-column',      label: 'Asset Bezeichnung'  },
    { columnClass: 'price',            label: 'Kurswert'           },
    { columnClass: 'owned-quantity',   label: 'gehaltene Anteile'  },
    { columnClass: 'actual-value',     label: 'aktueller Ist-Wert' },
    { columnClass: 'targetPercentage', label: 'Soll-Wert'          },
    { columnClass: 'deviation',        label: 'Abweichung'         },
  ]
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/components/asset/table-filters';
</style>

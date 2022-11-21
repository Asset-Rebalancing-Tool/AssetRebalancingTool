import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import type { ComputedRef } from 'vue'
import type { AssetPoolEntry } from '@/models/AssetPoolEntry'
import type { AssetRenderingEntry } from '@/models/holdings/AssetRenderingEntry'
import type { RenderState } from '@/models/states/RenderState'
import type { SumState } from '@/models/states/SumState'
import type { ListActionState } from '@/models/states/ListActionState'
import type { HoldingGroup } from '@/models/holdings/HoldingGroup'

export const useAssetStore = defineStore('assetStore', () => {
  /**-******************************************************************-**/
  /**--------------------- State Object Variables -----------------------**/
  /**-******************************************************************-**/

  // Pool that contains the whole asset data objects
  let assetPool: Map<string, AssetPoolEntry> = reactive(
    new Map<string, AssetPoolEntry>()
  )

  // State that contains template rendering related variables
  let renderState: RenderState = reactive({
    assetList: new Map<string, AssetRenderingEntry>(),
    loadingFlag: true,
  })

  // State that contains all total values
  let sumState: SumState = reactive({
    totalValue: 0,
    totalPercentage: 0,
    totalTargetPercentage: 0,
    totalDeviation: 0,
  })

  let listActionState: ListActionState = reactive({
    editFlagUngrouped: false,
    deleteFlag: false,
    selectedGroup: null,
  })

  /**-******************************************************************-**/
  /**-------------------- Computed Getter Properties --------------------**/
  /**-******************************************************************-**/

  const deleteFlag: ComputedRef<boolean> = computed(
    () => listActionState.deleteFlag
  )

  const editFlagUngrouped: ComputedRef<boolean> = computed(
    () => listActionState.editFlagUngrouped
  )

  const selectedGroup: ComputedRef<HoldingGroup | null> = computed(
    () => listActionState.selectedGroup
  )

  /**-******************************************************************-**/
  /**-------------------- Asset List Render Actions ---------------------**/
  /**-******************************************************************-**/

  /**
   * Try to get an entry of the asset pool by its uuid.
   * If the uuid does not exit or the pool entry can't be accessed null will be returned
   *
   * @param uuid
   *
   * @return AssetMapEntry | null
   */
  function getAssetPoolEntryByUuid(uuid: string): AssetPoolEntry | null {
    // Ensure that the uuid exist in the asset map
    if (!assetPool.has(uuid)) {
      console.log('the uuid ' + uuid + ' was not found in the asset map')
      return null
    }

    const mapEntry: AssetPoolEntry | undefined = assetPool.get(uuid)
    return mapEntry ? mapEntry : null
  }

  /**
   * Add a new entry to the asset pool
   *
   * Ensure that the uuid of the new entry does not already exist in the map.
   * If so patch the entry with this uuid instead of adding it.
   *
   * @param uuid string
   * @param mapEntry AssetMapEntry
   *
   * @return void
   */
  function addAssetPoolEntry(uuid: string, mapEntry: AssetPoolEntry): void {
    if (!assetPool.has(uuid)) {
      assetPool.set(uuid, mapEntry)
    } else {
      console.log(
        'uuid already exists in asset map. Fired patch action instead of add action'
      )
      patchAssetPoolEntry(uuid, mapEntry)
    }
  }

  /**
   * Patch an existing asset pool entry
   *
   * Ensure that the uuid of the new entry already exist in the map.
   * If not add the entry to the asset map instead if patching it.
   *
   * @param uuid string
   * @param patchedPoolEntry AssetMapEntry
   *
   * @return void
   */
  function patchAssetPoolEntry(
    uuid: string,
    patchedPoolEntry: AssetPoolEntry
  ): void {
    if (assetPool.has(uuid)) {
      assetPool.set(uuid, patchedPoolEntry)
    } else {
      console.log(
        'uuid already exists in asset map. Fired add action instead of patch action'
      )
      addAssetPoolEntry(uuid, patchedPoolEntry)
    }
  }

  /**
   * Clear the store maps and state variables, in order to prevent bugs when re logging
   *
   * @return void
   */
  function resetStoreState(): void {
    // Clear both the asset pool and the asset render list map
    // NOTE: it is important to use clear. simply overwriting the maps with default values won't work
    assetPool.clear()
    renderState.assetList.clear()

    sumState = {
      totalValue: 0,
      totalPercentage: 0,
      totalTargetPercentage: 0,
      totalDeviation: 0
    } as SumState

    listActionState = {
      editFlagUngrouped: false,
      deleteFlag: false,
      selectedGroup: null,
    } as ListActionState
  }

  /**-******************************************************************-**/
  /**--------------- Return States, Getters And Actions -----------------**/
  /**-******************************************************************-**/

  return {
    // State object variables
    assetPool,
    renderState,
    sumState,
    listActionState,

    // Computed template properties
    editFlagUngrouped,
    deleteFlag,
    selectedGroup,

    // Asset List Render Actions
    getAssetPoolEntryByUuid,
    resetStoreState
  }
})

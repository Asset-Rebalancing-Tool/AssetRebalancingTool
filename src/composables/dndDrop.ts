import type { AssetListEntry } from '@/models/holdings/AssetListEntry'
import { AssetListEntryTypeEnum } from '@/models/enums/AssetListEntryTypeEnum'

export function applyDrag(arr: AssetListEntry[], dragResult: any) {
  const { removedIndex, addedIndex, payload } = dragResult

  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

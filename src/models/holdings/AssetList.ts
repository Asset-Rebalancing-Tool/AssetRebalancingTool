import type { EntryTypeEnum } from "@/models/enums/EntryTypeEnum";

export interface AssetList {
    uuid: string
    hasGroup: boolean
    groupUuid: string | null
    entryType: EntryTypeEnum
}
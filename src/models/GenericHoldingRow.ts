import type { GenericRowType } from '@/models/enums/GenericRowType';
import type { PublicHolding } from "@/models/PublicHolding";
import type { PrivateHolding } from "@/models/PrivateHolding";
import type { HoldingGroup } from "@/models/HoldingGroup";

export interface GenericHoldingRow {
    uuid: string
    type: GenericRowType
    publicHolding: PublicHolding | null
    privateHolding: PrivateHolding | null
    holdingGroup: HoldingGroup | null
}

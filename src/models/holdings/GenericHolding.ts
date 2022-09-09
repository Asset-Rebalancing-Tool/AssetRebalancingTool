import type { GenericRowType } from '@/models/enums/GenericRowType';
import type { PublicHolding } from "@/models/holdings/PublicHolding";
import type { PrivateHolding } from "@/models/holdings/PrivateHolding";
import type { HoldingGroup } from "@/models/holdings/HoldingGroup";

export interface GenericHolding {
    uuid: string
    type: GenericRowType
    publicHolding: PublicHolding | null
    privateHolding: PrivateHolding | null
    holdingGroup: HoldingGroup | null
}

export interface HoldingGroupRequest {
  publicHoldingUuids: string[]
  privateHoldingUuids: string[]
  groupName: string
  targetPercentage: number
}

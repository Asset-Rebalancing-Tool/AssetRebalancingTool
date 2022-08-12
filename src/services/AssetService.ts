import ownedGroups from '../data/ownedGroups.json'
import ownedAssets from '../data/ownedAssets.json'
import type { IOwnedPrivateGroups } from '@/models/old/IOwnedPrivateGroups'
import type { IOwnedPublicAssets } from '@/models/old/IOwnedPublicAssets'

export default {
  fetchOwnedGroups(): IOwnedPrivateGroups {
    return ownedGroups as IOwnedPrivateGroups
  },
  fetchOwnedAssets(): IOwnedPublicAssets {
    return ownedAssets as IOwnedPublicAssets
  },
}

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { account } from '@senswap/sen-js'

import { Avatar } from 'antd'
import IonIcon from 'shared/antd/ionicon'

import { useMint, usePool } from 'senhub/providers'

const DEFAULT_AVATARS: Array<string | undefined> = [undefined]

/**
 * Mint/Token avatar, supporting LP tokens
 * @param mintAddress -  Mint address
 * @param size - Avatar size. Default 24px.
 * @param icon - Fallback icon for unknown token
 * @param reversed - (Optional) The default LP token avatar is A-B. The reversed is to change it to B-A
 * @returns name
 */
const MintAvatar = ({
  mintAddress,
  size = 24,
  icon = <IonIcon name="diamond-outline" />,
  reversed = false,
}: {
  mintAddress: string
  size?: number
  icon?: ReactNode
  reversed?: boolean
}) => {
  const [avatars, setAvatars] = useState(DEFAULT_AVATARS)
  const { tokenProvider } = useMint()
  const { pools } = usePool()

  const deriveAvatar = useCallback(
    async (address: string) => {
      const token = await tokenProvider.findByAddress(address)
      if (token?.logoURI) return token.logoURI
      return undefined
    },
    [tokenProvider],
  )

  const deriveAvatars = useCallback(async () => {
    if (!account.isAddress(mintAddress)) return setAvatars(DEFAULT_AVATARS)
    // LP mint
    const poolData = Object.values(pools).find(
      ({ mint_lpt }) => mint_lpt === mintAddress,
    )
    if (poolData) {
      const { mint_a, mint_b } = poolData
      const avatars = await Promise.all([mint_a, mint_b].map(deriveAvatar))
      if (reversed) avatars.reverse()
      return setAvatars(avatars)
    }
    // Normal mint
    const avatar = await deriveAvatar(mintAddress)
    return setAvatars([avatar])
  }, [mintAddress, reversed, deriveAvatar, pools])

  useEffect(() => {
    deriveAvatars()
  }, [deriveAvatars])

  return (
    <Avatar.Group style={{ display: 'block', whiteSpace: 'nowrap' }}>
      {avatars.map((avatar, i) => (
        <Avatar
          key={i}
          src={avatar}
          size={size}
          style={{ backgroundColor: '#2D3355', border: 'none' }}
        >
          {icon}
        </Avatar>
      ))}
    </Avatar.Group>
  )
}

export default MintAvatar

import { ReactNode, useMemo } from 'react'

import { Avatar } from 'antd'

import useTokenProvider from '../../hooks/useTokenProvider'
import IonIcon from 'shared/antd/ionicon'
import { TokenInfo } from '@solana/spl-token-registry'

const MintAvatar = ({
  mintAddress,
  size = 24,
  icon = <IonIcon name="diamond-outline" />,
  isReserve = false,
}: {
  mintAddress: string
  size?: number
  icon?: ReactNode
  isReserve?: boolean
}) => {
  const tokens = useTokenProvider(mintAddress)
  const convertToken = useMemo(() => {
    const cloneToken: TokenInfo[] = JSON.parse(JSON.stringify(tokens))
    if (!isReserve) return cloneToken
    return cloneToken.reverse()
  }, [isReserve, tokens])
  return (
    <Avatar.Group style={{ display: 'block', whiteSpace: 'nowrap' }}>
      {convertToken.map((token, i) => (
        <Avatar
          key={token?.address || i}
          src={token?.logoURI}
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

import { useMemo } from 'react'

import useTokenProvider from 'app/shared/hooks/useTokenProvider'

const MintSymbol = ({
  mintAddress,
  separator = ' • ',
  isReverse = false,
}: {
  mintAddress: string
  separator?: string
  isReverse?: boolean
}) => {
  const tokens = useTokenProvider(mintAddress)

  const symbols = useMemo(() => {
    const symbols = tokens.map((token) => {
      const shortenAddr = `${mintAddress?.substr(0, 3)}...`
      if (!token) return shortenAddr
      return token.symbol
    })
    if (isReverse) symbols.reverse()

    return symbols.join(separator)
  }, [isReverse, mintAddress, separator, tokens])
  return <span>{symbols}</span>
}

export default MintSymbol

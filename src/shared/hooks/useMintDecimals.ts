import { useCallback, useEffect, useState } from 'react'
import { useGetMintDecimals } from '@sentre/senhub'

/**
 * Get token decimals from multiple resources. This hook needs MintProvider for working.
 * MintProvider Ref: https://docs.sentre.io/senhub/development/providers/mint-provider
 * @param mintAddress Mint address
 * @returns Decimals
 */
const useMintDecimals = (mintAddress: string) => {
  const [decimals, setDecimals] = useState<number | undefined>(undefined)
  const getDecimals = useGetMintDecimals()

  const fetchDecimals = useCallback(async () => {
    try {
      const decimals = await getDecimals({ mintAddress })
      return setDecimals(decimals)
    } catch (er: any) {
      return setDecimals(undefined)
    }
  }, [mintAddress, getDecimals])

  useEffect(() => {
    fetchDecimals()
  }, [fetchDecimals])

  return decimals
}

export default useMintDecimals

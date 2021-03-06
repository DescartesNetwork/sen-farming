import { AccountInfo, PublicKey } from '@solana/web3.js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account, FarmData } from '@senswap/sen-js'

import config from '../configs'
import { parseFarmData } from 'helper/idlParser'

const {
  sol: { farming, senAddress },
} = config

export type FarmState = Record<string, FarmData>

const NAME = 'farms'
const initialState: FarmState = {}

/**
 * Actions
 */

export const getFarms = createAsyncThunk<FarmState, void, { state: any }>(
  `${NAME}/getFarms`,
  async (_, { getState }) => {
    const { farms } = getState()
    if (Object.keys(farms).length) return farms
    // Get all farm
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await farming.connection.getProgramAccounts(farming.farmingProgramId, {
        filters: [
          { dataSize: 209 },
          { memcmp: { bytes: senAddress, offset: 97 } },
        ],
      })
    let bulk: FarmState = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = parseFarmData(buf)
      bulk[address] = data
    })
    return bulk
  },
)

export const getFarm = createAsyncThunk<
  FarmState,
  { address: string },
  { state: any }
>(`${NAME}/getFarm`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid farm address')
  const {
    farms: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const raw = await farming.getFarmData(address)
  return { [address]: raw }
})

export const upsetFarm = createAsyncThunk<
  FarmState,
  { address: string; data: FarmData },
  { state: any }
>(`${NAME}/upsetFarm`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid farm address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteFarm = createAsyncThunk(
  `${NAME}/deleteFarm`,
  async ({ farmAddress }: { farmAddress: string }) => {
    if (!account.isAddress(farmAddress)) throw new Error('Invalid address')
    return { farmAddress }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        getFarms.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        getFarm.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetFarm.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteFarm.fulfilled,
        (state, { payload }) => void delete state[payload.farmAddress],
      ),
})

export default slice.reducer

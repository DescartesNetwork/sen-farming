import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PublicKey, AccountInfo } from '@solana/web3.js'
import { account, DebtData } from '@senswap/sen-js'

import config from 'app/configs'

const {
  sol: { farming },
} = config

/**
 * Store constructor
 */

export type State = Record<string, DebtData>

const NAME = 'debts'
const initialState: State = {}

/**
 * Actions
 */

export const getDebts = createAsyncThunk(
  `${NAME}/getDebts`,
  async ({ owner }: { owner: string }) => {
    if (!account.isAddress(owner))
      throw new Error('Invalid owner/wallet address')
    const value: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }> =
      await farming.connection.getProgramAccounts(farming.farmingProgramId, {
        filters: [{ dataSize: 89 }, { memcmp: { bytes: owner, offset: 32 } }],
      })
    let bulk: State = {}
    value.forEach(({ pubkey, account: { data: buf } }) => {
      const address = pubkey.toBase58()
      const data = farming.parseDebtData(buf)
      return (bulk[address] = data)
    })
    return bulk
  },
)

export const getDebt = createAsyncThunk<
  State,
  { address: string },
  { state: any }
>(`${NAME}/getDebt`, async ({ address }, { getState }) => {
  const {
    debts: { [address]: data },
  } = getState()
  if (data) return { [address]: data }
  const debtData = await farming.getDebtData(address)
  return { [address]: debtData }
})

export const upsetDebt = createAsyncThunk<
  State,
  { address: string; data: DebtData },
  { state: any }
>(`${NAME}/upsetDebt`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const deleteDebt = createAsyncThunk(
  `${NAME}/deleteDebt`,
  async ({ address }: { address: string }) => {
    if (!account.isAddress(address)) throw new Error('Invalid address')
    return { address }
  },
)

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(getDebts.fulfilled, (state, { payload }) => payload)
      .addCase(
        getDebt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetDebt.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        deleteDebt.fulfilled,
        (state, { payload }) => void delete state[payload.address],
      ),
})

export default slice.reducer

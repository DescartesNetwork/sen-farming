import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type State = {
  farmSelected: string
}

/**
 * Store constructor
 */

const NAME = 'main'
const initialState: State = {
  farmSelected: '',
}

/**
 * Actions
 */

export const selectFarm = createAsyncThunk<State, { farmAddress: string }>(
  `${NAME}/selectFarm`,
  async ({ farmAddress }) => {
    return { farmSelected: farmAddress }
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
    void builder.addCase(
      selectFarm.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer

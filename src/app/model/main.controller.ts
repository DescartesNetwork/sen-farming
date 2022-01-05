import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Store constructor
 */

export type MainState = {
  search: string
}

const NAME = 'main'
const initialState: MainState = {
  search: '',
}

/**
 * Actions
 */

export const setSearch = createAsyncThunk<
  MainState,
  { search: string },
  { state: any }
>(`${NAME}/setSearch`, async ({ search }, { getState }) => {
  return { search }
})

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setSearch.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer

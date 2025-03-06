import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { HoneyType } from "../../utils/util"

export interface CartState {
  value: HoneyType[]
}

const initialState: CartState = {
  value: [],
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<HoneyType>) => {
      state.value = state.value.concat(action.payload)
    },
    remove: (state, action: PayloadAction<number>) => {
      const index = action.payload

      if (index < 0 || index >= state.value.length) {
        return
      }

      state.value = state.value.slice(0, index).concat(state.value.slice(index + 1))
    },
    clear: (state) => {
      state.value = []
    }
  }
})

export const {add, remove, clear} = cartSlice.actions

export default cartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
    id: number;
    name: string;
};

const initialState: UserType = { id: 0, name: ''}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<UserType>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.id = action.payload.id
            state.name = action.payload.name

        },
        deleteUser: (state) => {
            state.id = initialState.id
            state.name = initialState.name
        },
    },
})

// Action creators are generated for each case reducer function
export const { createUser, deleteUser } = userSlice.actions

export default userSlice.reducer
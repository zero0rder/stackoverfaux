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
        createUser: {
            reducer: (state, action: PayloadAction<UserType>) => {
                state.id = action.payload.id
                state.name = action.payload.name
    
            },
            prepare: (id:number, name:string) => {
                return {
                    payload: {
                        id: id,
                        name: name
                    }
                }
            }
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
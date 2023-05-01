import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import client from '../../api/client'
import { RootState } from '../../store'
import { UserType, RequestStatusType } from '../../utils/types/shared'

// Initial Users State
const initialState: RequestStatusType<UserType[]> = {
    data: [],
    status: 'idle',
    error: undefined
}

// Fetch users from server/Db
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const res = await client.get<RequestStatusType<UserType[]>>('http://localhost:3000/users')
    return res
})

// Create a piece of redux state called 'users
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addToUsers: {
            reducer: (state, action: PayloadAction<UserType>) => {
                state.data.push(action.payload)
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
        removeFromUsers: (state, action: PayloadAction<number>) => {
           state.data = state.data.filter(user => user.id !== action.payload)
           return state
        },
    },
    // Handle HTTP Responses
    extraReducers(builder) {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'success'
            // Add any fetched users to the array
            state.data = state.data.concat(action.payload as any)
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error'
            state.error = action.error.message
        })
    }
})

// Action creators are generated for each case reducer function
export const { addToUsers, removeFromUsers } = usersSlice.actions

export default usersSlice.reducer

// reusable selector functions for our components can be created here
export const selectAllUsers = (state:RootState) => state.users.data
// export const selectUserById = (state:RequestStatusType<UserType[]>, userId:number) => state.data.find(user => user.id == userId)
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserType } from './userSlice'
import { questions_db } from '../mock'
import {formatUsers} from "../../utils/format"

const initialState: UserType[] = formatUsers(questions_db)

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addToUsers: {
            reducer: (state, action: PayloadAction<UserType>) => {
                state.push(action.payload)
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
           return state.filter(user => user.id !== action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addToUsers, removeFromUsers } = usersSlice.actions

export default usersSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { questions_db } from '../mock'
import type { UserType } from '../users/userSlice'
// import { AppDispatch } from '../../store'

export type AnswerType = {
    id: number;
    body: string;
    creation: number;
    score: number;
    user: UserType;
    accepted: boolean;
    comments?: CommentsType[];
}

export type QuestionType = {
    id: number;
    title: string;
    body: string;
    creation: number;
    score: number;
    user: UserType;
    answers?: AnswerType[];
    comments?: CommentsType[];
}

export type CommentsType = {
    id: number;
    body: string;
    user: UserType;
}

const initialState: QuestionType[] = questions_db

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: PayloadAction<{title: string, body: string, user: UserType}>) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes

            const newQuery: QuestionType = {
                id: 1,
                title: action.payload.title,
                body: action.payload.body,
                creation: Date.now(),
                score: 0,
                user: action.payload.user,
                answers: [],
                comments: []
            }

            state.push(newQuery)
        },
        addAnswer: (state, action: PayloadAction<{questionId: number, body: string, user: UserType}>) => {
            //consider using Map() to store questions for fast access [ O(1) insert/access | O(n) space ]
            const ansObj: AnswerType = {
                id: 0,
                body: action.payload.body,
                creation: Date.now(),
                score: 0,
                accepted: false,
                user: action.payload.user,
                comments: []
            }

            state.forEach((q:QuestionType) => {
                if(q.id == action.payload.questionId){
                    if(q.hasOwnProperty('answers')){
                        q.answers?.push(ansObj)
                    } else {
                        q.answers = [ansObj]
                    }
                }
            })
        },
        addComment: (state, action: PayloadAction<{questionId: number, body: string, user: UserType, ansId?:number}>) => {
            const question = state.filter(q => q.id == action.payload.questionId)[0]
            const comment:CommentsType = {
                id: 0,
                body: action.payload.body,
                user: action.payload.user
            }

            if(action.payload.ansId){
                //add comment to answer
                question.answers?.forEach((a:AnswerType) => {
                    if(a.id == action.payload.ansId)
                        a.comments?.push(comment)
                });

            } else {
                //add comment to question
                question.comments?.push(comment)
            }
        },
        removeQuestions: (state, action: PayloadAction<number>) => {
            return state.filter(q => q.user.id != action.payload)
        },
        removeAnswers: (state, action: PayloadAction<number>) => {
            // todo:fix removal logic
            state.map(q => q.answers?.filter(a => a.user.id != action.payload))
        },
    },
})

// Action creators are generated for each case reducer function
export const { addQuestion, addAnswer, addComment, removeQuestions, removeAnswers } = questionSlice.actions

export default questionSlice.reducer
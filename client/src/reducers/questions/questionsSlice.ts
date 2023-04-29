import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { questions_db } from '../mock'
import type { UserType } from '../users/userSlice'
import { generateRandomId } from '../../utils/format'
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

/**
 *  In a production setting "Questions", "Answers" and "Comments"
 *  would have their own separate "Slices" in respective folders
 * 
 */
export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: {
           reducer: (state, action: PayloadAction<QuestionType>) => {    
                state.push(action.payload)
            },
            prepare: (title:string, body:string, user:UserType) => {
                // In a production setting a POST request would be made to
                // the backend to save "question" record in our DB, which
                // would generate the random ID, creation date, etc. and 
                // return QuestionType object to be saved in our Redux Store

                // (All reducers would perform similar function)

                return {
                    payload: {
                        id: generateRandomId(),
                        title: title,
                        body: body,
                        user: user,
                        creation: Date.now(),
                        score: 0,
                        answers: [],
                        comments: []
                    }
                }
            }
        },
        addAnswer: {
            reducer: (state, action: PayloadAction<AnswerType & {questionId:number}>) => {
                const ansObj: AnswerType = {
                    id: action.payload.id,
                    body: action.payload.body,
                    creation: action.payload.creation,
                    score: action.payload.score,
                    accepted: action.payload.accepted,
                    user: action.payload.user,
                    comments: action.payload.comments
                }

                state.forEach((q:QuestionType) => {
                    if(q.id == action.payload.questionId)
                        q.answers?.push(ansObj)                        
                    
                })
            },
            prepare: (questionId:number, body:string, user:UserType) => {
                return {
                    payload: {
                        id: generateRandomId(),
                        questionId: questionId,
                        body: body,
                        user: user,
                        creation: Date.now(),
                        score: 0,
                        accepted: false,
                        comments: []
                    }
                }
            }
        },
        addComment: {
            reducer: (state, action: PayloadAction<CommentsType & {questionId:number, answerId?:number}>) => {
                const question = state.filter(q => q.id == action.payload.questionId)[0]
                const comment:CommentsType = {
                    id: action.payload.id,
                    body: action.payload.body,
                    user: action.payload.user
                }
    
                if(action.payload?.answerId){
                    //add comment to answer
                    question.answers?.forEach((a:AnswerType) => {
                        if(a.id == action.payload.answerId)
                            a.comments?.push(comment)
                    });
    
                } else {
                    //add comment to question
                    question.comments?.push(comment)
                }
            },
            prepare: (questionId:number, body:string, user:UserType, answerId?:number) => {
                return {
                    payload: {
                        id: generateRandomId(),
                        questionId: questionId,
                        answerId: answerId,
                        body: body,
                        user: user
                    }
                }
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
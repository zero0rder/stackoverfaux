import { useState } from 'react'
import type { UserType } from '../reducers/users/userSlice'


/**
 *      Persist user data on client. Used to manage User related State/UI updates.
 *      Ideally, You'd want to handle session management server-side (cookies, JWT, etc.)
 * 
 */


export type LocalStorageType = {
    data: UserType;
    update: (value: UserType) => void;
    delete: (str: string) => void;
}

const handleStorage = (key:string, value:UserType|undefined) => {
    if(typeof window === 'undefined')
        return value

    try{
        const res = localStorage.getItem(key)
        return res ? JSON.parse(res) : value

    } catch(err){
        console.error(err)
        return value
    }
}

const useLocalStorage = (key:string, val?:UserType) => {
    const [ storedValue, setStoredValue ] = useState<UserType>(() => handleStorage(key, val))

    const setValue = (value:UserType):void => {
        try{
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)

            if(typeof window !== 'undefined')
                localStorage.setItem(key, JSON.stringify(valueToStore))

        } catch(err){
            console.error(err)
        }
    }

    const removeKey = (key:string):void => {
        if(localStorage.getItem(key)){
            localStorage.removeItem(key)
            setStoredValue({id:0,name:''})
        }
    }

    return {
        data: storedValue,
        update: setValue,
        delete: removeKey
    }
}

export default useLocalStorage
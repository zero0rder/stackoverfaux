import { useState } from 'react'

/**
 *      Persist user data on client. Used to manage User related State/UI updates.
 *      Ideally, You'd want to handle session management server-side (cookies, JWT, etc.)
 * 
 */

export type LocalStorageType<T> = {
    data: T | undefined;
    update: (value: T) => void;
    delete: (str: string) => void;
}

const handleStorage = (key:string, value:unknown) => {
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

const useLocalStorage = <T>(key:string, val?:T) => {
    const [ storedValue, setStoredValue ] = useState<T|undefined>(() => handleStorage(key, val))

    const setValue = (args: T):void => {
        try{
            const valueToStore = args instanceof Function ? args(storedValue) : args
            setStoredValue(args)

            if(typeof window !== 'undefined')
                localStorage.setItem(key, JSON.stringify(valueToStore))

        } catch(err){
            console.error(err)
        }
    }

    const removeKey = (key:string):void => {
        if(localStorage.getItem(key)){
            localStorage.removeItem(key)
            setStoredValue(undefined)
        }
    }

    return {
        data: storedValue,
        update: setValue,
        delete: removeKey
    }
}

export default useLocalStorage
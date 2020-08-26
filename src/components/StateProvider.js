import React, { createContext, useReducer, useContext } from 'react'

export const StateContext=createContext()
export default function StateProvider({reducer,initialState,children}) {
    return (
        <StateContext.Provider value={useReducer(reducer,initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue=()=>useContext(StateContext)
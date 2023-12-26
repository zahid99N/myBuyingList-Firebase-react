import { useState, useEffect, useReducer } from "react";
import { projectFirestore, timestam } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        

        default:
            return state
    }
}
export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref

    const res = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    //add a doucment

    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        
        try {
            const createdAt = timestam.fromDate(new Date())
            const addedDocument = await res.add({...doc, createdAt})
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        } catch (error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
        }
    }

    //delete a doocument
    const deleteDocument = (id) => {
        
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])
    
    return {addDocument, deleteDocument, response}
}
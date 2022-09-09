import { collection, doc, setDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase'
import { savingNewNote, addNewEmptyNote, setNotes, setActiveNote, setSaving, updateNote } from './journalSlice'
import { loadNotes } from '../../helpers'

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())
        // TODO tarea dispatch

        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))

        dispatch(setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    //getState es una funcion que retorna el state
    return async (dispatch, getState) => {

        const { uid } = getState().auth

        if (!uid) throw new Error('El UID del usuario no está definido')

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    //getState es una funcion que retorna el state
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: note } = getState().journal

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )

        // La opcion merge:true permite que el documento mantenga el id (borrado en la instruccion anterior) en firestore
        await setDoc( docRef, noteToFireStore, { merge: true })

        dispatch( updateNote(note) )
    }
}
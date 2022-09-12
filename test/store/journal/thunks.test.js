import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite'
import { FirebaseDB } from '../../../src/firebase'
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/journal/journalSlice'
import { startNewNote } from '../../../src/store/journal/thunks'

describe('Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn()
    const getState = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('startNewNote debe crear una nueva nota en blanco', async () => {
        const uid = 'TEST-UID'

        getState.mockReturnValue({ auth: { uid: uid }})

        await startNewNote()(dispatch, getState)

        // Al guardar una nueva nota firebase le crea un date y un id que no sabemos cual es, por lo tanto solo se puede testear con un expect de un any()
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() )

        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }))

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
        }))

        //  Borrar de firebase con una funcion recursiva
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)
        const docs = await getDocs( collectionRef )

        const deletePromises = []

        // Borrar todas las notas de firestore, incluyendo las que no se insertaron desde el testing, usar este metodo solo en base de datos de desarrollo y con un usuario de desarrollo
        docs.forEach( doc => deletePromises.push( deleteDoc(doc.ref) ))
    
        await Promise.all( deletePromises )

    })

})
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'
import { startNewNote } from '../../store'

import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useEffect } from 'react'

export const JournalPage = () => {

    const dispatch = useDispatch()
    const { isSaving, active, messageSaved } = useSelector( state => state.journal )

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onClickNewNote = () => {
        dispatch( startNewNote() )
    }

    return (
        <JournalLayout>
            {
                (!!active)
                ? <NoteView />
                :<NothingSelectedView /> 
            }

            <IconButton
                onClick={ onClickNewNote }
                size='large'
                disabled={ isSaving }
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />

            </IconButton>
        </JournalLayout>
    )
}

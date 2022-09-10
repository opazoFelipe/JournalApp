import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Grid, Typography, Button, TextField, IconButton } from "@mui/material"
import { SaveOutlined, UploadOutlined, DeleteOutlined } from "@mui/icons-material"

import { ImageGallery } from '../components'
import { useForm } from '../../hooks'
import { setActiveNote, startSaveNote, startUploadingFiles, startDeletingNote } from "../../store"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

    const { body, title, onInputChange, date, formState } = useForm(note)

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    })

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        }
    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return

        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }

    return (
        <Grid container
            className='animate__animated animate__fadeIn animate__faster'
            direction='row'
            justifyContent='space-between'
            sx={{ mb: 1 }}
            alignItems='center'
        >
            <Grid item>
                <Typography
                    fontSize={39}
                    fontWeight='light'
                >
                    {dateString}
                </Typography>
            </Grid>

            <Grid item>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    hidden
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutlined />
                    Borrar
                </Button>
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={note.imageUrls} />

        </Grid>
    )
}

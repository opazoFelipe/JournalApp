import { useMemo, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch()

    const { active:note } = useSelector( state => state.journal)

    const isActive = (note?.id === id) ? true : false

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls}))
    }

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }, [title])

    return (
        <ListItem disablePadding>
            <ListItemButton 
                onClick={ onClickNote }
                className={ isActive ? 'active-sideBarItemBackground' : ''}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}

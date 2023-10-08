import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom"
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {PlayArrow} from "@mui/icons-material";
import Loader from "./UI/loader/Loader";

const PersonListItem = (props) => {

    const router = useNavigate();

    return (
        <div>
            <Grid container justifyContent='center'>
                <Grid container direction='column'>
                    <Box p={1}>
                        <Card style={{margin: '10px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                            <img src={`http://localhost:8080/${props.person.photo}`}
                                 style={{margin: '5px', padding: '5px', width: 70}}/>
                            <Grid>
                                <div
                                    style={{marginLeft: '5px'}}>{props.person.lastname} {props.person.firstname} {props.person.patronymic}</div>
                                <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>{props.person.info}</div>
                                <Button onClick={() => router(`/personinfo/${props.person.personId}`)}>Просмотр
                                    персоны</Button>
                                <Button onClick={() => props.remove(props.person)}>Удалить</Button>
                            </Grid>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default PersonListItem;
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PersonService from "../API/PersonService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";

const PersonInfo = () => {
    const router = useNavigate();
    const params = useParams()
    const [person, setPerson] = useState({});

    const [fetchPersonById, isLoading] = useFetching(async (id) => {
        const response = await PersonService.getPersonById(id)
        setPerson(response.data);
    })

    useEffect(() => {
        fetchPersonById(params.id)
    }, [])

    return (
        <div>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h3 style={{textAlign: 'center'}}>
                            Информация о персоне
                        </h3>
                    </Box>
                    {isLoading
                        ? <Loader/>
                        :
                        <Grid container direction='column'>
                            <Button onClick={() => router(`/`)}>Назад</Button>
                            <Box p={2}>
                                <Card style={{margin: '10px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                                    <img src={`http://localhost:8080/${person.photo}`}
                                         style={{margin: '5px', padding: '5px', width: 200}}/>
                                    <Grid>
                                        <div
                                            style={{marginLeft: '5px'}}>{person.lastname} {person.firstname} {person.patronymic}</div>
                                        <div
                                            style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>{person.info}</div>
                                        <Button onClick={() => router(`/projects/${person.personId}`)}>Просмотр
                                            проектов</Button>
                                    </Grid>
                                </Card>
                                <div>
                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Дата рождения</div>
                                    <div style={{marginLeft: '5px'}}>{person.birthdate}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Место рождения</div>
                                    <div style={{marginLeft: '5px'}}>{person.placeOfBirth}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Знак зодиака</div>
                                    <div style={{marginLeft: '5px'}}>{person.zodiacSign}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Пол</div>
                                    <div style={{marginLeft: '5px'}}>{person.sex}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Рост</div>
                                    <div style={{marginLeft: '5px'}}>{person.height}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Возраст</div>
                                    <div style={{marginLeft: '5px'}}>{person.age}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Веб-сайт</div>
                                    <div style={{marginLeft: '5px'}}>{person.website}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>E-mail</div>
                                    <div style={{marginLeft: '5px'}}>{person.email}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Телефон</div>
                                    <div style={{marginLeft: '5px'}}>{person.phone}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Карьера</div>
                                    <div style={{marginLeft: '5px'}}>{person.carrer}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Супруги</div>
                                    <div style={{marginLeft: '5px'}}>{person.surwives}</div>

                                </div>
                            </Box>
                        </Grid>
                    }
                </Card>
            </Grid>
        </div>
    );
};

export default PersonInfo;
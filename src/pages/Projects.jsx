import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";

const Projects = (props, persons) => {

    const router = useNavigate();
    const params = useParams()
    const [person, setPerson] = useState({});
    const [projects, setProjects] = useState([]);

    const [fetchPersonById, isLoading, error] = useFetching(async (personId) => {
        const response = await PersonService.getPersonById(personId)
        setPerson(response.data);
    })

    const [fetchProjects, isProjectLoading, comError] = useFetching(async (personId) => {
        const response = await PersonService.getProjectsByPersonId(personId)
        setProjects(response.data);
    })

    useEffect(() => {
        fetchPersonById(params.personId)
        fetchProjects(params.personId)
    }, [])

    return (
        <div>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h3 style={{textAlign: 'center'}}>
                            Проекты
                        </h3>
                    </Box>
                    {isProjectLoading
                        ? <Loader/>
                        : <div>
                            <Grid container direction='column'>
                                <Button onClick={() => router(`/personinfo/${person.personId}`)}>Назад</Button>
                                <Box p={2}>

                                    {projects.map(project =>
                                        <div key={project.projectId} style={{marginTop: 15}}>
                                            <Card style={{
                                                margin: '10px',
                                                padding: '10px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>

                                                <img src={`http://localhost:8080/${project.photo}`}
                                                     style={{margin: '5px', padding: '5px', width: 200}}/>


                                                <Grid>
                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '0px'}}><img src={`http://localhost:8080/${project.logo}`}
                                                                                                                        style={{margin: '5px', padding: '5px', width: 200}}/></div>
                                                    <div
                                                        style={{
                                                            fontSize: 12,
                                                            color: 'gray',
                                                            marginLeft: '5px'
                                                        }}>Название проекта
                                                    </div>
                                                    <div
                                                        style={{marginLeft: '5px'}}>{project.title}
                                                    </div>


                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Старт проекта</div>
                                                    <div style={{marginLeft: '5px'}}>{project.dateBegin}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Конец проекта</div>
                                                    <div style={{marginLeft: '5px'}}>{project.dateEnd}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>О проекте</div>
                                                    <div style={{marginLeft: '5px'}}>{project.info}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Страна</div>
                                                    <div style={{marginLeft: '5px'}}>{project.country}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Веб-сайт</div>
                                                    <div style={{marginLeft: '5px'}}>{project.website}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>E-mail</div>
                                                    <div style={{marginLeft: '5px'}}>{project.email}</div>

                                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Телефон</div>
                                                    <div style={{marginLeft: '5px'}}>{project.email}</div>
                                                </Grid>

                                                        <Button onClick={() => router(`/works/${project.projectId}`)}>Просмотр
                                                            работ</Button>
                                            </Card>

                                        </div>
                                    )}


                                </Box>
                            </Grid>
                        </div>
                    }
                </Card>
            </Grid>
        </div>

    );
};

export default Projects;
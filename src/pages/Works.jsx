import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {PlayArrow} from "@mui/icons-material";

const Works = (props) => {
    const router = useNavigate();

    const params = useParams()
    const [works, setWorks] = useState([]);

    const [fetchWorks, isWorkLoading, workError] = useFetching(async (projectId) => {
        const response = await PersonService.getWorksByProjectId(projectId)
        setWorks(response.data);
    })

    useEffect(() => {
        fetchWorks(params.projectId)
    }, [])

    return (
        <div>
            {isWorkLoading
                ? <Loader/>
                : <Grid container justifyContent='center'>
                    <Card style={{width: 900}}>
                        <Box p={3}>
                            <h3 style={{textAlign: 'center'}}>
                                Работы
                            </h3>
                        </Box>
                        <Grid container direction='column'>
                            <Box p={2}>
                                {works.map(work =>
                                    <div key={work.workId} style={{marginTop: 15}}>
                                        <Card style={{
                                            margin: '10px',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <div style={{marginLeft: '5px'}}><img src={`http://localhost:8080/${work.photo}`}
                                                                                  style={{margin: '5px', padding: '5px', width: 70, height: 70}}/></div>

                                            <Grid>
                                                <div style={{marginLeft: '5px'}}>{work.title}</div>
                                                <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}> дата
                                                    релиза: {work.releaseDate},
                                                    продолжительность: {work.duration} </div>
                                                <Button onClick={() => router(`/mediainfo/${work.workId}`)}>Просмотр
                                                    работы</Button>
                                            </Grid>
                                        </Card>
                                    </div>
                                )}
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
            }
        </div>
    );
};

export default Works;
import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {PlayArrow} from "@mui/icons-material";

const MediaInfoDetail = () => {

    const params = useParams()
    const [medias, setMedia] = useState([]);
    const [work, setWork] = useState([]);
    const router = useNavigate();

    const [fetchMedia, isMediaLoading] = useFetching(async (mediaId) => {
        const response = await PersonService.getMediaInfoById(mediaId)
        setMedia(response.data);
    })

    const [fetchWork] = useFetching(async (mediaId) => {
        const response = await PersonService.getWorkByMediaId(mediaId)
        setWork(response.data);

    })

    useEffect(() => {
        fetchMedia(params.mediaId)
        fetchWork(params.mediaId)
    }, [])

    return (
        <div>
            {isMediaLoading
                ? <Loader/>
                :
                <Grid container justifyContent='center'>
                    <Card style={{width: 900}}>
                        <Box p={3}>

                            <h3 style={{textAlign: 'center'}}>
                                Информация о треке
                            </h3>
                        </Box>
                        <Grid container direction='column'>
                            <Button onClick={() => router(`/mediainfo/${work.workId}`)}>Назад</Button>
                            <Box p={2}>
                                <Card style={{margin: '10px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                                    <img src={`http://localhost:8080/${work.photo}`}
                                         style={{margin: '5px', padding: '5px', width: 300, height: 300}}/>
                                    <Grid>

                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Трек</div>
                                        <div style={{marginLeft: '5px'}}>{medias.title}</div>

                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Альбом</div>
                                        <div style={{marginLeft: '5px'}}>{work.title}</div>

                                        <div
                                            style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Продолжительность
                                        </div>
                                        <div style={{marginLeft: '5px'}}>{medias.duration}</div>

                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Количество
                                            прослушиваний
                                        </div>
                                        <div style={{marginLeft: '5px'}}>{medias.numberOfPlays}</div>

                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Слушать</div>
                                        <div style={{marginLeft: '5px'}}><a
                                            href={`http://localhost:8080/${medias.linkToTrack}`}>Слушать</a></div>

                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Другие источники
                                        </div>
                                        <div style={{marginLeft: '5px'}}><a href={`${medias.otherLinks}`}>Слушать</a>
                                        </div>
                                    </Grid>
                                </Card>
                                <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}>Текст песни</div>
                                <div style={{marginLeft: '5px'}}>{medias.lyrics}</div>
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
            }
        </div>
    );
};

export default MediaInfoDetail;
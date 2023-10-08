import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import PersonService from "../API/PersonService";
import PersonsList from "../components/PersonsList";
import MyButton from "../components/UI/button/MyButton";
import {Button, Card, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {PlayArrow} from "@mui/icons-material";

const MediaInfo = () => {
    const params = useParams()
    const [medias, setMedia] = useState([]);
    const [work, setWork] = useState([]);
    const router = useNavigate();

    const [fetchMedia, isMediaLoading] = useFetching(async (workId) => {
        const response = await PersonService.getMediaByWorkId(workId)
        setMedia(response.data);
    })

    const [fetchWork] = useFetching(async (workId) => {
        const response = await PersonService.getWorksByWorkId(workId)
        setWork(response.data);
    })

    useEffect(() => {
        fetchMedia(params.workId)
        fetchWork(params.workId)
    }, [])

    return (
        <div>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <h3 style={{textAlign: 'center'}}>
                            Информация о работе
                        </h3>
                    </Box>
                    <Grid container direction='column'>

                        <Box p={2}>
                            <Card style={{margin: '10px', padding: '10px', display: 'flex', alignItems: 'center'}}>
                                <img src={`http://localhost:8080/${work.photo}`}
                                     style={{margin: '5px', padding: '5px', width: 300, height: 300}}/>
                                <Grid>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}></div>
                                    <div style={{marginLeft: '5px'}}>{work.title}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Дата релиза</div>
                                    <div style={{marginLeft: '5px'}}>{work.releaseDate}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Продолжительность</div>
                                    <div style={{marginLeft: '5px'}}>{work.duration}</div>


                                </Grid>
                            </Card>
                            {medias.map(media =>
                                <div key={media.mediaId} style={{marginTop: 15}}>
                                    <Card style={{
                                        margin: '10px',
                                        padding: '10px',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <IconButton>
                                            <PlayArrow/>
                                        </IconButton>
                                        <div style={{marginLeft: '5px'}}><img src={`http://localhost:8080/${work.photo}`}
                                             style={{margin: '5px', padding: '5px', width: 70, height: 70}}/></div>

                                        <Grid>
                                            <div style={{marginLeft: '5px'}}>
                                        {media.songNumber}. {media.title}
                                        {media.version === "-"
                                            ? " "
                                            : " [" + media.version + "] "}
                                        [{media.duration}]</div>
                                        <div style={{fontSize: 12, color: 'gray', marginLeft: '5px'}}> дата
                                            релиза: {media.releaseDate}, дата
                                            записи: {media.recordingDate}, стиль: {media.style} {media.version === "-"
                                                ? " "
                                                : ", версия трека: " + media.version + " "}</div>
                                        <Button onClick={() => router(`/mediainfo/detail/${media.mediaId}`)}>Информация
                                            о треке</Button>
                                        </Grid>

                                    </Card>
                                </div>
                            )}
                            {isMediaLoading
                                ? <Loader/>
                                : <div>
                                    <br/>
                                    <h3>Дополнительная информация:</h3>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Начало работы</div>
                                    <div style={{marginLeft: '5px'}}>{work.dateBegin}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Конец работы</div>
                                    <div style={{marginLeft: '5px'}}>{work.dateEnd}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Дата релиза</div>
                                    <div style={{marginLeft: '5px'}}>{work.releaseDate}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Дата записи</div>
                                    <div style={{marginLeft: '5px'}}>{work.recordingDate}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Продолжительность</div>
                                    <div style={{marginLeft: '5px'}}>{work.duration}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Информация</div>
                                    <div style={{marginLeft: '5px'}}>{work.info}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Веб-сайт</div>
                                    <div style={{marginLeft: '5px'}}>{work.website}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Логотип</div>
                                    <div style={{marginLeft: '5px'}}>{work.logo}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Страна</div>
                                    <div style={{marginLeft: '5px'}}>{work.country}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Тип релиза</div>
                                    <div style={{marginLeft: '5px'}}>{work.typeOfRelease}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Формат релиза</div>
                                    <div style={{marginLeft: '5px'}}>{work.formatRelese}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Жанр</div>
                                    <div style={{marginLeft: '5px'}}>{work.styleGenre}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Тип работы</div>
                                    <div style={{marginLeft: '5px'}}>{work.typeOfWork}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Слоган</div>
                                    <div style={{marginLeft: '5px'}}>{work.tagline}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Режиссер</div>
                                    <div style={{marginLeft: '5px'}}>{work.director}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Сценарий</div>
                                    <div style={{marginLeft: '5px'}}>{work.scenario}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Продюсер</div>
                                    <div style={{marginLeft: '5px'}}>{work.producer}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Оператор</div>
                                    <div style={{marginLeft: '5px'}}>{work.operator}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Композитор</div>
                                    <div style={{marginLeft: '5px'}}>{work.composer}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Художник</div>
                                    <div style={{marginLeft: '5px'}}>{work.costumeDesigner}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Монтаж</div>
                                    <div style={{marginLeft: '5px'}}>{work.videoEditing}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Бюджет</div>
                                    <div style={{marginLeft: '5px'}}>{work.budget}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Фис</div>
                                    <div style={{marginLeft: '5px'}}>{work.fees}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Мировая премьера</div>
                                    <div style={{marginLeft: '5px'}}>{work.worldPremiere}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Рейтинг</div>
                                    <div style={{marginLeft: '5px'}}>{work.ageToView}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Релиз на Blu-Ray</div>
                                    <div style={{marginLeft: '5px'}}>{work.bluRayRelease}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Релиз на DVD</div>
                                    <div style={{marginLeft: '5px'}}>{work.dvdrelease}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Автор</div>
                                    <div style={{marginLeft: '5px'}}>{work.lyricist}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Вокал</div>
                                    <div style={{marginLeft: '5px'}}>{work.vocals}</div>

                                    <div style={{ fontSize: 12, color: 'gray', marginLeft: '5px'}}>Бэк-вокал</div>
                                    <div style={{marginLeft: '5px'}}>{work.backingVocals}</div>

                                </div>
                            }
                        </Box>
                    </Grid>
                </Card>
            </Grid>
        </div>
    );
};

export default MediaInfo;
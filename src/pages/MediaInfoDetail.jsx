import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import Loader from "../components/UI/loader/Loader";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";

const MediaInfoDetail = () => {

    const params = useParams()
    const [medias, setMedia] = useState([]);
    const [work, setWork] = useState([]);

    const [fetchMedia, isMediaLoading] = useFetching(async (mediaId) => {
        const response = await PersonService.getMediaInfoById(mediaId)
        setMedia(response.data);

    })

    const [fetchWork] = useFetching(async (workId) => {
        const response = await PersonService.getWorksByWorkId(workId)
        setWork(response.data);
        console.log(response.data);
        console.log(workId)
    })

    useEffect(() => {
        fetchMedia(params.mediaId)
        fetchWork(params.workId)
    }, [])

    return (
        <div>
            {isMediaLoading
                ? <Loader/>
                : <div>
                    <br/>
                    <h3>Трек "{medias.title}"</h3>
                    <br/>
                    <div><b>
                        {medias.version === "-"
                            ? " "
                            : "Версия трека: " + medias.version}
                        Продолжительность: {medias.duration}</b>
                        <div style={{fontSize: "smaller"}}> дата релиза: {medias.releaseDate}, дата записи: {medias.recordingDate}, стиль: {medias.style} {medias.version === "-"
                            ? " "
                            : ", версия трека: " + medias.version + " "}</div>
                    </div>
                    <br/>
                    <h2>Информация</h2>
                    <br/>
                    <p><b>Текст песни:</b> {medias.lyrics}</p>
                    <p><b>Количество прослушиваний:</b> {medias.numberOfPlays}</p>
                    <p><b>Слушать:</b> <a href={`http://localhost:8080/${medias.linkToTrack}`}>Слушать</a></p>
                    <p><b>Другие источники:</b> <a href={`${medias.otherLinks}`}>Слушать</a></p>
                    <br/>
                </div>
            }
        </div>
    );
};

export default MediaInfoDetail;
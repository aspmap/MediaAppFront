import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import PersonService from "../API/PersonService";

const MediaInfo = () => {
    const params = useParams()
    const [medias, setMedia] = useState([]);
    const [work, setWork] = useState([]);

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
            {isMediaLoading
                ? <Loader/>
                : <div>
                    <br/>
                    <h3>{work.title} (дата релиза {work.releaseDate})</h3>
                    <br/>
                    <h4>Треклист</h4>
                    {medias.map(media =>
                        <div key={media.mediaId} style={{marginTop: 15}}>
                            <p><b>{media.songNumber}. {media.title} [{media.version}] [{media.duration}]</b>
                                <sub> {media.releaseDate}, {media.recordingDate}, {media.style}, {media.versionTrack}</sub>
                            </p>
                        </div>
                    )}
                    <br/>
                    <h2>Информация</h2>
                    <p><b>Начало работы:</b> {work.dateBegin}</p>
                    <p><b>Конец работы:</b> {work.dateEnd}</p>
                    <p><b>Дата релиза:</b> {work.releaseDate}</p>
                    <p><b>Дата записи:</b> {work.recordingDate}</p>
                    <p><b>Продолжительность:</b> {work.duration}</p>
                    <p><b>Информация:</b> {work.info}</p>
                    <p><b>Веб-сайт:</b> {work.website}</p>
                    <p><b>Фото:</b> {work.photo}</p>
                    <p><b>Логотип:</b> {work.logo}</p>
                    <p><b>Страна:</b> {work.country}</p>
                    <p><b>Тип релиза:</b> {work.typeOfRelease}</p>
                    <p><b>Формат релиза:</b> {work.formatRelese}</p>
                    <p><b>Жанр:</b> {work.styleGenre}</p>
                    <p><b>Тип работы:</b> {work.typeOfWork}</p>
                    <p><b>Слоган:</b> {work.tagline}</p>
                    <p><b>Режиссер:</b> {work.director}</p>
                    <p><b>Сценарий:</b> {work.scenario}</p>
                    <p><b>Продюсер:</b> {work.producer}</p>
                    <p><b>Оператор:</b> {work.operator}</p>
                    <p><b>Композитор:</b> {work.composer}</p>
                    <p><b>Художник:</b> {work.costumeDesigner}</p>
                    <p><b>Монтаж:</b> {work.videoEditing}</p>
                    <p><b>Бюджет:</b> {work.budget}</p>
                    <p><b>Фис:</b> {work.fees}</p>
                    <p><b>Мировая премьера:</b> {work.worldPremiere}</p>
                    <p><b>Возраст:</b> {work.ageToView}</p>
                    <p><b>Релиз на Blu-Ray:</b> {work.bluRayRelease}</p>
                    <p><b>Релиз на DVD:</b> {work.dvdrelease}</p>
                    <p><b>Автор:</b> {work.lyricist}</p>
                    <p><b>Вокал:</b> {work.vocals}</p>
                    <p><b>Бэк-вокал:</b> {work.backingVocals}</p>
                </div>
            }
        </div>
    );
};

export default MediaInfo;
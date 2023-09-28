import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";

const Works = (props) => {
    const router = useNavigate();

    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);


    const [fetchPostById, isLoading, error] = useFetching(async (projectId) => {
        const response = await PostService.getById(projectId)
        setPost(response.data);

    })

    const [fetchComments, isComLoading, comError] = useFetching(async (projectId) => {
        const response = await PostService.getWorksByProjectId(projectId)
            setComments(response.data);
        console.log(projectId)
    })

    useEffect(() => {
        fetchPostById(params.projectId)
        fetchComments(params.projectId)
    }, [])

    return (
        <div>
            {isComLoading
                ? <Loader/>
                : <div>
                    <h2>Работы</h2>
                    {comments.map(comm =>
                        <div key={comm.workId} style={{marginTop: 15}}>
                            <p><b>Название работы:</b> {comm.title}</p>
                            <p><b>Оригинальное название работы:</b> {comm.originalTitle}</p>
                            <p><b>Начало работы:</b> {comm.dateBegin}</p>
                            <p><b>Конец работы:</b> {comm.dateEnd}</p>
                            <p><b>Дата релиза:</b> {comm.releaseDate}</p>
                            <p><b>Дата записи:</b> {comm.recordingDate}</p>
                            <p><b>Продолжительность:</b> {comm.duration}</p>
                            <p><b>Информация:</b> {comm.info}</p>
                            <p><b>Веб-сайт:</b> {comm.website}</p>
                            <p><b>Фото:</b> {comm.photo}</p>
                            <p><b>Логотип:</b> {comm.logo}</p>
                            <p><b>Страна:</b> {comm.country}</p>
                            <p><b>Тип релиза:</b> {comm.typeOfRelease}</p>
                            <p><b>Формат релиза:</b> {comm.formatRelese}</p>
                            <p><b>Жанр:</b> {comm.styleGenre}</p>
                            <p><b>Тип работы:</b> {comm.typeOfWork}</p>
                            <p><b>Слоган:</b> {comm.tagline}</p>
                            <p><b>Режиссер:</b> {comm.director}</p>
                            <p><b>Сценарий:</b> {comm.scenario}</p>
                            <p><b>Продюсер:</b> {comm.producer}</p>
                            <p><b>Оператор:</b> {comm.operator}</p>
                            <p><b>Композитор:</b> {comm.composer}</p>
                            <p><b>Художник:</b> {comm.costumeDesigner}</p>
                            <p><b>Монтаж:</b> {comm.videoEditing}</p>
                            <p><b>Бюджет:</b> {comm.budget}</p>
                            <p><b>Фис:</b> {comm.fees}</p>
                            <p><b>Мировая премьера:</b> {comm.worldPremiere}</p>
                            <p><b>Возраст:</b> {comm.ageToView}</p>
                            <p><b>Релиз на Blu-Ray:</b> {comm.bluRayRelease}</p>
                            <p><b>Релиз на DVD:</b> {comm.dvdrelease}</p>
                            <p><b>Автор:</b> {comm.lyricist}</p>
                            <p><b>Вокал:</b> {comm.vocals}</p>
                            <p><b>Бэк-вокал:</b> {comm.backingVocals}</p>
                            <div className="post">
                                <div className="post__btns">
                                    <MyButton onClick={() => router(`/mediainfo/${comm.workId}`)}>Просмотр работы</MyButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Works;
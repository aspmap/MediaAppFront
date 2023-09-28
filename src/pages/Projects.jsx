import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";

const Projects = (props, posts) => {

    const router = useNavigate();

    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);



    const [fetchPostById, isLoading, error] = useFetching(async (personId) => {
        const response = await PostService.getById(personId)
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (personId) => {
        const response = await PostService.getProjectsByPersonId(personId)
        setComments(response.data);
    })


    useEffect(() => {
        fetchPostById(params.personId)
        fetchComments(params.personId)
    }, [])

    return (
        <div>
            {isComLoading
                ? <Loader/>
                : <div>
                    <h2>Проекты</h2>
                    {comments.map(comm =>
                        <div key={comm.projectId} style={{marginTop: 15}}>
                            <p><b>Название проекта:</b> {comm.title}</p>
                            <p><b>Оригинальное название проекта:</b> {comm.originalTitle}</p>
                            <p><b>Старт проекта:</b> {comm.dateBegin}</p>
                            <p><b>Конец проекта:</b> {comm.dateEnd}</p>
                            <p><b>Описание проекта:</b> {comm.info}</p>
                            <p><b>Страна:</b> {comm.country}</p>
                            <p><b>Веб-сайт:</b> {comm.website}</p>
                            <p><b>E-mail:</b> {comm.email}</p>
                            <p><b>Телефон:</b> {comm.phone}</p>
                            <p><b>Фото:</b> {comm.photo}</p>
                            <p><b>Логотип:</b> {comm.logo}</p>
                            <div className="post">
                                <div className="post__btns">
                                    <MyButton onClick={() => router(`/works/${comm.projectId}`)}>Просмотр работ</MyButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Projects;
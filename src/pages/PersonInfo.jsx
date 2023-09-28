import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import PersonListItem from "../components/PersonListItem";
import MyButton from "../components/UI/button/MyButton";

const PersonInfo = () => {

    const router = useNavigate();

    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);


    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data.projects);
        console.log(response.data.projects)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {isLoading
                ? <Loader/>
                :             <div className="post">
                    <div className="post__content">
                        <h2>Информация о персоне</h2>
                        <br/>
                        <div>
                            <p><b>{post.lastname} {post.firstname} {post.patronymic}</b></p>
                            <p><b>Информация о персоне:</b> {post.info}</p>
                            <p><b>Дата рождения:</b> {post.birthdate}</p>
                            <p><b>Место рождения:</b> {post.placeOfBirth}</p>
                            <p><b>Знак зодиака:</b> {post.zodiacSign}</p>
                            <p><b>Пол:</b> {post.sex}</p>
                            <p><b>Рост:</b> {post.height}</p>
                            <p><b>Возраст:</b> {post.age}</p>
                            <p><b>Фото:</b> {post.photo}</p>
                            <p><b>Веб-сайт:</b> {post.website}</p>
                            <p><b>E-mail:</b> {post.email}</p>
                            <p><b>Телефон:</b> {post.phone}</p>
                            <p><b>Карьера:</b> {post.carrer}</p>
                            <p><b>Супруги:</b> {post.surwives}</p>
                        </div>
                    </div>
                    <div className="post__btns">
                        <MyButton onClick={() => router(`/projects/${post.personId}`)}>Просмотр проектов</MyButton>

                    </div>
                </div>
            }

            <div>Запись с ID5555: {params.id}</div>

        </div>
    );
};

export default PersonInfo;
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import PersonService from "../API/PersonService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";

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
            {isLoading
                ? <Loader/>
                : <div className="person">
                    <div className="person__content">
                        <h2>Информация о персоне</h2>
                        <br/>
                        <img src={`http://localhost:8080/${person.photo}`} style={{width: 200}} />
                        <br/>
                        <div>
                            <p><b>{person.lastname} {person.firstname} {person.patronymic}</b></p>
                            <p><b>Информация о персоне:</b> {person.info}</p>
                            <p><b>Дата рождения:</b> {person.birthdate}</p>
                            <p><b>Место рождения:</b> {person.placeOfBirth}</p>
                            <p><b>Знак зодиака:</b> {person.zodiacSign}</p>
                            <p><b>Пол:</b> {person.sex}</p>
                            <p><b>Рост:</b> {person.height}</p>
                            <p><b>Возраст:</b> {person.age}</p>
                            <p><b>Фото:</b> {person.photo}</p>
                            <p><b>Веб-сайт:</b> {person.website}</p>
                            <p><b>E-mail:</b> {person.email}</p>
                            <p><b>Телефон:</b> {person.phone}</p>
                            <p><b>Карьера:</b> {person.carrer}</p>
                            <p><b>Супруги:</b> {person.surwives}</p>
                        </div>
                    </div>
                    <div className="person__btns">
                        <MyButton onClick={() => router(`/projects/${person.personId}`)}>Просмотр проектов</MyButton>
                    </div>
                </div>
            }
        </div>
    );
};

export default PersonInfo;
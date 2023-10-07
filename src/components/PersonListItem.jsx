import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom"

const PersonListItem = (props) => {

    const router = useNavigate();

    return (
        <div className="person">
            <div className="person__content">
                <img src={`http://localhost:8080/${props.person.photo}`} style={{width: 100}} />
                <br/>
                <strong>{props.person.lastname} {props.person.firstname} {props.person.patronymic}</strong>
                <div>
                    {props.person.info}
                </div>
            </div>
            <div className="person__btns">
                <MyButton onClick={() => router(`/personinfo/${props.person.personId}`)}>Просмотр персоны</MyButton>
                <MyButton onClick={() => props.remove(props.person)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PersonListItem;
import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate} from "react-router-dom"

const PostItem = (props) => {

    const router = useNavigate();
    console.log(router)

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.lastname} {props.post.firstname}</strong>
                <div>
                    {props.post.info}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => router(`/persons/${props.post.personId}`)}>Просмотр</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
        console.log(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div>
            {isLoading
                ? <Loader/>
                :  <div>
                    <h1>{post.lastname} {post.firstname}</h1>
                    <p><b>Информация о персоне:</b> {post.info}</p> </div>
            }
            <div>Запись с ID: {params.id}</div>
{/*            <h1>
                Комментарии
            </h1>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }*/}
        </div>
    );
};

export default PostIdPage;
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";
import works from "./Works";

const MediaInfo = (props, posts) => {
    const router = useNavigate();

    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [work, setWork] = useState([]);


    const [fetchPostById, isLoading, error] = useFetching(async (workId) => {
        const response = await PostService.getById(workId)
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching(async (workId) => {
        const response = await PostService.getMediaByWorkId(workId)
        setComments(response.data);

    })

    const [fetchWork, isComLoading1, comError1] = useFetching(async (workId) => {
        const response = await PostService.getWorksByWorkId(workId)
        setWork(response.data);
        console.log(workId)
    })

    useEffect(() => {
        fetchPostById(params.workId)
        fetchComments(params.workId)
        fetchWork(params.workId)
    }, [])

    return (
        <div>
            {isComLoading
                ? <Loader/>
                : <div>
                    <h2>Информация о работе</h2>
                    <br/>
                    <h3>{work.title} (дата релиза {work.releaseDate})</h3>
                    {comments.map(comm =>
                        <div key={comm.mediaId} style={{marginTop: 15}}>
                            <p><b>{comm.songNumber}. {comm.title} [{comm.version}] [{comm.duration}]</b>
                            <sub> {comm.releaseDate}, {comm.recordingDate}, {comm.style}, {comm.versionTrack}</sub></p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default MediaInfo;
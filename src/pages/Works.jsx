import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";
import Loader from "../components/UI/loader/Loader";
import MyButton from "../components/UI/button/MyButton";

const Works = (props) => {
    const router = useNavigate();

    const params = useParams()
    const [works, setWorks] = useState([]);

    const [fetchWorks, isWorkLoading, workError] = useFetching(async (projectId) => {
        const response = await PersonService.getWorksByProjectId(projectId)
        setWorks(response.data);
    })

    useEffect(() => {
        fetchWorks(params.projectId)
    }, [])

    return (
        <div>
            {isWorkLoading
                ? <Loader/>
                : <div>
                    <h2>Работы</h2>
                    {works.map(work =>
                        <div key={work.workId} style={{marginTop: 15}}>
                            <p><b>Фото:</b> {work.photo}</p>
                            <p><b>Название работы:</b> {work.title}</p>
                            <p><b>Оригинальное название работы:</b> {work.originalTitle}</p>
                            <p><b>Дата релиза:</b> {work.releaseDate}</p>
                            <div className="person">
                                <div className="person__btns">
                                    <MyButton onClick={() => router(`/mediainfo/${work.workId}`)}>Просмотр работы</MyButton>
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
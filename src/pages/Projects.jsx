import React, {useEffect, useState} from 'react';
import MyButton from "../components/UI/button/MyButton";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../components/UI/loader/Loader";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";

const Projects = (props, persons) => {

    const router = useNavigate();
    const params = useParams()
    const [person, setPerson] = useState({});
    const [projects, setProjects] = useState([]);

    const [fetchPersonById, isLoading, error] = useFetching(async (personId) => {
        const response = await PersonService.getPersonById(personId)
        setPerson(response.data);
    })

    const [fetchProjects, isProjectLoading, comError] = useFetching(async (personId) => {
        const response = await PersonService.getProjectsByPersonId(personId)
        setProjects(response.data);
    })

    useEffect(() => {
        fetchPersonById(params.personId)
        fetchProjects(params.personId)
    }, [])

    return (
        <div>
            {isProjectLoading
                ? <Loader/>
                : <div>
                    <h2>Проекты</h2>
                    {projects.map(project =>
                        <div key={project.projectId} style={{marginTop: 15}}>
                            <p><b>Название проекта:</b> {project.title}</p>
                            <p><b>Оригинальное название проекта:</b> {project.originalTitle}</p>
                            <p><b>Старт проекта:</b> {project.dateBegin}</p>
                            <p><b>Конец проекта:</b> {project.dateEnd}</p>
                            <p><b>Описание проекта:</b> {project.info}</p>
                            <p><b>Страна:</b> {project.country}</p>
                            <p><b>Веб-сайт:</b> {project.website}</p>
                            <p><b>E-mail:</b> {project.email}</p>
                            <p><b>Телефон:</b> {project.phone}</p>
                            <p><b>Фото:</b> {project.photo}</p>
                            <p><b>Логотип:</b> <img src={`http://localhost:8080/${project.logo}`} style={{width: 100}} /></p>
                            <div className="person">
                                <div className="person__btns">
                                    <MyButton onClick={() => router(`/works/${project.projectId}`)}>Просмотр
                                        работ</MyButton>
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
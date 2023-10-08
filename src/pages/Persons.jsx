import React, {useEffect, useState} from 'react';
import {usePersons} from "../hooks/usePersons";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PersonsFilter from "../components/PersonsFilter";
import Loader from "../components/UI/loader/Loader";
import PersonsList from "../components/PersonsList";
import PersonAddForm from "../components/PersonAddForm";
import {useFetching} from "../hooks/useFetching";
import PersonService from "../API/PersonService";
import {Button} from "@mui/material";
import Navbar from "../components/UI/navbar/Navbar";
import NavbarLeft from "../components/UI/navbar/NavbarLeft";

const Persons = () => {
    const [persons, setPersons] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPersons = usePersons(persons, filter.sort, filter.query);
    const [fetchPersons, isPersonsLoading, personError] = useFetching(async () => {
        const persons = await PersonService.getAllPersons();
        setPersons(persons)
    })

    useEffect(() => {
        fetchPersons()
    }, []);

    const createPerson = (newPerson) => {
        setPersons([...persons, newPerson])
        setModal(false)
    }

    const removePerson = (person) => {
        setPersons(persons.filter(p => p.id !== person.id))
    }

    return (

        <div className="App">
            <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>
                Создать запись
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PersonAddForm create={createPerson}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PersonsFilter filter={filter} setFilter={setFilter}/>
            {personError &&
                <h3>Произошла ошибка ${personError}</h3>
            }
            {isPersonsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader />
                </div>
                : <PersonsList remove={removePerson} persons={sortedAndSearchedPersons} title="Персоны"/>
            }
        </div>
    );
};

export default Persons;
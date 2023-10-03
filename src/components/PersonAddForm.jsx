import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PersonAddForm = ({create}) => {
    const [person, setPerson] = useState({lastname: '', info: ''})

    const addNewPerson = (e) => {
        e.preventDefault()
        const newPerson = {
            ...person, id: Date.now()
        }
        create(newPerson)
        setPerson({lastname: '', info: ''})
    }

    return (
        <form>
            <MyInput
                value={person.lastname}
                onChange={e => setPerson({...person, lastname: e.target.value})}
                type="text"
                placeholder="Фамилия"
            />
            <MyInput
                value={person.info}
                onChange={e => setPerson({...person, info: e.target.value})}
                type="text"
                placeholder="Информация о персоне"
            />
            <MyButton onClick={addNewPerson}>Создать персону</MyButton>
        </form>
    );
};

export default PersonAddForm;
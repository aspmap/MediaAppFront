import React from 'react';
import PersonListItem from "./PersonListItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PersonsList = ({persons, title, remove}) => {

    if (!persons.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Записи не найдены!
            </h1>
        )
    }

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                {title}
            </h2>
            <TransitionGroup>
                {persons.map((person, index) =>
                    <CSSTransition
                        key={person.id}
                        timeout={500}
                        classNames="person"
                    >
                        <PersonListItem remove={remove} number={index + 1} person={person} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PersonsList;
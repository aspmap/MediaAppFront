import React from 'react';
import PersonListItem from "./PersonListItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PersonsList = ({posts, title, remove}) => {

    if (!posts.length) {
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
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PersonListItem remove={remove} number={index + 1} post={post} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PersonsList;
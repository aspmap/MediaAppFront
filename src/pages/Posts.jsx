import React, {useEffect, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/loader/Loader";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";

const Posts = () => {
    const [posts, setPosts] = useState([
            {personId: 1, lastname: 'Javascript', firstname: 'Description'},
            {personId: 2, lastname: 'Javascript', firstname: 'Description'},
            {personId: 3, lastname: 'Javascript', firstname: 'Description'},
        ]
    )
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, []);

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 20}} onClick={() => setModal(true)}>
                Создать запись
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader />
                </div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список записей"/>
            }

        </div>
    );
};

export default Posts;
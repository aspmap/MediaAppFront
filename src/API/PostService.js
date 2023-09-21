import axios from "axios";

export default class PostService {
    static async getAll() {
        const response = await axios.get('http://localhost:8080/api/persons')
        //https://jsonplaceholder.typicode.com/posts
        return response.data
    }

    static async getById(id) {
        const response = await axios.get('http://localhost:8080/api/person/' + id)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        return response;
    }
}
import axios from "axios";

export default class PersonService {
    static async getAllPersons() {
        const response = await axios.get('http://localhost:8080/api/persons')
        //https://jsonplaceholder.typicode.com/posts
        return response.data
    }

    static async getPersonById(id) {
        const response = await axios.get('http://localhost:8080/api/person/' + id)
        return response;
    }

    static async getCommentsByPostId(id) {
        const response = await axios.get('http://localhost:8080/api/person/' + id)
        return response;
    }

    static async getProjectsByPersonId(id) {
        const response = await axios.get('http://localhost:8080/api/project/person/' + id)
        return response;
    }

    static async getWorksByProjectId(id) {
        const response = await axios.get('http://localhost:8080/api/work/project/' + id)
        return response;
    }

    static async getMediaByWorkId(id) {
        const response = await axios.get('http://localhost:8080/api/mediainfo/work/' + id)
        return response;
    }

    static async getWorksByWorkId(id) {
        const response = await axios.get('http://localhost:8080/api/work/' + id)
        return response;
    }

    static async getMediaInfoById(id) {
        const response = await axios.get('http://localhost:8080/api/mediainfo/' + id)
        return response;
    }

    static async getWorkByMediaId(id) {
        const response = await axios.get('http://localhost:8080/api/work/media/' + id)
        return response;
    }


}
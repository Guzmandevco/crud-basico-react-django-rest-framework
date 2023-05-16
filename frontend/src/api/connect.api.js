import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/todo/api/v1/todo/';
export function loadData() {
    return axios.get(baseUrl);
}

export async function deleteData(id) {
    return axios.delete(baseUrl + id);
}

export async function createTodo(todo) {
    return axios.post(baseUrl, todo);
}

export async function editTodo(id, data) {
    return axios.put(`${baseUrl}${id}/`, data);
}

export async function getTodo(id) {
    return axios.get(baseUrl + id);
}
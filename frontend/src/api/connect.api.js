import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000';
export function loadData() {
    return axios.get(baseUrl+'/todos/');
}

export async function deleteData(id) {
    return axios.delete(baseUrl + '/todos/delete/' + id);
}

export async function createTodo(todo) {
    return axios.post(baseUrl+'/todos/create/', todo);
}

export async function editTodo(id, data) {
    return axios.put(`${baseUrl}/todos/edit/todo/${id}/`, data);
}

export async function getTodo(id) {
    return axios.get(`${baseUrl}/todos/todo/${id}/`);
}
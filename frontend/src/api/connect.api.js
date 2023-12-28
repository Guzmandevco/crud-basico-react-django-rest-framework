import axios from "axios";
const baseUrl = 'http://127.0.0.1:8000/api/v1';
export function loadData() {
    return axios.get(`${baseUrl}/todos`);
}

//logging function
export async function logging(data) {
  return axios.post(`${baseUrl}/users/login/`, data, {withCredentials: true});
}

//logout function
export async function logoutIn() {
  return axios.post(`${baseUrl}/users/logout/`, {withCredentials: true});
}


export async function deleteData(id) {
    return axios.delete(baseUrl + '/todos/delete/' + id);
}

export async function createTodo(todo) {
    return axios.post(`${baseUrl}/todos/create/`, todo, {withCredentials: true});
}

export async function register(userData) {
    return axios.post(`${baseUrl}/users/register/`, userData);
}


export async function editTodo(pk, data) {
    return axios.put(`${baseUrl}/todos/edit/todo/${pk}/`, data, {withCredentials: true});
}

export async function getTodo(id) {
    return axios.get(`${baseUrl}/todos/todo/${id}/`);
}

export async function retrieveUserData(token) {
  try {
    // Configura las opciones por defecto, como encabezados personalizados
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    // Realiza la solicitud utilizando axios
    const response = await axios.get(`${baseUrl}/users/user`, { withCredentials: true });
    // Devuelve los datos  de la solicitud
    return response.data;
  } catch (error) {
    // Maneja errores aquí si es necesario
    console.error('Error al recuperar datos de usuario:', error);
    throw error; 
  }
}

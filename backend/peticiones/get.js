// importamos la herramienta básica para pedir información al servidor
import { realizarPeticion } from "../helpers/fetch.js";

/**
 * verifica si un usuario existe dentro de la lista de tareas
 */
export const validarUsuario = async (identificadorBusqueda) => {

    // solicitamos la lista completa de tareas al servidor
    const listaTareas = await realizarPeticion("todos");
    
    // buscamos si algún elemento coincide con el id de usuario proporcionado
    const usuarioEncontrado = listaTareas.find(tarea => Number(tarea.userId) === Number(identificadorBusqueda));
    
    // devolvemos verdadero si el usuario existe, de lo contrario devolvemos falso
    return usuarioEncontrado ? true : false;
}

/**
 * trae todas las tareas que pertenecen a un usuario específico
 */
export const obtenerTareasPorUsuario = async (idUsuario) => {
    
    // pedimos al servidor que filtre y nos entregue solo las tareas de ese usuario
    const tareasFiltradas = await realizarPeticion(`todos?userId=${idUsuario}`);
    
    // entregamos la lista de tareas obtenida
    return tareasFiltradas; 
};

/**
 * genera una lista de identificadores de usuario únicos y ordenados
 */
export const obtenerIdentificadoresUnicos = async () => {

    // traemos todos los datos desde el servidor
    const todosLosDatos = await realizarPeticion("todos");

    // creamos una lista solo con los id de usuario, eliminamos repetidos y ordenamos de menor a mayor
    // usamos set para limpiar duplicados y sort para organizar la numeración
    const listaOrdenada = [...new Set(todosLosDatos.map(item => item.userId))];
    
    // devolvemos los números organizados mediante una comparación simple
    return listaOrdenada.sort((valorA, valorB) => valorA - valorB);
}

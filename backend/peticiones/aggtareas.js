// importamos la función encargada de realizar la petición al servidor
import { realizarPeticion } from "../helpers/fetch.js";

/**
 * gestiona la creación de una tarea: valida datos y prepara el objeto antes de enviarlo
 */
export const registrarTarea = async (usuarioId, textoTarea, tareaId) => {
    
    // validación: si el título solo contiene espacios o está vacío, cancelamos el proceso
    if (!textoTarea.trim()) return { error: "el campo título es obligatorio" };

    // incrementamos el identificador para la nueva entrada
    tareaId += 1;
    
    // estructuramos el objeto siguiendo el formato que requiere la base de datos o api
    const datosTarea = {
        userId: Number(usuarioId), // aseguramos que el id de usuario sea de tipo numérico
        title: textoTarea,         // asignamos el nombre descriptivo de la tarea
        completed: false           // por defecto, toda tarea nueva inicia como pendiente
    }

    // ejecutamos la petición enviando el punto de acceso y los datos preparados
    const resultado = await realizarPeticion("todos", datosTarea);
    
    // devolvemos el resultado de la operación para que el controlador lo gestione
    return resultado;
};

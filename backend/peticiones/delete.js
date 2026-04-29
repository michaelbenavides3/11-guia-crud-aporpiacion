// importamos la función encargada de solicitar el borrado al servidor
import { ejecutarEliminacion } from "../helpers/fetch.js";

/**
 * gestiona la eliminación de una tarea específica usando su identificador
 */
export const borrarTarea = async (identificadorTarea) => {
    
    // enviamos la solicitud indicando la ruta y el id del elemento a borrar
    // el resultado será la confirmación de que la tarea ya no existe en el servidor
    const respuesta = await ejecutarEliminacion(`todos/${identificadorTarea}`);

    // devolvemos la respuesta para que el controlador actualice la pantalla
    return respuesta;
};

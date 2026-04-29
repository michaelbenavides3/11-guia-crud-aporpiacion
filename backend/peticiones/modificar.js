// importamos la herramienta encargada de hacer cambios parciales en el servidor
import { realizarActualizacion } from "../helpers/fetch.js";

/**
 * gestiona el cambio de nombre de una tarea específica
 */
export const modificarTituloTarea = async (identificadorTarea, nuevoTexto) => {
    
    // validación: nos aseguramos de que el nuevo nombre no esté vacío o solo tenga espacios
    if (!nuevoTexto.trim()) return { error: "el título no puede estar vacío" };

    // preparamos el objeto solo con el campo que necesitamos actualizar
    const datosActualizados = {
        title: nuevoTexto
    };

    // enviamos la actualización a la dirección exacta de la tarea y devolvemos la respuesta
    return await realizarActualizacion(`todos/${identificadorTarea}`, datosActualizados);
};

// esta es la base de la dirección de tu servidor local
const servidor = "http://localhost:3000/tareas";

/**
 * función básica para pedir información (método get)
 */
export const realizarPeticion = async (ruta) => {
    const solicitud = await fetch(`${servidor}${ruta}`);
    const datos = await solicitud.json();
    return datos;
};

/**
 * función para guardar nuevos datos (método post)
 */
export const crearTarea = async (ruta, nuevosDatos) => {
    const solicitud = await fetch(`${servidor}${ruta}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevosDatos) 
    });
    const datos = await solicitud.json();
    return datos;
};

/**
 * función para modificar datos existentes (método patch)
 */
export const realizarActualizacion = async (ruta, datosModificados) => {
    const solicitud = await fetch(`${servidor}${ruta}`, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(datosModificados)
    });
    return await solicitud.json();
};

/**
 * función para eliminar datos (método delete)
 */
export const ejecutarEliminacion = async (ruta) => {
    const solicitud = await fetch(`${servidor}${ruta}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json' 
        }
    });
    return await solicitud.json();
}

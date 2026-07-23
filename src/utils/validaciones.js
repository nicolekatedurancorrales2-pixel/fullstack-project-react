export function esCorreoValido(correo){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(correo)
}

export function contarTareasPendientes(tareas){
    // Si tareas no existe o no es un arreglo, devolvemos 0 en lugar de romper
    if (!tareas || !Array.isArray(tareas)) return 0
    return tareas.filter((t)=> !t.completada).length
}
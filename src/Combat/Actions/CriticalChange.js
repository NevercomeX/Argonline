export function handleCriticalChange(value) {
    // Verificar si el valor es crítico
    if (value >= 100) {
        // Realizar acciones para el cambio crítico
        console.log("¡Cambio crítico detectado!");
        // Aquí puedes agregar el código que deseas ejecutar cuando ocurre un cambio crítico
    } else {
        // Realizar acciones para otros casos
        console.log("No se detectó cambio crítico.");
        // Aquí puedes agregar el código que deseas ejecutar cuando no ocurre un cambio crítico
    }
}



// Ejemplo de uso
handleCriticalChange(120); // Output: ¡Cambio crítico detectado!
handleCriticalChange(80); // Output: No se detectó cambio crítico.
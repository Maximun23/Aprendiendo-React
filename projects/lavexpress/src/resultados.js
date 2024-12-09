    // Archivo: Js/resultados.js

    // Seleccionamos las barras de progreso
    const filledBars = document.querySelectorAll('.filled-bar');

    // Función para mostrar el tooltip
    function showTooltip(event) {
        const tooltip = event.target.querySelector('.tooltip'); // Selecciona el tooltip dentro de la barra
        tooltip.style.display = 'block'; // Muestra el tooltip
    }

    // Función para ocultar el tooltip
    function hideTooltip(event) {
        const tooltip = event.target.querySelector('.tooltip'); // Selecciona el tooltip dentro de la barra
        tooltip.style.display = 'none'; // Oculta el tooltip
    }

    // Agregar eventos de hover (mouseenter y mouseleave)
    filledBars.forEach(bar => {
        bar.addEventListener('mouseenter', showTooltip); // Mostrar el tooltip al hacer hover
        bar.addEventListener('mouseleave', hideTooltip); // Ocultar el tooltip al quitar el hover
    });

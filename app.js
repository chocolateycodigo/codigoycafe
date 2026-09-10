document.getElementById('simuladorForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // 1. Obtener los valores del usuario
    const valorCasa = parseFloat(document.getElementById('valorCasa').value);
    const salario = parseFloat(document.getElementById('salario').value);
    const subcuenta = parseFloat(document.getElementById('subcuenta').value);

    // 2. Lógica matemática básica de Cofinavit
    // El Infonavit en Cofinavit suele prestar hasta un tope, estimemos un 30% del valor para este ejemplo simple
    let creditoInfonavit = salario * 15; // Estimación simple basada en capacidad de pago
    if (creditoInfonavit > (valorCasa * 0.30)) {
        creditoInfonavit = valorCasa * 0.30;
    }

    // El enganche mínimo suele ser del 10% del valor de la casa
    const enganche = valorCasa * 0.10;

    // El crédito del banco cubre el resto (Valor Casa - Infonavit - Subcuenta)
    let creditoBanco = valorCasa - creditoInfonavit - subcuenta;
    if (creditoBanco < 0) creditoBanco = 0;

    // Estimación de mensualidad (Regla de dedo: $10,000 pesos por cada millón prestado)
    const mensualidadEstimada = ((creditoBanco + creditoInfonavit) / 1000000) * 10000;

    // 3. Mostrar los resultados en la pantalla
    const formatearMoneda = (cantidad) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cantidad);

    document.getElementById('resInfonavit').textContent = formatearMoneda(creditoInfonavit);
    document.getElementById('resBanco').textContent = formatearMoneda(creditoBanco);
    document.getElementById('resEnganche').textContent = formatearMoneda(enganche);
    document.getElementById('resMensualidad').textContent = formatearMoneda(mensualidadEstimada);

    // Hacer visible la caja de resultados
    document.getElementById('resultadoSimulacion').style.display = 'block';
});
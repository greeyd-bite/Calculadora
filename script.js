// Array de productos (se mantiene)
let productos = [];
let total = 0;

// Referencias a elementos del DOM
const searchInput = document.getElementById('searchInput');
const listaProductos = document.getElementById('listaProductos');

// Función para agregar un producto
function agregarProducto() {
    const nombre = document.getElementById("nombreProducto").value.trim();
    const precio = parseFloat(document.getElementById("precioProducto").value);
    const cantidad = parseInt(document.getElementById("cantidadProducto").value) || 1;
    const descuento = parseFloat(document.getElementById("descuentoProducto").value) || 0;

    if (nombre && !isNaN(precio) && cantidad > 0) {
        const subtotalSinDescuento = precio * cantidad;
        const subtotal = subtotalSinDescuento - (subtotalSinDescuento * (descuento / 100));

        productos.push({ nombre, precio, cantidad, descuento, subtotal });
        total += subtotal;

        // Limpiar campos
        document.getElementById("nombreProducto").value = "";
        document.getElementById("precioProducto").value = "";
        document.getElementById("cantidadProducto").value = "1";
        document.getElementById("descuentoProducto").value = "0";

        // Actualizar la lista de productos
        actualizarLista();
        actualizarTotales();
    } else {
        alert("Por favor, ingresa datos válidos.");
    }
}

// Función para actualizar la lista de productos
function actualizarLista() {
    // Limpiar la lista de productos
    listaProductos.innerHTML = '';

    // Filtrar productos según búsqueda
    const term = searchInput.value.trim().toLowerCase();
    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(term)
    );

    // Renderizar productos filtrados
    filtrados.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} x${p.cantidad} (desc. ${p.descuento}%): $${p.subtotal.toFixed(2)}`;
        listaProductos.appendChild(li);
    });
}

// Función para actualizar los totales (IVA, Total con IVA)
function actualizarTotales() {
    const iva = total * 0.19;
    const totalConIva = total + iva;

    document.getElementById("ivaValor").textContent = iva.toFixed(2);
    document.getElementById("total").textContent = totalConIva.toFixed(2);
}

// Función para imprimir el recibo
function imprimirRecibo() {
    let recibo = "RECIBO DE COMPRA\n\n";
    productos.forEach(p => {
        recibo += `${p.nombre} x${p.cantidad} (desc. ${p.descuento}%): $${p.subtotal.toFixed(2)}\n`;
    });
    const iva = total * 0.19;
    const totalConIva = total + iva;
    const metodo = document.getElementById("metodoPago").value;

    recibo += `\nIVA (19%): $${iva.toFixed(2)}\n`;
    recibo += `TOTAL: $${totalConIva.toFixed(2)}\n`;
    recibo += `Método de pago: ${metodo}\n`;

    const win = window.open('', '_blank');
    win.document.write(`<pre>${recibo}</pre>`);
    win.print();
}

// Función para reiniciar la caja
function reiniciarCaja() {
    productos = [];
    total = 0;
    document.getElementById("listaProductos").innerHTML = "";
    document.getElementById("ivaValor").textContent = "0.00";
    document.getElementById("total").textContent = "0.00";
    searchInput.value = '';  // Limpiar la búsqueda
    actualizarLista();  // Actualizar lista de productos (vacía)
}

// Event listener para la búsqueda en tiempo real
searchInput.addEventListener('input', actualizarLista);

function alternarCalculadora() {
    const calculadora = document.getElementById("calculadora");
    const boton = document.getElementById("toggleCalculadora");

    if (calculadora.style.display === "none") {
        calculadora.style.display = "block";
        boton.textContent = "Ocultar Calculadora";
    } else {
        calculadora.style.display = "none";
        boton.textContent = "Mostrar Calculadora";
    }
}

function alternarCalculadora() {
    const calculadora = document.getElementById("calculadora");
    calculadora.style.display = (calculadora.style.display === "none" || calculadora.style.display === "") ? "block" : "none";
}

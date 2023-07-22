const seccionDeTarjetas = document.getElementById("productos-container");
const unidadElements = document.getElementById("unidades");
const precioElements = document.getElementById("precio-final");
const reiniciarElements = document.getElementById("reiniciar");

function crearTarjetasProductosInicio() {
  seccionDeTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("consolas"));
  
  productos && productos.length > 0 ?
    productos.forEach(producto => {
      const nuevasConsolas = document.createElement("div");
      nuevasConsolas.classList = "producto-finalizado";
      nuevasConsolas.innerHTML = `
        <img src=".${producto.img}">
        <h3>${producto.consola}</h3>
        <span class="producto-precio">$${producto.precio}</span>
        <div>
          <button>+</button>
          <span class="cantidad">${producto.cantidad}</span>
          <button>-</button>
        </div>
      `;
      seccionDeTarjetas.appendChild(nuevasConsolas);
      nuevasConsolas.getElementsByTagName("button")[0].addEventListener("click", (e)=> {
        const contarElement = e.target.parentElement.getElementsByTagName("span")[0];
        contarElement.innerText = agregarAlCarrito(producto);
        actualizarTotal();
      });
      nuevasConsolas.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
        restarAlCarrito(producto);
        crearTarjetasProductosInicio();
        actualizarTotal();
      });
    }) : null;
}

crearTarjetasProductosInicio(consolas);
actualizarTotal();

function actualizarTotal() {
  const productos = JSON.parse(localStorage.getItem("consolas"));
  let unidades = 0;
  let precio = 0;
  
  productos && productos.length > 0 ?
    productos.forEach(producto => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    }) : null;
  
  unidadElements.innerText = unidades;
  precioElements.innerText = precio;
}

reiniciarElements.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("consolas");
  actualizarTotal();
  crearTarjetasProductosInicio();
}

const botonComprar = document.getElementsByClassName("boton-finalizacion")[0];

botonComprar.addEventListener('click', () => {
  const productos = JSON.parse(localStorage.getItem("consolas"));
  
  productos && productos.length > 0 ?
    Swal.fire({
      title: 'Listo',
      text: 'Compraste los productos exitosamente',
      icon: "success",
      confirmButtonText: 'Aceptar'
    }) :
    Swal.fire({
      icon: 'error',
      title: 'Hubo un error.',
      text: 'No hay ningun producto en el carrito.',
      footer: '<a href="../index.html">Ir a al menu de Compras</a>'
    });
});

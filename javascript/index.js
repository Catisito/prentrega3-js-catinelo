const seccionDeTarjetas = document.getElementById("productos-container");
const mensajeVacioElements = document.getElementById("carrito-vacio");
const totalesElements = document.getElementById("totales");

function crearTarjetasProductosInicio(consolas){
  const productos = consolas;
  console.log(productos);
  productos.forEach(producto => {
    const nuevasConsolas = document.createElement("div");
    nuevasConsolas.classList = "tarjeta-producto"
    nuevasConsolas.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.consola}</h3>
      <span class="cuotas">Hasta 12 cuotas sin interes!!</span>
      <span>$${producto.precio}</span>
      <button>Agregar al carrito</button>
    `;
    seccionDeTarjetas.appendChild(nuevasConsolas);
    nuevasConsolas.getElementsByTagName("button")[0].addEventListener("click", ()=> agregarAlCarrito(producto));
  })
}

crearTarjetasProductosInicio(consolas);


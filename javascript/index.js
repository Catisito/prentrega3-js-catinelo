const seccionDeTarjetas = document.getElementById("productos-container");
const mensajeVacioElements = document.getElementById("carrito-vacio");
const totalesElements = document.getElementById("totales");



function crearTarjetasProductosInicio(consolas) {
  const productos = consolas;
  productos.forEach((producto) => {
    const nuevasConsolas = document.createElement("div");
    nuevasConsolas.classList = "tarjeta-producto";
    nuevasConsolas.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.consola}</h3>
      <span class="cuotas">Hasta 12 cuotas sin interes!!</span>
      <span>$${producto.precio}</span>
      <button class="sumarProducto">Agregar al Carrito</button>
    `;
    seccionDeTarjetas.appendChild(nuevasConsolas);
    nuevasConsolas.getElementsByClassName("sumarProducto")[0].addEventListener("click", () => agregarAlCarrito(producto));
  });
}

crearTarjetasProductosInicio(consolas);

const sumarProducto = document.getElementsByClassName("sumarProducto");

Array.from(sumarProducto).forEach((boton) => {
  boton.addEventListener("click", () => {
    const productos = JSON.parse(localStorage.getItem("consolas"));
    Toastify({
      text: "Producto Agregado",
      duration: 1500,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: false,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#38b000",
        fontFamily: "'Roboto', sans-serif"
      },
      onClick: function(){} // Callback after click
    }).showToast();
  })
})




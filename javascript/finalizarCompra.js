const seccionDeTarjetas = document.getElementById("productos-container");
const unidadElements = document.getElementById("unidades");
const precioElements = document.getElementById("precio-final");
const mensajeVacioElements = document.getElementById("carrito-vacio")
const totalesElements = document.getElementById("totales");
const reiniciarElements = document.getElementById("reiniciar");

function crearTarjetasProductosInicio(){
  seccionDeTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("consolas"));
  console.log(productos);
  if(productos && productos.length > 0){
    productos.forEach(producto => {
      const nuevasConsolas = document.createElement("div");
      nuevasConsolas.classList = "producto-finalizado"
      nuevasConsolas.innerHTML = `
      <img src="${producto.img}">
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
        actualizarTotal()
      });
      nuevasConsolas.getElementsByTagName("button")[1].addEventListener("click", (e)=> {
        restarAlCarrito(producto)
        crearTarjetasProductosInicio();
        actualizarTotal()
        
      });
    })
   }
  }
  crearTarjetasProductosInicio(consolas);
  actualizarTotal()

  function actualizarTotal(){
    const productos = JSON.parse(localStorage.getItem("consolas"));
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length > 0) {
      productos.forEach(producto => {
        unidades += producto.cantidad;
        precio += producto.precio * producto.cantidad;
      })
      unidadElements.innerText = unidades;
      precioElements.innerText = precio;
    }
  }

  function revisarElMensajeVacio() {
    const productos = JSON.parse(localStorage.getItem("consolas")) || [];
    mensajeVacioElements.classList.toggle("oculto", productos.length > 0);
    totalesElements.classList.toggle("oculto", productos.length === 0);
  }

  revisarElMensajeVacio();


  reiniciarElements.addEventListener("click", reiniciarCarrito);
function reiniciarCarrito() {
  localStorage.removeItem("consolas")
  actualizarTotal();
  crearTarjetasProductosInicio();
}
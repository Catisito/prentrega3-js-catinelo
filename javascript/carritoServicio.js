function agregarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("consolas"));
  console.log(memoria);
  let cuenta = 0;
  if(!memoria){
    const nuevoProducto = getNuevoProductoParaMemoria(producto);
    localStorage.setItem("consolas", JSON.stringify([nuevoProducto]))
    cuenta = 1;
  }else {
    const indiceProducto = memoria.findIndex(consola => consola.id === producto.id)
    console.log(indiceProducto)
    if(indiceProducto === -1){
      memoria.push(getNuevoProductoParaMemoria(producto))
      cuenta = 1;
    } else {
      memoria[indiceProducto].cantidad ++;
      cuenta = memoria[indiceProducto].cantidad; 
    }
    localStorage.setItem("consolas", JSON.stringify(memoria))
  }
  sumarNumeroCarrito();
  return cuenta;
}

function restarAlCarrito(producto) {
  const memoria = JSON.parse(localStorage.getItem("consolas"));
  const indiceProducto = memoria.findIndex(consola => consola.id === producto.id)
  if(memoria[indiceProducto].cantidad === 1){
    memoria.splice(indiceProducto,1);
  } else {
    memoria[indiceProducto].cantidad--;
  }
  localStorage.setItem("consolas", JSON.stringify(memoria))
  sumarNumeroCarrito();
}

/* Toma un producto y le agrega la cantidad de 1 y lo devuelve */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}


const cuentaCarritoElement = document.getElementById("cuenta-carrito");
function sumarNumeroCarrito(){
  const memoria = JSON.parse(localStorage.getItem("consolas"));
  if(memoria && memoria.length >0){
    const cuenta = memoria.reduce((acum, current) => acum+current.cantidad,0)
    cuentaCarritoElement.innerText = cuenta;
    console.log(cuenta);
  }else {
    cuentaCarritoElement.innerText = 0;
  }
}

sumarNumeroCarrito()

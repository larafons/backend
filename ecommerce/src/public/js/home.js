const socket = io();
socket.emit('message', 'Hola! Me estoy comunicando desde un web socket!')

socket.on('productosActualizados', (productos) => {
    console.log(productos)
    const productList = document.getElementById("productList");
    productList.innerHTML = productos
  });
  
  const crearProductoForm = document.getElementById('crearProductoForm');
  crearProductoForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const title = crearProductoForm.title.value;
    const price = crearProductoForm.price.value;
    const description = crearProductoForm.description.value;
    const code = crearProductoForm.code.value;
    const stock = crearProductoForm.stock.value;
    const category = crearProductoForm.category.value;

    socket.emit('crearProducto', {title, price, description, code, stock, category});
  
    crearProductoForm.reset();
  });
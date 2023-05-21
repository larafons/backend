import fs from "fs";

class Cart {
    constructor(products){
        this.id= null
        this.products= products
    }
}

const path = "./carts.json"

export default class CartManager { 

    obtenerCarritos = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8");
            const carts = JSON.parse(data);
            return carts;
        } else {
            return [];
        }
    }

    agregarCarrito = async (products) => {
        let carts = await this.obtenerCarritos();
        let cart = new Cart();
        if (carts.length == 0){
            cart.id = 1;
        } else {
            cart.id = carts[carts.length -1].id + 1;
        }
        cart.products = products;
        carts.push(cart); //agrego el carrito con id
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
        return "Carrito con id "+cart.id+" ha sido agregado";
    }

    consultarCarrito = async (id) =>{
        const carts = await this.obtenerCarritos();
        const cart = carts.find(p => p.id === parseInt(id));

        if (cart) {
            console.log("Carrito encontrado!")
            console.log(JSON.stringify(cart));
            return cart
        } else {
            console.log('Carrito con ID '+id+' no encontrado');
            return ("Carrito id: "+id+" no existente")
        }
    }

    agregarProductoAlCarrito = async (cartId, productId) => {
        productId=  parseInt(productId);
        const carts = await this.obtenerCarritos();
        console.log(carts)
        const index = carts.findIndex((c) => c.id === parseInt(cartId));
        
        if (index !== -1) {
            const oldCart = carts[index];
            const productIndex = oldCart.products.findIndex(p => p.id ===productId);
            
            if (productIndex !== -1) {
                oldCart.products[productIndex].quantity++;
            } else {
                const newItem = { id: productId, quantity: 1 };
                oldCart.products.push(newItem);
            }
            
            await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
            return ('Carrito con ID ' + cartId + ' ha sido actualizado');
        } else {
            return ('Carrito con ID ' + cartId + ' no encontrado');
        }
    } 
}

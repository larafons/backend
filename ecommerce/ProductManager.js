import fs from "fs";

class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.id= null //esto es para que funcione el nextId
        this.title= title
        this.description= description
        this.price= price
        this.thumbnail= thumbnail
        this.code= code
        this.stock= stock
    }
}

const path = "./products.json"

export default class ProductManager {

    obtenerProductos = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path, "utf-8");
            const products = JSON.parse(data);
            return products;
        } else {
            return [];
        }
    }

    agregarProducto = async (product) => {
        let products = await this.obtenerProductos();
        let ok = true
        //si hay algun campo vacio entro al if
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) { 
            console.log("Todos los campos son obligatorios")
            ok= false //si hay alguno vacio pongo ok en false para no ejecutar mas codigo innecesariamente
        }
        if (ok){
            if (products.length == 0){
                product.id = 1;
            } else {
                product.id = products[products.length -1].id + 1;
            }
            products.push(product); //agrego el producto con id
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
            console.log("Producto "+product.title+" con id "+product.id+" ha sido agregado")
        }
    }

    consultarProducto = async (id) =>{
        const products = await this.obtenerProductos();
        const product = products.find(p => p.id === parseInt(id));

        if (product) {
            console.log("Producto encontrado!")
            console.log(JSON.stringify(product));
            return product
        } else {
            console.log('Producto con ID '+id+' no encontrado');
            return ("Producto id: "+id+" no existente")
        }
    }

    modificarProducto = async (id, newProduct, sobreecribir = false) => {
        let products = await this.obtenerProductos();
        let i = products.findIndex((p) => p.id === id);
        if (i !== -1) { //si encuentro el producto en el archivo
            if (sobreecribir) {
                // si se sobrescribe completamente el objeto, reemplazo el producto completo
                newProduct.id = id; // dejo el mismo id
                products[i] = newProduct;
            } else {
                // si no, se actualizan solo los campos modificados
                const oldProduct = products[i];
                oldProduct.title = newProduct.title || oldProduct.title;
                oldProduct.description = newProduct.description || oldProduct.description;
                oldProduct.price = newProduct.price || oldProduct.price;
                oldProduct.thumbnail = newProduct.thumbnail || oldProduct.thumbnail;
                oldProduct.code = newProduct.code || oldProduct.code;
                oldProduct.stock = newProduct.stock || oldProduct.stock;
            }
            await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
            console.log('Producto con ID '+id+' ha sido actualizado');
        } else {
            console.log('Producto con ID '+id+' no encontrado');
        }
    }
    
    eliminarProducto = async (id) => {
        const products = await this.obtenerProductos();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            console.log('Producto con ID '+id+' no encontrado');
        } else {
            products.splice(index, 1);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
        }
    }

}

/*
const productManager = new ProductManager();

let p1= new Product("Coca cola", "Gaseosa", 500, "####", 6665, 100);
let p2= new Product("Agua", "Agua mineral", 200, "****", 1233, 6);
let p3= new Product("Sprite", "Gaseosa", 100, "####", 6666, 333);


await productManager.agregarProducto(p1);
await productManager.agregarProducto(p2);
await productManager.agregarProducto(p3);
await productManager.consultarProducto(1);
let products = await productManager.obtenerProductos();
products.forEach(p => {
    console.log(p)
});
await productManager.eliminarProducto(3);
let p2modificado= new Product("Agua", "Villavicencio", 200, "****", 1233, 6);
await productManager.modificarProducto(2, p2modificado, true) */
class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title= title
        this.description= description
        this.price= price
        this.thumbnail= thumbnail
        this.code= code
        this.stock= stock
    }
}

class ProductManager {
    constructor(){
        this.products= []
        this.nextId = 0;
    }

    addProduct(product){
        let ok = true
        //si no hay ningun campo vacio
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) { 
            console.log("Todos los campos son obligatorios")
            ok= false //si hay alguno vacio pongo ok en false para no ejecutar mas codigo innecesariamente
        }
        //si no hay campos vacios y no se repite el codigo
        if (ok && !(this.products.some(p => p.code === product.code))){
            let newProduct = {
                ...product,
                id: this.nextId++ //agrego el id
            };
            this.products.push(newProduct); //agrego el producto con id
            console.log("Producto "+newProduct.title+" con id "+newProduct.id+" ha sido agregado")
        } else {
            console.log("El campo code no puede repetirse")
        }
    }

    getProducts(){
        return this.products
    }

    getProductsById(id){
        let prod = this.products.find(p => p.id == id)
        if (prod == undefined){
            console.log("Not found")
        } else {
            console.log(prod)
        }
    }
}

const productManager = new ProductManager();

p1= new Product("Coca cola", "Gaseosa", 500, "####", 6666, 100)
p2= new Product("Agua", "Agua mineral", 200, "****", 1233)
p3= new Product("Sprite", "Gaseosa", 100, "####", 6666, 333)

console.log("Coca cola")
productManager.addProduct(p1)
console.log("Agua")
productManager.addProduct(p2)
console.log("Sprite")
productManager.addProduct(p3)
console.log("-----------------------")
productManager.getProductsById(0)
productManager.getProductsById(500)
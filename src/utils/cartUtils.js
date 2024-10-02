import Cookies from "js-cookie";

class CartUtils {
  constructor() {}

  appendProductInCart(newProduct) {
    const cartDetails = this.getProductsInCartByCart();
    const existProductInCart = cartDetails.products.findIndex(
      (product) => product._id === newProduct._id
    );
    if (existProductInCart !== -1) {
      cartDetails.products[existProductInCart].quantity += 1;
    } else {
      cartDetails.products.push({ ...newProduct, quantity: 1 });
    }

    Cookies.set("shopping_cart", JSON.stringify(cartDetails));
    return cartDetails;
  }

  getProductsInCartByCart() {
    const currentCart = Cookies.get("shopping_cart");
    return currentCart
      ? JSON.parse(currentCart)
      : {
          products: [],
        };
  }
}

export { CartUtils };

/* ExampleForCart: 

{
	products: [
		{
			category: "Aventura"
			description: "asdsadas"
			discount: 10,
			image: "/uploads/1727840459570.jpg",
			name: "dsadasdsa",
			oldPrice: 213,
			price: 31213,
			__v: 0,
			_id: "66fcc0cbac1512a128bfe9f1",
			quantity: 1               ------> Para la cantidad productos
		}
	]
}
*/

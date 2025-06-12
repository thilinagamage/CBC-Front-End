export default function getCart() {
    let cart = localStorage.getItem("cart");

    if (cart == null) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return [];
    }

    return JSON.parse(cart);
}

export function addToCart(product, qty) {
    let cart = getCart();

    // Ensure quantity is a valid number
    qty = parseInt(qty) || 1;

    let productIndex = cart.findIndex((p) => p.productId === product.productId);

    if (productIndex === -1) {
        cart.push({
            productId: product.productId,
            name: product.name,
            altNames: product.altNames,
            price: product.price,
            labeledPrice: product.labeledPrice,
            images: product.images,
            quantity: qty
        });
    } else {
        cart[productIndex].quantity = parseInt(cart[productIndex].quantity || 0) + qty;

        if (cart[productIndex].quantity <= 0) {
            cart = cart.filter((p) => p.productId !== product.productId);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

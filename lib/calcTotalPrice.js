export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    const product = cartItem.product || cartItem || undefined;
    if (!product) return tally; // products can be deleted, but they could still be in your cart
    return tally + (cartItem.quantity || 1) * product.price;
  }, 0);
}

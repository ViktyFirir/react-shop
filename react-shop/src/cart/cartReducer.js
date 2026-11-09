export function cartReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { product } = action
      const found = state.find((item) => item.id === product.id)

      if (found) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...state,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ]
    }

    case 'remove':
      return state.filter((item) => item.id !== action.id)

    case 'changeQuantity':
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: Math.max(1, item.quantity + action.delta) }
          : item
      )

    case 'clear':
      return []

    default:
      throw new Error(`Unknown cart action: ${action.type}`)
  }
}
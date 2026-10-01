const categoryImages: Record<string, string> = {
  celular: '/images/category-cellular.svg',
  laptop: '/images/category-laptop.svg',
  monitor: '/images/category-monitor.svg',
  teclado: '/images/category-keyboard.svg',
  mouse: '/images/category-mouse.svg',
  audifonos: '/images/category-headphones.svg',
}

// Local photos keep the static site independent of third-party image hosts.
// Products without an exact photo use their category illustration as fallback.
const productImages: Record<number, string> = {
  1: '/images/products/product-1.jpg',
  2: '/images/products/product-2.jpg',
  3: '/images/products/product-3.jpg',
  4: '/images/products/product-4.jpg',
}

export function productImage(id: number, category: string, imageUrl?: string | null): string {
  return imageUrl || productImages[id] || categoryImages[category] || '/images/category-cellular.svg'
}

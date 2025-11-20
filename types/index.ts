import { type ReactNode } from "react"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating?: {
        rate: number
        count: number
    }
}

export interface CartIconProps {
    color?: string
    size?: number
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface CartContextType {
    items: CartItem[]
    addItem: (product: Product, quantity: number) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    getItemCount: () => number
    getTotal: () => number
}

export interface CartProviderProps {
    children: ReactNode
}
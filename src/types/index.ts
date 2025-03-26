export interface User {
    id: string
    username: string
    name: string
  }
  
  export interface Member {
    id: string
    code: string
    name?: string
    phone?: string
  }
  
  export interface Material {
    id: string
    name: string
    price: number
    category: string
    image?: string
  }
  
  export interface CartItem {
    material: Material
    weight: number
    deduction: number 
    total: number
    netWeight: number
    image?: string
  }
  
  export interface Transaction {
    id: string
    memberId?: string
    items: CartItem[]
    totalWeight: number
    totalAmount: number
    date: Date
    cashierId: string
  }
  
  
import { products } from '@/services/mockData/products.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const productService = {
  async getAll() {
    await delay(300)
    return [...products]
  },

  async getById(id) {
    await delay(200)
    const product = products.find(p => p.Id === id)
    if (!product) {
      throw new Error('Product not found')
    }
    return { ...product }
  },

  async create(productData) {
    await delay(400)
    const newProduct = {
      ...productData,
      Id: Math.max(...products.map(p => p.Id)) + 1
    }
    products.push(newProduct)
    return { ...newProduct }
  },

  async update(id, productData) {
    await delay(400)
    const index = products.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    products[index] = { ...products[index], ...productData }
    return { ...products[index] }
  },

  async delete(id) {
    await delay(300)
    const index = products.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Product not found')
    }
    const deleted = products.splice(index, 1)[0]
    return { ...deleted }
  }
}
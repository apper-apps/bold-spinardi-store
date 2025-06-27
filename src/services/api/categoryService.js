import { categories } from '@/services/mockData/categories.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryService = {
  async getAll() {
    await delay(200)
    return [...categories]
  },

  async getById(id) {
    await delay(150)
    const category = categories.find(c => c.Id === id)
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(300)
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id)) + 1
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(300)
    const index = categories.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Category not found')
    }
    categories[index] = { ...categories[index], ...categoryData }
    return { ...categories[index] }
  },

  async delete(id) {
    await delay(250)
    const index = categories.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Category not found')
    }
    const deleted = categories.splice(index, 1)[0]
    return { ...deleted }
  }
}
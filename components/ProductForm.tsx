'use client'

import { useState, useEffect } from 'react'
import { X, Save, Plus, Edit } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  imageId: string | null
  category: string | null
  stock: number
  featured: boolean
}

interface ProductFormProps {
  product: Product | null
  onSave: (data: {
    name: string
    description?: string
    price: number
    imageId?: string
    category?: string
    stock?: number
    featured?: boolean
  }) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageId: '',
    category: '',
    stock: '',
    featured: false
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        imageId: product.imageId || '',
        category: product.category || '',
        stock: product.stock.toString(),
        featured: product.featured
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    }
    
    onSave(data)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            {product ? <Edit className="w-6 h-6 text-blue-600" /> : <Plus className="w-6 h-6 text-green-600" />}
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold">
                {product ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <span className="text-xs text-gray-500">
                {product ? 'Mettre à jour les informations' : 'Ajouter un nouveau produit'}
              </span>
            </div>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (€)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="electronics">Électronique</option>
                <option value="clothing">Vêtements</option>
                <option value="books">Livres</option>
                <option value="home">Maison</option>
                <option value="sports">Sport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Image Cloudinary
              </label>
              <input
                type="text"
                name="imageId"
                value={formData.imageId}
                onChange={handleChange}
                placeholder="ex: samples/ecommerce/shoes"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Produit en vedette
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              <div className="flex flex-col text-left">
                <span className="font-medium">Annuler</span>
                <span className="text-xs text-gray-500">Fermer sans sauver</span>
              </div>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <div className="flex flex-col text-left">
                <span className="font-medium">{product ? 'Mettre à jour' : 'Créer'}</span>
                <span className="text-xs text-blue-100">
                  {product ? 'Sauvegarder les modifications' : 'Ajouter le produit'}
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
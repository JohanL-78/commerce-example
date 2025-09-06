import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: "Smartphone Premium",
      description: "Smartphone haut de gamme avec caméra 108MP",
      price: 899.99,
      category: "Électronique",
      stock: 50,
      featured: true
    },
    {
      name: "Laptop Gaming",
      description: "Ordinateur portable pour gaming avec RTX 4060",
      price: 1299.99,
      category: "Informatique",
      stock: 25,
      featured: true
    },
    {
      name: "Casque Bluetooth",
      description: "Casque sans fil à réduction de bruit",
      price: 199.99,
      category: "Audio",
      stock: 100,
      featured: false
    },
    {
      name: "Montre Connectée",
      description: "Montre intelligente avec GPS et cardio",
      price: 299.99,
      category: "Wearables",
      stock: 75,
      featured: true
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Données de seed créées avec succès!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
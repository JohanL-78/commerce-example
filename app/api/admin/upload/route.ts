import { v2 as cloudinary } from 'cloudinary'
import { requireAdmin } from '@/lib/auth-admin'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  try {
    await requireAdmin()

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Conversion du fichier en buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload vers Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'mvp-commerce',
          transformation: [
            { width: 800, height: 800, crop: 'fill' },
            { quality: 'auto', fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    return Response.json({ 
      public_id: (result as { public_id: string; secure_url: string }).public_id,
      secure_url: (result as { public_id: string; secure_url: string }).secure_url 
    })

  } catch (error) {
    console.error('Erreur upload Cloudinary:', error)
    return Response.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
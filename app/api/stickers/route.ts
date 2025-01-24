import { NextResponse } from 'next/server'

const TIXTE_API_URL = "https://api.tixte.com/v1"

interface TixteUpload {
  type: number;
  asset_id: string;
  name: string;
  domain: string;
  size: number;
  extension: string;
  mimetype: string;
  permission_level: number;
  uploaded_at: string;
  expiration: null;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const headers = {
    "Authorization": process.env.NEXT_PUBLIC_TIXTE_UPLOAD_KEY || '',
    "Content-Type": "application/json",
    "domain": "polaroidpix.tixte.co"
  } as const

  try {
    const response = await fetch(
      `${TIXTE_API_URL}/users/@me/uploads?page=1&limit=5&domain=polaroidpix.tixte.co`, 
      { 
        method: 'GET',
        headers,
        cache: 'no-store'
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Tixte API Error:', errorText)
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()
    console.log('Raw Tixte response:', JSON.stringify(data, null, 2))
    
    // Transform the data to include direct URLs
    const transformedData = {
      data: {
        uploads: data.data.uploads
          .filter((upload: TixteUpload) => upload.name && upload.extension) // Only include uploads with name and extension
          .map((upload: TixteUpload) => {
            const url = `https://us-east-1.tixte.net/uploads/polaroidpix.tixte.co/${upload.name}.${upload.extension}`
            console.log('Constructed URL:', url)
            return {
              id: upload.asset_id,
              name: upload.name,
              url: url
            }
          })
      }
    }

    console.log('Transformed data:', JSON.stringify(transformedData, null, 2))
    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stickers' },
      { status: 500 }
    )
  }
}
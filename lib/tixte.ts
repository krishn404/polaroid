interface TixteConfig {
  uploadKey: string;
  clientKey: string;
  clientSecret: string;
}

interface TixteImage {
  id: string;
  url: string;
  name: string;
  size: number;
  uploaded_at: string;
}

export class TixteAPI {
  private config: TixteConfig;
  private baseURL = 'https://api.tixte.com/v1';

  constructor(config: TixteConfig) {
    this.config = config;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const headers = {
      'Authorization': `Bearer ${this.config.clientKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Tixte API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getImages(page = 1, limit = 20): Promise<TixteImage[]> {
    try {
      const response = await this.fetchWithAuth(`/users/@me/uploads?page=${page}&limit=${limit}`);
      return response.data.uploads;
    } catch (error) {
      console.error('Error fetching images from Tixte:', error);
      return [];
    }
  }

  async uploadImage(file: File): Promise<TixteImage | null> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseURL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.uploadKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error uploading image to Tixte:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
export const tixteAPI = new TixteAPI({
  uploadKey: process.env.NEXT_PUBLIC_TIXTE_UPLOAD_KEY || '',
  clientKey: process.env.NEXT_PUBLIC_TIXTE_CLIENT_KEY || '',
  clientSecret: process.env.NEXT_PUBLIC_TIXTE_CLIENT_SECRET || '',
}); 
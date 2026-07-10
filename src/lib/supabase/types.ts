export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          email: string | null
          photo_url: string | null
          city: string | null
          country: string | null
          roles: string[]
          halal_coins_balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          phone?: string | null
          email?: string | null
          photo_url?: string | null
          city?: string | null
          country?: string | null
          roles?: string[]
          halal_coins_balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string | null
          phone?: string | null
          email?: string | null
          photo_url?: string | null
          city?: string | null
          country?: string | null
          roles?: string[]
          halal_coins_balance?: number
          updated_at?: string
        }
      }
      businesses: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          subcategory: string | null
          address: string | null
          city: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          email: string | null
          website: string | null
          image_url: string | null
          images: string[]
          rating: number | null
          review_count: number
          halal_verified: boolean
          halal_cert_url: string | null
          is_open: boolean | null
          opening_hours: Json | null
          owner_id: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          subcategory?: string | null
          address?: string | null
          city?: string | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          image_url?: string | null
          images?: string[]
          rating?: number | null
          review_count?: number
          halal_verified?: boolean
          halal_cert_url?: string | null
          is_open?: boolean | null
          opening_hours?: Json | null
          owner_id?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['businesses']['Insert']>
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          user_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          user_id?: string | null
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>
      }
      suggestions: {
        Row: {
          id: string
          category: string
          place_name: string
          address: string | null
          reason: string | null
          image_urls: string[]
          user_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          place_name: string
          address?: string | null
          reason?: string | null
          image_urls?: string[]
          user_id?: string | null
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['suggestions']['Insert']>
      }
      claims: {
        Row: {
          id: string
          business_name: string | null
          full_name: string
          mobile: string
          role: string
          proof_url: string | null
          user_id: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          business_name?: string | null
          full_name: string
          mobile: string
          role: string
          proof_url?: string | null
          user_id?: string | null
          status?: string
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['claims']['Insert']>
      }
      community_posts: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          author_id: string
          likes: number
          comment_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          author_id: string
          likes?: number
          comment_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['community_posts']['Insert']>
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: Partial<Database['public']['Tables']['messages']['Insert']>
      }
      saved_businesses: {
        Row: {
          id: string
          user_id: string
          business_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_id: string
          created_at?: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

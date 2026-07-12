export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      business_catalog_items: {
        Row: {
          business_id: string | null
          business_name: string | null
          created_at: string | null
          description: string | null
          firebase_business_id: string | null
          firebase_id: string | null
          id: string
          image_url: string | null
          lat: number | null
          lon: number | null
          price: number | null
          title: string | null
          vendor_uid: string | null
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          firebase_business_id?: string | null
          firebase_id?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lon?: number | null
          price?: number | null
          title?: string | null
          vendor_uid?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          firebase_business_id?: string | null
          firebase_id?: string | null
          id?: string
          image_url?: string | null
          lat?: number | null
          lon?: number | null
          price?: number | null
          title?: string | null
          vendor_uid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_catalog_items_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reviews: {
        Row: {
          body: string | null
          business_id: string
          created_at: string | null
          id: string
          images: string[] | null
          rating: number
          status: string
          title: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body?: string | null
          business_id: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          rating: number
          status?: string
          title?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string | null
          business_id?: string
          created_at?: string | null
          id?: string
          images?: string[] | null
          rating?: number
          status?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_staff: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_staff_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_staff_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          alcohol_served: string | null
          ambience_images: string[] | null
          assigned_owner: string | null
          assigned_owner_id: string | null
          category: string
          city: string | null
          claims: number | null
          compliance_docs: Json | null
          cost_per_person: string | null
          cost_two: string | null
          country: string | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          email: string | null
          firebase_business_id: string | null
          firebase_owner_uid: string | null
          full_responsibility: boolean | null
          halal_cert_url: string | null
          halal_verified: boolean | null
          hours_from: Json | null
          hours_open: Json | null
          hours_to: Json | null
          id: string
          image_url: string | null
          images: string[] | null
          is_open: boolean | null
          latitude: number | null
          lead_id: string | null
          logo_url: string | null
          longitude: number | null
          menu_images: string[] | null
          name: string
          opening_hours: Json | null
          ordering_platforms: Json | null
          owner_id: string | null
          phone: string | null
          popular_dishes: string | null
          prayer_times: Json | null
          price_range: string | null
          primary_cuisine: string | null
          rating: number | null
          review_count: number | null
          selected_amenities: string[] | null
          selected_cuisines: string[] | null
          selected_dining: string[] | null
          selected_highlights: string[] | null
          selected_meat: string[] | null
          selected_payment: string[] | null
          separate_kitchen: boolean | null
          separate_storage: boolean | null
          separate_utensils: boolean | null
          signature_dish: string | null
          social_links: Json | null
          starting_price: string | null
          state: string | null
          status: string | null
          sub_sub_category: string | null
          subcategory: string | null
          subscription_plan: string | null
          suppliers: Json | null
          under_no_cert: boolean | null
          updated_at: string | null
          website: string | null
          whatsapp: string | null
          youtube_links: string[] | null
        }
        Insert: {
          address?: string | null
          alcohol_served?: string | null
          ambience_images?: string[] | null
          assigned_owner?: string | null
          assigned_owner_id?: string | null
          category: string
          city?: string | null
          claims?: number | null
          compliance_docs?: Json | null
          cost_per_person?: string | null
          cost_two?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          firebase_business_id?: string | null
          firebase_owner_uid?: string | null
          full_responsibility?: boolean | null
          halal_cert_url?: string | null
          halal_verified?: boolean | null
          hours_from?: Json | null
          hours_open?: Json | null
          hours_to?: Json | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_open?: boolean | null
          latitude?: number | null
          lead_id?: string | null
          logo_url?: string | null
          longitude?: number | null
          menu_images?: string[] | null
          name: string
          opening_hours?: Json | null
          ordering_platforms?: Json | null
          owner_id?: string | null
          phone?: string | null
          popular_dishes?: string | null
          prayer_times?: Json | null
          price_range?: string | null
          primary_cuisine?: string | null
          rating?: number | null
          review_count?: number | null
          selected_amenities?: string[] | null
          selected_cuisines?: string[] | null
          selected_dining?: string[] | null
          selected_highlights?: string[] | null
          selected_meat?: string[] | null
          selected_payment?: string[] | null
          separate_kitchen?: boolean | null
          separate_storage?: boolean | null
          separate_utensils?: boolean | null
          signature_dish?: string | null
          social_links?: Json | null
          starting_price?: string | null
          state?: string | null
          status?: string | null
          sub_sub_category?: string | null
          subcategory?: string | null
          subscription_plan?: string | null
          suppliers?: Json | null
          under_no_cert?: boolean | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube_links?: string[] | null
        }
        Update: {
          address?: string | null
          alcohol_served?: string | null
          ambience_images?: string[] | null
          assigned_owner?: string | null
          assigned_owner_id?: string | null
          category?: string
          city?: string | null
          claims?: number | null
          compliance_docs?: Json | null
          cost_per_person?: string | null
          cost_two?: string | null
          country?: string | null
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          firebase_business_id?: string | null
          firebase_owner_uid?: string | null
          full_responsibility?: boolean | null
          halal_cert_url?: string | null
          halal_verified?: boolean | null
          hours_from?: Json | null
          hours_open?: Json | null
          hours_to?: Json | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          is_open?: boolean | null
          latitude?: number | null
          lead_id?: string | null
          logo_url?: string | null
          longitude?: number | null
          menu_images?: string[] | null
          name?: string
          opening_hours?: Json | null
          ordering_platforms?: Json | null
          owner_id?: string | null
          phone?: string | null
          popular_dishes?: string | null
          prayer_times?: Json | null
          price_range?: string | null
          primary_cuisine?: string | null
          rating?: number | null
          review_count?: number | null
          selected_amenities?: string[] | null
          selected_cuisines?: string[] | null
          selected_dining?: string[] | null
          selected_highlights?: string[] | null
          selected_meat?: string[] | null
          selected_payment?: string[] | null
          separate_kitchen?: boolean | null
          separate_storage?: boolean | null
          separate_utensils?: boolean | null
          signature_dish?: string | null
          social_links?: Json | null
          starting_price?: string | null
          state?: string | null
          status?: string | null
          sub_sub_category?: string | null
          subcategory?: string | null
          subscription_plan?: string | null
          suppliers?: Json | null
          under_no_cert?: boolean | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
          youtube_links?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      check_ins: {
        Row: {
          business_id: string
          check_date: string
          coins_earned: number
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          check_date?: string
          coins_earned?: number
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          check_date?: string
          coins_earned?: number
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_ins_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          business_name: string | null
          created_at: string | null
          full_name: string
          id: string
          mobile: string
          proof_url: string | null
          role: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          full_name: string
          id?: string
          mobile: string
          proof_url?: string | null
          role: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          full_name?: string
          id?: string
          mobile?: string
          proof_url?: string | null
          role?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string
          category: string
          comment_count: number | null
          content: string
          created_at: string | null
          id: string
          likes: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          category: string
          comment_count?: number | null
          content: string
          created_at?: string | null
          id?: string
          likes?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          category?: string
          comment_count?: number | null
          content?: string
          created_at?: string | null
          id?: string
          likes?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creators: {
        Row: {
          avatar_url: string | null
          bio: string | null
          category: string | null
          cover_url: string | null
          created_at: string | null
          display_name: string | null
          firebase_uid: string | null
          follower_count: number | null
          id: string
          post_count: number | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          firebase_uid?: string | null
          follower_count?: number | null
          id?: string
          post_count?: number | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          cover_url?: string | null
          created_at?: string | null
          display_name?: string | null
          firebase_uid?: string | null
          follower_count?: number | null
          id?: string
          post_count?: number | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      feed_posts: {
        Row: {
          business_id: string | null
          business_name: string | null
          created_at: string | null
          description: string | null
          display_name: string | null
          firebase_created_on: number | null
          firebase_id: string | null
          firebase_media_url: string | null
          firebase_owner_uid: string | null
          id: string
          lat: number | null
          lon: number | null
          media_url: string | null
          owner_id: string | null
          place_name: string | null
          status: string | null
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          firebase_created_on?: number | null
          firebase_id?: string | null
          firebase_media_url?: string | null
          firebase_owner_uid?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          media_url?: string | null
          owner_id?: string | null
          place_name?: string | null
          status?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          firebase_created_on?: number | null
          firebase_id?: string | null
          firebase_media_url?: string | null
          firebase_owner_uid?: string | null
          id?: string
          lat?: number | null
          lon?: number | null
          media_url?: string | null
          owner_id?: string | null
          place_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feed_posts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      firebase_uid_mapping: {
        Row: {
          email: string | null
          firebase_uid: string
          legacy_points: number | null
          migrated_at: string | null
          phone: string | null
          supabase_uuid: string | null
        }
        Insert: {
          email?: string | null
          firebase_uid: string
          legacy_points?: number | null
          migrated_at?: string | null
          phone?: string | null
          supabase_uuid?: string | null
        }
        Update: {
          email?: string | null
          firebase_uid?: string
          legacy_points?: number | null
          migrated_at?: string | null
          phone?: string | null
          supabase_uuid?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string | null
          id: string
          link: string | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          read?: boolean
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string
          link?: string | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_subscriptions: {
        Row: {
          business_id: string | null
          business_slots: number | null
          created_at: string | null
          expires_at: string | null
          firebase_owner_uid: string | null
          id: string
          image_slots: number | null
          migrated_from_firebase: boolean | null
          plan: string
          price_paid: number | null
          starts_at: string | null
          status: string | null
          supabase_user_id: string | null
          validity_days: number | null
        }
        Insert: {
          business_id?: string | null
          business_slots?: number | null
          created_at?: string | null
          expires_at?: string | null
          firebase_owner_uid?: string | null
          id?: string
          image_slots?: number | null
          migrated_from_firebase?: boolean | null
          plan: string
          price_paid?: number | null
          starts_at?: string | null
          status?: string | null
          supabase_user_id?: string | null
          validity_days?: number | null
        }
        Update: {
          business_id?: string | null
          business_slots?: number | null
          created_at?: string | null
          expires_at?: string | null
          firebase_owner_uid?: string | null
          id?: string
          image_slots?: number | null
          migrated_from_firebase?: boolean | null
          plan?: string
          price_paid?: number | null
          starts_at?: string | null
          status?: string | null
          supabase_user_id?: string | null
          validity_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          halal_coins_balance: number | null
          id: string
          name: string | null
          phone: string | null
          photo_url: string | null
          roles: string[] | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          halal_coins_balance?: number | null
          id: string
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          roles?: string[] | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          halal_coins_balance?: number | null
          id?: string
          name?: string | null
          phone?: string | null
          photo_url?: string | null
          roles?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_businesses: {
        Row: {
          business_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_businesses_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      suggestions: {
        Row: {
          address: string | null
          category: string
          created_at: string | null
          id: string
          image_urls: string[] | null
          link: string | null
          place_name: string
          reason: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          category: string
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          link?: string | null
          place_name: string
          reason?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          category?: string
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          link?: string | null
          place_name?: string
          reason?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean }
      is_business_staff: {
        Args: { target_business_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][CompositeTypeName]
    : never

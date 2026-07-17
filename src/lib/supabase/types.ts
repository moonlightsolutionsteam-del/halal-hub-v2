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
      achievements: {
        Row: {
          active: boolean | null
          created_at: string | null
          description: string
          event_type: string
          icon: string
          id: string
          key: string
          name: string
          points_reward: number
          sort_order: number | null
          threshold: number
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          description: string
          event_type: string
          icon?: string
          id?: string
          key: string
          name: string
          points_reward?: number
          sort_order?: number | null
          threshold?: number
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          description?: string
          event_type?: string
          icon?: string
          id?: string
          key?: string
          name?: string
          points_reward?: number
          sort_order?: number | null
          threshold?: number
        }
        Relationships: []
      }
      business_announcements: {
        Row: {
          body: string | null
          business_id: string
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          body?: string | null
          business_id: string
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          body?: string | null
          business_id?: string
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_announcements_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_catalog_items: {
        Row: {
          business_id: string | null
          business_name: string | null
          category: string | null
          created_at: string | null
          description: string | null
          firebase_business_id: string | null
          firebase_id: string | null
          id: string
          image_url: string | null
          is_available: boolean
          lat: number | null
          lon: number | null
          price: number | null
          stock_quantity: number | null
          title: string | null
          updated_at: string | null
          vendor_uid: string | null
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          firebase_business_id?: string | null
          firebase_id?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          lat?: number | null
          lon?: number | null
          price?: number | null
          stock_quantity?: number | null
          title?: string | null
          updated_at?: string | null
          vendor_uid?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          firebase_business_id?: string | null
          firebase_id?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean
          lat?: number | null
          lon?: number | null
          price?: number | null
          stock_quantity?: number | null
          title?: string | null
          updated_at?: string | null
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
      business_donations: {
        Row: {
          amount: number
          business_id: string
          created_at: string | null
          id: string
          purpose: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          business_id: string
          created_at?: string | null
          id?: string
          purpose?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          business_id?: string
          created_at?: string | null
          id?: string
          purpose?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_donations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_donations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_events: {
        Row: {
          attendees: number | null
          business_id: string
          created_at: string | null
          description: string | null
          event_date: string
          event_time: string | null
          event_type: string | null
          id: string
          location: string | null
          status: string | null
          title: string
        }
        Insert: {
          attendees?: number | null
          business_id: string
          created_at?: string | null
          description?: string | null
          event_date: string
          event_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          status?: string | null
          title: string
        }
        Update: {
          attendees?: number | null
          business_id?: string
          created_at?: string | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          event_type?: string | null
          id?: string
          location?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      business_offers: {
        Row: {
          business_id: string
          code: string | null
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number | null
          id: string
          status: string
          title: string
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          business_id: string
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number | null
          id?: string
          status?: string
          title: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          business_id?: string
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number | null
          id?: string
          status?: string
          title?: string
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_offers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_order_items: {
        Row: {
          catalog_item_id: string | null
          id: string
          item_name: string
          order_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          catalog_item_id?: string | null
          id?: string
          item_name: string
          order_id: string
          quantity?: number
          unit_price?: number
        }
        Update: {
          catalog_item_id?: string | null
          id?: string
          item_name?: string
          order_id?: string
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_order_items_catalog_item_id_fkey"
            columns: ["catalog_item_id"]
            isOneToOne: false
            referencedRelation: "business_catalog_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "business_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      business_orders: {
        Row: {
          business_id: string
          created_at: string | null
          delivery_type: string
          id: string
          notes: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          delivery_type?: string
          id?: string
          notes?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          delivery_type?: string
          id?: string
          notes?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reservations: {
        Row: {
          business_id: string
          created_at: string | null
          guest_count: number
          id: string
          reservation_date: string
          status: string
          time_slot: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          guest_count?: number
          id?: string
          reservation_date: string
          status?: string
          time_slot: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          guest_count?: number
          id?: string
          reservation_date?: string
          status?: string
          time_slot?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_reservations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reviews: {
        Row: {
          body: string | null
          business_id: string
          business_response: string | null
          business_response_at: string | null
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
          business_response?: string | null
          business_response_at?: string | null
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
          business_response?: string | null
          business_response_at?: string | null
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
      business_verifications: {
        Row: {
          answers: Json
          business_id: string
          created_at: string | null
          halal_status: string
          id: string
          user_id: string
        }
        Insert: {
          answers?: Json
          business_id: string
          created_at?: string | null
          halal_status: string
          id?: string
          user_id: string
        }
        Update: {
          answers?: Json
          business_id?: string
          created_at?: string | null
          halal_status?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_verifications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_verifications_user_id_fkey"
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
      capabilities: {
        Row: {
          activated_at: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          status: string
          type: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "capabilities_user_id_fkey"
            columns: ["user_id"]
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
          business_id: string | null
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
          business_id?: string | null
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
          business_id?: string | null
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
            foreignKeyName: "contacts_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_profiles: {
        Row: {
          audience_ages: string[] | null
          bio: string | null
          campaign_rate: string | null
          category: string | null
          collab_note: string | null
          collab_types: string[] | null
          content_categories: string[] | null
          content_formats: string[] | null
          created_at: string | null
          display_name: string | null
          follower_range: string | null
          followers_count: number | null
          handle: string | null
          id: string
          location: string | null
          portfolio_url: string | null
          social_links: Json | null
          starting_rate: string | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          audience_ages?: string[] | null
          bio?: string | null
          campaign_rate?: string | null
          category?: string | null
          collab_note?: string | null
          collab_types?: string[] | null
          content_categories?: string[] | null
          content_formats?: string[] | null
          created_at?: string | null
          display_name?: string | null
          follower_range?: string | null
          followers_count?: number | null
          handle?: string | null
          id?: string
          location?: string | null
          portfolio_url?: string | null
          social_links?: Json | null
          starting_rate?: string | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          audience_ages?: string[] | null
          bio?: string | null
          campaign_rate?: string | null
          category?: string | null
          collab_note?: string | null
          collab_types?: string[] | null
          content_categories?: string[] | null
          content_formats?: string[] | null
          created_at?: string | null
          display_name?: string | null
          follower_range?: string | null
          followers_count?: number | null
          handle?: string | null
          id?: string
          location?: string | null
          portfolio_url?: string | null
          social_links?: Json | null
          starting_rate?: string | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "creator_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
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
      erp_activity_logs: {
        Row: {
          action: string
          created_at: string | null
          employee_id: string | null
          employee_name: string
          id: string
          ip_address: string | null
          module: string | null
          new_value: Json | null
          old_value: Json | null
          record_id: string | null
          record_title: string | null
          record_type: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          employee_id?: string | null
          employee_name: string
          id?: string
          ip_address?: string | null
          module?: string | null
          new_value?: Json | null
          old_value?: Json | null
          record_id?: string | null
          record_title?: string | null
          record_type?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string
          id?: string
          ip_address?: string | null
          module?: string | null
          new_value?: Json | null
          old_value?: Json | null
          record_id?: string | null
          record_title?: string | null
          record_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_activity_logs_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_assets: {
        Row: {
          asset_id: string | null
          assigned_to: string | null
          category: string | null
          created_at: string | null
          id: string
          name: string
          notes: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          asset_id?: string | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          name: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          asset_id?: string | null
          assigned_to?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          name?: string
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_attendance: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string | null
          date: string
          employee_id: string | null
          employee_name: string | null
          hours: number | null
          id: string
          initials: string | null
          notes: string | null
          status: string | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string | null
          employee_name?: string | null
          hours?: number | null
          id?: string
          initials?: string | null
          notes?: string | null
          status?: string | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string | null
          employee_name?: string | null
          hours?: number | null
          id?: string
          initials?: string | null
          notes?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_bugs: {
        Row: {
          assignee: string | null
          assignee_initials: string | null
          bug_id: string | null
          created_at: string | null
          description: string | null
          id: string
          module: string | null
          priority: string | null
          reported_by: string | null
          reported_date: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee?: string | null
          assignee_initials?: string | null
          bug_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          module?: string | null
          priority?: string | null
          reported_by?: string | null
          reported_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee?: string | null
          assignee_initials?: string | null
          bug_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          module?: string | null
          priority?: string | null
          reported_by?: string | null
          reported_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_calls: {
        Row: {
          account: string | null
          call_date: string | null
          contact: string
          created_at: string | null
          duration: string | null
          id: string
          notes: string | null
          owner: string | null
          owner_initials: string | null
          subject: string | null
        }
        Insert: {
          account?: string | null
          call_date?: string | null
          contact: string
          created_at?: string | null
          duration?: string | null
          id?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          subject?: string | null
        }
        Update: {
          account?: string | null
          call_date?: string | null
          contact?: string
          created_at?: string | null
          duration?: string | null
          id?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      erp_campaigns: {
        Row: {
          budget: number | null
          campaign_type: string | null
          clicks: number | null
          conversions: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          name: string
          reach: number | null
          spend: number | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          budget?: number | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          reach?: number | null
          spend?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          budget?: number | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          reach?: number | null
          spend?: number | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_contacts: {
        Row: {
          account: string | null
          created_at: string | null
          email: string | null
          id: string
          last_contact: string | null
          name: string
          notes: string | null
          owner: string | null
          owner_initials: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          account?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact?: string | null
          name: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          account?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_contact?: string | null
          name?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      erp_deals: {
        Row: {
          business_name: string
          contact: string | null
          created_at: string | null
          id: string
          last_update: string | null
          notes: string | null
          owner: string | null
          owner_initials: string | null
          stage: string | null
          value: number | null
        }
        Insert: {
          business_name: string
          contact?: string | null
          created_at?: string | null
          id?: string
          last_update?: string | null
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          stage?: string | null
          value?: number | null
        }
        Update: {
          business_name?: string
          contact?: string | null
          created_at?: string | null
          id?: string
          last_update?: string | null
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          stage?: string | null
          value?: number | null
        }
        Relationships: []
      }
      erp_employees: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string | null
          emp_id: string
          employment_type: string | null
          id: string
          initials: string | null
          join_date: string | null
          manager: string | null
          name: string
          phone: string | null
          role: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          emp_id: string
          employment_type?: string | null
          id?: string
          initials?: string | null
          join_date?: string | null
          manager?: string | null
          name: string
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          emp_id?: string
          employment_type?: string | null
          id?: string
          initials?: string | null
          join_date?: string | null
          manager?: string | null
          name?: string
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_expenses: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          date: string | null
          description: string | null
          expense_id: string | null
          id: string
          status: string | null
          submitted_by: string | null
          vendor: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          expense_id?: string | null
          id?: string
          status?: string | null
          submitted_by?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          expense_id?: string | null
          id?: string
          status?: string | null
          submitted_by?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      erp_invoices: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          description: string | null
          due_date: string | null
          id: string
          invoice_id: string | null
          status: string | null
          updated_at: string | null
          vendor: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_id?: string | null
          status?: string | null
          updated_at?: string | null
          vendor: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          invoice_id?: string | null
          status?: string | null
          updated_at?: string | null
          vendor?: string
        }
        Relationships: []
      }
      erp_leads: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          last_update: string | null
          name: string
          notes: string | null
          owner: string | null
          owner_initials: string | null
          phone: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_update?: string | null
          name: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          last_update?: string | null
          name?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      erp_leaves: {
        Row: {
          created_at: string | null
          employee_id: string | null
          employee_name: string | null
          from_date: string | null
          id: string
          leave_type: string | null
          reason: string | null
          reviewed_by: string | null
          status: string | null
          to_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          from_date?: string | null
          id?: string
          leave_type?: string | null
          reason?: string | null
          reviewed_by?: string | null
          status?: string | null
          to_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          from_date?: string | null
          id?: string
          leave_type?: string | null
          reason?: string | null
          reviewed_by?: string | null
          status?: string | null
          to_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_leaves_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_meetings: {
        Row: {
          account: string | null
          attendee: string | null
          created_at: string | null
          date_time: string | null
          id: string
          notes: string | null
          owner: string | null
          owner_initials: string | null
          status: string | null
          title: string
        }
        Insert: {
          account?: string | null
          attendee?: string | null
          created_at?: string | null
          date_time?: string | null
          id?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          status?: string | null
          title: string
        }
        Update: {
          account?: string | null
          attendee?: string | null
          created_at?: string | null
          date_time?: string | null
          id?: string
          notes?: string | null
          owner?: string | null
          owner_initials?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      erp_payouts: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          method: string | null
          payee: string
          payout_id: string | null
          payout_type: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          method?: string | null
          payee: string
          payout_id?: string | null
          payout_type?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          method?: string | null
          payee?: string
          payout_id?: string | null
          payout_type?: string | null
          status?: string | null
        }
        Relationships: []
      }
      erp_performance: {
        Row: {
          created_at: string | null
          employee_id: string | null
          employee_name: string | null
          goals_met: number | null
          goals_total: number | null
          id: string
          notes: string | null
          period: string | null
          rating: number | null
          reviewer: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          goals_met?: number | null
          goals_total?: number | null
          id?: string
          notes?: string | null
          period?: string | null
          rating?: number | null
          reviewer?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string | null
          goals_met?: number | null
          goals_total?: number | null
          id?: string
          notes?: string | null
          period?: string | null
          rating?: number | null
          reviewer?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_performance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      erp_recruitment: {
        Row: {
          applicants: number | null
          closing_date: string | null
          created_at: string | null
          department: string | null
          description: string | null
          id: string
          position: string
          posted_date: string | null
          requirements: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicants?: number | null
          closing_date?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          position: string
          posted_date?: string | null
          requirements?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicants?: number | null
          closing_date?: string | null
          created_at?: string | null
          department?: string | null
          description?: string | null
          id?: string
          position?: string
          posted_date?: string | null
          requirements?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_releases: {
        Row: {
          bugs_fixed: number | null
          created_at: string | null
          deployed_by: string | null
          deployment_date: string | null
          features: string | null
          id: string
          notes: string | null
          release_type: string | null
          status: string | null
          version: string
        }
        Insert: {
          bugs_fixed?: number | null
          created_at?: string | null
          deployed_by?: string | null
          deployment_date?: string | null
          features?: string | null
          id?: string
          notes?: string | null
          release_type?: string | null
          status?: string | null
          version: string
        }
        Update: {
          bugs_fixed?: number | null
          created_at?: string | null
          deployed_by?: string | null
          deployment_date?: string | null
          features?: string | null
          id?: string
          notes?: string | null
          release_type?: string | null
          status?: string | null
          version?: string
        }
        Relationships: []
      }
      erp_sop_articles: {
        Row: {
          article_id: string | null
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          id: string
          last_updated: string | null
          status: string | null
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          article_id?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          article_id?: string | null
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      erp_tasks: {
        Row: {
          assignee: string | null
          assignee_initials: string | null
          blocker_reason: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          estimated_time: string | null
          feature: string | null
          id: string
          module: string | null
          priority: string | null
          status: string | null
          task_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assignee?: string | null
          assignee_initials?: string | null
          blocker_reason?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_time?: string | null
          feature?: string | null
          id?: string
          module?: string | null
          priority?: string | null
          status?: string | null
          task_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assignee?: string | null
          assignee_initials?: string | null
          blocker_reason?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          estimated_time?: string | null
          feature?: string | null
          id?: string
          module?: string | null
          priority?: string | null
          status?: string | null
          task_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      erp_vendors: {
        Row: {
          category: string | null
          contact: string | null
          created_at: string | null
          email: string | null
          health: string | null
          id: string
          name: string
          notes: string | null
          onboarded_date: string | null
          phone: string | null
          stage: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          health?: string | null
          id?: string
          name: string
          notes?: string | null
          onboarded_date?: string | null
          phone?: string | null
          stage?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          email?: string | null
          health?: string | null
          id?: string
          name?: string
          notes?: string | null
          onboarded_date?: string | null
          phone?: string | null
          stage?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      faith_content: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          reference: string | null
          text_en: string
          type: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          reference?: string | null
          text_en: string
          type: string
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          reference?: string | null
          text_en?: string
          type?: string
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
          metadata: Json | null
          owner_id: string | null
          place_name: string | null
          post_type: string
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
          metadata?: Json | null
          owner_id?: string | null
          place_name?: string | null
          post_type?: string
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
          metadata?: Json | null
          owner_id?: string | null
          place_name?: string | null
          post_type?: string
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
      gamification_actions: {
        Row: {
          action_type: string
          coins_awarded: number
          created_at: string
          id: string
          reference_id: string | null
          reference_type: string | null
          season: string
          user_id: string
        }
        Insert: {
          action_type: string
          coins_awarded?: number
          created_at?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          season?: string
          user_id: string
        }
        Update: {
          action_type?: string
          coins_awarded?: number
          created_at?: string
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          season?: string
          user_id?: string
        }
        Relationships: []
      }
      halal_products: {
        Row: {
          alternatives: string[] | null
          barcode: string | null
          brand: string | null
          category: string | null
          certifications: Json | null
          country: string | null
          created_at: string | null
          description: string | null
          halal_status: string
          id: string
          ingredient_analysis: Json | null
          ingredients: string | null
          last_verified: string | null
          manufacturer: string | null
          name: string
          updated_at: string | null
          verification_source: string | null
        }
        Insert: {
          alternatives?: string[] | null
          barcode?: string | null
          brand?: string | null
          category?: string | null
          certifications?: Json | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          halal_status?: string
          id?: string
          ingredient_analysis?: Json | null
          ingredients?: string | null
          last_verified?: string | null
          manufacturer?: string | null
          name: string
          updated_at?: string | null
          verification_source?: string | null
        }
        Update: {
          alternatives?: string[] | null
          barcode?: string | null
          brand?: string | null
          category?: string | null
          certifications?: Json | null
          country?: string | null
          created_at?: string | null
          description?: string | null
          halal_status?: string
          id?: string
          ingredient_analysis?: Json | null
          ingredients?: string | null
          last_verified?: string | null
          manufacturer?: string | null
          name?: string
          updated_at?: string | null
          verification_source?: string | null
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
      points_ledger: {
        Row: {
          created_at: string | null
          delta: number
          id: string
          reason: string
          ref_id: string | null
          ref_table: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          delta: number
          id?: string
          reason: string
          ref_id?: string | null
          ref_table?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          delta?: number
          id?: string
          reason?: string
          ref_id?: string | null
          ref_table?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          author_id: string
          body: string
          created_at: string | null
          display_name: string | null
          id: string
          parent_comment_id: string | null
          post_id: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string | null
          display_name?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string | null
          display_name?: string | null
          id?: string
          parent_comment_id?: string | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          post_id?: string
          user_id?: string
        }
        Relationships: []
      }
      product_scans: {
        Row: {
          barcode: string
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string
        }
        Insert: {
          barcode: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id: string
        }
        Update: {
          barcode?: string
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_scans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "halal_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_scans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_views: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_views_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "halal_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_profiles: {
        Row: {
          availability: string | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          portfolio_url: string | null
          pricing_model: string | null
          profession: string
          skills: string[] | null
          specializations: string[] | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          availability?: string | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          pricing_model?: string | null
          profession: string
          skills?: string[] | null
          specializations?: string[] | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          availability?: string | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          pricing_model?: string | null
          profession?: string
          skills?: string[] | null
          specializations?: string[] | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
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
          interests: string[] | null
          last_active_at: string | null
          name: string | null
          notification_prefs: Json | null
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
          interests?: string[] | null
          last_active_at?: string | null
          name?: string | null
          notification_prefs?: Json | null
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
          interests?: string[] | null
          last_active_at?: string | null
          name?: string | null
          notification_prefs?: Json | null
          phone?: string | null
          photo_url?: string | null
          roles?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quran_bookmarks: {
        Row: {
          ayah: number
          created_at: string
          id: string
          note: string | null
          surah: number
          user_id: string
          verse_key: string
        }
        Insert: {
          ayah: number
          created_at?: string
          id?: string
          note?: string | null
          surah: number
          user_id: string
          verse_key: string
        }
        Update: {
          ayah?: number
          created_at?: string
          id?: string
          note?: string | null
          surah?: number
          user_id?: string
          verse_key?: string
        }
        Relationships: []
      }
      quran_progress: {
        Row: {
          id: string
          last_ayah: number
          last_surah: number
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          last_ayah?: number
          last_surah: number
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          last_ayah?: number
          last_surah?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recent_searches: {
        Row: {
          created_at: string | null
          id: string
          query: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          query: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          query?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recent_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
      saved_products: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "halal_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_products_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_reactions: {
        Row: {
          created_at: string | null
          emoji: string
          story_post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji?: string
          story_post_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          story_post_id?: string
          user_id?: string
        }
        Relationships: []
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
      user_achievements: {
        Row: {
          achievement_id: string
          id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          metadata: Json | null
          ref_id: string | null
          ref_table: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          ref_id?: string | null
          ref_table?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          ref_id?: string | null
          ref_table?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_levels: {
        Row: {
          level: number
          lifetime_coins_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          level?: number
          lifetime_coins_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          level?: number
          lifetime_coins_earned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_prayer_coins: {
        Row: {
          coins: number
          created_at: string
          id: string
          prayer_date: string
          reason: string
          user_id: string
        }
        Insert: {
          coins: number
          created_at?: string
          id?: string
          prayer_date: string
          reason: string
          user_id: string
        }
        Update: {
          coins?: number
          created_at?: string
          id?: string
          prayer_date?: string
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      user_prayer_log: {
        Row: {
          id: string
          marked_at: string
          prayer_date: string
          prayer_name: string
          status: string
          user_id: string
        }
        Insert: {
          id?: string
          marked_at?: string
          prayer_date: string
          prayer_name: string
          status?: string
          user_id: string
        }
        Update: {
          id?: string
          marked_at?: string
          prayer_date?: string
          prayer_name?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_prayer_settings: {
        Row: {
          asr_reminder: string
          azan_sound: string
          calculation_method: string
          dhuhr_reminder: string
          fajr_reminder: string
          id: string
          iftar_reminders: boolean
          isha_reminder: string
          jumuah_reminder: string
          khatm_juz_completed: number[] | null
          location_type: string
          madhab: string
          maghrib_reminder: string
          manual_city: string | null
          manual_lat: number | null
          manual_lng: number | null
          my_mosque_id: string | null
          override_dnd: boolean
          sehri_reminders: boolean
          streak_min_prayers: number
          time_format: string
          updated_at: string
          user_id: string
        }
        Insert: {
          asr_reminder?: string
          azan_sound?: string
          calculation_method?: string
          dhuhr_reminder?: string
          fajr_reminder?: string
          id?: string
          iftar_reminders?: boolean
          isha_reminder?: string
          jumuah_reminder?: string
          khatm_juz_completed?: number[] | null
          location_type?: string
          madhab?: string
          maghrib_reminder?: string
          manual_city?: string | null
          manual_lat?: number | null
          manual_lng?: number | null
          my_mosque_id?: string | null
          override_dnd?: boolean
          sehri_reminders?: boolean
          streak_min_prayers?: number
          time_format?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          asr_reminder?: string
          azan_sound?: string
          calculation_method?: string
          dhuhr_reminder?: string
          fajr_reminder?: string
          id?: string
          iftar_reminders?: boolean
          isha_reminder?: string
          jumuah_reminder?: string
          khatm_juz_completed?: number[] | null
          location_type?: string
          madhab?: string
          maghrib_reminder?: string
          manual_city?: string | null
          manual_lat?: number | null
          manual_lng?: number | null
          my_mosque_id?: string | null
          override_dnd?: boolean
          sehri_reminders?: boolean
          streak_min_prayers?: number
          time_format?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_ramadan_tracker: {
        Row: {
          day: number
          exempt_reason: string | null
          id: string
          marked_at: string | null
          ramadan_year: number
          status: string
          user_id: string
        }
        Insert: {
          day: number
          exempt_reason?: string | null
          id?: string
          marked_at?: string | null
          ramadan_year: number
          status?: string
          user_id: string
        }
        Update: {
          day?: number
          exempt_reason?: string | null
          id?: string
          marked_at?: string | null
          ramadan_year?: number
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          current_count: number | null
          enabled: boolean | null
          id: string
          last_activity_date: string | null
          longest_count: number | null
          streak_type: string
          user_id: string
        }
        Insert: {
          current_count?: number | null
          enabled?: boolean | null
          id?: string
          last_activity_date?: string | null
          longest_count?: number | null
          streak_type: string
          user_id: string
        }
        Update: {
          current_count?: number | null
          enabled?: boolean | null
          id?: string
          last_activity_date?: string | null
          longest_count?: number | null
          streak_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_streaks_user_id_fkey"
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
      award_login_coins: { Args: { p_date?: string }; Returns: Json }
      award_points: {
        Args: {
          p_delta: number
          p_reason: string
          p_ref_id?: string
          p_ref_table?: string
          p_user_id: string
        }
        Returns: undefined
      }
      bump_streak: {
        Args: { p_streak_type: string }
        Returns: {
          current_count: number
          is_new_today: boolean
          longest_count: number
        }[]
      }
      check_achievements: { Args: { p_user_id: string }; Returns: undefined }
      compute_consumer_level: { Args: { p_coins: number }; Returns: number }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_prayer_month_log: {
        Args: { p_month: number; p_year: number }
        Returns: {
          prayer_date: string
          prayer_name: string
          status: string
        }[]
      }
      get_prayer_stats: { Args: never; Returns: Json }
      is_admin: { Args: never; Returns: boolean }
      is_business_staff: {
        Args: { target_business_id: string }
        Returns: boolean
      }
      log_activity: {
        Args: {
          p_event_type: string
          p_metadata?: Json
          p_ref_id?: string
          p_ref_table?: string
          p_user_id: string
        }
        Returns: undefined
      }
      mark_prayer: {
        Args: { p_date: string; p_prayer: string; p_status: string }
        Returns: Json
      }
      refresh_prayer_streak: { Args: { p_user: string }; Returns: number }
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
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

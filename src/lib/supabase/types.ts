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
      admin_actions: {
        Row: {
          action_type: string
          admin_name: string | null
          admin_tier: string | null
          after_json: Json | null
          before_json: Json | null
          created_at: string
          description: string | null
          id: string
          ip_address: string | null
          module: string
        }
        Insert: {
          action_type: string
          admin_name?: string | null
          admin_tier?: string | null
          after_json?: Json | null
          before_json?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          module: string
        }
        Update: {
          action_type?: string
          admin_name?: string | null
          admin_tier?: string | null
          after_json?: Json | null
          before_json?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          ip_address?: string | null
          module?: string
        }
        Relationships: []
      }
      admin_roles: {
        Row: {
          granted_at: string
          granted_by: string | null
          id: string
          notes: string | null
          tier: Database["public"]["Enums"]["admin_role_tier"]
          user_id: string
        }
        Insert: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          notes?: string | null
          tier?: Database["public"]["Enums"]["admin_role_tier"]
          user_id: string
        }
        Update: {
          granted_at?: string
          granted_by?: string | null
          id?: string
          notes?: string | null
          tier?: Database["public"]["Enums"]["admin_role_tier"]
          user_id?: string
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
      business_tiers: {
        Row: {
          lifetime_credits_spent: number
          listing_id: string
          tier: string
          updated_at: string
        }
        Insert: {
          lifetime_credits_spent?: number
          listing_id: string
          tier?: string
          updated_at?: string
        }
        Update: {
          lifetime_credits_spent?: number
          listing_id?: string
          tier?: string
          updated_at?: string
        }
        Relationships: []
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
      butcher_products: {
        Row: {
          animal: string | null
          business_id: string
          created_at: string | null
          cut_type: string | null
          description: string | null
          id: string
          is_available: boolean | null
          name: string
          price: number | null
          unit: string | null
        }
        Insert: {
          animal?: string | null
          business_id: string
          created_at?: string | null
          cut_type?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          name: string
          price?: number | null
          unit?: string | null
        }
        Update: {
          animal?: string | null
          business_id?: string
          created_at?: string | null
          cut_type?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          name?: string
          price?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "butcher_products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_applications: {
        Row: {
          applied_at: string
          campaign_id: string
          coins_burned: number
          id: string
          pitch: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          campaign_id: string
          coins_burned?: number
          id?: string
          pitch?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          campaign_id?: string
          coins_burned?: number
          id?: string
          pitch?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          brand_name: string | null
          campaign_type: string
          coin_cost: number
          cover_url: string | null
          created_at: string
          created_by: string | null
          deadline: string | null
          deliverable: string | null
          description: string | null
          id: string
          max_slots: number
          reward_value: string | null
          slots_filled: number
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          brand_name?: string | null
          campaign_type?: string
          coin_cost?: number
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          deliverable?: string | null
          description?: string | null
          id?: string
          max_slots?: number
          reward_value?: string | null
          slots_filled?: number
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          brand_name?: string | null
          campaign_type?: string
          coin_cost?: number
          cover_url?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          deliverable?: string | null
          description?: string | null
          id?: string
          max_slots?: number
          reward_value?: string | null
          slots_filled?: number
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
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
      certificate_verification_log: {
        Row: {
          certificate_number: string
          certification_body_id: string | null
          created_at: string | null
          id: string
          result: string
          searched_by_business_id: string | null
          searcher_ip: string | null
          searcher_user_agent: string | null
        }
        Insert: {
          certificate_number: string
          certification_body_id?: string | null
          created_at?: string | null
          id?: string
          result: string
          searched_by_business_id?: string | null
          searcher_ip?: string | null
          searcher_user_agent?: string | null
        }
        Update: {
          certificate_number?: string
          certification_body_id?: string | null
          created_at?: string | null
          id?: string
          result?: string
          searched_by_business_id?: string | null
          searcher_ip?: string | null
          searcher_user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificate_verification_log_certification_body_id_fkey"
            columns: ["certification_body_id"]
            isOneToOne: false
            referencedRelation: "certification_bodies"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_applications: {
        Row: {
          business_id: string
          business_name: string
          certification_body_id: string
          certification_body_name: string
          certifier_notes: string | null
          created_at: string | null
          document_urls: Json | null
          estimated_completion_date: string | null
          halal_standard_requested: string | null
          id: string
          message_to_body: string | null
          product_categories: string[] | null
          product_scope: string | null
          rejection_reason: string | null
          result_certificate_id: string | null
          status: string
          submitted_at: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          business_name: string
          certification_body_id: string
          certification_body_name: string
          certifier_notes?: string | null
          created_at?: string | null
          document_urls?: Json | null
          estimated_completion_date?: string | null
          halal_standard_requested?: string | null
          id?: string
          message_to_body?: string | null
          product_categories?: string[] | null
          product_scope?: string | null
          rejection_reason?: string | null
          result_certificate_id?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          business_name?: string
          certification_body_id?: string
          certification_body_name?: string
          certifier_notes?: string | null
          created_at?: string | null
          document_urls?: Json | null
          estimated_completion_date?: string | null
          halal_standard_requested?: string | null
          id?: string
          message_to_body?: string | null
          product_categories?: string[] | null
          product_scope?: string | null
          rejection_reason?: string | null
          result_certificate_id?: string | null
          status?: string
          submitted_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certification_applications_certification_body_id_fkey"
            columns: ["certification_body_id"]
            isOneToOne: false
            referencedRelation: "certification_bodies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certification_applications_result_certificate_id_fkey"
            columns: ["result_certificate_id"]
            isOneToOne: false
            referencedRelation: "halal_certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certification_bodies: {
        Row: {
          accrediting_authority: string | null
          address: string | null
          admin_internal_rating: number | null
          admin_notes: string | null
          approved_at: string | null
          blacklist_reason: string | null
          blacklisted_at: string | null
          cert_flavor: boolean | null
          cert_raw_material: boolean | null
          cert_slaughtering: boolean | null
          certification_categories: string[] | null
          claim_status: string | null
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          country: string | null
          coverage_states: string[] | null
          coverage_type: string | null
          created_at: string | null
          document_urls: Json | null
          email: string | null
          fee_annual_paise: number | null
          fee_balance_paise: number | null
          fee_promoted_monthly_paise: number | null
          id: string
          is_pre_seeded: boolean | null
          logo_url: string | null
          name: string
          phone: string | null
          recognition_expires_at: string | null
          registered_address: string | null
          registration_number: string | null
          rejection_reason: string | null
          slug: string | null
          standards_issued: string[] | null
          status: string
          suspended_at: string | null
          suspension_reason: string | null
          total_active_certs: number | null
          total_certs_issued: number | null
          updated_at: string | null
          vendor_user_id: string | null
          website: string | null
          website_url: string | null
        }
        Insert: {
          accrediting_authority?: string | null
          address?: string | null
          admin_internal_rating?: number | null
          admin_notes?: string | null
          approved_at?: string | null
          blacklist_reason?: string | null
          blacklisted_at?: string | null
          cert_flavor?: boolean | null
          cert_raw_material?: boolean | null
          cert_slaughtering?: boolean | null
          certification_categories?: string[] | null
          claim_status?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          coverage_states?: string[] | null
          coverage_type?: string | null
          created_at?: string | null
          document_urls?: Json | null
          email?: string | null
          fee_annual_paise?: number | null
          fee_balance_paise?: number | null
          fee_promoted_monthly_paise?: number | null
          id?: string
          is_pre_seeded?: boolean | null
          logo_url?: string | null
          name: string
          phone?: string | null
          recognition_expires_at?: string | null
          registered_address?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          slug?: string | null
          standards_issued?: string[] | null
          status?: string
          suspended_at?: string | null
          suspension_reason?: string | null
          total_active_certs?: number | null
          total_certs_issued?: number | null
          updated_at?: string | null
          vendor_user_id?: string | null
          website?: string | null
          website_url?: string | null
        }
        Update: {
          accrediting_authority?: string | null
          address?: string | null
          admin_internal_rating?: number | null
          admin_notes?: string | null
          approved_at?: string | null
          blacklist_reason?: string | null
          blacklisted_at?: string | null
          cert_flavor?: boolean | null
          cert_raw_material?: boolean | null
          cert_slaughtering?: boolean | null
          certification_categories?: string[] | null
          claim_status?: string | null
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          coverage_states?: string[] | null
          coverage_type?: string | null
          created_at?: string | null
          document_urls?: Json | null
          email?: string | null
          fee_annual_paise?: number | null
          fee_balance_paise?: number | null
          fee_promoted_monthly_paise?: number | null
          id?: string
          is_pre_seeded?: boolean | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          recognition_expires_at?: string | null
          registered_address?: string | null
          registration_number?: string | null
          rejection_reason?: string | null
          slug?: string | null
          standards_issued?: string[] | null
          status?: string
          suspended_at?: string | null
          suspension_reason?: string | null
          total_active_certs?: number | null
          total_certs_issued?: number | null
          updated_at?: string | null
          vendor_user_id?: string | null
          website?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      certification_body_claims: {
        Row: {
          admin_notes: string | null
          certification_body_id: string
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          designation: string | null
          id: string
          message: string | null
          reviewed_at: string | null
          status: string
          vendor_name: string
        }
        Insert: {
          admin_notes?: string | null
          certification_body_id: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          designation?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          status?: string
          vendor_name: string
        }
        Update: {
          admin_notes?: string | null
          certification_body_id?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          designation?: string | null
          id?: string
          message?: string | null
          reviewed_at?: string | null
          status?: string
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "certification_body_claims_certification_body_id_fkey"
            columns: ["certification_body_id"]
            isOneToOne: false
            referencedRelation: "certification_bodies"
            referencedColumns: ["id"]
          },
        ]
      }
      certifier_verification_requests: {
        Row: {
          business_id: string
          business_name: string
          certification_body_id: string
          certification_body_name: string
          certifier_response: string | null
          claimed_certificate_number: string
          claimed_expiry_date: string | null
          claimed_issue_date: string | null
          created_at: string | null
          id: string
          linked_certificate_id: string | null
          notes: string | null
          responded_at: string | null
          response_deadline: string | null
          status: string
          supporting_doc_url: string | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          business_name: string
          certification_body_id: string
          certification_body_name: string
          certifier_response?: string | null
          claimed_certificate_number: string
          claimed_expiry_date?: string | null
          claimed_issue_date?: string | null
          created_at?: string | null
          id?: string
          linked_certificate_id?: string | null
          notes?: string | null
          responded_at?: string | null
          response_deadline?: string | null
          status?: string
          supporting_doc_url?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          business_name?: string
          certification_body_id?: string
          certification_body_name?: string
          certifier_response?: string | null
          claimed_certificate_number?: string
          claimed_expiry_date?: string | null
          claimed_issue_date?: string | null
          created_at?: string | null
          id?: string
          linked_certificate_id?: string | null
          notes?: string | null
          responded_at?: string | null
          response_deadline?: string | null
          status?: string
          supporting_doc_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certifier_verification_requests_certification_body_id_fkey"
            columns: ["certification_body_id"]
            isOneToOne: false
            referencedRelation: "certification_bodies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certifier_verification_requests_linked_certificate_id_fkey"
            columns: ["linked_certificate_id"]
            isOneToOne: false
            referencedRelation: "halal_certificates"
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
      coin_abuse_flags: {
        Row: {
          action_type: string | null
          coins_at_risk: number | null
          created_at: string
          id: string
          reason: string
          resolved: boolean
          resolved_at: string | null
          resolved_by: string | null
          user_id: string
        }
        Insert: {
          action_type?: string | null
          coins_at_risk?: number | null
          created_at?: string
          id?: string
          reason: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          user_id: string
        }
        Update: {
          action_type?: string | null
          coins_at_risk?: number | null
          created_at?: string
          id?: string
          reason?: string
          resolved?: boolean
          resolved_at?: string | null
          resolved_by?: string | null
          user_id?: string
        }
        Relationships: []
      }
      coin_burn_log: {
        Row: {
          coins_burned: number
          created_at: string
          id: string
          reason: string
          reference_id: string | null
          user_id: string
        }
        Insert: {
          coins_burned: number
          created_at?: string
          id?: string
          reason: string
          reference_id?: string | null
          user_id: string
        }
        Update: {
          coins_burned?: number
          created_at?: string
          id?: string
          reason?: string
          reference_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coin_burn_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coin_config: {
        Row: {
          coins_per_rupee: number
          id: number
          max_redeem_pct: number
          min_redeem_coins: number
          updated_at: string
        }
        Insert: {
          coins_per_rupee?: number
          id?: number
          max_redeem_pct?: number
          min_redeem_coins?: number
          updated_at?: string
        }
        Update: {
          coins_per_rupee?: number
          id?: number
          max_redeem_pct?: number
          min_redeem_coins?: number
          updated_at?: string
        }
        Relationships: []
      }
      coin_ledger: {
        Row: {
          action_type: string
          amount: number
          balance_after: number
          created_at: string
          description: string | null
          id: string
          reference_id: string | null
          season: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          amount: number
          balance_after: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          season?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          amount?: number
          balance_after?: number
          created_at?: string
          description?: string | null
          id?: string
          reference_id?: string | null
          season?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coin_ledger_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coin_redemptions: {
        Row: {
          coins_spent: number
          context: string
          created_at: string
          description: string | null
          discount_inr: number
          id: string
          reference_id: string | null
          user_id: string
        }
        Insert: {
          coins_spent: number
          context?: string
          created_at?: string
          description?: string | null
          discount_inr: number
          id?: string
          reference_id?: string | null
          user_id: string
        }
        Update: {
          coins_spent?: number
          context?: string
          created_at?: string
          description?: string | null
          discount_inr?: number
          id?: string
          reference_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      coin_seasons: {
        Row: {
          active: boolean
          created_at: string
          ends_at: string
          id: string
          multiplier: number
          name: string
          starts_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          ends_at: string
          id?: string
          multiplier?: number
          name: string
          starts_at: string
        }
        Update: {
          active?: boolean
          created_at?: string
          ends_at?: string
          id?: string
          multiplier?: number
          name?: string
          starts_at?: string
        }
        Relationships: []
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
      cosmetics_products: {
        Row: {
          business_id: string
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          is_available: boolean | null
          is_cruelty_free: boolean | null
          is_halal_certified: boolean | null
          is_vegan: boolean | null
          name: string
          price: number | null
        }
        Insert: {
          business_id: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          is_cruelty_free?: boolean | null
          is_halal_certified?: boolean | null
          is_vegan?: boolean | null
          name: string
          price?: number | null
        }
        Update: {
          business_id?: string
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_available?: boolean | null
          is_cruelty_free?: boolean | null
          is_halal_certified?: boolean | null
          is_vegan?: boolean | null
          name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cosmetics_products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
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
      creator_tiers: {
        Row: {
          completed_deals: number
          lifetime_coins: number
          recalculated_at: string
          tier: string
          total_posts: number
          total_views: number
          user_id: string
        }
        Insert: {
          completed_deals?: number
          lifetime_coins?: number
          recalculated_at?: string
          tier?: string
          total_posts?: number
          total_views?: number
          user_id: string
        }
        Update: {
          completed_deals?: number
          lifetime_coins?: number
          recalculated_at?: string
          tier?: string
          total_posts?: number
          total_views?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_tiers_user_id_fkey"
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
      credit_ledger: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          created_by: string | null
          description: string
          id: string
          reference_id: string | null
          transaction_type: string
          vendor_id: string
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          reference_id?: string | null
          transaction_type: string
          vendor_id: string
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          reference_id?: string | null
          transaction_type?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_ledger_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "credit_ledger_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_leads: {
        Row: {
          assigned_to: string | null
          created_at: string
          email: string | null
          enquiry_type: string | null
          id: string
          message: string | null
          name: string | null
          notified_founder: boolean | null
          phone: string | null
          priority: string | null
          source: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          enquiry_type?: string | null
          id?: string
          message?: string | null
          name?: string | null
          notified_founder?: boolean | null
          phone?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          email?: string | null
          enquiry_type?: string | null
          id?: string
          message?: string | null
          name?: string | null
          notified_founder?: boolean | null
          phone?: string | null
          priority?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string
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
      erp_benefits: {
        Row: {
          benefit_type: string
          created_at: string | null
          employee_id: string | null
          employee_name: string
          end_date: string | null
          frequency: string | null
          id: string
          notes: string | null
          policy_number: string | null
          provider: string | null
          start_date: string | null
          status: string | null
          value: number | null
        }
        Insert: {
          benefit_type: string
          created_at?: string | null
          employee_id?: string | null
          employee_name: string
          end_date?: string | null
          frequency?: string | null
          id?: string
          notes?: string | null
          policy_number?: string | null
          provider?: string | null
          start_date?: string | null
          status?: string | null
          value?: number | null
        }
        Update: {
          benefit_type?: string
          created_at?: string | null
          employee_id?: string | null
          employee_name?: string
          end_date?: string | null
          frequency?: string | null
          id?: string
          notes?: string | null
          policy_number?: string | null
          provider?: string | null
          start_date?: string | null
          status?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_benefits_employee_id_fkey"
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
      erp_employee_documents: {
        Row: {
          created_at: string | null
          doc_type: string
          employee_id: string | null
          employee_name: string
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          id: string
          notes: string | null
          uploaded_by: string | null
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          doc_type: string
          employee_id?: string | null
          employee_name: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          notes?: string | null
          uploaded_by?: string | null
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          doc_type?: string
          employee_id?: string | null
          employee_name?: string
          expiry_date?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          notes?: string | null
          uploaded_by?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_employee_documents_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
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
      erp_exit_records: {
        Row: {
          clearance_status: string | null
          created_at: string | null
          department: string | null
          employee_id: string | null
          employee_name: string
          exit_reason: string | null
          exit_type: string | null
          id: string
          interview_done: boolean | null
          interview_rating: number | null
          interviewer: string | null
          last_working_day: string | null
          noc_issued: boolean | null
          notice_period_days: number | null
        }
        Insert: {
          clearance_status?: string | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          employee_name: string
          exit_reason?: string | null
          exit_type?: string | null
          id?: string
          interview_done?: boolean | null
          interview_rating?: number | null
          interviewer?: string | null
          last_working_day?: string | null
          noc_issued?: boolean | null
          notice_period_days?: number | null
        }
        Update: {
          clearance_status?: string | null
          created_at?: string | null
          department?: string | null
          employee_id?: string | null
          employee_name?: string
          exit_reason?: string | null
          exit_type?: string | null
          id?: string
          interview_done?: boolean | null
          interview_rating?: number | null
          interviewer?: string | null
          last_working_day?: string | null
          noc_issued?: boolean | null
          notice_period_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_exit_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
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
      erp_hr_settings: {
        Row: {
          approval_hierarchy: string | null
          holiday_calendar_url: string | null
          id: number
          leave_policy: string | null
          salary_bands_enabled: boolean | null
          updated_at: string | null
          working_hours: string | null
        }
        Insert: {
          approval_hierarchy?: string | null
          holiday_calendar_url?: string | null
          id?: number
          leave_policy?: string | null
          salary_bands_enabled?: boolean | null
          updated_at?: string | null
          working_hours?: string | null
        }
        Update: {
          approval_hierarchy?: string | null
          holiday_calendar_url?: string | null
          id?: number
          leave_policy?: string | null
          salary_bands_enabled?: boolean | null
          updated_at?: string | null
          working_hours?: string | null
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
      erp_onboarding: {
        Row: {
          assigned_to: string | null
          category: string | null
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          employee_id: string | null
          employee_name: string
          id: string
          notes: string | null
          status: string | null
          task: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          employee_id?: string | null
          employee_name: string
          id?: string
          notes?: string | null
          status?: string | null
          task: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          employee_id?: string | null
          employee_name?: string
          id?: string
          notes?: string | null
          status?: string | null
          task?: string
        }
        Relationships: [
          {
            foreignKeyName: "erp_onboarding_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
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
      erp_payroll: {
        Row: {
          allowances: number | null
          basic: number | null
          created_at: string | null
          deductions: number | null
          employee_id: string | null
          employee_name: string
          hra: number | null
          id: string
          month: number
          net_pay: number | null
          notes: string | null
          paid_date: string | null
          status: string | null
          tds: number | null
          year: number
        }
        Insert: {
          allowances?: number | null
          basic?: number | null
          created_at?: string | null
          deductions?: number | null
          employee_id?: string | null
          employee_name: string
          hra?: number | null
          id?: string
          month: number
          net_pay?: number | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          tds?: number | null
          year: number
        }
        Update: {
          allowances?: number | null
          basic?: number | null
          created_at?: string | null
          deductions?: number | null
          employee_id?: string | null
          employee_name?: string
          hra?: number | null
          id?: string
          month?: number
          net_pay?: number | null
          notes?: string | null
          paid_date?: string | null
          status?: string | null
          tds?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "erp_payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
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
      erp_training: {
        Row: {
          certificate_url: string | null
          completed_at: string | null
          created_at: string | null
          due_date: string | null
          duration_hours: number | null
          employee_id: string | null
          employee_name: string
          id: string
          score: number | null
          status: string | null
          title: string
          trainer: string | null
          type: string | null
        }
        Insert: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          duration_hours?: number | null
          employee_id?: string | null
          employee_name: string
          id?: string
          score?: number | null
          status?: string | null
          title: string
          trainer?: string | null
          type?: string | null
        }
        Update: {
          certificate_url?: string | null
          completed_at?: string | null
          created_at?: string | null
          due_date?: string | null
          duration_hours?: number | null
          employee_id?: string | null
          employee_name?: string
          id?: string
          score?: number | null
          status?: string | null
          title?: string
          trainer?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "erp_training_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "erp_employees"
            referencedColumns: ["id"]
          },
        ]
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
      fashion_products: {
        Row: {
          business_id: string
          category: string | null
          colors: string | null
          created_at: string | null
          description: string | null
          fabric: string | null
          gender: string | null
          id: string
          is_available: boolean | null
          is_halal_certified: boolean | null
          name: string
          price: number | null
          sizes: string[] | null
        }
        Insert: {
          business_id: string
          category?: string | null
          colors?: string | null
          created_at?: string | null
          description?: string | null
          fabric?: string | null
          gender?: string | null
          id?: string
          is_available?: boolean | null
          is_halal_certified?: boolean | null
          name: string
          price?: number | null
          sizes?: string[] | null
        }
        Update: {
          business_id?: string
          category?: string | null
          colors?: string | null
          created_at?: string | null
          description?: string | null
          fabric?: string | null
          gender?: string | null
          id?: string
          is_available?: boolean | null
          is_halal_certified?: boolean | null
          name?: string
          price?: number | null
          sizes?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "fashion_products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          description: string | null
          enabled: boolean
          id: string
          key: string
          label: string
          locked: boolean
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          enabled?: boolean
          id?: string
          key: string
          label: string
          locked?: boolean
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          enabled?: boolean
          id?: string
          key?: string
          label?: string
          locked?: boolean
          updated_at?: string
          updated_by?: string | null
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
      finance_products: {
        Row: {
          contact: string | null
          created_at: string | null
          description: string | null
          expected_return: string | null
          id: string
          is_shariah_certified: boolean | null
          min_investment: number | null
          name: string
          product_type: string | null
          tenure: string | null
          vendor_uid: string
        }
        Insert: {
          contact?: string | null
          created_at?: string | null
          description?: string | null
          expected_return?: string | null
          id?: string
          is_shariah_certified?: boolean | null
          min_investment?: number | null
          name: string
          product_type?: string | null
          tenure?: string | null
          vendor_uid: string
        }
        Update: {
          contact?: string | null
          created_at?: string | null
          description?: string | null
          expected_return?: string | null
          id?: string
          is_shariah_certified?: boolean | null
          min_investment?: number | null
          name?: string
          product_type?: string | null
          tenure?: string | null
          vendor_uid?: string
        }
        Relationships: []
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
          meta: Json | null
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
          meta?: Json | null
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
          meta?: Json | null
          reference_id?: string | null
          reference_type?: string | null
          season?: string
          user_id?: string
        }
        Relationships: []
      }
      grocery_inventory: {
        Row: {
          brand: string | null
          business_id: string
          category: string | null
          created_at: string | null
          id: string
          is_available: boolean | null
          is_halal_certified: boolean | null
          low_stock_threshold: number | null
          name: string
          price: number | null
          stock_qty: number | null
          unit: string | null
        }
        Insert: {
          brand?: string | null
          business_id: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          is_halal_certified?: boolean | null
          low_stock_threshold?: number | null
          name: string
          price?: number | null
          stock_qty?: number | null
          unit?: string | null
        }
        Update: {
          brand?: string | null
          business_id?: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          is_halal_certified?: boolean | null
          low_stock_threshold?: number | null
          name?: string
          price?: number | null
          stock_qty?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grocery_inventory_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      halal_cert_bodies_ref: {
        Row: {
          active: boolean
          categories: string[] | null
          created_at: string
          headquarters: string | null
          hh_tier: number
          id: string
          logo_url: string | null
          name: string
          notes: string | null
          website: string | null
        }
        Insert: {
          active?: boolean
          categories?: string[] | null
          created_at?: string
          headquarters?: string | null
          hh_tier: number
          id?: string
          logo_url?: string | null
          name: string
          notes?: string | null
          website?: string | null
        }
        Update: {
          active?: boolean
          categories?: string[] | null
          created_at?: string
          headquarters?: string | null
          hh_tier?: number
          id?: string
          logo_url?: string | null
          name?: string
          notes?: string | null
          website?: string | null
        }
        Relationships: []
      }
      halal_certificates: {
        Row: {
          business_id: string | null
          business_name: string
          certificate_doc_url: string | null
          certificate_number: string
          certification_body_id: string
          created_at: string | null
          expiry_date: string
          halal_standard: string | null
          id: string
          issue_date: string
          product_categories: string[] | null
          renewal_notified_at: string | null
          revocation_reason: string | null
          revoked_at: string | null
          revoked_by: string | null
          scope_of_certification: string | null
          spot_check_completed: boolean | null
          spot_check_required: boolean | null
          spot_check_result: string | null
          status: string
          suspension_reason: string | null
          updated_at: string | null
        }
        Insert: {
          business_id?: string | null
          business_name: string
          certificate_doc_url?: string | null
          certificate_number: string
          certification_body_id: string
          created_at?: string | null
          expiry_date: string
          halal_standard?: string | null
          id?: string
          issue_date: string
          product_categories?: string[] | null
          renewal_notified_at?: string | null
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          scope_of_certification?: string | null
          spot_check_completed?: boolean | null
          spot_check_required?: boolean | null
          spot_check_result?: string | null
          status?: string
          suspension_reason?: string | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string | null
          business_name?: string
          certificate_doc_url?: string | null
          certificate_number?: string
          certification_body_id?: string
          created_at?: string | null
          expiry_date?: string
          halal_standard?: string | null
          id?: string
          issue_date?: string
          product_categories?: string[] | null
          renewal_notified_at?: string | null
          revocation_reason?: string | null
          revoked_at?: string | null
          revoked_by?: string | null
          scope_of_certification?: string | null
          spot_check_completed?: boolean | null
          spot_check_required?: boolean | null
          spot_check_result?: string | null
          status?: string
          suspension_reason?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "halal_certificates_certification_body_id_fkey"
            columns: ["certification_body_id"]
            isOneToOne: false
            referencedRelation: "certification_bodies"
            referencedColumns: ["id"]
          },
        ]
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
      healthcare_services: {
        Row: {
          category: string | null
          contact: string | null
          created_at: string | null
          description: string | null
          duration_mins: number | null
          id: string
          is_free: boolean | null
          name: string
          price: number | null
          vendor_uid: string
        }
        Insert: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          duration_mins?: number | null
          id?: string
          is_free?: boolean | null
          name: string
          price?: number | null
          vendor_uid: string
        }
        Update: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          duration_mins?: number | null
          id?: string
          is_free?: boolean | null
          name?: string
          price?: number | null
          vendor_uid?: string
        }
        Relationships: []
      }
      hotel_amenities: {
        Row: {
          created_at: string | null
          group_name: string | null
          id: string
          is_available: boolean | null
          name: string
          vendor_uid: string
        }
        Insert: {
          created_at?: string | null
          group_name?: string | null
          id?: string
          is_available?: boolean | null
          name: string
          vendor_uid: string
        }
        Update: {
          created_at?: string | null
          group_name?: string | null
          id?: string
          is_available?: boolean | null
          name?: string
          vendor_uid?: string
        }
        Relationships: []
      }
      hotel_rooms: {
        Row: {
          created_at: string | null
          features: string[] | null
          floor: number | null
          id: string
          max_guests: number | null
          price_per_night: number | null
          room_number: string | null
          room_type: string | null
          status: string | null
          vendor_uid: string
        }
        Insert: {
          created_at?: string | null
          features?: string[] | null
          floor?: number | null
          id?: string
          max_guests?: number | null
          price_per_night?: number | null
          room_number?: string | null
          room_type?: string | null
          status?: string | null
          vendor_uid: string
        }
        Update: {
          created_at?: string | null
          features?: string[] | null
          floor?: number | null
          id?: string
          max_guests?: number | null
          price_per_night?: number | null
          room_number?: string | null
          room_type?: string | null
          status?: string | null
          vendor_uid?: string
        }
        Relationships: []
      }
      media_book_inventory: {
        Row: {
          author: string | null
          business_id: string
          category: string | null
          created_at: string | null
          id: string
          is_available: boolean | null
          isbn: string | null
          language: string | null
          low_stock_threshold: number | null
          price: number | null
          publisher: string | null
          stock_qty: number | null
          title: string
        }
        Insert: {
          author?: string | null
          business_id: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          isbn?: string | null
          language?: string | null
          low_stock_threshold?: number | null
          price?: number | null
          publisher?: string | null
          stock_qty?: number | null
          title: string
        }
        Update: {
          author?: string | null
          business_id?: string
          category?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          isbn?: string | null
          language?: string | null
          low_stock_threshold?: number | null
          price?: number | null
          publisher?: string | null
          stock_qty?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_book_inventory_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      media_digital_content: {
        Row: {
          content_type: string | null
          created_at: string | null
          description: string | null
          id: string
          is_free: boolean | null
          price: number | null
          published_at: string | null
          title: string
          url: string | null
          vendor_uid: string
        }
        Insert: {
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_free?: boolean | null
          price?: number | null
          published_at?: string | null
          title: string
          url?: string | null
          vendor_uid: string
        }
        Update: {
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_free?: boolean | null
          price?: number | null
          published_at?: string | null
          title?: string
          url?: string | null
          vendor_uid?: string
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
      mosque_announcements: {
        Row: {
          body: string | null
          category: string | null
          created_at: string | null
          id: string
          is_pinned: boolean | null
          mosque_id: string
          title: string
        }
        Insert: {
          body?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          mosque_id: string
          title: string
        }
        Update: {
          body?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          mosque_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "mosque_announcements_mosque_id_fkey"
            columns: ["mosque_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      mosque_programs: {
        Row: {
          capacity: number | null
          created_at: string | null
          description: string | null
          fee: number | null
          id: string
          instructor: string | null
          is_active: boolean | null
          is_free: boolean | null
          mosque_id: string
          name: string
          program_type: string | null
          schedule_days: string | null
          schedule_time: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          fee?: number | null
          id?: string
          instructor?: string | null
          is_active?: boolean | null
          is_free?: boolean | null
          mosque_id: string
          name: string
          program_type?: string | null
          schedule_days?: string | null
          schedule_time?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          fee?: number | null
          id?: string
          instructor?: string | null
          is_active?: boolean | null
          is_free?: boolean | null
          mosque_id?: string
          name?: string
          program_type?: string | null
          schedule_days?: string | null
          schedule_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mosque_programs_mosque_id_fkey"
            columns: ["mosque_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_orders: {
        Row: {
          buyer_id: string
          cancelled_at: string | null
          commission_amount_inr: number
          commission_pct: number
          courier_name: string | null
          created_at: string
          delivered_at: string | null
          delivery_address: Json
          estimated_delivery: string | null
          id: string
          payout_released_at: string | null
          payout_status: Database["public"]["Enums"]["mp_payout_status"]
          product_id: string
          quantity: number
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          refund_amount_inr: number | null
          return_photos: Json | null
          return_reason: string | null
          return_requested_at: string | null
          seller_id: string
          seller_payout_inr: number
          shipping_charge_inr: number
          status: Database["public"]["Enums"]["mp_order_status"]
          total_price_inr: number
          tracking_id: string | null
          unit_price_inr: number
          variant_id: string | null
        }
        Insert: {
          buyer_id: string
          cancelled_at?: string | null
          commission_amount_inr?: number
          commission_pct?: number
          courier_name?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address: Json
          estimated_delivery?: string | null
          id?: string
          payout_released_at?: string | null
          payout_status?: Database["public"]["Enums"]["mp_payout_status"]
          product_id: string
          quantity?: number
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          refund_amount_inr?: number | null
          return_photos?: Json | null
          return_reason?: string | null
          return_requested_at?: string | null
          seller_id: string
          seller_payout_inr?: number
          shipping_charge_inr?: number
          status?: Database["public"]["Enums"]["mp_order_status"]
          total_price_inr: number
          tracking_id?: string | null
          unit_price_inr: number
          variant_id?: string | null
        }
        Update: {
          buyer_id?: string
          cancelled_at?: string | null
          commission_amount_inr?: number
          commission_pct?: number
          courier_name?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address?: Json
          estimated_delivery?: string | null
          id?: string
          payout_released_at?: string | null
          payout_status?: Database["public"]["Enums"]["mp_payout_status"]
          product_id?: string
          quantity?: number
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          refund_amount_inr?: number | null
          return_photos?: Json | null
          return_reason?: string | null
          return_requested_at?: string | null
          seller_id?: string
          seller_payout_inr?: number
          shipping_charge_inr?: number
          status?: Database["public"]["Enums"]["mp_order_status"]
          total_price_inr?: number
          tracking_id?: string | null
          unit_price_inr?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mp_orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mp_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_orders_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "mp_sellers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_orders_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_product_reviews: {
        Row: {
          body: string | null
          buyer_id: string
          created_at: string
          helpful_count: number
          id: string
          order_id: string
          photos: Json | null
          product_id: string
          published: boolean
          rating: number
          title: string | null
          verified_purchase: boolean
        }
        Insert: {
          body?: string | null
          buyer_id: string
          created_at?: string
          helpful_count?: number
          id?: string
          order_id: string
          photos?: Json | null
          product_id: string
          published?: boolean
          rating: number
          title?: string | null
          verified_purchase?: boolean
        }
        Update: {
          body?: string | null
          buyer_id?: string
          created_at?: string
          helpful_count?: number
          id?: string
          order_id?: string
          photos?: Json | null
          product_id?: string
          published?: boolean
          rating?: number
          title?: string | null
          verified_purchase?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "mp_product_reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "mp_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mp_products"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_products: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          category: string
          compare_price_inr: number | null
          created_at: string
          description: string | null
          flag_count: number
          free_shipping_above_inr: number | null
          halal_cert_body: string | null
          halal_cert_body_id: string | null
          halal_cert_expiry: string | null
          halal_cert_expiry_warned: boolean
          halal_cert_url: string | null
          halal_status: Database["public"]["Enums"]["mp_halal_status"]
          id: string
          order_count: number
          photos: Json
          price_inr: number
          processing_days: number
          rating: number
          rejection_reason: string | null
          return_count: number
          return_eligible: boolean
          review_count: number
          seller_id: string
          sku: string | null
          slug: string
          status: Database["public"]["Enums"]["mp_product_status"]
          stock_quantity: number
          title: string
          view_count: number
          weight_grams: number
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category: string
          compare_price_inr?: number | null
          created_at?: string
          description?: string | null
          flag_count?: number
          free_shipping_above_inr?: number | null
          halal_cert_body?: string | null
          halal_cert_body_id?: string | null
          halal_cert_expiry?: string | null
          halal_cert_expiry_warned?: boolean
          halal_cert_url?: string | null
          halal_status?: Database["public"]["Enums"]["mp_halal_status"]
          id?: string
          order_count?: number
          photos?: Json
          price_inr: number
          processing_days?: number
          rating?: number
          rejection_reason?: string | null
          return_count?: number
          return_eligible?: boolean
          review_count?: number
          seller_id: string
          sku?: string | null
          slug: string
          status?: Database["public"]["Enums"]["mp_product_status"]
          stock_quantity?: number
          title: string
          view_count?: number
          weight_grams?: number
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string
          compare_price_inr?: number | null
          created_at?: string
          description?: string | null
          flag_count?: number
          free_shipping_above_inr?: number | null
          halal_cert_body?: string | null
          halal_cert_body_id?: string | null
          halal_cert_expiry?: string | null
          halal_cert_expiry_warned?: boolean
          halal_cert_url?: string | null
          halal_status?: Database["public"]["Enums"]["mp_halal_status"]
          id?: string
          order_count?: number
          photos?: Json
          price_inr?: number
          processing_days?: number
          rating?: number
          rejection_reason?: string | null
          return_count?: number
          return_eligible?: boolean
          review_count?: number
          seller_id?: string
          sku?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["mp_product_status"]
          stock_quantity?: number
          title?: string
          view_count?: number
          weight_grams?: number
        }
        Relationships: [
          {
            foreignKeyName: "mp_products_halal_cert_body_id_fkey"
            columns: ["halal_cert_body_id"]
            isOneToOne: false
            referencedRelation: "halal_cert_bodies_ref"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mp_products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "mp_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_seller_applications: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          id: string
          notes: string | null
          seller_id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          seller_id: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mp_seller_applications_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "mp_sellers"
            referencedColumns: ["id"]
          },
        ]
      }
      mp_sellers: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          bank_account_number: string | null
          bank_ifsc: string | null
          bank_name: string | null
          category: string | null
          city: string | null
          commission_exempt_until: string | null
          created_at: string
          description: string | null
          documents: Json
          featured_until: string | null
          gstin: string | null
          halal_declaration_signed: boolean
          halal_declaration_signed_at: string | null
          id: string
          is_verified: boolean
          pan: string | null
          rating: number
          rejection_reason: string | null
          seller_type: Database["public"]["Enums"]["mp_seller_type"]
          status: Database["public"]["Enums"]["mp_seller_status"]
          store_name: string
          store_slug: string
          total_gmv: number
          total_sales: number
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          category?: string | null
          city?: string | null
          commission_exempt_until?: string | null
          created_at?: string
          description?: string | null
          documents?: Json
          featured_until?: string | null
          gstin?: string | null
          halal_declaration_signed?: boolean
          halal_declaration_signed_at?: string | null
          id?: string
          is_verified?: boolean
          pan?: string | null
          rating?: number
          rejection_reason?: string | null
          seller_type?: Database["public"]["Enums"]["mp_seller_type"]
          status?: Database["public"]["Enums"]["mp_seller_status"]
          store_name: string
          store_slug: string
          total_gmv?: number
          total_sales?: number
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          bank_account_number?: string | null
          bank_ifsc?: string | null
          bank_name?: string | null
          category?: string | null
          city?: string | null
          commission_exempt_until?: string | null
          created_at?: string
          description?: string | null
          documents?: Json
          featured_until?: string | null
          gstin?: string | null
          halal_declaration_signed?: boolean
          halal_declaration_signed_at?: string | null
          id?: string
          is_verified?: boolean
          pan?: string | null
          rating?: number
          rejection_reason?: string | null
          seller_type?: Database["public"]["Enums"]["mp_seller_type"]
          status?: Database["public"]["Enums"]["mp_seller_status"]
          store_name?: string
          store_slug?: string
          total_gmv?: number
          total_sales?: number
          user_id?: string
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          active: boolean
          body: string
          created_at: string
          id: string
          key: string
          label: string
          link: string | null
          title: string
          trigger_event: string | null
          type: string
        }
        Insert: {
          active?: boolean
          body: string
          created_at?: string
          id?: string
          key: string
          label: string
          link?: string | null
          title: string
          trigger_event?: string | null
          type?: string
        }
        Update: {
          active?: boolean
          body?: string
          created_at?: string
          id?: string
          key?: string
          label?: string
          link?: string | null
          title?: string
          trigger_event?: string | null
          type?: string
        }
        Relationships: []
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
      organization_announcements: {
        Row: {
          body: string | null
          category: string | null
          created_at: string | null
          id: string
          is_pinned: boolean | null
          org_id: string
          title: string
        }
        Insert: {
          body?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          org_id: string
          title: string
        }
        Update: {
          body?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          is_pinned?: boolean | null
          org_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_announcements_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_services: {
        Row: {
          category: string | null
          contact: string | null
          created_at: string | null
          description: string | null
          eligibility: string | null
          id: string
          is_free: boolean | null
          name: string
          vendor_uid: string
        }
        Insert: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          is_free?: boolean | null
          name: string
          vendor_uid: string
        }
        Update: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          eligibility?: string | null
          id?: string
          is_free?: boolean | null
          name?: string
          vendor_uid?: string
        }
        Relationships: []
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
      processing_locks: {
        Row: {
          context: string | null
          expires_at: string
          lock_key: string
          locked_at: string
          locked_by: string | null
        }
        Insert: {
          context?: string | null
          expires_at?: string
          lock_key: string
          locked_at?: string
          locked_by?: string | null
        }
        Update: {
          context?: string | null
          expires_at?: string
          lock_key?: string
          locked_at?: string
          locked_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "processing_locks_locked_by_fkey"
            columns: ["locked_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      product_flags: {
        Row: {
          created_at: string
          details: string | null
          id: string
          product_id: string
          reason: Database["public"]["Enums"]["mp_flag_reason"]
          reporter_id: string
          reviewed: boolean
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          product_id: string
          reason: Database["public"]["Enums"]["mp_flag_reason"]
          reporter_id: string
          reviewed?: boolean
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          product_id?: string
          reason?: Database["public"]["Enums"]["mp_flag_reason"]
          reporter_id?: string
          reviewed?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "product_flags_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mp_products"
            referencedColumns: ["id"]
          },
        ]
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
      product_variants: {
        Row: {
          attributes: Json
          compare_price_inr: number | null
          created_at: string
          id: string
          photos: Json | null
          price_inr: number
          product_id: string
          sku: string | null
          sort_order: number
          stock_quantity: number
          variant_name: string
        }
        Insert: {
          attributes: Json
          compare_price_inr?: number | null
          created_at?: string
          id?: string
          photos?: Json | null
          price_inr: number
          product_id: string
          sku?: string | null
          sort_order?: number
          stock_quantity?: number
          variant_name: string
        }
        Update: {
          attributes?: Json
          compare_price_inr?: number | null
          created_at?: string
          id?: string
          photos?: Json | null
          price_inr?: number
          product_id?: string
          sku?: string | null
          sort_order?: number
          stock_quantity?: number
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mp_products"
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
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          experience_level: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          languages: string[] | null
          linkedin: string | null
          open_to_volunteer: boolean | null
          portfolio_url: string | null
          pricing_model: string | null
          profession: string
          qualifications: string[] | null
          service_modes: string[] | null
          service_note: string | null
          session_rate: number | null
          skills: string[] | null
          specializations: string[] | null
          updated_at: string | null
          user_id: string
          verification_status: string | null
          website: string | null
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          experience_level?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          linkedin?: string | null
          open_to_volunteer?: boolean | null
          portfolio_url?: string | null
          pricing_model?: string | null
          profession: string
          qualifications?: string[] | null
          service_modes?: string[] | null
          service_note?: string | null
          session_rate?: number | null
          skills?: string[] | null
          specializations?: string[] | null
          updated_at?: string | null
          user_id: string
          verification_status?: string | null
          website?: string | null
        }
        Update: {
          availability?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          experience_level?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          languages?: string[] | null
          linkedin?: string | null
          open_to_volunteer?: boolean | null
          portfolio_url?: string | null
          pricing_model?: string | null
          profession?: string
          qualifications?: string[] | null
          service_modes?: string[] | null
          service_note?: string | null
          session_rate?: number | null
          skills?: string[] | null
          specializations?: string[] | null
          updated_at?: string | null
          user_id?: string
          verification_status?: string | null
          website?: string | null
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
      professional_services: {
        Row: {
          category: string | null
          contact: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number | null
          price_type: string | null
          vendor_uid: string
        }
        Insert: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price?: number | null
          price_type?: string | null
          vendor_uid: string
        }
        Update: {
          category?: string | null
          contact?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number | null
          price_type?: string | null
          vendor_uid?: string
        }
        Relationships: []
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
      ramadan_content: {
        Row: {
          active: boolean
          business_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          link_href: string | null
          section: string
          sort_order: number
          title: string
        }
        Insert: {
          active?: boolean
          business_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          link_href?: string | null
          section: string
          sort_order?: number
          title: string
        }
        Update: {
          active?: boolean
          business_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          link_href?: string | null
          section?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      ramadan_settings: {
        Row: {
          banner_subtitle: string
          banner_title: string
          city: string
          coin_multiplier: number
          enabled: boolean
          end_date: string
          id: number
          iftar_cta_text: string
          start_date: string
          updated_at: string
          year: number
        }
        Insert: {
          banner_subtitle?: string
          banner_title?: string
          city?: string
          coin_multiplier?: number
          enabled?: boolean
          end_date?: string
          id?: number
          iftar_cta_text?: string
          start_date?: string
          updated_at?: string
          year?: number
        }
        Update: {
          banner_subtitle?: string
          banner_title?: string
          city?: string
          coin_multiplier?: number
          enabled?: boolean
          end_date?: string
          id?: number
          iftar_cta_text?: string
          start_date?: string
          updated_at?: string
          year?: number
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
      social_embeds: {
        Row: {
          author_name: string | null
          embed_html: string | null
          fetched_at: string
          height: number | null
          id: string
          platform: string
          thumbnail_url: string | null
          title: string | null
          url: string
          width: number | null
        }
        Insert: {
          author_name?: string | null
          embed_html?: string | null
          fetched_at?: string
          height?: number | null
          id?: string
          platform: string
          thumbnail_url?: string | null
          title?: string | null
          url: string
          width?: number | null
        }
        Update: {
          author_name?: string | null
          embed_html?: string | null
          fetched_at?: string
          height?: number | null
          id?: string
          platform?: string
          thumbnail_url?: string | null
          title?: string | null
          url?: string
          width?: number | null
        }
        Relationships: []
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
      streaks: {
        Row: {
          current_count: number
          id: string
          last_action_date: string | null
          longest_streak: number
          streak_type: string
          user_id: string
        }
        Insert: {
          current_count?: number
          id?: string
          last_action_date?: string | null
          longest_streak?: number
          streak_type: string
          user_id: string
        }
        Update: {
          current_count?: number
          id?: string
          last_action_date?: string | null
          longest_streak?: number
          streak_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "streaks_user_id_fkey"
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
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string
          description: string | null
          escalated_at: string | null
          escalated_to: string | null
          id: string
          priority: string
          resolved_at: string | null
          status: string
          subject: string
          ticket_number: string
          type: string
          updated_at: string
          user_email: string | null
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject: string
          ticket_number?: string
          type: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          escalated_at?: string | null
          escalated_to?: string | null
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          ticket_number?: string
          type?: string
          updated_at?: string
          user_email?: string | null
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: []
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
          current_balance: number
          level: number
          level_name: string
          lifetime_coins_earned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          current_balance?: number
          level?: number
          level_name?: string
          lifetime_coins_earned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          current_balance?: number
          level?: number
          level_name?: string
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
      release_expired_locks: { Args: never; Returns: undefined }
    }
    Enums: {
      admin_role_tier: "viewer" | "editor" | "manager" | "super_admin"
      mp_flag_reason:
        | "not_halal_as_described"
        | "misleading_photos"
        | "fake_certificate"
        | "other"
      mp_halal_status: "self_declared" | "admin_verified" | "certified"
      mp_order_status:
        | "payment_pending"
        | "order_confirmed"
        | "processing"
        | "shipped"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
        | "return_requested"
        | "refund_initiated"
        | "refund_completed"
      mp_payout_status: "pending" | "released" | "paid" | "disputed" | "held"
      mp_product_status:
        | "draft"
        | "pending_review"
        | "active"
        | "paused"
        | "rejected"
        | "archived"
      mp_seller_status: "pending" | "active" | "suspended" | "banned"
      mp_seller_type: "business" | "msme" | "home" | "creator" | "wholesale"
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
    Enums: {
      admin_role_tier: ["viewer", "editor", "manager", "super_admin"],
      mp_flag_reason: [
        "not_halal_as_described",
        "misleading_photos",
        "fake_certificate",
        "other",
      ],
      mp_halal_status: ["self_declared", "admin_verified", "certified"],
      mp_order_status: [
        "payment_pending",
        "order_confirmed",
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "return_requested",
        "refund_initiated",
        "refund_completed",
      ],
      mp_payout_status: ["pending", "released", "paid", "disputed", "held"],
      mp_product_status: [
        "draft",
        "pending_review",
        "active",
        "paused",
        "rejected",
        "archived",
      ],
      mp_seller_status: ["pending", "active", "suspended", "banned"],
      mp_seller_type: ["business", "msme", "home", "creator", "wholesale"],
    },
  },
} as const

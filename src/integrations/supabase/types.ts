export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          replied_at: string | null
          replied_by: string | null
          reply_message: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          replied_at?: string | null
          replied_by?: string | null
          reply_message?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          replied_at?: string | null
          replied_by?: string | null
          reply_message?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "contact_messages_replied_by_fkey"
            columns: ["replied_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donation_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          beneficiary_count: number | null
          beneficiary_details: string | null
          created_at: string
          delivered_at: string | null
          delivery_address: string
          delivery_city: string
          delivery_country: string
          delivery_instructions: string | null
          delivery_postal_code: string
          delivery_state: string
          donation_id: string
          id: string
          ngo_id: string
          notes: string | null
          purpose: string
          requested_quantity: number
          status: string
          tracking_number: string | null
          updated_at: string
          urgency_level: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          beneficiary_count?: number | null
          beneficiary_details?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address: string
          delivery_city: string
          delivery_country: string
          delivery_instructions?: string | null
          delivery_postal_code: string
          delivery_state: string
          donation_id: string
          id?: string
          ngo_id: string
          notes?: string | null
          purpose: string
          requested_quantity: number
          status?: string
          tracking_number?: string | null
          updated_at?: string
          urgency_level?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          beneficiary_count?: number | null
          beneficiary_details?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_address?: string
          delivery_city?: string
          delivery_country?: string
          delivery_instructions?: string | null
          delivery_postal_code?: string
          delivery_state?: string
          donation_id?: string
          id?: string
          ngo_id?: string
          notes?: string | null
          purpose?: string
          requested_quantity?: number
          status?: string
          tracking_number?: string | null
          updated_at?: string
          urgency_level?: string
        }
        Relationships: [
          {
            foreignKeyName: "donation_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_requests_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "medicine_donations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_requests_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medicine_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      medicine_donations: {
        Row: {
          batch_number: string | null
          brand_name: string | null
          category_id: string | null
          created_at: string
          description: string | null
          donor_id: string
          dosage_form: string | null
          estimated_value: number | null
          expiry_date: string
          generic_name: string | null
          id: string
          images: string[] | null
          manufacturing_date: string | null
          medicine_name: string
          original_packaging: boolean | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_country: string | null
          pickup_instructions: string | null
          pickup_postal_code: string | null
          pickup_state: string | null
          prescription_required: boolean | null
          quantity: number
          status: string
          storage_conditions: string | null
          strength: string | null
          unit: string
          updated_at: string
          verification_notes: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          batch_number?: string | null
          brand_name?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          donor_id: string
          dosage_form?: string | null
          estimated_value?: number | null
          expiry_date: string
          generic_name?: string | null
          id?: string
          images?: string[] | null
          manufacturing_date?: string | null
          medicine_name: string
          original_packaging?: boolean | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_country?: string | null
          pickup_instructions?: string | null
          pickup_postal_code?: string | null
          pickup_state?: string | null
          prescription_required?: boolean | null
          quantity: number
          status?: string
          storage_conditions?: string | null
          strength?: string | null
          unit: string
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          batch_number?: string | null
          brand_name?: string | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          donor_id?: string
          dosage_form?: string | null
          estimated_value?: number | null
          expiry_date?: string
          generic_name?: string | null
          id?: string
          images?: string[] | null
          manufacturing_date?: string | null
          medicine_name?: string
          original_packaging?: boolean | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_country?: string | null
          pickup_instructions?: string | null
          pickup_postal_code?: string | null
          pickup_state?: string | null
          prescription_required?: boolean | null
          quantity?: number
          status?: string
          storage_conditions?: string | null
          strength?: string | null
          unit?: string
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medicine_donations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "medicine_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medicine_donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medicine_donations_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          organization_name: string | null
          organization_registration_number: string | null
          phone_number: string | null
          postal_code: string | null
          state: string | null
          updated_at: string
          user_id: string
          user_type: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          organization_name?: string | null
          organization_registration_number?: string | null
          phone_number?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          user_type?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          organization_name?: string | null
          organization_registration_number?: string | null
          phone_number?: string | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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

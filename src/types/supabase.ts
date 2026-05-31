export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      designs: {
        Row: {
          id: string;
          title: string;
          category: string;
          description: string;
          price: number;
          image_url: string;
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          description: string;
          price: number;
          image_url: string;
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["designs"]["Insert"]>;
      };
      appointments: {
        Row: {
          id: string;
          customer_name: string;
          phone_number: string;
          email: string;
          gender: string;
          preferred_date: string;
          preferred_time: string;
          clothing_type: string;
          measurement_notes: string;
          custom_design: boolean;
          customer_code: string;
          status: string;
          status_index: number;
          completion_percent: number;
          estimated_completion_date: string | null;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          phone_number: string;
          email: string;
          gender: string;
          preferred_date: string;
          preferred_time: string;
          clothing_type: string;
          measurement_notes?: string;
          custom_design?: boolean;
          customer_code: string;
          status?: string;
          status_index?: number;
          completion_percent?: number;
          estimated_completion_date?: string | null;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Insert"]>;
      };
      custom_requests: {
        Row: {
          id: string;
          appointment_id: string;
          fabric_type: string | null;
          color: string | null;
          measurements: string | null;
          special_instructions: string | null;
          design_preferences: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          appointment_id: string;
          fabric_type?: string | null;
          color?: string | null;
          measurements?: string | null;
          special_instructions?: string | null;
          design_preferences?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["custom_requests"]["Insert"]>;
      };
      availability_rules: {
        Row: {
          id: string;
          date: string;
          slots: string[];
          is_blocked: boolean;
          holiday_mode: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          slots: string[];
          is_blocked?: boolean;
          holiday_mode?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["availability_rules"]["Insert"]>;
      };
    };
  };
};

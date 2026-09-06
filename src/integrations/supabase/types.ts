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
      about: {
        Row: {
          created_at: string
          description: string | null
          heading: string | null
          id: string
          resume_button_label: string | null
          resume_url: string | null
          stat1_label: string | null
          stat1_value: string | null
          stat2_label: string | null
          stat2_value: string | null
          stat3_label: string | null
          stat3_value: string | null
          stat4_label: string | null
          stat4_value: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          heading?: string | null
          id?: string
          resume_button_label?: string | null
          resume_url?: string | null
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          stat4_label?: string | null
          stat4_value?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          heading?: string | null
          id?: string
          resume_button_label?: string | null
          resume_url?: string | null
          stat1_label?: string | null
          stat1_value?: string | null
          stat2_label?: string | null
          stat2_value?: string | null
          stat3_label?: string | null
          stat3_value?: string | null
          stat4_label?: string | null
          stat4_value?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          category: string
          created_at: string
          credential_url: string | null
          date: string | null
          description: string | null
          display_order: number
          event: string | null
          id: string
          image_url: string | null
          is_enabled: boolean
          organization: string | null
          role: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          credential_url?: string | null
          date?: string | null
          description?: string | null
          display_order?: number
          event?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          organization?: string | null
          role?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          credential_url?: string | null
          date?: string | null
          description?: string | null
          display_order?: number
          event?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          organization?: string | null
          role?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      activity_log: {
        Row: {
          action: string
          created_at: string
          detail: string | null
          entity: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          detail?: string | null
          entity?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          detail?: string | null
          entity?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          is_featured: boolean
          publish_date: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string | null
          status: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          publish_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          publish_date?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string | null
          status?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string
          credential_id: string | null
          credential_url: string | null
          display_order: number
          expiry_date: string | null
          id: string
          image_url: string | null
          issue_date: string | null
          name: string
          organization: string | null
          pdf_url: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          display_order?: number
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          name?: string
          organization?: string | null
          pdf_url?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          credential_url?: string | null
          display_order?: number
          expiry_date?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string | null
          name?: string
          organization?: string | null
          pdf_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          cgpa: string | null
          created_at: string
          current_semester: string | null
          degree: string | null
          department: string | null
          description: string | null
          display_order: number
          end_year: string | null
          id: string
          institution: string
          is_current: boolean
          logo_url: string | null
          program: string | null
          start_year: string | null
          updated_at: string
        }
        Insert: {
          cgpa?: string | null
          created_at?: string
          current_semester?: string | null
          degree?: string | null
          department?: string | null
          description?: string | null
          display_order?: number
          end_year?: string | null
          id?: string
          institution?: string
          is_current?: boolean
          logo_url?: string | null
          program?: string | null
          start_year?: string | null
          updated_at?: string
        }
        Update: {
          cgpa?: string | null
          created_at?: string
          current_semester?: string | null
          degree?: string | null
          department?: string | null
          description?: string | null
          display_order?: number
          end_year?: string | null
          id?: string
          institution?: string
          is_current?: boolean
          logo_url?: string | null
          program?: string | null
          start_year?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          company: string
          created_at: string
          description: string | null
          display_order: number
          employment_type: string | null
          end_date: string | null
          id: string
          is_current: boolean
          location: string | null
          logo_url: string | null
          position: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          company?: string
          created_at?: string
          description?: string | null
          display_order?: number
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          logo_url?: string | null
          position?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          display_order?: number
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean
          location?: string | null
          logo_url?: string | null
          position?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gallery: {
        Row: {
          album: string | null
          category: string | null
          created_at: string
          display_order: number
          id: string
          image_url: string
          title: string | null
        }
        Insert: {
          album?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url: string
          title?: string | null
        }
        Update: {
          album?: string | null
          category?: string | null
          created_at?: string
          display_order?: number
          id?: string
          image_url?: string
          title?: string | null
        }
        Relationships: []
      }
      hobbies: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          image_url: string | null
          is_enabled: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          image_url?: string | null
          is_enabled?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          avatar_url: string | null
          birthday: string | null
          career_objective: string | null
          cover_url: string | null
          created_at: string
          email: string | null
          facebook: string | null
          full_name: string
          github: string | null
          id: string
          instagram: string | null
          linkedin: string | null
          location: string | null
          long_bio: string | null
          nationality: string | null
          phone: string | null
          portfolio_url: string | null
          short_bio: string | null
          title: string | null
          twitter: string | null
          typing_texts: string[]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          birthday?: string | null
          career_objective?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          full_name?: string
          github?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          long_bio?: string | null
          nationality?: string | null
          phone?: string | null
          portfolio_url?: string | null
          short_bio?: string | null
          title?: string | null
          twitter?: string | null
          typing_texts?: string[]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          birthday?: string | null
          career_objective?: string | null
          cover_url?: string | null
          created_at?: string
          email?: string | null
          facebook?: string | null
          full_name?: string
          github?: string | null
          id?: string
          instagram?: string | null
          linkedin?: string | null
          location?: string | null
          long_bio?: string | null
          nationality?: string | null
          phone?: string | null
          portfolio_url?: string | null
          short_bio?: string | null
          title?: string | null
          twitter?: string | null
          typing_texts?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          challenges: string | null
          completion_date: string | null
          created_at: string
          display_order: number
          features: string[]
          github_url: string | null
          id: string
          images: string[]
          is_featured: boolean
          live_url: string | null
          long_description: string | null
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string | null
          solutions: string | null
          status: string
          tags: string[]
          tech_stack: string[]
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          challenges?: string | null
          completion_date?: string | null
          created_at?: string
          display_order?: number
          features?: string[]
          github_url?: string | null
          id?: string
          images?: string[]
          is_featured?: boolean
          live_url?: string | null
          long_description?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string | null
          solutions?: string | null
          status?: string
          tags?: string[]
          tech_stack?: string[]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          challenges?: string | null
          completion_date?: string | null
          created_at?: string
          display_order?: number
          features?: string[]
          github_url?: string | null
          id?: string
          images?: string[]
          is_featured?: boolean
          live_url?: string | null
          long_description?: string | null
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string | null
          solutions?: string | null
          status?: string
          tags?: string[]
          tech_stack?: string[]
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          accent_color: string | null
          address: string | null
          canonical_url: string | null
          created_at: string
          email: string | null
          favicon_url: string | null
          footer_text: string | null
          google_analytics: string | null
          google_search_console: string | null
          id: string
          keywords: string | null
          logo_url: string | null
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          phone: string | null
          resume_url: string | null
          robots_txt: string | null
          sitemap_url: string | null
          theme: string | null
          twitter_card: string | null
          updated_at: string
          website_name: string | null
        }
        Insert: {
          accent_color?: string | null
          address?: string | null
          canonical_url?: string | null
          created_at?: string
          email?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          google_analytics?: string | null
          google_search_console?: string | null
          id?: string
          keywords?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          phone?: string | null
          resume_url?: string | null
          robots_txt?: string | null
          sitemap_url?: string | null
          theme?: string | null
          twitter_card?: string | null
          updated_at?: string
          website_name?: string | null
        }
        Update: {
          accent_color?: string | null
          address?: string | null
          canonical_url?: string | null
          created_at?: string
          email?: string | null
          favicon_url?: string | null
          footer_text?: string | null
          google_analytics?: string | null
          google_search_console?: string | null
          id?: string
          keywords?: string | null
          logo_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          phone?: string | null
          resume_url?: string | null
          robots_txt?: string | null
          sitemap_url?: string | null
          theme?: string | null
          twitter_card?: string | null
          updated_at?: string
          website_name?: string | null
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          created_at: string
          display_order: number
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category_id: string | null
          color: string | null
          created_at: string
          display_order: number
          icon: string | null
          id: string
          name: string
          percentage: number
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          name?: string
          percentage?: number
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          color?: string | null
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          name?: string
          percentage?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "skill_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          company: string | null
          created_at: string
          designation: string | null
          display_order: number
          id: string
          name: string
          photo_url: string | null
          rating: number
          review: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number
          id?: string
          name?: string
          photo_url?: string | null
          rating?: number
          review?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          designation?: string | null
          display_order?: number
          id?: string
          name?: string
          photo_url?: string | null
          rating?: number
          review?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin", "editor", "user"],
    },
  },
} as const

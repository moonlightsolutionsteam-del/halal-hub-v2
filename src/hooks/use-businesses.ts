
'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Business } from '@/lib/types';

export function useBusinesses(category?: string) {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    async function fetchBusinesses() {
      setLoading(true);
      try {
        let query = supabase
          .from('businesses')
          .select('id, name, category, subcategory, description, address, city, latitude, longitude, image_url, rating, review_count, halal_verified, status, is_open, price_range, selected_cuisines, selected_amenities')
          .eq('status', 'active')
          .order('rating', { ascending: false });

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error: sbError } = await query;
        if (sbError) throw sbError;

        const mapped: Business[] = (data ?? []).map(row => ({
          id: row.id,
          name: row.name,
          latitude: row.latitude ?? 19.076,
          longitude: row.longitude ?? 72.8777,
          categoryId: row.category,
          type: row.subcategory ?? row.category,
          category: row.category,
          cuisines: row.selected_cuisines ?? [],
          amenities: row.selected_amenities ?? [],
          specialties: [],
          rating: row.rating ?? undefined,
          reviews: row.review_count ?? undefined,
          verifiedHalal: row.halal_verified ?? false,
          verified: row.halal_verified ?? false,
          isOpen: row.is_open ?? undefined,
          imageUrl: row.image_url ?? undefined,
          priceRange: row.price_range ?? undefined,
        }));

        setBusinesses(mapped);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load businesses'));
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [category]);

  return { businesses, loading, error };
}

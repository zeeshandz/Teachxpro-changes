import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'teachxpro_auth_token',
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const getImageUrl = async (courseId: string): Promise<string> => {
  try {
    // Try to get the specific course image
    const { data: courseImage } = await supabase
      .from('course_images')
      .select('image_url')
      .eq('course_id', courseId);

    // If course image exists, return it
    if (courseImage && courseImage.length > 0) {
      return courseImage[0].image_url;
    }

    // Try to get default image
    const { data: defaultImage } = await supabase
      .from('course_images')
      .select('image_url')
      .eq('course_id', 'default');

    // If default image exists, return it
    if (defaultImage && defaultImage.length > 0) {
      return defaultImage[0].image_url;
    }

    // Return fallback image if no images found
    return `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80`;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80`;
  }
};

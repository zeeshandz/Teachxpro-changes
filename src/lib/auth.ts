import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'teachxpro_auth_token',
    storage: localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

export type SignUpData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
};

export async function signUp({ email, password, firstName, lastName, phone }: SignUpData) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || ''
      }
    }
  });

  if (authError) throw authError;

  // Only create profile if signup was successful and we have a user
  if (authData.user) {
  // Create profile in the profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user?.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || ''
      }
    ]);

  if (profileError) throw profileError;
  }

  return authData;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: {
      shouldCreateUser: false
    }
  });

  if (error) {
    // Provide more user-friendly error messages
    if (error.message === 'Invalid login credentials') {
      throw new Error('Invalid email or password. Please try again.');
    } else if (error.message.includes('Email not confirmed')) {
      throw new Error('Please verify your email address before signing in.');
    } else {
      throw error;
    }
  }
  return data;
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth`,
      skipBrowserRedirect: false
    }
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;
}
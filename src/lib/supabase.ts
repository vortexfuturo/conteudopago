import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PurchaseEvent {
  id?: string;
  user_email: string;
  event_type: string;
  value: number;
  currency: string;
  created_at?: string;
  user_agent?: string;
  ip_address?: string;
}

async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP:', error);
    return 'unknown';
  }
}

export async function logEvent(email: string, eventType: 'InitiateCheckout' | 'Purchase', source: string = 'conta1'): Promise<boolean> {
  try {
    const userIP = await getUserIP();

    const { data: existingEvents, error: queryError } = await supabase
      .from('purchase_events')
      .select('id, event_type, created_at')
      .eq('ip_address', userIP);

    if (queryError) {
      console.error('Error querying events:', queryError);
      return false;
    }

    if (existingEvents && existingEvents.length > 0) {
      console.log(`Event already fired for this IP: ${existingEvents[0].event_type}`);
      return false;
    }

    const eventData: PurchaseEvent = {
      user_email: `${email}|${source}`,
      event_type: eventType,
      value: 10.00,
      currency: 'BRL',
      user_agent: navigator.userAgent,
      ip_address: userIP,
    };

    const { error } = await supabase
      .from('purchase_events')
      .insert([eventData]);

    if (error) {
      console.error(`Error logging ${eventType} event:`, error);
      return false;
    }

    console.log(`${eventType} event logged successfully for IP: ${userIP} | Source: ${source}`);
    return true;
  } catch (error) {
    console.error(`Error in logEvent:`, error);
    return false;
  }
}

export async function logPurchaseEvent(email: string, source: string = 'conta1'): Promise<boolean> {
  return logEvent(email, 'Purchase', source);
}

export async function logInitiateCheckoutEvent(email: string, source: string = 'conta1'): Promise<boolean> {
  return logEvent(email, 'InitiateCheckout', source);
}

export interface UserRegistration {
  id?: string;
  full_name: string;
  cpf: string;
  email: string;
  password_hash: string;
  created_at?: string;
  last_login?: string;
  is_active?: boolean;
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function syncToGoogleSheets(userData: UserRegistration): Promise<void> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    const functionUrl = `${supabaseUrl}/functions/v1/sync-to-sheets`;

    await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ userData }),
    });
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
  }
}

export async function registerUser(
  fullName: string,
  cpf: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const cpfClean = cpf.replace(/\D/g, '');

    if (cpfClean.length !== 11) {
      return { success: false, error: 'CPF inválido' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: 'E-mail inválido' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Senha deve ter no mínimo 6 caracteres' };
    }

    const passwordHash = await hashPassword(password);

    const userData: UserRegistration = {
      full_name: fullName,
      cpf: cpfClean,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('user_registrations')
      .insert([userData]);

    if (error) {
      if (error.code === '23505') {
        if (error.message.includes('cpf')) {
          return { success: false, error: 'CPF já cadastrado' };
        }
        if (error.message.includes('email')) {
          return { success: false, error: 'E-mail já cadastrado' };
        }
      }
      console.error('Error registering user:', error);
      return { success: false, error: 'Erro ao realizar cadastro' };
    }

    syncToGoogleSheets(userData);

    return { success: true };
  } catch (error) {
    console.error('Error in registerUser:', error);
    return { success: false, error: 'Erro ao realizar cadastro' };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: UserRegistration; error?: string }> {
  try {
    const passwordHash = await hashPassword(password);

    const { data, error } = await supabase
      .from('user_registrations')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('password_hash', passwordHash)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error logging in:', error);
      return { success: false, error: 'Erro ao realizar login' };
    }

    if (!data) {
      return { success: false, error: 'E-mail ou senha incorretos' };
    }

    await supabase
      .from('user_registrations')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    return { success: true, user: data };
  } catch (error) {
    console.error('Error in loginUser:', error);
    return { success: false, error: 'Erro ao realizar login' };
  }
}

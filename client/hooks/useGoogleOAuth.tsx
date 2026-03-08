import { useState, useCallback } from 'react';

interface GoogleJwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

function decodeJwtPayload(token: string): GoogleJwtPayload {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('Invalid JWT format');
  const payload = parts[1];
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const decoded = atob(padded);
  return JSON.parse(decoded);
}

export async function computeSubHash(sub: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(sub);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function useGoogleOAuth() {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<GoogleJwtPayload | null>(null);
  const [subHash, setSubHash] = useState<string | null>(null);

  const handleCredentialResponse = useCallback(async (response: { credential: string }) => {
    const token = response.credential;
    setIdToken(token);

    const decoded = decodeJwtPayload(token);
    setUserInfo(decoded);

    const hash = await computeSubHash(decoded.sub);
    setSubHash(hash);
  }, []);

  const ensureGisLoaded = useCallback(async () => {
    if (typeof window === 'undefined') return;
    if ((window as any).google?.accounts?.id) return;

    const existingScript = document.querySelector(
      'script[data-gis-client="true"]'
    ) as HTMLScriptElement | null;

    await new Promise<void>((resolve, reject) => {
      const onLoad = () => resolve();
      const onError = () => reject(new Error('Failed to load Google Identity Services'));

      if (existingScript) {
        existingScript.addEventListener('load', onLoad, { once: true });
        existingScript.addEventListener('error', onError, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.gisClient = 'true';
      script.addEventListener('load', onLoad, { once: true });
      script.addEventListener('error', onError, { once: true });
      document.head.appendChild(script);
    });
  }, []);

  const login = useCallback(async () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID not set');
      return;
    }

    try {
      await ensureGisLoaded();

      if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
        (window as any).google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        (window as any).google.accounts.id.prompt();
      } else {
        console.error('Google Identity Services is not available after script load');
      }
    } catch (error) {
      console.error('Failed to initialize Google OAuth:', error);
    }
  }, [ensureGisLoaded, handleCredentialResponse]);

  const logout = useCallback(() => {
    setIdToken(null);
    setUserInfo(null);
    setSubHash(null);
  }, []);

  return {
    login,
    logout,
    idToken,
    userInfo,
    subHash,
    isAuthenticated: !!idToken,
  };
}

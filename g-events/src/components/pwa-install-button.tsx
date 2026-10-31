'use client';

import { useState, useEffect } from 'react';

interface PWAInstallButtonProps {
  className?: string;
  text?: string;
}

/**
 * PWA Install Button - appears when the app is installable
 * and not already installed. Uses the beforeinstallprompt event.
 */
export function PWAInstallButton({ className = '', text = 'Install G-Events' }: PWAInstallButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt((e as any).prompt);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Check if already installed (iOS doesn't support beforeinstallprompt the same way)
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/iP(hone|pod)/i.test(ua)) {
      // iOS - check if home screen added via window.navigator.standalone
      setIsInstallable(!(window as any).navigator?.standalone);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User accepted ${outcome} prompt`);
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isInstallable) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 ${className} z-50`}
    >
      <button
        onClick={handleInstallClick}
        className={`btn-primary w-full md:w-auto px-6 py-3 rounded-full text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all focus-visible:ring-2 ring-primary/40`}
        aria-label="Install G-Events app"
      >
        {text}
      </button>
    </div>
  );
}
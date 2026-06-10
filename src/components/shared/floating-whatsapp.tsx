'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

export function FloatingWhatsApp({ phoneNumber }: FloatingWhatsAppProps) {
  const handleClick = () => {
    // Clean up the phone number: remove non-digit characters
    let digits = phoneNumber.replace(/\D/g, '');
    
    // If it's an Indian number (starts with 8 or 9 and 10 digits), add +91
    if (digits.length === 10 && (digits.startsWith('8') || digits.startsWith('9'))) {
      digits = '91' + digits;
    }
    
    // If it doesn't start with a country code, try to add one
    if (!digits.startsWith('91') && digits.length === 10) {
      digits = '91' + digits;
    }
    
    const url = `https://wa.me/${digits}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-8px_rgba(37,211,102,0.6)] ring-4 ring-[#25D366]/20"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.button>
  );
}

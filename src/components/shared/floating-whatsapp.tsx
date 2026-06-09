'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  phoneNumber: string;
}

export function FloatingWhatsApp({ phoneNumber }: FloatingWhatsAppProps) {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.button>
  );
}

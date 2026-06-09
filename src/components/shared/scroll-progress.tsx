'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-0.5 w-full bg-[#E5E7EB]/30">
      <motion.div
        className="h-full bg-gradient-to-r from-[#B8864A] via-[#D4AF37] to-[#B8864A]"
        style={{ width: `${scrollProgress}%` }}
        transition={{ type: 'spring', stiffness: 80, damping: 25 }}
      />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-white/20">
      <motion.div
        className="h-full bg-gradient-to-r from-[#B8864A] to-[#9a6f3a]"
        style={{ width: `${scrollProgress}%` }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
    </div>
  );
}

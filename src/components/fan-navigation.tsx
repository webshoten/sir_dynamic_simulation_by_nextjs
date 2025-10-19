'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Top', href: '/' },
  { label: 'プロフィール', href: '/profile' },
  { label: '理論解説', href: '/works/sir-theory' },
  { label: '数値解法によるSIRモデル', href: '/works/sir-analytical' },
  { label: '個体ベースSIRモデル', href: '/works/sir-simulation' },
];

export function FanNavigation() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const gradientId = useId();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredIndex(null);
    }, 300);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isExpanded) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 0) {
        setScrollOffset((prev) => (prev + 1) % navItems.length);
      } else {
        setScrollOffset(
          (prev) => (prev - 1 + navItems.length) % navItems.length,
        );
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isExpanded]);

  // アクティブなページを中央（index 2）に表示
  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.href === pathname);
    if (activeIndex !== -1) {
      // 中央（displayIndex: 2）にアクティブなアイテムを配置
      const newOffset = (activeIndex - 2 + navItems.length) % navItems.length;
      setScrollOffset(newOffset);
    }
  }, [pathname]);

  const totalAngle = 90;
  const radius = 380;

  const visibleItems = Array.from({ length: 5 }, (_, i) => {
    const index = (scrollOffset + i) % navItems.length;
    return { ...navItems[index], displayIndex: i };
  });

  return (
    <nav
      ref={containerRef}
      className="fixed top-0 left-0 z-50"
      aria-label="扇形ナビゲーション"
    >
      <section
        className={`relative w-[400px] h-[400px] ${
          isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="ナビゲーションメニュー領域"
      >
        <section
          className="absolute top-0 left-0 origin-top-left transition-all duration-700 ease-out z-10 pointer-events-auto"
          style={{
            transform: isExpanded ? 'scale(1)' : 'scale(0)',
            opacity: isExpanded ? 1 : 0,
          }}
          aria-label="扇形メニュー展開エリア"
        >
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            className="overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.95)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.85)" />
              </linearGradient>
            </defs>
            <path
              d={`M 0 0 L ${radius} 0 A ${radius} ${radius} 0 0 1 0 ${radius} Z`}
              fill={`url(#${gradientId})`}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
              className="drop-shadow-2xl"
            />
          </svg>
        </section>

        {visibleItems.map((item) => {
          const index = item.displayIndex;
          const angle = (index / (visibleItems.length - 1)) * totalAngle;
          const distance = 240;
          const x = Math.cos((angle * Math.PI) / 180) * distance;
          const y = Math.sin((angle * Math.PI) / 180) * distance;
          const isHovered = hoveredIndex === index;
          const isActive = pathname === item.href;

          // Creates a gradient: 0 -> 0.6 -> 1 -> 0.6 -> 0
          let edgeFade = 1;
          if (index === 0)
            edgeFade = 0; // Entering: invisible
          else if (index === 1)
            edgeFade = 0.6; // Fading in
          else if (index === 2)
            edgeFade = 1; // Center: fully visible
          else if (index === 3)
            edgeFade = 0.6; // Fading out
          else if (index === 4) edgeFade = 0; // Leaving: invisible

          const itemOpacity = isExpanded ? edgeFade : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="absolute z-20 pointer-events-auto"
              style={{
                left: `${x + 40}px`,
                top: `${y + 40}px`,
                transform: isExpanded
                  ? `translate(-50%, -50%) scale(${isHovered ? 1.15 : 1})`
                  : 'translate(-50%, -50%) scale(0)',
                opacity: itemOpacity,
                transition: isExpanded
                  ? `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`
                  : 'all 0.5s ease-out 0s',
                color: '#ffffff',
              }}
            >
              <span
                className="text-lg font-semibold whitespace-nowrap block"
                style={{
                  color: isActive ? '#fbbf24' : '#ffffff',
                  textShadow: isActive
                    ? '0 0 25px rgba(251, 191, 36, 0.9), 0 2px 8px rgba(0,0,0,0.8)'
                    : isHovered
                      ? '0 0 20px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.8)'
                      : '0 2px 6px rgba(0,0,0,0.8)',
                  letterSpacing: isHovered || isActive ? '0.05em' : '0',
                  transition: 'all 0.3s ease-out',
                  fontWeight: isActive ? '700' : '600',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <button
          type="button"
          className="absolute top-0 left-0 w-16 h-16 rounded-full bg-transparent transition-all duration-300 hover:scale-105 flex items-center justify-center z-30 pointer-events-auto"
          aria-label="ナビゲーションメニュー"
          onMouseEnter={handleMouseEnter}
        >
          <div
            className="transition-transform duration-500 text-white"
            style={{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </button>
      </section>
    </nav>
  );
}

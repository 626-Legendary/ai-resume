import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const baseOverlayRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  // 如果你有 demo 数据，就放这里
  const demo = [];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };

    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);

    // 鼠标进入 / 移动时：显示 colored overlay，隐藏淡白遮罩
    gsap.to(baseOverlayRef.current, {
      opacity: 1,
      duration: 0.25,
      overwrite: true,
    });
    gsap.to(fadeRef.current, {
      opacity: 0,
      duration: 0.25,
      overwrite: true,
    });
  };

  const handleLeave = () => {
    // 鼠标离开时：两个 overlay 都淡出，露出正常彩色内容
    gsap.to(baseOverlayRef.current, {
      opacity: 0,
      duration: fadeOut,
      overwrite: true,
    });
    gsap.to(fadeRef.current, {
      opacity: 0,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`bg-transparent relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
      style={{
        '--r': `${radius}px`,
        '--x': '50%',
        '--y': '50%',
      }}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
          style={{
            '--card-border': c.borderColor || 'transparent',
            background: c.gradient,
            '--spotlight-color': 'rgba(255,255,255,0.3)',
          }}
        >
          {/* 卡片局部 spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)',
            }}
          />
          <div className="relative z-10 flex-1 p-2.5 box-border">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
            {c.handle && (
              <span className="text-[0.95rem] opacity-80 text-right">
                {c.handle}
              </span>
            )}
            <p className="m-0 text-[0.80rem] opacity-85">{c.subtitle}</p>
            {c.location && (
              <span className="text-[0.85rem] opacity-85 text-right">
                {c.location}
              </span>
            )}
          </footer>
        </article>
      ))}

      {/* 背景彩色遮罩：默认 opacity 0，只有 hover 时出现 */}
      <div
        ref={baseOverlayRef}
        className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
        style={{
          opacity: 0,
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          // 更改渐变
          background:
            'radial-gradient(circle at var(--x) var(--y), rgba(59,130,246,0.25), rgba(15,23,42,0.85))',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.5) 70%, black 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 15%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.5) 70%, black 100%)',
        }}
      />


      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none z-40 transition-opacity duration-250"
        style={{
          opacity: 0,
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
          background: 'rgba(255,255,255,0.02)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, rgba(255,255,255,0.6) 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, rgba(255,255,255,0.6) 40%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default ChromaGrid;

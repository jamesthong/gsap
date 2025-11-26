'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

// import '@fontsource/nunito';

const images = [
  'https://assets.codepen.io/756881/amys-1.jpg',
  'https://assets.codepen.io/756881/amys-2.jpg',
  'https://assets.codepen.io/756881/amys-3.jpg',
  'https://assets.codepen.io/756881/amys-4.jpg',
  'https://assets.codepen.io/756881/amys-5.jpg',
  'https://assets.codepen.io/756881/amys-6.jpg',
  'https://assets.codepen.io/756881/amys-7.jpg',
];

const SpinnyFlipz = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wheel = wheelRef.current;
    const header = headerRef.current;
    const arrow = arrowRef.current;

    if (!wheel || !header || !arrow) return;

    const cards = gsap.utils.toArray('.wheel__card') as HTMLElement[];

    // Animate arrow
    gsap.to(arrow, { y: 5, ease: 'power1.inOut', repeat: -1, yoyo: true });

    const setup = () => {
      const radius = wheel.offsetWidth / 2;
      const center = wheel.offsetWidth / 2;
      const total = cards.length;
      const slice = (2 * Math.PI) / total;

      cards.forEach((item, i) => {
        const angle = i * slice;
        const x = center + radius * Math.sin(angle);
        const y = center - radius * Math.cos(angle);

        gsap.set(item, {
          rotation: angle + '_rad',
          xPercent: -50,
          yPercent: -50,
          x: x,
          y: y,
        });
      });
    };

    setup();

    const handleResize = () => setup();
    window.addEventListener('resize', handleResize);

    // ScrollTrigger for wheel rotation
    gsap.to(wheel, {
      rotate: () => -360,
      ease: 'none',
      duration: cards.length,
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 1,
        snap: 1 / cards.length,
        invalidateOnRefresh: true,
      },
    });

    let lastClickedCard: HTMLElement | null = null;

    const putBack = (e: Event) => {
      if (!lastClickedCard) return;
      const image = header.querySelector('img');
      if (!image) return;

      // Reset image size
      // image.style.width = '';
      // image.style.height = '';

      const state = Flip.getState(image);
      lastClickedCard.appendChild(image);

      gsap.set(image, {
        width: '100%',  // match original card layout
        height: 'auto',
        borderRadius: '0.5rem',
      });

      Flip.from(state, {
        duration: 0.6,
        ease: 'sine.out',
        absolute: true,
      });

      lastClickedCard = null;
    };

    const flip = (e: Event) => {
      const target = e.target as HTMLElement;
      const card = target.closest('.wheel__card') as HTMLElement;
      if (!card) return;

      // If clicking the same card, put it back
      if (lastClickedCard === card) {
        putBack(e);
        return;
      }

      // Put back the previous image if any
      if (lastClickedCard) {
        putBack(e);
      }

      const image = card.querySelector('img');
      if (!image) return;

      const state = Flip.getState(image);
      header.appendChild(image);
      
      gsap.set(image, {
        width: '200px',       // or any value, e.g. '50%', '10rem', etc.
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '1rem',
      });


      Flip.from(state, {
        duration: 1,
        ease: 'sine.out',
        absolute: true,
      });

      lastClickedCard = card;
    };

    cards.forEach((card) => {
      card.addEventListener('click', flip);
    });

    header.addEventListener('click', putBack);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-[#e34f37] text-white font-['Nunito'] mb-20">
      <div ref={headerRef} className="top-0 left-0 w-full  flex items-center justify-center cursor-pointer">
        {/* Header content can be added here if needed */}
      </div>

      <section className="slider-section fixed bottom-0 w-full h-[22vh]">
        <div ref={wheelRef} className="wheel absolute top-0 flex items-center justify-center w-[300vw] h-[300vw] max-w-[2000px] max-h-[2000px] left-1/2 transform -translate-x-1/2">
          {[...images, ...images, ...images, ...images].map((src, index) => (
            <div key={index} className="wheel__card absolute top-0 left-0 w-[6%] max-w-[200px] aspect-square cursor-pointer">
              <img src={src} alt={`Image ${index + 1}`} className="w-full pointer-events-none z-[999] cursor-pointer" />
            </div>
          ))}
        </div>
      </section>

      <div className="scroll-down fixed bottom-5 left-1/2 transform -translate-x-1/2 text-white font-normal uppercase text-sm overflow-visible">
        Scroll down
        <div ref={arrowRef} className="arrow relative top-0 mx-auto w-[15px] h-[15px] filter invert bg-no-repeat bg-contain" style={{ backgroundImage: `url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+)` }}></div>
      </div>
    </div>
  );
};

export default SpinnyFlipz;

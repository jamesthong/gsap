'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(ScrollTrigger, Flip, MorphSVGPlugin);

export default function BrowserPage() {
  const [items, setItems] = useState(Array.from({length: 7}, (_, i) => i));
  const footerRef = useRef<HTMLElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const countRef = useRef(0);

  useEffect(() => {
    const faceBits = [
      '.left-eye',
      '.left-pupil',
      '.left-upper-lid',
      '.left-lower-lid',
      '.right-eye',
      '.right-pupil',
      '.right-upper-lid',
      '.right-lower-lid',
      '.mouth',
      '.teeth'
    ];

    faceBits.forEach(bit => MorphSVGPlugin.convertToPath(bit));

    const scroll = gsap.timeline({
      scrollTrigger: {
        scrub: 0.5,
        trigger: "footer",
        start: "bottom bottom",
        end: "top 55%",
      },
      onComplete: () => addMore()
    });

    for(let i=1; i <=2; i++) {
      faceBits.forEach(bit => {
        scroll.to(`.face ${bit}`, {morphSVG: `#face-step-${i} ${bit}`, duration:1, ease:'none'}, i - 1);
      });
    }

    scroll.to('footer', {duration: 0.3}, 2);

    gsap.from(loadingRef.current, {
      scrollTrigger: {
        trigger: "footer",
        start: "top 55%",
        toggleActions: "play none none reset",
      },
      scale: 0,
      duration: 0.3,
      ease: "back.out"
    });

    gsap.from(handRef.current, {
      scrollTrigger: {
        trigger: "footer",
        start: "top 57%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          countRef.current++;
          if (handRef.current) {
            handRef.current.dataset.type = (countRef.current <= 1 || Math.random() < 0.8) ? 'wave' : 'cookie';
          }
        }
      },
      scale: 0.3,
      opacity: 0,
      duration: 0.4,
      y: 200,
      ease: "back.out"
    });

    let flipping = false;

    function addMore() {
      if(!flipping) {
        flipping = true;
        Flip.killFlipsOf('[data-flip]', true);
        setItems(prev => [...prev, ...Array.from({length: 4}, (_, i) => prev.length + i)]);
        setTimeout(() => {
          const state = Flip.getState('[data-flip]');
          prepForFlip();
          ScrollTrigger.refresh();
          Flip.from(state, {
            duration: 0.7,
            ease: "bounce.out",
            onComplete: () => {
              flipping = false;
              if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) addMore();
            },
            onEnter: elements => gsap.fromTo(elements, {xPercent: -120, opacity: 1}, {xPercent: 0, opacity: 1, delay: 0.1, duration: .5, stagger: 0.1, ease: "back.out"})
          });
        }, 0);
      }
    }

    function prepForFlip() {
      itemsRef.current?.querySelectorAll('[data-flip]')
        .forEach(item => {
          (item as HTMLElement).classList.remove('flipping');
          delete (item as HTMLElement).dataset.flip;
        });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --color-background: #F5CAC3;
          --color-background-fade: #F5CAC300;
          --color-browser: #84A59D;
          --color-browser-alt: #C4D4D0;
          --color-page: #F7EDE2;
          --color-element: #C6CDD2;
          --color-footer: #C794BB;
          --page-margin: 20px;
          --page-padding: 10px;
          --top-bar-height: 30px;
          --scroll-bar-width: 0px;
          --content-gap: 20px;
          --list-padding: 2rem;
          --browser-border-radius: 30px;
          --browser-top-bar-width: min(50%, 200px);
          --browser-top-bar-radius: 20px;
          --points-display: none;
          --footer-face-width: clamp(60px, 20vh, 194px);
          --footer-face-position: flex-start;
          --footer-hand-position: 60%;
          --shadow-color: 9deg 32% 60%;
          --shadow-elevation-high:
            0.3px 0.5px 0.6px hsl(var(--shadow-color) / 0.36),
            0.9px 1.9px 2.1px -0.5px hsl(var(--shadow-color) / 0.33),
            1.8px 3.5px 4px -0.9px hsl(var(--shadow-color) / 0.31),
            3.1px 6.1px 6.9px -1.4px hsl(var(--shadow-color) / 0.29),
            5.2px 10.5px 11.8px -1.9px hsl(var(--shadow-color) / 0.27),
            8.6px 17.2px 19.3px -2.4px hsl(var(--shadow-color) / 0.25),
            13.5px 26.9px 30.2px -2.8px hsl(var(--shadow-color) / 0.23),
            20.3px 40.5px 45.5px -3.3px hsl(var(--shadow-color) / 0.2);
        }

        @media (min-width: 550px) {
          :root {
            --list-padding: 5rem;
            --browser-border-radius: 10px;
            --browser-top-bar-width: 100%;
            --browser-top-bar-radius: 0px;
            --scroll-bar-width: 0px;
            --footer-face-position: center;
            --points-display: flex;
            --footer-hand-position: 70%;
          }
        }

        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: var(--color-background);
        }

        .browser {
          --right: calc(var(--scroll-bar-width) + var(--page-margin));
          --left: var(--page-margin);
          --width: min(90vmin, 1000px);
          --margin-top: 5vmin;
          width: calc(var(--width) - (var(--left) + var(--right)));
          padding: calc(var(--top-bar-height) + var(--page-margin)) var(--right) 40vh var(--left);
          position: relative;
          display: block;
          margin: var(--margin-top) auto 0 auto;
          border: solid 5px transparent;
        }

        .browser::before,
        .browser::after,
        .browser-elements {
          content: '';
          display: flex;
          position: fixed;
          width: var(--width);
          left: 50%;
          height: calc(50vh - 5vmin);
          transform: translatex(-50%);
          top: var(--margin-top);
          border-radius: var(--browser-border-radius);
          pointer-events: none;
          border: solid 5px transparent;
        }

        .browser::before {
          background-color: var(--color-browser-alt);
          z-index: 1;
        }

        .browser::after {
          box-shadow: var(--shadow-elevation-high);
          border-color: var(--color-browser);
          z-index: 4;
        }

        .browser-elements {
          z-index: 3;
        }

        .browser-elements::before {
          content: "";
          position: absolute;
          inset: 0;
          background-color: var(--color-background);
          transform: translatey(-100%);
        }

        .browser-elements::after {
          content: "";
          position: absolute;
          inset: 0;
          background-color: var(--color-background-fade);
          transform: translatey(100%);
        }

        .top-bar {
          width: var(--browser-top-bar-width);
          height: var(--top-bar-height);
          background-color: var(--color-browser);
          position: absolute;
          top: 0;
          left: 50%;
          transform: translatex(-50%);
          border-bottom-right-radius: var(--browser-top-bar-radius);
          border-bottom-left-radius: var(--browser-top-bar-radius);
          display: flex;
          align-items: center;
        }

        .points {
          display: var(--points-display);
          gap: 5px;
          margin: 0 5px 3px 5px;
          align-items: center;
        }

        .point {
          display: block;
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: var(--color-browser-alt);
        }

        .content-spacing {
          display: flex;
          flex-direction: column;
          gap: var(--content-gap);
        }

        .page {
          z-index: 2;
          border-radius: 8px;
          position: relative;
          overflow: hidden;
          padding: var(--page-padding);
        }

        .page > * {
          z-index: 2;
          border-radius: 8px;
        }

        .page-background {
          position: absolute;
          inset: 0;
          background-color: var(--color-page);
          z-index: 1;
        }

        header {
          background-color: var(--color-element);
          min-height: 100px;
          width: 100%;
        }

        .items {
          list-style: none;
          padding: 0 var(--list-padding);
          margin: 0;
        }

        .items li {
          background-color: var(--color-element);
          padding: 3vh;
          border-radius: 6px;
        }

        .items li.flipping {
          display: none;
        }

        footer {
          width: 100%;
          height: var(--footer-face-width);
          background-color: currentcolor;
          color: white;
          display: flex;
          align-items: center;
          justify-content: var(--footer-face-position);
          color: var(--color-footer);
          padding-bottom: 20px;
          position: relative;
        }

        .face {
          width: var(--footer-face-width);
          height: var(--footer-face-width);
        }

        .loading {
          width: 100%;
          height: 40px;
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .spinner {
          display: block;
          width: 40px;
          height: 40px;
          border: 6px solid var(--color-element);
          border-left-color: transparent;
          border-radius: 100vmax;
          animation: spin 0.7s linear infinite;
        }

        .hand {
          position: absolute;
          left: var(--footer-hand-position);
          top: 0%;
        }

        .hand-type {
          display: none;
        }

        .hand[data-type="cookie"] .hand-cookie { display: block; }
        .hand[data-type="wave"] .hand-wave { display: block; }

        .hand-wave {
          transform-origin: 20% 90%;
          animation-timing-function: ease-in-out;
          animation: wave 0.4s infinite;
        }

        @keyframes wave {
          0%, 100% { transform: rotate(-20deg) translatex(-20%) }
          50% { transform: rotate(15deg) translatex(0%) }
        }

        @keyframes spin {
          100% {transform: rotate(360deg)}
        }
      `}</style>
      <div className="browser">
        <div className="browser-elements">
          <div className="top-bar">
            <div className="points">
              <span className="point"></span>
              <span className="point"></span>
              <span className="point"></span>
            </div>
          </div>
          <div className="scroll-bar">
            <div className="bar"></div>
          </div>
        </div>
        <div className="page content-spacing">
          <div data-flip className="page-background"></div>
          <header></header>
          <ul ref={itemsRef} className="items content-spacing">
            {items.map((item, index) => (
              <li key={item} data-flip className={index >= items.length - 4 ? 'flipping' : ''}></li>
            ))}
          </ul>
          <div ref={loadingRef} className="loading"><span className="spinner"></span></div>
          <footer ref={footerRef} data-flip>
            <svg className="face" viewBox="0 0 194 194" width="194" height="194" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="teethMask" >
                  <path className="mouth" d="M98.5 154c-10 0-18.5 3.5-35 13.071C69 173 70.5 166 83 160.5s24-4 31.5 0S128 171 132 165c-14.5-8-23.5-11-33.5-11Z" fill="#884578"/>
                </clipPath>
              </defs>
              <ellipse className="left-eye" cx="59.5" cy="109" rx="26.5" ry="37" fill="#fff"/>
              <ellipse className="right-eye" cx="131.5" cy="109" rx="26.5" ry="37" fill="#fff"/>
              <circle className="left-pupil" cx="59.5" cy="123.5" r="13.5" fill="#884578"/>
              <circle className="right-pupil" cx="131.5" cy="123.5" r="13.5" fill="#884578"/>
              <ellipse className="left-lower-lid" cx="54.367" cy="152.453" rx="46.487" ry="19.5" transform="rotate(-20.356 54.367 152.453)" fill="#C794BB"/>
              <ellipse className="left-upper-lid" cx="50.367" cy="81.453" rx="46.487" ry="19.5" transform="rotate(-20.356 50.367 81.453)" fill="#C794BB"/>
              <ellipse className="right-lower-lid" cx="140.194" cy="151.537" rx="46.487" ry="19.5" transform="rotate(17.442 140.194 151.537)" fill="#C794BB"/>
              <ellipse className="right-upper-lid" cx="143.314" cy="83.511" rx="46.487" ry="19.5" transform="rotate(18.357 143.314 83.51)" fill="#C794BB"/>
              <path className="mouth" d="M98.5 154c-10 0-18.5 3.5-35 13.071C69 173 70.5 166 83 160.5s24-4 31.5 0S128 171 132 165c-14.5-8-23.5-11-33.5-11Z" fill="#884578"/>
              <path className="teeth" clipPath="url(#teethMask)" d="M62.5 136a6 6 0 0 1 6-6h57a6 6 0 0 1 6 6v9a6 6 0 0 1-6 6h-57a6 6 0 0 1-6-6v-9Z" fill="#fff"/>
            </svg>
            <div ref={handRef} className="hand" data-type="wave">
              <svg className="hand-type hand-wave" viewBox="0 0 126 115" width="126" height="115" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.882 56.862c-1.525 6.843-.838 20.375 3.335 30.087 4.172 9.712 14.813 19.839 22.393 24.083s19.868 3.753 28.056 0c8.187-3.753 19.207-13.67 25.999-24.083l29.5-35.644c3-4.26 8.5-11.26 3-15.76s-12 .5-15.5 4.5L86.482 62.37s-2.317 1.675-3.6 0c-1.281-1.675 0-3.298 0-3.298l29.783-42.027c2.5-4 2.999-9.757-1.001-12.5-3.999-2.744-9.5-1.5-12.753 3.802L72.3 49.94s-2.135 3.606-4.633 1.923c-2.5-1.683 0-4.517 0-4.517l17.64-31.864c3.859-7.134 1.359-11.936-2.641-13.936s-10 .5-13 5.5c0 0-18.5 33.5-22 40s-10.42 10.79-13.49 4.26c-3.072-6.53-1.927-14.867-8.53-20.81-9.737-8.761-19.786-6.727-24.98 2.55 5.764 5.152 12.122 15.264 10.216 23.817Z" fill="#9D608F"/></svg>
              <svg className="hand-type hand-cookie" viewBox="0 0 118 115" width="118" height="122" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="64.869" cy="52.5" r="52.5" fill="#E6B66C"/><ellipse cx="42.869" cy="28" rx="7.5" ry="8" fill="#87624A"/><ellipse cx="82.869" cy="33" rx="7.5" ry="8" fill="#87624A"/><ellipse cx="51.869" cy="80" rx="7.5" ry="8" fill="#87624A"/><ellipse cx="72.869" cy="56" rx="7.5" ry="8" fill="#87624A"/><ellipse cx="79.869" cy="86" rx="7.5" ry="8" fill="#87624A"/><path d="M2.869 100.5c9.2 25.2 31.5 22.5 44.5 18.5s21.5-8 25.5-14.5c-24.5 2.5-30-5.333-39-9-6-25.5 5.3-14 16.5-18s12-10 6.5-19.5c0 0-10 .5-29.5-6s-33.7 23.3-24.5 48.5Z" fill="#9D608F"/></svg>
            </div>
          </footer>
        </div>
      </div>
      <svg style={{display: 'none'}} width="0" height="0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="face-step-1">
            <ellipse className="left-eye" cx="59.5" cy="59.001" rx="26.5" ry="37" fill="#fff"/>
            <ellipse className="right-eye" cx="131.5" cy="59.001" rx="26.5" ry="37" fill="#fff"/>
            <circle className="left-pupil" cx="59.5" cy="43.501" r="13.5" fill="#884578"/>
            <circle className="right-pupil" cx="131.5" cy="43.501" r="13.5" fill="#884578"/>
            <ellipse className="left-lower-lid" cx="62.367" cy="95.453" rx="46.487" ry="19.5" transform="rotate(-20.356 62.367 95.453)" fill="#C794BB"/>
            <ellipse className="left-upper-lid" rx="42.306" ry="14.491" transform="matrix(.96216 -.27248 .43717 .89938 47.04 24.56)" fill="#C794BB"/>
            <ellipse className="right-lower-lid" cx="130.194" cy="94.537" rx="46.487" ry="19.5" transform="rotate(17.442 130.194 94.537)" fill="#C794BB"/>
            <ellipse className="right-upper-lid" rx="42.508" ry="14.387" transform="matrix(.9694 .24552 -.39868 .9171 145.057 26.028)" fill="#C794BB"/>
            <path className="mouth" d="M98 114c-14.5 0-37 3-49 14.5 6.5 5 16.5 13.5 28 6.5s26-6 41.5 0c8.406 3.254 18.5-3 23.5-10-18-11-29.5-11-44-11Z" fill="#884578"/>
            <path className="teeth" d="M57 117a6 6 0 0 1 6-6h66a6 6 0 0 1 6 6v1.463c0 4.65-5.322 7.992-9.781 6.671-6.5-1.926-16.24-3.848-29.219-3.848-12.98 0-22.719 1.922-29.219 3.848-4.46 1.321-9.781-2.021-9.781-6.671V117Z" fill="#fff"/>
          </g>
          <g id="face-step-2">
            <ellipse className="left-eye" cx="59.5" cy="70" rx="26.5" ry="37" fill="#fff"/>
            <ellipse className="right-eye" cx="131.5" cy="70" rx="26.5" ry="37" fill="#fff"/>
            <circle className="left-pupil" cx="60" cy="72" r="15" fill="#884578"/>
            <circle className="right-pupil" cx="132" cy="72" r="15" fill="#884578"/>
            <ellipse className="left-lower-lid" cx="54.367" cy="122.452" rx="46.487" ry="19.5" transform="rotate(22.398 54.367 122.452)" fill="#C794BB"/>
            <ellipse className="left-upper-lid" rx="44.124" ry="10.325" transform="matrix(.98775 -.15603 .65697 .75392 50.367 15.669)" fill="#C794BB"/>
            <ellipse className="right-lower-lid" cx="140.194" cy="121.537" rx="46.487" ry="19.5" transform="rotate(-15 140.194 121.537)" fill="#C794BB"/>
            <ellipse className="right-upper-lid" rx="44.559" ry="9.991" transform="matrix(.99017 .13989 -.6147 .78876 143.314 16.545)" fill="#C794BB"/>
            <path className="mouth" d="M94 130c-36 0-49.5-9-61-3-9.5 4.957 9.5 36.5 31.5 46 17.48 7.548 41.258 7.727 58 0 19.5-9 42-41.444 34-45-13.5-6-26.5 2-62.5 2Z" fill="#884578"/>
            <path className="teeth" d="M39 117a6 6 0 0 1 6-6h101a6 6 0 0 1 6 6v10.614c0 2.612-1.689 4.9-4.233 5.489C140.278 134.835 122.856 138 95.5 138s-44.778-3.165-52.267-4.897c-2.544-.589-4.233-2.877-4.233-5.489V117Z" fill="#fff"/>
          </g>
        </defs>
      </svg>
    </>
  );
}
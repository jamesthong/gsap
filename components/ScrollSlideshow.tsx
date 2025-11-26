'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';
// Converted to Tailwind CSS classes

gsap.registerPlugin(Observer);

const ScrollSlideshow = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const sections = gsap.utils.toArray(".slide", containerRef.current) as HTMLElement[];
    const images = gsap.utils.toArray(".image", containerRef.current).reverse() as HTMLElement[];
    const slideImages = gsap.utils.toArray(".slide__img", containerRef.current) as HTMLElement[];
    const outerWrappers = gsap.utils.toArray(".slide__outer", containerRef.current) as HTMLElement[];
    const innerWrappers = gsap.utils.toArray(".slide__inner", containerRef.current) as HTMLElement[];
    const count = containerRef.current.querySelector(".count") as HTMLElement;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;
    let currentIndex = 0;

    gsap.set(outerWrappers, { xPercent: 100 });
    gsap.set(innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

    function gotoSection(index: number, direction: number) {
      animating = true;
      index = wrap(index);

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "expo.inOut" },
        onComplete: () => {
          animating = false;
        }
      });

      const currentSection = sections[currentIndex];
      const heading = currentSection.querySelector(".slide__heading") as HTMLElement;
      const nextSection = sections[index];
      const nextHeading = nextSection.querySelector(".slide__heading") as HTMLElement;

      gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
      gsap.set([sections[currentIndex], images[index]], { zIndex: 1, autoAlpha: 1 });
      gsap.set([sections[index], images[currentIndex]], { zIndex: 2, autoAlpha: 1 });

      tl
        .set(count, { text: (index + 1).toString() }, 0.32)
        .fromTo(
          outerWrappers[index],
          {
            xPercent: 100 * direction
          },
          { xPercent: 0 },
          0
        )
        .fromTo(
          innerWrappers[index],
          {
            xPercent: -100 * direction
          },
          { xPercent: 0 },
          0
        )
        .to(
          heading,
          {
            "--width": 800,
            xPercent: 30 * direction
          },
          0
        )
        .fromTo(
          nextHeading,
          {
            "--width": 800,
            xPercent: -30 * direction
          },
          {
            "--width": 200,
            xPercent: 0
          },
          0
        )
        .fromTo(
          images[index],
          {
            xPercent: 125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
          0
        )
        .fromTo(
          images[currentIndex],
          { xPercent: 0, scaleX: 1, scaleY: 1 },
          {
            xPercent: -125 * direction,
            scaleX: 1.5,
            scaleY: 1.3
          },
          0
        )
        .fromTo(
          slideImages[index],
          {
            scale: 2
          },
          { scale: 1 },
          0
        )
        .timeScale(0.8);

      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => {
        console.log("down");
        if (animating) return;
        gotoSection(currentIndex + 1, +1);
      },
      onDown: () => {
        console.log("up");
        if (animating) return;
        gotoSection(currentIndex - 1, -1);
      },
      tolerance: 10
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.code);
      if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
        gotoSection(currentIndex - 1, -1);
      }
      if (
        (e.code === "ArrowDown" ||
          e.code === "ArrowRight" ||
          e.code === "Space" ||
          e.code === "Enter") &&
        !animating
      ) {
        gotoSection(currentIndex + 1, 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      Observer.getAll().forEach(obs => obs.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden h-screen bg-[#4361ee] text-white font-['Sora',sans-serif] select-none">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora&display=swap");
        @font-face {
          font-family: "Bandeins Sans & Strange Variable";
          src: url("https://res.cloudinary.com/dldmpwpcp/raw/upload/v1566406079/BandeinsStrangeVariable_esetvq.ttf");
        }
        ::-webkit-scrollbar { display: none; }
        figure { margin: 0; overflow: hidden; }
        html, body { overflow: hidden; margin: 0; padding: 0; height: 100vh; height: -webkit-fill-available; }
      `}</style>

      <section className="slide absolute inset-0 invisible">
        <div className="slide__outer w-full h-full overflow-y-hidden">
          <div className="slide__inner w-full h-full overflow-y-hidden">
            <div className="slide__content absolute inset-0 flex items-center justify-center">
              <div className="slide__container relative max-w-[1400px] w-full mx-auto h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0 px-4">
                <h2 className="slide__heading text-left font-['Bandeins Sans & Strange Variable'] text-[clamp(5rem,15vw,15rem)] font-black text-[#f2f1fc] z-50 mix-blend-difference col-start-2 col-end-10 row-start-2 row-end-3 self-end" style={{'--width': '200'} as React.CSSProperties}>SCROLL</h2>
                <figure className="slide__img-cont mt-16 col-start-1 col-end-8 row-start-2 row-end-7">
                  <img className="slide__img w-full h-full object-cover" src='https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400' alt='' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide absolute inset-0">
        <div className="slide__outer w-full h-full overflow-y-hidden">
          <div className="slide__inner w-full h-full overflow-y-hidden">
            <div className="slide__content absolute inset-0 flex items-center justify-center bg-[#6d597a]">
              <div className="slide__container relative max-w-[1400px] w-full mx-auto h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0 px-4">
                <h2 className="slide__heading text-left font-['Bandeins Sans & Strange Variable'] text-[clamp(5rem,15vw,15rem)] font-black text-[#f2f1fc] z-50 mix-blend-difference col-start-2 col-end-10 row-start-2 row-end-3 self-end" style={{'--width': '200'} as React.CSSProperties}>SWIPE</h2>
                <figure className="slide__img-cont mt-16 col-start-1 col-end-8 row-start-2 row-end-7">
                  <img className="slide__img w-full h-full object-cover" src='https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400' alt='' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide absolute inset-0">
        <div className="slide__outer w-full h-full overflow-y-hidden">
          <div className="slide__inner w-full h-full overflow-y-hidden">
            <div className="slide__content absolute inset-0 flex items-center justify-center bg-[#355070]">
              <div className="slide__container relative max-w-[1400px] w-full mx-auto h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0 px-4">
                <h2 className="slide__heading text-left font-['Bandeins Sans & Strange Variable'] text-[clamp(5rem,15vw,15rem)] font-black text-[#f2f1fc] z-50 mix-blend-difference col-start-2 col-end-10 row-start-2 row-end-3 self-end" style={{'--width': '200'} as React.CSSProperties}>SCROLL</h2>
                <figure className="slide__img-cont mt-16 col-start-1 col-end-8 row-start-2 row-end-7">
                  <img className="slide__img w-full h-full object-cover" src='https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400' alt='' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide absolute inset-0">
        <div className="slide__outer w-full h-full overflow-y-hidden">
          <div className="slide__inner w-full h-full overflow-y-hidden">
            <div className="slide__content absolute inset-0 flex items-center justify-center bg-[#b56576]">
              <div className="slide__container relative max-w-[1400px] w-full mx-auto h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0 px-4">
                <h2 className="slide__heading text-left font-['Bandeins Sans & Strange Variable'] text-[clamp(5rem,15vw,15rem)] font-black text-[#f2f1fc] z-50 mix-blend-difference col-start-2 col-end-10 row-start-2 row-end-3 self-end" style={{'--width': '200'} as React.CSSProperties}>SWIPE</h2>
                <figure className="slide__img-cont mt-16 col-start-1 col-end-8 row-start-2 row-end-7">
                  <img className="slide__img w-full h-full object-cover" src='https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400' alt='' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide absolute inset-0">
        <div className="slide__outer w-full h-full overflow-y-hidden">
          <div className="slide__inner w-full h-full overflow-y-hidden">
            <div className="slide__content absolute inset-0 flex items-center justify-center bg-[#9a8c98]">
              <div className="slide__container relative max-w-[1400px] w-full mx-auto h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0 px-4">
                <h2 className="slide__heading text-left font-['Bandeins Sans & Strange Variable'] text-[clamp(5rem,15vw,15rem)] font-black text-[#f2f1fc] z-50 mix-blend-difference col-start-2 col-end-10 row-start-2 row-end-3 self-end" style={{'--width': '200'} as React.CSSProperties}>SCROLL</h2>
                <figure className="slide__img-cont mt-16 col-start-1 col-end-8 row-start-2 row-end-7">
                  <img className="slide__img w-full h-full object-cover" src='https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400' alt='' />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overlay absolute inset-0 z-10">
        <div className="overlay__content max-w-[1400px] w-full mx-auto px-4 h-[90vh] mb-[10vh] grid grid-cols-10 grid-rows-10 gap-0">
          <p className="overlay__count col-start-10 col-end-10 row-start-3 row-end-4 text-right text-[clamp(3rem,4vw,15rem)] border-b-8 border-white">0<span className="count">1</span></p>
          <figure className="overlay__img-cont relative overflow-hidden col-start-3 col-end-11 row-start-4 row-end-9">
            <img className="image absolute inset-0 w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800" />
            <img className="image absolute inset-0 w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800" />
            <img className="image absolute inset-0 w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800" />
            <img className="image absolute inset-0 w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800" />
          </figure>
        </div>
      </section>


    </div>
  );
};

export default ScrollSlideshow;
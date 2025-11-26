'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function ImageGridPage() {
  const contentRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      content: contentRef.current!,
      smooth: 3,
      effects: true
    });

    smoother.effects("img", { speed: "auto" });
  });

  return (
    <div className="bg-gray-900 overscroll-none m-0 p-0 overflow-x-hidden">
      <section ref={contentRef} id="content">
        <section className="grid grid-cols-12 gap-x-4 gap-y-[33.3vh] w-screen mx-auto max-w-[2500px]">
          <picture className="relative overflow-hidden h-[95vh] col-span-full row-start-1">
            <source srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1500" media="(min-width: 1500px)" />
            <source srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1000" media="(min-width: 700px)" />
            <img className="absolute bottom-0 w-full h-[160%] object-cover" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600" alt="" />
          </picture>
          <div className="relative overflow-hidden h-[60vh] col-start-2 col-span-8 md:col-span-4 row-start-2">
            <img className="absolute bottom-0 w-full h-[160%] object-cover" src="https://images.unsplash.com/photo-1569596082827-c5e8990496cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500" alt="" />
          </div>
          <div className="relative overflow-hidden h-[60vh] col-start-4 col-span-8 md:col-start-8 md:col-span-4 row-start-3">
            <img className="absolute bottom-0 w-full h-[160%] object-cover object-right" src="https://images.unsplash.com/photo-1587932775991-708a20af2cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDQ5Mg&ixlib=rb-1.2.1&q=80&w=500" alt="" />
          </div>
          <div className="relative overflow-hidden h-[60vh] col-span-full row-start-4">
            <img className="absolute bottom-0 w-full h-[160%] object-cover" src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1200" alt="" />
          </div>
          <div className="relative overflow-hidden h-[80vh] col-start-4 col-span-8 md:col-start-8 md:col-span-4 row-start-5">
            <img className="absolute bottom-0 w-full h-[160%] object-cover" src="https://images.unsplash.com/photo-1623166200209-6bd48520d6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500" alt="" />
          </div>
          <div className="relative overflow-hidden h-[80vh] col-start-2 col-span-8 md:col-span-4 row-start-6">
            <img className="absolute bottom-0 w-full h-[160%] object-cover" src="https://images.unsplash.com/photo-1532587459811-f057563d1936?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500" alt="" />
          </div>
        </section>
        <div className="spacer h-screen"></div>
      </section>
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ScrollTriggerOwls() {
  useEffect(() => {
    // Great Horned Owl Sequence
    gsap.set('.circle', { yPercent: -5 });
    gsap.set('.dotsBlue', { yPercent: 10 });
    gsap.set('.owlHorned', { yPercent: -20 });
    gsap.set('.clusterGreat', { yPercent: 5 });

    gsap.to('.circle', {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterGreat',
        scrub: 1
      }
    });

    gsap.to('.dotsBlue', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterGreat',
        scrub: 1
      }
    });

    gsap.to('.owlHorned', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterGreat',
        scrub: 1
      }
    });

    gsap.to('.caption', {
      yPercent: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterGreat',
        end: 'bottom center',
        scrub: 1
      }
    });

    gsap.to('.clusterGreat', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterGreat',
        end: 'bottom center',
        scrub: 1
      }
    });

    // Burrowing Owl Sequence
    gsap.set('.triangle', { yPercent: 25, rotation: -90 });
    gsap.set('.dotsWhite', { yPercent: 10 });
    gsap.set('.owlBurrowing', { yPercent: -20 });
    gsap.set('.clusterBurrowing', { yPercent: 5 });

    gsap.to('.triangle', {
      yPercent: -5,
      rotation: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterBurrowing',
        scrub: 1
      }
    });

    gsap.to('.dotsWhite', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterBurrowing',
        scrub: 1
      }
    });

    gsap.to('.owlBurrowing', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterBurrowing',
        scrub: 1
      }
    });

    gsap.to('.captionBurrowing', {
      yPercent: 200,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterBurrowing',
        end: 'bottom center',
        scrub: 1
      }
    });

    gsap.to('.clusterBurrowing', {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: '.clusterBurrowing',
        end: 'bottom center',
        scrub: 1
      }
    });

    // Split the text, Great Horned Owl
    const tlSplitGreat = gsap.timeline({
      onComplete: () => {
        if (SplitGreat) SplitGreat.revert();
      }
    });
    const SplitGreat = new SplitText('.titleGreathorned', { type: 'words,chars' });
    const charsGreat = SplitGreat.chars;
    

    tlSplitGreat.from(charsGreat, {
      duration: 0.8,
      opacity: 0,
      x: -20,
      ease: 'circ.out',
      stagger: 0.02
    }, '+=0');

    // Split the text, Burrowing Owl
    const tlSplitBurrowing = gsap.timeline();
    const SplitBurrowing = new SplitText('.titleBurrowing', { type: 'words,chars' });
    const charsBurrowing = SplitBurrowing.chars;

    tlSplitBurrowing.from(charsBurrowing, {
      duration: 0.8,
      opacity: 0,
      y: 10,
      ease: 'circ.out',
      stagger: 0.02,
      scrollTrigger: {
        trigger: '.titleBurrowing',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }, '+=0');

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1075] p-10">
      <section>
        <div className="title titleGreathorned text-[#fc659e] text-[70px] leading-[98px] font-['Libre_Baskerville'] pt-[60px] pb-[40px] w-[90%] mx-auto overflow-hidden box-border">
          <span className="text-white overflow-hidden">The great horned owl  also known as the tiger owl or the hoot owl, is a large owl native </span> to the Americas.
        </div>
      </section>

      <section className="cluster clusterGreat relative w-full max-w-[874px] h-[792px] mx-auto my-[100px] pb-[100px]">
        <div className="circle clusterPieces absolute w-full max-w-[360px] h-[360px] rounded-full bg-[#fc659e] left-[214px] bottom-0 z-10"></div>

        <div className="owlHorned clusterPieces absolute w-full max-w-[450px] top-0 right-0 z-20">
          <img src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/great_horned_owl.jpg" alt="Great Horned Owl" />
          <div className="caption absolute bottom-[38px] right-0 font-['Open_Sans'] text-[14px] leading-[16px] text-[#fc659e] text-right">
            <span className="text-white">/01</span> GREAT HORNED OWL
          </div>
        </div>

        <img className="dotsBlue clusterPieces absolute w-full max-w-[494px] z-30 left-0 top-[80px]" src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/dots_blue_494x434.svg" alt="Blue dots" />
      </section>

      <section>
        <div className="title titleBurrowing text-[#fc659e] text-[70px] leading-[98px] font-['Libre_Baskerville'] pt-[60px] pb-[40px] w-[90%] mx-auto overflow-hidden box-border">
          <span className="text-white overflow-hidden">The burrowing owl</span> is a small, long-legged owl found throughout open landscapes of North and South America.
        </div>
      </section>

      <section className="cluster clusterBurrowing relative w-full max-w-[874px] h-[996px] mx-auto my-[100px]">
        <img className="triangle clusterPieces absolute w-full max-w-[448px] left-[-28px] top-0 z-30" src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/triangle_448x446.svg" alt="Triangle" />

        <div className="owlBurrowing clusterPieces absolute w-full max-w-[674px] top-[162px] right-0 z-10">
          <img src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/burrrowing_owl_674x700.jpg" alt="Burrowing Owl" />
          <div className="captionBurrowing absolute top-[605px] right-0 font-['Open_Sans'] text-[14px] leading-[16px] text-[#fc659e] text-right">
            <span className="text-white">/02</span> BURROWING OWL
          </div>
        </div>

        <img className="dotsWhite clusterPieces absolute w-full max-w-[310px] left-0 top-[400px] z-20" src="https://www.micelistudios.com/sandbox/scrolltrigger/imgs/dots_white_310x588.svg" alt="White dots" />
      </section>

      <section className="pb-[300px]"></section>
    </div>
  );
}
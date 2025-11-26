'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FirePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollMsgRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const scrollMsgEl = scrollMsgRef.current;
    const pageEl = pageRef.current;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);

    const params = {
      fireTime: .35,
      fireTimeAddition: 0
    };

    let gl: WebGLRenderingContext | null = null;
    let uniforms: any = {};

    const initShader = () => {
      const vsSource = `
        precision mediump float;

        varying vec2 vUv;
        attribute vec2 a_position;

        void main() {
            vUv = a_position;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;

        varying vec2 vUv;
        uniform vec2 u_resolution;
        uniform float u_progress;
        uniform float u_time;

        float rand(vec2 n) {
            return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        float noise(vec2 n) {
            const vec2 d = vec2(0., 1.);
            vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
            return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
        }
        float fbm(vec2 n) {
            float total = 0.0, amplitude = .4;
            for (int i = 0; i < 4; i++) {
                total += noise(n) * amplitude;
                n += n;
                amplitude *= 0.6;
            }
            return total;
        }

        void main() {
            vec2 uv = vUv;
            uv.x *= min(1., u_resolution.x / u_resolution.y);
            uv.y *= min(1., u_resolution.y / u_resolution.x);

            float t = u_progress;
            vec3 color = vec3(1., 1., .95);

            float main_noise = 1. - fbm(.75 * uv + 10. - vec2(.3, .9 * t));

            float paper_darkness = smoothstep(main_noise - .1, main_noise, t);
            color -= vec3(.99, .95, .99) * paper_darkness;

            vec3 fire_color = fbm(6. * uv - vec2(0., .005 * u_time)) * vec3(6., 1.4, .0);
            float show_fire = smoothstep(.4, .9, fbm(10. * uv + 2. - vec2(0., .005 * u_time)));
            show_fire += smoothstep(.7, .8, fbm(.5 * uv + 5. - vec2(0., .001 * u_time)));

            float fire_border = .02 * show_fire;
            float fire_edge = smoothstep(main_noise - fire_border, main_noise - .5 * fire_border, t);
            fire_edge *= (1. - smoothstep(main_noise - .5 * fire_border, main_noise, t));
            color += fire_color * fire_edge;

            float opacity = 1. - smoothstep(main_noise - .0005, main_noise, t);

            gl_FragColor = vec4(color, opacity);
        }
      `;

      gl = canvasEl!.getContext("webgl") || (canvasEl!.getContext("experimental-webgl") as WebGLRenderingContext);

      if (!gl) {
        alert("WebGL is not supported by your browser.");
        return;
      }

      const createShader = (sourceCode: string, type: number) => {
        const shader = gl!.createShader(type);
        gl!.shaderSource(shader!, sourceCode);
        gl!.compileShader(shader!);

        if (!gl!.getShaderParameter(shader!, gl!.COMPILE_STATUS)) {
          console.error("An error occurred compiling the shaders: " + gl!.getShaderInfoLog(shader!));
          gl!.deleteShader(shader!);
          return null;
        }

        return shader;
      };

      const vertexShader = createShader(vsSource, gl!.VERTEX_SHADER);
      const fragmentShader = createShader(fsSource, gl!.FRAGMENT_SHADER);

      const createShaderProgram = () => {
        const program = gl!.createProgram();
        gl!.attachShader(program!, vertexShader!);
        gl!.attachShader(program!, fragmentShader!);
        gl!.linkProgram(program!);

        if (!gl!.getProgramParameter(program!, gl!.LINK_STATUS)) {
          console.error("Unable to initialize the shader program: " + gl!.getProgramInfoLog(program!));
          return null;
        }

        return program;
      };

      const shaderProgram = createShaderProgram();

      const getUniforms = (program: WebGLProgram) => {
        let uniforms: any = {};
        let uniformCount = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          let uniformName = gl!.getActiveUniform(program, i)!.name;
          uniforms[uniformName] = gl!.getUniformLocation(program, uniformName);
        }
        return uniforms;
      };

      uniforms = getUniforms(shaderProgram!);

      const vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1.]);

      const vertexBuffer = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, vertexBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, vertices, gl!.STATIC_DRAW);

      gl!.useProgram(shaderProgram!);

      const positionLocation = gl!.getAttribLocation(shaderProgram!, "a_position");
      gl!.enableVertexAttribArray(positionLocation);

      gl!.bindBuffer(gl!.ARRAY_BUFFER, vertexBuffer);
      gl!.vertexAttribPointer(positionLocation, 2, gl!.FLOAT, false, 0, 0);
    };

    initShader();

    const st = gsap.timeline({
      scrollTrigger: {
        trigger: ".page",
        start: "0% 0%",
        end: "100% 100%",
        scrub: true,
      },
    })
      .to(scrollMsgEl, {
        duration: .1,
        opacity: 0
      }, 0)
      .to(params, {
        fireTime: .63
      }, 0);

    const resizeCanvas = () => {
      canvasEl!.width = window.innerWidth * devicePixelRatio;
      canvasEl!.height = window.innerHeight * devicePixelRatio;
      gl!.viewport(0, 0, canvasEl!.width, canvasEl!.height);
      gl!.uniform2f(uniforms.u_resolution, canvasEl!.width, canvasEl!.height);
      render();
    };

    const render = () => {
      const currentTime = performance.now();
      gl!.uniform1f(uniforms.u_time, currentTime);
      gl!.uniform1f(uniforms.u_progress, params.fireTime + params.fireTimeAddition);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    gsap.set(pageEl, {
      opacity: 1
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="m-0 p-0 font-sans text-2xl text-gray-700">
      <canvas ref={canvasRef} id="fire-overlay" className="fixed top-0 left-0 w-full h-full pointer-events-none"></canvas>
      <div ref={scrollMsgRef} className="scroll-msg fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none pt-8">
        <div className="-mt-10 pb-4 uppercase text-2xl">Hello 👋</div>
        <div>scroll me</div>
        <div className="arrow-animated text-xl animate-bounce">&darr;</div>
      </div>
      <div ref={pageRef} className="page w-full min-h-[180vh] flex flex-col items-center opacity-0">
        <div className="header flex items-center justify-center text-4xl uppercase w-screen mt-20 h-25vh">
          How it's done
        </div>
        <div className="content max-w-2xl p-2.5">
          <p>
            The HTML content you're reading right now is overlaid with a full-screen <b>{'<canvas>'}</b> element.
            There is a fragment shader that defines opacity and color for each pixel of the <b>{'<canvas>'}</b>.
            Shader input values are <b>scroll progress (aka animation progress)</b>, <b>time</b>, and <b>resolution</b>.
          </p>
          <p>
            While <b>time</b> and <b>window size (resolution)</b> are super easy to gather, for <b>animation progress</b> I use <a href="https://gsap.com/docs/v3/Plugins/ScrollTrigger/" target="_blank">GSAP ScrollTrigger</a> plugin.
          </p>
          <p>
            Once the inputs are prepared, we pass them as uniforms to the shader.
            The WebGL part of this demo is a basic JS boilerplate to render a fragment shader on the single full-screen plane. No extra libraries here.
          </p>
          <p>
            The fragment shader is based on <a href="https://thebookofshaders.com/13/" target="_blank">Fractal Brownian Motion (fBm)</a> noise.
          </p>
          <p>
            First, we create a semi-transparent mask to define a contour of burning paper. It is basically a low-scale fBm noise with <b>scroll progress</b> value used as a threshold.
            Taking the same fBm noise with different thresholds we can
            <br />
            (a) darken parts of the paper so each pixel gets darker before turning transparent
            <br />
            (b) define the stripe along the paper edge and use it as a mask for flames
          </p>
          <p>
            The fire is done as another two fBm based functions - one for shape and one for color. Both have a much higher scale and both are animated with <b>time</b> value instead of <b>scroll progress</b>.
          </p>
          <p className="last-line text-right pt-4">
            <a href="https://www.linkedin.com/in/ksenia-kondrashova/" target="_blank">linkedIn</a> | <a href="https://codepen.io/ksenia-k" target="_blank">codepen</a> | <a href="https://twitter.com/uuuuuulala" target="_top">twitter (X)</a>
          </p>
        </div>
      </div>
    </div>
  );
}
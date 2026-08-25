"use client";

import Image from 'next/image';
import { type PointerEvent, useEffect, useRef, useState } from 'react';
import {
  AirVent,
  ArrowLeft,
  ArrowRight,
  ClipboardPenLine,
  Cog,
  Package,
  Settings,
  Store,
  Wrench,
} from 'lucide-react';

const projects = [
  {
    id: 1,
    category: 'Aircon Sales',
    title: 'Aircon Sales Project',
    description:
      'Supply and delivery of quality air-conditioning units for residential and commercial cooling needs.',
    service: 'Aircon Unit Supply',
    icon: AirVent,
    image: '/project-aircon-sales-boxes.png',
    alt: 'Parallel Aire Carrier air conditioning units ready for aircon sales',
  },
  {
    id: 2,
    category: 'Parts Sales',
    title: 'Parts Sales Project',
    description:
      'Supply of quality air-conditioning parts and components for different cooling requirements.',
    service: 'Aircon Parts Supply',
    icon: Package,
    image: '/service-parts.jpg',
    alt: 'Parallel Aire parts sales project with product display and catalog materials',
  },
  {
    id: 3,
    category: 'Installation Services',
    title: 'Installation Project',
    description:
      'Professional air-conditioning installation for residential, commercial, and applicable spaces.',
    service: 'Aircon Installation',
    icon: Wrench,
    image: '/project-installation-cassette.png',
    alt: 'Parallel Aire cassette air conditioning installation project',
  },
  {
    id: 4,
    category: 'Maintenance Services',
    title: 'Maintenance Project',
    description:
      'Professional cleaning and maintenance services designed to help air-conditioning systems perform efficiently.',
    service: 'Aircon Maintenance',
    icon: Settings,
    image: '/project-maintenance-wall-unit.png',
    alt: 'Parallel Aire wall-mounted air conditioning maintenance project',
  },
  {
    id: 5,
    category: 'Trade Booth / Commercial',
    title: 'Trade Booth Setup',
    description:
      'A representative commercial display showcasing air-conditioning products and solutions.',
    service: 'Product Display / Commercial Setup',
    icon: Store,
    image: '/project-trade-booth-customer.png',
    alt: 'Parallel Aire trade booth and commercial product display',
  },
];

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const dragStartRef = useRef<number | null>(null);
  const dragEndRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion || isHovered || isHidden) return undefined;
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % projects.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isHovered, isHidden, reduceMotion]);

  useEffect(() => {
    const onVisibility = () => {
      setIsHidden(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const goTo = (index: number) => setCurrent((index + projects.length) % projects.length);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = event.clientX;
    dragEndRef.current = event.clientX;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    dragEndRef.current = event.clientX;
  };

  const handlePointerUp = () => {
    if (dragStartRef.current == null || dragEndRef.current == null) return;
    const delta = dragEndRef.current - dragStartRef.current;
    if (Math.abs(delta) > 45) {
      if (delta < 0) next();
      else prev();
    }
    dragStartRef.current = null;
    dragEndRef.current = null;
  };

  return (
    <section id="projects" className="mx-auto max-w-[1450px] px-4 py-24 sm:px-6">
      <div className="text-center">
        <p className="text-[16px] font-bold uppercase tracking-[1px] text-[#F58220] sm:text-[17px]">
          OUR WORK
        </p>
        <h2 className="mt-3 text-[48px] font-bold leading-[1.1] tracking-tight text-[#08275B] sm:text-[54px]">
          Projects
        </h2>
        <div className="mx-auto mt-4 h-[3px] w-[62px] rounded-full bg-[#F58220]" />
        <p className="mx-auto mt-5 max-w-3xl text-[17px] leading-8 text-[#64748B] sm:text-[18px]">
          See some of our completed work across our products and services.
        </p>
      </div>

      <div
        className="relative mx-auto mt-12 max-w-[1420px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <button
          type="button"
          aria-label="Previous project"
          onClick={prev}
          className="absolute left-[-18px] top-1/2 z-20 hidden h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E3EAF4] bg-white text-[#1557C8] shadow-[0_10px_26px_rgba(15,35,89,0.12)] transition hover:scale-105 hover:bg-[#F5F8FC] hover:shadow-[0_14px_34px_rgba(15,35,89,0.16)] lg:flex"
        >
          <ArrowLeft className="h-6 w-6" strokeWidth={2} absoluteStrokeWidth />
        </button>

        <button
          type="button"
          aria-label="Next project"
          onClick={next}
          className="absolute right-[-18px] top-1/2 z-20 hidden h-[58px] w-[58px] -translate-y-1/2 items-center justify-center rounded-full border border-[#E3EAF4] bg-white text-[#1557C8] shadow-[0_10px_26px_rgba(15,35,89,0.12)] transition hover:scale-105 hover:bg-[#F5F8FC] hover:shadow-[0_14px_34px_rgba(15,35,89,0.16)] lg:flex"
        >
          <ArrowRight className="h-6 w-6" strokeWidth={2} absoluteStrokeWidth />
        </button>

        <div className="overflow-hidden rounded-[22px] border border-[#E3EAF4] bg-white shadow-[0_16px_40px_rgba(15,35,89,0.08)]">
          <div
            className={`flex ${reduceMotion ? '' : 'transition-transform duration-500 ease-out'}`}
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {projects.map((project, index) => {
              const BadgeIcon = project.icon;
              const slideLogo = '/logo-pa.png';

              return (
                <article key={project.id} className="w-full flex-none">
                  <div className="grid min-h-[780px] lg:grid-cols-[1.55fr_1fr]">
                    <div className="relative min-h-[320px] overflow-hidden bg-slate-200 lg:min-h-[780px]">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center"
                      />

                      <div className="absolute left-6 top-6 sm:left-7 sm:top-7">
                        <div className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#0A3D91_0%,#1557C8_100%)] px-5 py-3 text-[15px] font-bold uppercase tracking-[0.02em] text-white shadow-[0_10px_22px_rgba(10,61,145,0.22)]">
                          <BadgeIcon className="h-5 w-5" strokeWidth={2} absoluteStrokeWidth />
                          <span>{project.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                      <div className="flex items-start justify-between gap-5">
                        <p className="text-[17px] font-bold text-[#1557C8]">
                          <span className="text-[#1557C8]">{String(current + 1).padStart(2, '0')}</span>
                          <span className="text-[#64748B]"> / {String(projects.length).padStart(2, '0')}</span>
                        </p>
                        <Image
                          src={slideLogo}
                          alt="Parallel Aire logo"
                          width={130}
                          height={50}
                          className="h-auto w-[112px] max-w-[130px] object-contain sm:w-[120px]"
                        />
                      </div>

                      <h3 className="mt-7 max-w-md text-[30px] font-bold leading-[1.15] tracking-tight text-[#08275B] sm:text-[36px] lg:text-[40px]">
                        {project.title}
                      </h3>
                      <div className="mt-5 h-[3px] w-[58px] rounded-full bg-[#F58220]" />

                      <p className="mt-7 max-w-xl text-[16px] leading-8 text-[#42516F] sm:text-[17px]">
                        {project.description}
                      </p>

                      <div className="mt-8 rounded-[16px] bg-[#F5F8FC] px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#EAF3FF]">
                            <Cog className="h-6 w-6 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                          </div>
                          <div>
                            <p className="text-[15px] font-semibold text-[#1557C8]">Service Provided</p>
                            <p className="mt-1 text-[17px] font-semibold text-[#08275B]">
                              {project.service}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <a
                          href="#contact-us"
                          className="group inline-flex h-[56px] w-full max-w-[236px] items-center justify-center gap-3 rounded-[10px] bg-[linear-gradient(135deg,#1557C8_0%,#0F4CA8_100%)] px-6 text-[15px] font-bold text-white shadow-[0_12px_24px_rgba(21,87,200,0.24)] transition hover:translate-y-[-1px] hover:bg-[#0F4CA8]"
                        >
                          VIEW PROJECT
                          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} absoluteStrokeWidth />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`View project ${index + 1}`}
              onClick={() => goTo(index)}
              className={`h-3 w-3 rounded-full transition ${index === current ? 'bg-[#1557C8]' : 'bg-[#CBD5E1] hover:bg-[#8FB1E8]'}`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
          <button
            type="button"
            aria-label="Previous project"
            onClick={prev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E3EAF4] bg-white text-[#1557C8] shadow-[0_8px_20px_rgba(15,35,89,0.10)]"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={2} absoluteStrokeWidth />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={next}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E3EAF4] bg-white text-[#1557C8] shadow-[0_8px_20px_rgba(15,35,89,0.10)]"
          >
            <ArrowRight className="h-5 w-5" strokeWidth={2} absoluteStrokeWidth />
          </button>
        </div>

        <div className="mt-8 rounded-[20px] border border-[#E3EAF4] bg-[#F5F8FC] px-6 py-6 shadow-[0_10px_24px_rgba(15,35,89,0.06)] sm:px-7 sm:py-7">
          <div className="flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(15,35,89,0.08)]">
                <ClipboardPenLine className="h-7 w-7 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-[#08275B] sm:text-[24px]">
                  Have a Project in Mind?
                </h3>
                <p className="mt-2 text-[16px] leading-7 text-[#64748B]">
                  Let&apos;s work together to bring your ideas to life.
                </p>
              </div>
            </div>

            <a
              href="#contact-us"
              className="inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-[12px] border border-[#1557C8] bg-white px-6 text-[15px] font-bold text-[#1557C8] transition hover:bg-[#1557C8] hover:text-white lg:max-w-[216px]"
            >
              GET IN TOUCH
              <ArrowRight className="h-5 w-5" strokeWidth={2} absoluteStrokeWidth />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

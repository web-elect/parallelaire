"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Leaf,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Snowflake,
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Carrier Optima Inverter',
    category: 'Split Type',
    description:
      'Energy-efficient split-type aircon unit for everyday cooling comfort.',
    image: '',
    alt: 'Carrier Optima Inverter air conditioning unit',
    imageUnavailable: true,
    features: [
      { label: 'Energy Efficient', icon: Leaf },
      { label: 'Fast Cooling', icon: Snowflake },
      { label: 'Reliable & Durable', icon: ShieldCheck },
    ],
  },
  {
    id: 2,
    name: 'Carrier Aura Inverter',
    category: 'Inverter',
    description:
      'Premium inverter aircon option for residential and business spaces.',
    image: '',
    alt: 'Carrier Aura Inverter air conditioning unit',
    imageUnavailable: true,
    features: [
      { label: 'Energy Efficient', icon: Leaf },
      { label: 'Fast Cooling', icon: Snowflake },
      { label: 'Reliable & Durable', icon: ShieldCheck },
    ],
  },
  {
    id: 3,
    name: 'Wall-Mounted Aircon',
    category: 'Wall Mount',
    description:
      'Compact wall-mounted cooling unit available for product inquiry.',
    image: '',
    alt: 'Wall-mounted air conditioning unit for sale',
    imageUnavailable: true,
    features: [
      { label: 'Energy Efficient', icon: Leaf },
      { label: 'Fast Cooling', icon: Snowflake },
      { label: 'Reliable & Durable', icon: ShieldCheck },
    ],
  },
  {
    id: 4,
    name: 'Carrier Aircon Package',
    category: 'Package',
    description:
      'Indoor and outdoor aircon unit package ready for sales inquiry.',
    image: '/project-aircon-sales-boxes.png',
    alt: 'Carrier aircon package boxes ready for sale',
    imageUnavailable: false,
    features: [
      { label: 'Genuine Part', icon: BadgeCheck },
      { label: 'Quality Tested', icon: PackageCheck },
      { label: 'Compatible Models', icon: RefreshCw },
    ],
  },
  {
    id: 5,
    name: 'Aircon Parts & Supplies',
    category: 'Parts',
    description:
      'Genuine replacement parts and HVAC supplies available for product inquiry.',
    image: '/service-parts.png',
    alt: 'Aircon parts and supplies available for sale',
    imageUnavailable: false,
    features: [
      { label: 'Genuine Part', icon: BadgeCheck },
      { label: 'Quality Tested', icon: PackageCheck },
      { label: 'Compatible Models', icon: RefreshCw },
    ],
  },
  {
    id: 6,
    name: 'Residential Split Type Unit',
    category: 'Split Type',
    description:
      'Clean split-type aircon option suited for home and small business cooling.',
    image: '',
    alt: 'Residential split-type air conditioning unit',
    imageUnavailable: true,
    features: [
      { label: 'Energy Efficient', icon: Leaf },
      { label: 'Fast Cooling', icon: Snowflake },
      { label: 'Reliable & Durable', icon: ShieldCheck },
    ],
  },
  {
    id: 7,
    name: 'Premium Inverter Wall Unit',
    category: 'Inverter',
    description:
      'Modern inverter wall unit for quieter and more efficient everyday use.',
    image: '',
    alt: 'Premium inverter wall-mounted air conditioning unit',
    imageUnavailable: true,
    features: [
      { label: 'Energy Efficient', icon: Leaf },
      { label: 'Fast Cooling', icon: Snowflake },
      { label: 'Reliable & Durable', icon: ShieldCheck },
    ],
  },
  {
    id: 8,
    name: 'Carrier Unit Package Set',
    category: 'Package',
    description:
      'Product package set with ready inventory for sales inquiry and delivery.',
    image: '/project-aircon-sales-boxes.png',
    alt: 'Carrier packaged air conditioning inventory boxes',
    imageUnavailable: false,
    features: [
      { label: 'Genuine Part', icon: BadgeCheck },
      { label: 'Quality Tested', icon: PackageCheck },
      { label: 'Compatible Models', icon: RefreshCw },
    ],
  },
];

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCards = () => {
    const container = scrollRef.current;
    if (!container) return [] as HTMLElement[];
    return Array.from(
      container.querySelectorAll<HTMLElement>('[data-product-card="true"]'),
    );
  };

  const goToIndex = (index: number) => {
    const container = scrollRef.current;
    const cards = getCards();
    if (!container || cards.length === 0) return;

    const normalizedIndex = (index + cards.length) % cards.length;
    setActiveIndex(normalizedIndex);
    container.scrollTo({
      left: cards[normalizedIndex].offsetLeft,
      behavior: 'smooth',
    });
  };

  const moveByDirection = (direction: 'prev' | 'next') => {
    pauseUntilRef.current = Date.now() + 8000;
    goToIndex(activeIndex + (direction === 'next' ? 1 : -1));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = getCards();
      if (cards.length === 0) return;

      const currentLeft = container.scrollLeft;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const distance = Math.abs(card.offsetLeft - currentLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((previousIndex) =>
        previousIndex === closestIndex ? previousIndex : closestIndex,
      );
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scheduleAutoplay = () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }

      autoplayRef.current = setTimeout(() => {
        if (document.hidden) {
          scheduleAutoplay();
          return;
        }

        const now = Date.now();
        if (pauseUntilRef.current > now) {
          scheduleAutoplay();
          return;
        }

        goToIndex(activeIndex + 1);
        scheduleAutoplay();
      }, 4500);
    };

    scheduleAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [activeIndex]);

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-[40px] font-bold leading-[1.1] text-[#08275B] sm:text-[46px] lg:text-[52px]">
          Our Products
        </h2>
        <div className="mx-auto mt-3 h-[3px] w-[60px] rounded-full bg-[#F58220]" />
        <p className="mx-auto mt-5 max-w-[650px] text-[16px] leading-7 text-[#42516F] sm:text-[18px]">
          High-quality airconditioning units and parts from trusted brands.
          Built for performance, made to last.
        </p>
      </div>

      <div className="relative mt-12">
        <button
          type="button"
          aria-label="Previous product"
          onClick={() => moveByDirection('prev')}
          className="absolute left-[-8px] top-[42%] z-20 hidden h-[56px] w-[56px] -translate-y-1/2 items-center justify-center rounded-full border border-[#DDE6F1] bg-white text-[#1262D6] shadow-[0_10px_24px_rgba(15,35,89,0.10)] transition hover:scale-[1.04] hover:bg-[#F5F8FC] hover:shadow-[0_14px_30px_rgba(15,35,89,0.14)] lg:flex"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.9} absoluteStrokeWidth />
        </button>

        <button
          type="button"
          aria-label="Next product"
          onClick={() => moveByDirection('next')}
          className="absolute right-[-8px] top-[42%] z-20 hidden h-[56px] w-[56px] -translate-y-1/2 items-center justify-center rounded-full border border-[#DDE6F1] bg-white text-[#1262D6] shadow-[0_10px_24px_rgba(15,35,89,0.10)] transition hover:scale-[1.04] hover:bg-[#F5F8FC] hover:shadow-[0_14px_30px_rgba(15,35,89,0.14)] lg:flex"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.9} absoluteStrokeWidth />
        </button>

        <div
          ref={scrollRef}
          onMouseEnter={() => {
            pauseUntilRef.current = Date.now() + 10000;
          }}
          onMouseLeave={() => {
            pauseUntilRef.current = Date.now() + 1500;
          }}
          onTouchStart={() => {
            pauseUntilRef.current = Date.now() + 10000;
          }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <article
              key={product.id}
              data-product-card="true"
              className="flex h-full min-h-[100%] w-[90%] shrink-0 snap-start flex-col rounded-[18px] border border-[#DDE6F1] bg-white p-4 shadow-[0_10px_26px_rgba(15,35,89,0.06)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              <div className="relative h-[235px] overflow-hidden rounded-[12px] bg-[#F5F8FC]">
                <span className="absolute left-4 top-4 z-10 rounded-[6px] bg-[#1262D6] px-3 py-1 text-[12px] font-bold uppercase tracking-[0.02em] text-white">
                  {product.category}
                </span>
                {product.imageUnavailable ? (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#F7FAFF_0%,#EDF4FF_100%)] px-6 text-center">
                    <span className="rounded-[10px] border border-[#F58220] bg-white px-5 py-3 text-[15px] font-semibold text-[#1262D6] shadow-[0_8px_20px_rgba(15,35,89,0.06)]">
                      Preview temporarily unavailable
                    </span>
                  </div>
                ) : product.image.startsWith('http') ? (
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 48vw, (max-width: 1280px) 32vw, 24vw"
                    className="object-cover object-center"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col pt-5">
                <h3 className="text-left text-[21px] font-bold leading-[1.3] text-[#08275B]">
                  {product.name}
                </h3>
                <p className="mt-3 text-left text-[15px] leading-[1.55] text-[#64748B]">
                  {product.description}
                </p>

                <div className="mt-5 h-px bg-[#E7EDF6]" />

                <div className="mt-5 space-y-3">
                  {product.features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <div key={feature.label} className="flex items-center gap-3 text-left">
                        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#EAF3FF] text-[#1262D6]">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} absoluteStrokeWidth />
                        </span>
                        <span className="text-[14px] font-medium text-[#42516F]">
                          {feature.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6">
                  <div className="rounded-[12px] bg-[#F5F8FC] p-4">
                    <p className="text-center text-[22px] font-semibold text-[#1262D6]">
                      Get a quote
                    </p>
                    <a
                      href="#contact-us"
                      aria-label={`View ${product.name}`}
                      className="group mt-4 inline-flex h-[50px] w-full items-center justify-center gap-3 rounded-[10px] bg-[#1262D6] px-4 text-[14px] font-bold text-white transition hover:bg-[#0F4FB2] hover:shadow-[0_10px_20px_rgba(18,98,214,0.22)]"
                    >
                      VIEW PRODUCT
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} absoluteStrokeWidth />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#contact-us"
          className="inline-flex h-[54px] w-full max-w-[290px] items-center justify-center rounded-[10px] border-2 border-[#F58220] bg-white px-6 text-[14px] font-bold text-[#1262D6] transition hover:bg-[#FFF7F0] hover:text-[#0F4FB2]"
        >
          VIEW ALL PRODUCTS
        </a>
      </div>
    </section>
  );
}

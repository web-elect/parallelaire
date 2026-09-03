"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  ChevronDown,
  ChevronRight,
  Clock3,
  CreditCard,
  Headset,
  HandHeart,
  Landmark,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Pencil,
  Phone,
  PhoneCall,
  ShieldCheck,
  Send,
  UserRound,
  UserRoundCog,
  ListFilter,
} from 'lucide-react';
import ProjectsSection from './projects-section';
import ProductsSection from './products-section';
import {
  defaultSiteContent,
  defaultBrands,
  defaultCatalogServices,
  defaultProducts,
  loadPublicCatalog,
  loadPublicSiteContent,
  type ContactInfoItem,
  type SupportPointItem,
} from '../lib/site-content';

const navItems = [
  'Home',
  'About Us',
  'Services',
  'Products',
  'Projects',
  'Contact Us',
  'Feedback',
];

const services = [
  {
    title: 'Aircon Sales',
    text: 'Wide selection of trusted brands and high-quality airconditioning units.',
    image: '/service-air-sales.jpg',
    badge: 'Cooling',
    icon: 'snow',
    iconImage: '/service-air-sales.png',
  },
  {
    title: 'Parts Sales',
    text: 'Genuine and high-quality aircon parts for all brands and models.',
    image: '/service-parts.jpg',
    badge: 'Parts',
    icon: 'gear',
    iconImage: '/service-parts.png',
  },
  {
    title: 'Installation Services',
    text: 'Professional installation for residential, commercial, and industrial spaces.',
    image: '/install.jpg',
    badge: 'Install',
    icon: 'tools',
    iconImage: '/service-install.png',
  },
  {
    title: 'Maintenance Services',
    text: 'Regular cleaning and maintenance to keep your aircon running efficiently.',
    image: '/maintenance.jpg',
    badge: 'Maintain',
    icon: 'shield',
    iconImage: '/service-maintenance-shield.png',
  },
];

const whyChoose = [
  'Expert & trained technicians',
  '100% genuine products & parts',
  'Fast & reliable service',
  'Affordable prices',
  'Customer satisfaction',
];

const serviceBrands = [
  { name: 'Carrier', logo: '/assets/brands/carrier.png' },
  { name: 'Midea', logo: '/assets/brands/midea.png' },
  { name: 'Toshiba', logo: '/assets/brands/toshiba.svg' },
  { name: 'Condura', logo: '/assets/brands/condura.png' },
  { name: 'Panasonic', logo: '/assets/brands/panasonic.png' },
  { name: 'Mitsubishi', logo: '/assets/brands/mitsubishi.svg' },
  { name: 'LG', logo: '/assets/brands/lg.png' },
  { name: 'Daikin', logo: '/assets/brands/daikin.png' },
  { name: 'Samsung', logo: '/assets/brands/samsung.png' },
  { name: 'Koppel', logo: '/assets/brands/koppel.svg' },
  { name: 'Kolin', logo: '/assets/brands/kolin.png' },
] as const;

const paymentMethods = [
  {
    name: 'Visa',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Visa%20Inc.%20logo%20%282021%E2%80%93present%29.svg',
    alt: 'Visa logo',
  },
  {
    name: 'GCash',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/GCash%20logo.svg',
    alt: 'GCash logo',
  },
  {
    name: 'Maya',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maya%20logo.svg',
    alt: 'Maya logo',
  },
  {
    name: 'Debit Cards',
    alt: 'Debit cards payment method',
    icon: CreditCard,
  },
  {
    name: 'Home Credit',
    logo: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Home%20Credit%20logo.svg',
    alt: 'Home Credit logo',
  },
  {
    name: 'Bank Transfer',
    alt: 'Bank transfer payment method',
    full: true,
    icon: Landmark,
  },
];

const contactInfo = [
  {
    title: 'Email',
    value: 'admin@parallelaire.com',
    detail: "We'll get back to you as soon as possible.",
    icon: Mail,
  },
  {
    title: 'Phone',
    value: '0999 223 6272',
    detail: 'Call us for quick assistance.',
    icon: Phone,
  },
  {
    title: 'Address',
    value: 'National Highway, San Jose del Monte, Philippines, 3023',
    detail: 'Visit our office.',
    icon: MapPin,
  },
  {
    title: 'Business Hours',
    value: '9:00 AM - 6:00 PM Daily',
    detail: "We're open every day to serve you better.",
    icon: Clock3,
  },
];

const inquiryIcons = {
  name: UserRound,
  email: Mail,
  product: Package,
  type: ListFilter,
  message: Pencil,
} as const;

const inquiryOptions = [
  'Aircon Sales',
  'Parts Sales',
  'Installation Services',
  'Maintenance Services',
  'General Inquiry',
];

const supportPoints = [
  {
    title: 'Quick Response',
    detail: 'We reply to all inquiries promptly.',
    icon: MessageCircle,
  },
  {
    title: 'Trusted Service',
    detail: 'Your satisfaction is our priority.',
    icon: ShieldCheck,
  },
  {
    title: 'Expert Support',
    detail: 'Our team is ready to assist you.',
    icon: Headset,
  },
];

const messengerInboxUrl = 'https://m.me/61559878689817';

const testimonials = [
  {
    quote:
      'Professional installation and very accommodating team. Our aircon works perfectly! Highly recommended.',
    author: 'Raymond D.',
    place: 'San Jose del Monte, Bulacan',
  },
  {
    quote:
      'Genuine products and affordable prices. Their after-sales service is excellent.',
    author: 'Maria Teresa L.',
    place: 'Quezon City',
  },
  {
    quote:
      'Quick response and reliable service. They handled our installation perfectly.',
    author: 'Carlo A.',
    place: 'Manila',
  },
];

const whyChooseItems = [
  {
    title: 'Expert & Trained Technicians',
    text: 'Skilled professionals you can trust for quality workmanship.',
    icon: 'technician',
  },
  {
    title: '100% Genuine Products & Parts',
    text: 'We use only authentic and high-quality products.',
    icon: 'shield',
  },
  {
    title: 'Fast & Reliable Service',
    text: 'Prompt, efficient, and dependable service when you need it most.',
    icon: 'clock',
  },
  {
    title: 'Affordable Prices',
    text: 'Competitive rates with the best value for your money.',
    icon: 'tag',
  },
  {
    title: 'Customer Satisfaction',
    text: 'Your comfort and satisfaction are always our top priority.',
    icon: 'thumbs',
  },
];

function WhyChooseIcon({
  type,
}: {
  type: 'technician' | 'shield' | 'clock' | 'tag' | 'thumbs';
}) {
  const common = 'h-10 w-10 shrink-0 text-[#1b59c9]';
  const props = {
    className: common,
    strokeWidth: 1.8,
    absoluteStrokeWidth: true,
  } as const;

  if (type === 'technician') return <UserRoundCog {...props} />;
  if (type === 'shield') return <ShieldCheck {...props} />;
  if (type === 'clock') return <Clock3 {...props} />;
  if (type === 'tag') return <BadgeDollarSign {...props} />;
  return <HandHeart {...props} />;
}

function CardIcon({ label }: { label: string }) {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[linear-gradient(135deg,#f8af58_0%,#1b59c9_100%)] p-4 text-white shadow-lg">
      <span className="text-[11px] font-semibold tracking-normal">{label}</span>
    </div>
  );
}

function TrustIcon({ type }: { type: 'shield' | 'person' | 'clock' | 'smile' }) {
  const common = 'h-7 w-7 text-[#1b59c9]';

  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 3l7 3v5c0 4.7-2.8 8.4-7 10-4.2-1.6-7-5.3-7-10V6l7-3z" />
        <path d="M9 12.4l2 2 4-4.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'person') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 12.2a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
        <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8.5V12l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 13.5c.9 1.4 2.3 2.2 3.5 2.2s2.6-.8 3.5-2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.2 10.2h.01M14.8 10.2h.01" strokeLinecap="round" />
    </svg>
  );
}

function FieldIcon({ type, className = '' }: { type: keyof typeof inquiryIcons; className?: string }) {
  const Icon = inquiryIcons[type];
  return <Icon className={className} strokeWidth={1.8} absoluteStrokeWidth />;
}

function SocialBrandIcon({ type }: { type: 'facebook' | 'messenger' }) {
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden="true">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.6 1.5-1.6H16V4.8c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.3V11H9v3h2.4v7h2.1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px]" aria-hidden="true">
      <path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 5 3.5 6.6V21l3.1-1.7c.8.2 1.6.3 2.4.3 5 0 9-3.7 9-8.3S17 3 12 3Zm.9 11.2-2.3-2.5-4.5 2.5 5-5.3 2.3 2.5 4.5-2.5-5 5.3Z" />
    </svg>
  );
}

export default function Home() {
  const [siteContent, setSiteContent] = useState(defaultSiteContent);
  const [products, setProducts] = useState(defaultProducts);
  const [brands, setBrands] = useState(defaultBrands);
  const [catalogServices, setCatalogServices] = useState(defaultCatalogServices);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    productOrService: '',
    inquiryType: '',
    details: '',
  });
  const [inquiryStatus, setInquiryStatus] = useState('');

  useEffect(() => {
    let isMounted = true;

    const receivePreviewUpdate = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !event.data) return;
      if (event.data.type === 'parallel-aire-preview') {
        if (event.data.content) setSiteContent(event.data.content);
        if (event.data.products) setProducts(event.data.products);
        if (event.data.services) setCatalogServices(event.data.services);
        if (event.data.brands) setBrands(event.data.brands);
      }
      if (event.data.type === 'parallel-aire-scroll' && typeof event.data.section === 'string') {
        document.getElementById(event.data.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('message', receivePreviewUpdate);

    void loadPublicSiteContent().then((content) => {
      if (isMounted) {
        setSiteContent(content);
      }
    });
    void loadPublicCatalog('products').then((items) => isMounted && setProducts(items));
    void loadPublicCatalog('brands').then((items) => isMounted && setBrands(items));
    void loadPublicCatalog('services').then((items) => isMounted && setCatalogServices(items));

    return () => {
      isMounted = false;
      window.removeEventListener('message', receivePreviewUpdate);
    };
  }, []);

  const resolveContactIcon = (icon: ContactInfoItem['icon']) => {
    if (icon === 'mail') return Mail;
    if (icon === 'phone') return Phone;
    if (icon === 'map-pin') return MapPin;
    return Clock3;
  };

  const resolveSupportIcon = (icon: SupportPointItem['icon']) => {
    if (icon === 'message-circle') return MessageCircle;
    if (icon === 'shield-check') return ShieldCheck;
    return Headset;
  };

  const updateInquiryField = (field: keyof typeof inquiryForm, value: string) => {
    setInquiryForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleMessengerInquiry = async () => {
    const hasInquiryContent =
      inquiryForm.name.trim() ||
      inquiryForm.email.trim() ||
      inquiryForm.productOrService.trim() ||
      inquiryForm.inquiryType.trim() ||
      inquiryForm.details.trim();

    if (!hasInquiryContent) {
      setInquiryStatus('Please add your inquiry details first, then we will open Messenger.');
      return;
    }

    const inquiryMessage = [
      'Hello Parallel Aire, I would like to send an inquiry.',
      '',
      `Name: ${inquiryForm.name.trim() || 'Not provided'}`,
      `Email: ${inquiryForm.email.trim() || 'Not provided'}`,
      `Product / Service: ${inquiryForm.productOrService.trim() || 'Not provided'}`,
      `Inquiry Type: ${inquiryForm.inquiryType.trim() || 'Not provided'}`,
      `Details: ${inquiryForm.details.trim() || 'Not provided'}`,
    ].join('\n');

    let copiedSuccessfully = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(inquiryMessage);
        copiedSuccessfully = true;
      } catch {
        copiedSuccessfully = false;
      }
    }

    window.open(siteContent.social.messenger, '_blank', 'noopener,noreferrer');
    setInquiryStatus(
      copiedSuccessfully
        ? 'Your inquiry was copied. Messenger is opening now. Paste the message there and send it.'
        : 'Messenger is opening now. If the message was not copied automatically, please copy your details and send them there.',
    );
  };

  return (
    <main className="bg-white text-slate-900">
      <div className="bg-[linear-gradient(90deg,#0b4ca8_0%,#1b59c9_55%,#f8af58_140%)] px-4 py-2 text-[11px] font-semibold text-white sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-white sm:text-[12px]">
            <BadgeCheck className="h-[13px] w-[13px]" strokeWidth={1.9} absoluteStrokeWidth />
            <span>{siteContent.topBar.badgeLabel}</span>
          </div>
          <div className="flex items-center text-[11px] font-medium text-white sm:text-[12px]">
            <div className="hidden items-center sm:flex">
              <div className="flex items-center gap-2">
                <MapPin className="h-[13px] w-[13px]" strokeWidth={1.9} absoluteStrokeWidth />
                <span>{siteContent.topBar.location}</span>
              </div>
              <span className="mx-5 h-4 w-px bg-white/25" />
              <div className="flex items-center gap-2">
                <Clock3 className="h-[13px] w-[13px]" strokeWidth={1.9} absoluteStrokeWidth />
                <span>{siteContent.topBar.hours}</span>
              </div>
              <span className="mx-5 h-4 w-px bg-white/25" />
            </div>
            <a href={siteContent.topBar.phoneHref} className="flex items-center gap-2 hover:underline">
              <Phone className="h-[13px] w-[13px]" strokeWidth={1.9} absoluteStrokeWidth />
              <span>{siteContent.topBar.phoneLabel}</span>
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#home" className="flex items-center gap-3">
            <Image
              src="/logo-pa.png"
              alt="Parallel Aire logo"
              width={72}
              height={72}
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
              priority
            />
            <div className="leading-tight">
              <div className="text-[22px] font-semibold tracking-tight text-[#1b59c9]">
                {siteContent.company.name}
              </div>
              <div className="text-[10px] font-medium tracking-normal text-slate-500">
                {siteContent.company.tagline}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-[13px] font-semibold tracking-normal text-[#133f8f] lg:flex">
            {siteContent.navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="transition hover:text-[#1b59c9]"
              >
                {item}
              </a>
            ))}
          </nav>

          <a
            href="#contact-us"
            className="rounded-xl bg-[linear-gradient(135deg,#1b59c9_0%,#0f4ca8_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(27,89,201,0.25)] transition hover:brightness-110"
          >
            GET A QUOTE
          </a>
        </div>

        <details className="border-t border-slate-200 px-4 py-3 lg:hidden">
          <summary className="cursor-pointer list-none text-sm font-semibold tracking-normal text-[#133f8f]">
            Menu
          </summary>
          <div className="mt-3 grid gap-3 pb-1 text-sm font-medium text-slate-700">
            {siteContent.navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
                {item}
              </a>
            ))}
          </div>
        </details>
      </header>

      <section
        id="home"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#edf5ff_100%)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(27,89,201,0.08),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(248,175,88,0.12),transparent_20%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:pt-14">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="relative z-10 max-w-2xl">
              <p className="inline-flex items-center gap-3 text-sm font-semibold tracking-normal text-[#f08e2f]">
                <span className="h-[2px] w-10 bg-[#f08e2f]" />
                {siteContent.hero.eyebrow}
              </p>
              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.06] tracking-tight text-[#0c1f4b] sm:text-6xl lg:text-[4.65rem]">
                {siteContent.hero.titleLineOne}
                <span className="block text-[#1b59c9]">{siteContent.hero.titleLineTwo}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base font-normal leading-8 text-slate-700 sm:text-lg">
                {siteContent.hero.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#1b59c9_0%,#0f4ca8_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(27,89,201,0.16)] transition hover:brightness-110"
                >
                  {siteContent.hero.primaryCta}
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center rounded-full border border-[#f08e2f] bg-white px-7 py-3.5 text-sm font-semibold text-[#1b59c9] transition hover:bg-[#fff7ee]"
                >
                  {siteContent.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="relative lg:pl-4">
              <div className="rounded-[2rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8f4ef_48%,#eef4ff_100%)] p-3 shadow-[0_20px_60px_rgba(15,35,89,0.08)] sm:p-4 lg:rounded-[3rem] lg:p-5">
                <div className="overflow-hidden rounded-[1.5rem] bg-white lg:rounded-[2.5rem]">
                  <Image
                    src={siteContent.hero.image}
                    alt="Bright living room with wall-mounted air conditioner"
                    width={1600}
                    height={1000}
                    priority
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 56vw"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-10 max-w-7xl pb-8 sm:mt-12 lg:mt-14">
            <div className="grid gap-0 overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_12px_34px_rgba(15,35,89,0.08)] sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  'Quality Products',
                  'We offer trusted brands and genuine aircon parts.',
                  'shield',
                ],
                [
                  'Expert Technicians',
                  'Skilled professionals with hands-on experience.',
                  'person',
                ],
                [
                  'Reliable Service',
                  'On-time, efficient, and dependable service you can trust.',
                  'clock',
                ],
                [
                  'Customer Satisfaction',
                  'Your satisfaction is our top priority every time.',
                  'smile',
                ],
              ].map(([title, text, icon], index) => (
                <div
                  key={title}
                  className={`flex items-start gap-4 px-6 py-6 ${index < 3 ? 'border-b border-slate-100 lg:border-b-0 lg:border-r' : ''}`}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#f8af58]/35 bg-[#eff5ff]">
                    <TrustIcon type={icon as 'shield' | 'person' | 'clock' | 'smile'} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#133f8f]">{title}</p>
                    <p className="mt-1 text-sm font-normal leading-6 text-slate-600">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 rounded-[18px] border border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f5faff_100%)] p-6 shadow-[0_8px_24px_rgba(16,30,75,0.06)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-normal text-[#f08e2f]">
              {siteContent.about.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0c1f4b] sm:text-4xl">
              {siteContent.about.titleLineOne}
              <span className="block text-[#1b59c9]">{siteContent.about.titleLineTwo}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base font-normal leading-8 text-slate-600">
              {siteContent.about.description}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {siteContent.about.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_8px_18px_rgba(16,30,75,0.04)]"
                >
                  <p className="text-sm font-semibold text-[#133f8f]">{item.title}</p>
                  <p className="mt-2 text-sm font-normal leading-6 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="#contact-us"
                className="inline-flex rounded-lg bg-[linear-gradient(135deg,#1b59c9_0%,#0f4ca8_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(27,89,201,0.18)] transition hover:brightness-110"
              >
                {siteContent.about.buttonLabel}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border border-sky-100 bg-white shadow-[0_12px_30px_rgba(16,30,75,0.08)]">
            <Image
              src={siteContent.about.image}
              alt="Parallel Aire service project"
              width={980}
              height={760}
              className="h-full min-h-[340px] w-full object-cover object-[center_30%]"
            />
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#f08e2f]">
            {siteContent.servicesHeading.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold leading-tight text-[#0c1f4b] sm:text-5xl lg:text-6xl">
            <span className="text-[#0c1f4b]">{siteContent.servicesHeading.titleLeft}</span>{' '}
            <span className="text-[#1b59c9]">{siteContent.servicesHeading.titleRight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-normal leading-8 text-slate-600">
            {siteContent.servicesHeading.description}
          </p>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#1b59c9]" />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {catalogServices.map((service) => (
            <article
              key={service.id ?? service.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_16px_34px_rgba(16,30,75,0.08)] transition hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(16,30,75,0.12)]"
            >
              <div className="px-5 pt-5">
                <div className="flex items-center gap-3 rounded-[18px] bg-white px-3 pb-3 pt-1">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f8af58]/35 bg-[#eff5ff] text-[#1b59c9] shadow-[0_8px_18px_rgba(27,89,201,0.08)]">
                    <Package className="h-6 w-6 text-[#1b59c9]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-semibold leading-tight text-[#133f8f]">
                      {service.name}
                    </h3>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[18px] border border-slate-100 bg-[linear-gradient(180deg,#f9fbff,#eef5ff)] p-3">
                  <div className="flex min-h-[280px] w-full items-center justify-center rounded-[14px] bg-white p-3 sm:min-h-[320px]">
                    <img
                      src={service.image_url}
                      alt={service.name}
                      loading="lazy"
                      className="max-h-[300px] w-full object-contain transition duration-500 group-hover:scale-[1.02] sm:max-h-[340px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                <p className="mt-4 text-[15px] font-normal leading-7 text-slate-600">
                  {service.description}
                </p>

                <div className="mt-auto flex justify-center pt-7">
                  <a
                    href="#contact-us"
                    className="inline-flex items-center justify-center rounded-md bg-[#1b59c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(27,89,201,0.16)] transition hover:bg-[#0f4ca8]"
                  >
                    {service.cta_text || 'LEARN MORE'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </section>

      <ProductsSection products={products} />

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="rounded-[28px] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.14),transparent_20%),linear-gradient(90deg,#0c3f9a_0%,#0f57bf_45%,#1f76da_100%)] px-5 py-10 text-white shadow-[0_20px_45px_rgba(14,60,140,0.24)] sm:px-8">
          <p className="text-center text-sm font-semibold tracking-[0.2em] text-[#f08e2f]">
            YOUR COMFORT, OUR PRIORITY
          </p>
          <h2 className="mt-3 text-center text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Why Choose <span className="text-[#46b5ff]">Parallel Aire?</span>
          </h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-5 lg:gap-0">
            {whyChooseItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col items-center text-center ${index < whyChooseItems.length - 1 ? 'lg:border-r lg:border-white/20' : ''} px-2 py-2`}
              >
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#F7943D]/70 bg-[radial-gradient(circle_at_30%_25%,#ffffff_0%,#f8fbff_48%,#edf4ff_100%)] shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                  <WhyChooseIcon type={item.icon as 'technician' | 'shield' | 'clock' | 'tag' | 'thumbs'} />
                </div>
                <h3 className="mt-5 max-w-[11rem] text-[18px] font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[13rem] text-sm leading-6 text-white/90">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-bold leading-tight text-[#08275B] sm:text-4xl">
          Brands We Service
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#f08e2f]" />
        <p className="mx-auto mt-5 max-w-3xl text-center text-[16px] leading-7 text-[#64748B] sm:text-[18px]">
          Parallel Aire supports trusted airconditioning brands for residential
          and commercial requirements.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[96px] items-center justify-center rounded-[12px] border border-[#E4EAF2] bg-white px-4 py-3"
            >
              <img
                src={brand.logo_url}
                alt={`${brand.name} brand logo`}
                className="h-12 w-full max-w-[120px] object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="contact-us" className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="overflow-hidden rounded-[20px] border border-[#E3EAF4] bg-white shadow-[0_10px_30px_rgba(15,35,89,0.06)]">
            <div className="grid gap-0 lg:grid-cols-4">
              {siteContent.contactInfo.map((item, index) => {
                const Icon = resolveContactIcon(item.icon);
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 px-6 py-8 sm:px-7 ${index < contactInfo.length - 1 ? 'border-b border-[#E3EAF4] lg:border-b-0 lg:border-r' : ''}`}
                  >
                    <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border-2 border-[#F7943D]/65 bg-[#EAF3FF]">
                      <Icon className="h-8 w-8 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[19px] font-bold leading-tight text-[#08275B]">
                        {item.title}
                      </h3>
                      {item.title === 'Email' ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="mt-2 block text-[15px] leading-7 text-[#08275B] transition hover:text-[#1557C8] hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-2 text-[15px] leading-7 text-[#08275B]">
                          {item.value.split('\n').map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </p>
                      )}
                      <p className="mt-3 max-w-[16rem] text-[15px] leading-7 text-[#64748B]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] border border-[#E3EAF4] bg-white shadow-[0_12px_35px_rgba(15,35,89,0.08)]">
            <div className="grid lg:grid-cols-[0.95fr_1.6fr]">
              <div className="relative overflow-hidden bg-[linear-gradient(145deg,#06429D_0%,#1262CF_55%,#2591E8_100%)] px-6 pt-8 text-white sm:px-8 sm:pt-10 lg:px-9 lg:pt-10">
                <h2 className="text-[38px] font-bold leading-tight tracking-tight sm:text-[42px]">
                  Need Help?
                </h2>
                <div className="mt-4 h-[4px] w-16 rounded-full bg-[#F7943D]" />
                <p className="mt-6 max-w-sm text-[16px] leading-8 text-white/95">
                  We&apos;re here to help! Send us a message or call us for
                  inquiries and quotations.
                </p>

                <div className="mt-8 space-y-4">
                  {siteContent.supportPoints.map((item) => {
                    const Icon = resolveSupportIcon(item.icon);
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/12 backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-white" strokeWidth={1.8} absoluteStrokeWidth />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold leading-tight text-white">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-[15px] leading-7 text-white/90">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="relative mt-8 overflow-hidden rounded-tl-[28px] rounded-tr-[28px] sm:mt-10">
                  <Image
                    src="/hero-family.jpg"
                    alt="Bright living room with wall-mounted air conditioner"
                    width={1200}
                    height={900}
                    className="h-[280px] w-full object-cover object-center sm:h-[310px] lg:h-[370px]"
                  />

                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-5 sm:pb-5">
                    <div className="flex items-center gap-4 rounded-[18px] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(15,35,89,0.14)] sm:px-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF]">
                        <PhoneCall className="h-6 w-6 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[16px] font-bold text-[#08275B]">
                          Prefer to talk?
                        </p>
                        <p className="mt-1 text-[13px] leading-5 text-[#64748B]">
                          Call us now for immediate assistance.
                        </p>
                      </div>
                      <a
                        href="tel:+639992236272"
                        className="inline-flex items-center gap-2 rounded-lg bg-[linear-gradient(90deg,#0752C9,#195FE6,#315CFF)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(7,82,201,0.24)] transition hover:translate-y-[-1px] hover:brightness-105"
                      >
                        Call Now
                        <ArrowRight className="h-4 w-4" strokeWidth={1.8} absoluteStrokeWidth />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-10">
                <h2 className="text-[26px] font-bold leading-tight text-[#08275B] sm:text-[30px]">
                  Product Inquiry / Order
                </h2>

                <form
                  className="mt-7 grid gap-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleMessengerInquiry();
                  }}
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="sr-only">Your name</span>
                      <div className="relative">
                        <FieldIcon
                          type="name"
                          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1557C8]"
                        />
                        <input
                          value={inquiryForm.name}
                          onChange={(event) => updateInquiryField('name', event.target.value)}
                          className="h-[66px] w-full rounded-[12px] border border-[#D5DFED] bg-white pl-14 pr-4 text-[16px] text-[#08275B] outline-none transition placeholder:text-[#8A97B0] focus:border-[#1557C8] focus:ring-4 focus:ring-[#EAF3FF]"
                          placeholder="Your name"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="sr-only">Email address</span>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                        <input
                          value={inquiryForm.email}
                          onChange={(event) => updateInquiryField('email', event.target.value)}
                          className="h-[66px] w-full rounded-[12px] border border-[#D5DFED] bg-white pl-14 pr-4 text-[16px] text-[#08275B] outline-none transition placeholder:text-[#8A97B0] focus:border-[#1557C8] focus:ring-4 focus:ring-[#EAF3FF]"
                          placeholder="Email address"
                        />
                      </div>
                    </label>
                  </div>

                  <label className="block">
                    <span className="sr-only">Product or service needed</span>
                    <div className="relative">
                      <Package className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                      <input
                        value={inquiryForm.productOrService}
                        onChange={(event) => updateInquiryField('productOrService', event.target.value)}
                        className="h-[66px] w-full rounded-[12px] border border-[#D5DFED] bg-white pl-14 pr-4 text-[16px] text-[#08275B] outline-none transition placeholder:text-[#8A97B0] focus:border-[#1557C8] focus:ring-4 focus:ring-[#EAF3FF]"
                        placeholder="Product or service needed"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="sr-only">Inquiry type</span>
                    <div className="relative">
                      <ListFilter className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                      <select
                        value={inquiryForm.inquiryType}
                        onChange={(event) => updateInquiryField('inquiryType', event.target.value)}
                        className="h-[66px] w-full appearance-none rounded-[12px] border border-[#D5DFED] bg-white pl-14 pr-12 text-[16px] text-[#08275B] outline-none transition placeholder:text-[#8A97B0] focus:border-[#1557C8] focus:ring-4 focus:ring-[#EAF3FF]"
                      >
                        <option value="" disabled>
                          Inquiry type
                        </option>
                        {siteContent.inquiryOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#64748B]" strokeWidth={1.8} absoluteStrokeWidth />
                    </div>
                  </label>

                  <label className="block">
                    <span className="sr-only">Tell us about your inquiry</span>
                    <div className="relative">
                      <Pencil className="pointer-events-none absolute left-4 top-5 h-5 w-5 text-[#1557C8]" strokeWidth={1.8} absoluteStrokeWidth />
                      <textarea
                        value={inquiryForm.details}
                        onChange={(event) => updateInquiryField('details', event.target.value)}
                        className="min-h-[210px] w-full rounded-[12px] border border-[#D5DFED] bg-white px-4 py-5 pl-14 text-[16px] text-[#08275B] outline-none transition placeholder:text-[#8A97B0] focus:border-[#1557C8] focus:ring-4 focus:ring-[#EAF3FF]"
                        placeholder="Tell us about your inquiry"
                      />
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-[64px] w-full items-center justify-center gap-3 rounded-[10px] bg-[linear-gradient(90deg,#0752C9,#195FE6,#315CFF)] px-6 text-[16px] font-bold text-white shadow-[0_12px_28px_rgba(7,82,201,0.22)] transition hover:translate-y-[-1px] hover:brightness-105"
                  >
                    <Send className="h-5 w-5" strokeWidth={1.8} absoluteStrokeWidth />
                    SEND INQUIRY
                  </button>

                  {inquiryStatus ? (
                    <p className="text-center text-[14px] leading-6 text-[#64748B]">
                      {inquiryStatus}
                    </p>
                  ) : null}

                  <div className="flex items-center justify-center gap-2 pt-1 text-center text-[14px] text-[#64748B]">
                    <LockKeyhole className="h-4 w-4 text-[#8A97B0]" strokeWidth={1.8} absoluteStrokeWidth />
                    <span>Your information is safe with us. We respect your privacy.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <section id="feedback" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-3xl font-bold leading-tight text-[#133f8f] sm:text-4xl">
          What Our Customers Say
        </h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#f08e2f]" />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteContent.testimonials.map((item) => (
            <article
              key={item.author}
              className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(16,30,75,0.08)]"
            >
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-[linear-gradient(180deg,#e6f0ff,#bbd5ff)]" />
                <div className="flex-1">
              <div className="text-lg text-[#f08e2f]">★★★★★</div>
                  <p className="mt-2 text-sm font-normal leading-7 text-slate-700">
                    “{item.quote}”
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[#133f8f]">
                    - {item.author}
                  </p>
                  <p className="text-xs text-slate-500">{item.place}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto mb-5 max-w-[1320px] px-4 pb-6 sm:px-6">
        <div className="overflow-hidden rounded-[14px] bg-[linear-gradient(110deg,#0B3F98_0%,#0757C9_52%,#174A92_100%)] px-[22px] py-[28px] text-white shadow-[0_18px_34px_rgba(10,43,104,0.16)] sm:px-[32px] sm:py-[34px] lg:px-[48px] lg:py-[42px]">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.25fr_0.8fr_1fr_1.1fr]">
            <div>
              <Image
                src="/logo-pa.png"
                alt="Parallel Aire logo"
                width={230}
                height={80}
                className="h-auto w-full max-w-[230px] object-contain"
              />
              <p className="mt-6 max-w-[290px] text-[14px] leading-[1.8] text-white/90">
                {siteContent.company.footerDescription}
              </p>
              <div className="mt-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[12px] font-medium text-white/90">
                {siteContent.company.registrationLabel}
              </div>
              <div className="mt-6 flex items-center gap-[10px]">
                <a
                  href={siteContent.social.facebook}
                  aria-label="Parallel Aire Facebook"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/45 text-white transition hover:-translate-y-[2px] hover:bg-white hover:text-[#0757C9]"
                >
                  <SocialBrandIcon type="facebook" />
                </a>
                <a
                  href={siteContent.social.messenger}
                  aria-label="Parallel Aire Messenger"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/45 text-white transition hover:-translate-y-[2px] hover:bg-white hover:text-[#0757C9]"
                >
                  <SocialBrandIcon type="messenger" />
                </a>
                <a
                  href={`mailto:${siteContent.social.email}`}
                  aria-label="Email Parallel Aire"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/45 text-white transition hover:-translate-y-[2px] hover:bg-white hover:text-[#0757C9]"
                >
                  <Mail className="h-[17px] w-[17px]" strokeWidth={1.9} absoluteStrokeWidth />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-bold uppercase tracking-[0.02em] text-white">
                Quick Links
              </h3>
              <div className="mt-[10px] h-[2px] w-[38px] rounded-full bg-[#FF7A18]" />
              <div className="mt-5 grid">
                {siteContent.navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group inline-flex items-center gap-3 py-2 text-[14px] text-white transition hover:translate-x-[3px] hover:text-[#FFB067]"
                  >
                    <ChevronRight className="h-[15px] w-[15px] text-white/90 transition group-hover:text-[#FFB067]" strokeWidth={2} absoluteStrokeWidth />
                    <span>{item}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-bold uppercase tracking-[0.02em] text-white">
                Payment Methods
              </h3>
              <div className="mt-[10px] h-[2px] w-[38px] rounded-full bg-[#FF7A18]" />
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-3">
                {paymentMethods.map((item) => (
                  <div
                    key={item.name}
                    className={`flex min-h-[52px] items-center justify-center rounded-[7px] border border-white/10 bg-white px-3 py-3 text-center text-[14px] font-semibold text-[#0B2D68] ${item.full ? 'col-span-2 sm:col-span-3' : ''}`}
                  >
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.alt}
                        className={`h-[24px] w-full object-contain ${item.name === 'Home Credit' ? 'max-w-[108px]' : 'max-w-[90px]'}`}
                      />
                    ) : item.icon ? (
                      <div className="flex items-center justify-center gap-2 text-[#0B2D68]">
                        <item.icon className="h-[18px] w-[18px]" strokeWidth={1.9} absoluteStrokeWidth />
                        <span>{item.name}</span>
                      </div>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-bold uppercase tracking-[0.02em] text-white">
                Stay Connected
              </h3>
              <div className="mt-[10px] h-[2px] w-[38px] rounded-full bg-[#FF7A18]" />

              <div className="mt-5 space-y-4 text-[14px] text-white">
                <a
                  href="https://www.facebook.com/profile.php?id=61559878689817"
                  className="flex items-center gap-3 text-white/95 transition hover:text-[#FFB067]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <SocialBrandIcon type="facebook" />
                  </span>
                  <span>facebook.com/61559878689817</span>
                </a>
                <a
                  href="https://www.facebook.com/parallel.aire"
                  className="flex items-center gap-3 text-white/95 transition hover:text-[#FFB067]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <SocialBrandIcon type="facebook" />
                  </span>
                  <span>facebook.com/parallel.aire</span>
                </a>
              </div>

              <div className="my-[18px] border-t border-white/20" />

              <div className="space-y-4 text-[13px] sm:text-[14px]">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <Phone className="h-4 w-4 text-white" strokeWidth={1.8} absoluteStrokeWidth />
                  </span>
                  <span className="pt-1 text-white/95">0999 223 6272</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <Mail className="h-4 w-4 text-white" strokeWidth={1.8} absoluteStrokeWidth />
                  </span>
                  <a
                    href={`mailto:${siteContent.social.email}`}
                    className="pt-1 text-white/95 transition hover:text-[#FFB067] hover:underline"
                  >
                    {siteContent.social.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <MapPin className="h-4 w-4 text-white" strokeWidth={1.8} absoluteStrokeWidth />
                  </span>
                  <span className="pt-1 text-white/95">
                    National Highway,
                    <br />
                    San Jose del Monte,
                    <br />
                    Philippines, 3023
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                    <Clock3 className="h-4 w-4 text-white" strokeWidth={1.8} absoluteStrokeWidth />
                  </span>
                  <span className="pt-1 text-white/95">
                    9:00 AM - 6:00 PM
                    <br />
                    Daily
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-[30px] border-t border-white/20 pt-[18px] text-center text-[12px] text-white/72 sm:text-[13px]">
            © 2026 PARALLEL AIRE. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

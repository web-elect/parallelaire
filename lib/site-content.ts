"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ServiceItem = {
  title: string;
  text: string;
  image: string;
  badge: string;
  icon: "snow" | "gear" | "tools" | "shield";
  iconImage: string;
};

export type ContactInfoItem = {
  title: string;
  value: string;
  detail: string;
  icon: "mail" | "phone" | "map-pin" | "clock3";
};

export type SupportPointItem = {
  title: string;
  detail: string;
  icon: "message-circle" | "shield-check" | "headset";
};

export type TestimonialItem = {
  quote: string;
  author: string;
  place: string;
};

export type CatalogProduct = { id?: string; name: string; category: "Residential" | "Commercial"; type: string; models: string; description: string; image_url: string; display_order: number; is_active: boolean };
export type CatalogService = { id?: string; name: string; description: string; image_url: string; cta_text: string; display_order: number; is_active: boolean };
export type CatalogBrand = { id?: string; name: string; logo_url: string; display_order: number; is_active: boolean };

export const defaultProducts: CatalogProduct[] = [
  { name: "Wall Mounted", category: "Residential", type: "Wall Mounted", models: "Optima • Aura", description: "Residential wall-mounted air conditioning units.", image_url: "https://strapi.carrier.com.ph/uploads/Image_23_12aadcdd46.png", display_order: 1, is_active: true },
  { name: "Window Type", category: "Residential", type: "Window Type", models: "Optima • Aura", description: "Carrier window-type air conditioning units.", image_url: "https://strapi.carrier.com.ph/uploads/CAR_Optima_Inverter_0_75_HP_1_0_HP_1_45ec258d94.png", display_order: 2, is_active: true },
  { name: "Floor Mounted", category: "Residential", type: "Floor Mounted", models: "Slim • Opus", description: "Floor-mounted comfort for residential spaces.", image_url: "https://strapi.carrier.com.ph/uploads/carrier_opus_668a980c25.webp", display_order: 3, is_active: true },
  { name: "Floor Mounted", category: "Commercial", type: "Floor Mounted", models: "Optima", description: "Commercial floor-mounted cooling solutions.", image_url: "https://strapi.carrier.com.ph/uploads/Image_20_ea0469d063.png", display_order: 4, is_active: true },
  { name: "Under Ceiling", category: "Commercial", type: "Under Ceiling", models: "Commercial Series", description: "Under-ceiling commercial air conditioning.", image_url: "https://brandportal.carrier.com/transform/da527147-7b33-49da-ba3f-fcf331fb7c82/carrier-40vmu-30k-underceiling-indoor-unit", display_order: 5, is_active: true },
  { name: "Cassette Type", category: "Commercial", type: "Cassette Type", models: "Optima Cassette", description: "Ceiling cassette systems for commercial areas.", image_url: "https://strapi.carrier.com.ph/uploads/Image_25_b12cf24e90.png", display_order: 6, is_active: true },
  { name: "VRF", category: "Commercial", type: "VRF", models: "XCT7 System", description: "Variable refrigerant flow system solutions.", image_url: "https://strapi.carrier.com.ph/uploads/Image_11_4f19e889a4.png", display_order: 7, is_active: true },
];

export const defaultBrands: CatalogBrand[] = ["Carrier", "Midea", "Toshiba", "Condura", "Panasonic", "Mitsubishi", "LG", "Daikin", "Samsung", "Koppel", "Kolin"].map((name, index) => ({ name, logo_url: `/assets/brands/${name.toLowerCase() === "mitsubishi" ? "mitsubishi.svg" : name.toLowerCase() === "toshiba" || name.toLowerCase() === "koppel" ? `${name.toLowerCase()}.svg` : `${name.toLowerCase()}.png`}`, display_order: index + 1, is_active: true }));


export type SiteContent = {
  navItems: string[];
  company: {
    name: string;
    tagline: string;
    footerDescription: string;
    registrationLabel: string;
  };
  topBar: {
    badgeLabel: string;
    location: string;
    hours: string;
    phoneLabel: string;
    phoneHref: string;
  };
  social: {
    facebook: string;
    messenger: string;
    adminFacebook: string;
    email: string;
  };
  hero: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    image: string;
  };
  about: {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    buttonLabel: string;
    image: string;
    highlights: Array<{
      title: string;
      text: string;
    }>;
  };
  servicesHeading: {
    eyebrow: string;
    titleLeft: string;
    titleRight: string;
    description: string;
  };
  services: ServiceItem[];
  contactInfo: ContactInfoItem[];
  inquiryOptions: string[];
  supportPoints: SupportPointItem[];
  testimonials: TestimonialItem[];
};

export const defaultSiteContent: SiteContent = {
  navItems: [
    "Home",
    "About Us",
    "Services",
    "Products",
    "Projects",
    "Contact Us",
    "Feedback",
  ],
  company: {
    name: "PARALLEL AIRE",
    tagline: "Aircon Sales, Parts, Installation Service, Maintenance",
    footerDescription:
      "Your trusted partner for aircon sales, installation, and maintenance. We deliver quality service that keeps you cool and comfortable.",
    registrationLabel: "DTI & BIR Registered",
  },
  topBar: {
    badgeLabel: "Carrier Air Authority Center",
    location: "San Jose del Monte, Bulacan",
    hours: "Open Daily 9:00 AM-6:00 PM",
    phoneLabel: "0999 223 6272",
    phoneHref: "tel:09992236272",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61559878689817",
    messenger: "https://m.me/61559878689817",
    adminFacebook: "https://www.facebook.com/parallel.aire",
    email: "admin@parallelaire.com",
  },
  hero: {
    eyebrow: "Cool Comfort. Expert Care.",
    titleLineOne: "Your Trusted",
    titleLineTwo: "Aircon Partner",
    description:
      "We provide high-quality aircon units, genuine parts, professional installation, and reliable maintenance services for homes, businesses, and industries.",
    primaryCta: "OUR SERVICES",
    secondaryCta: "BROWSE PRODUCTS",
    image: "/hero-premium.png",
  },
  about: {
    eyebrow: "ABOUT PARALLEL AIRE",
    titleLineOne: "Comfort made simple.",
    titleLineTwo: "Service made reliable.",
    description:
      "Parallel Aire provides dependable air conditioning solutions for homes and businesses-from choosing the right unit to installation, maintenance, and after-sales support.",
    buttonLabel: "Learn More About Us",
    image: "/about-us-image.png",
    highlights: [
      { title: "Sales & Parts", text: "Aircon units and genuine parts" },
      { title: "Installation", text: "Residential & commercial solutions" },
      { title: "Maintenance", text: "Reliable care and servicing" },
    ],
  },
  servicesHeading: {
    eyebrow: "WHAT WE DO",
    titleLeft: "Our",
    titleRight: "Services",
    description:
      "From quality products to expert installation and maintenance, we provide complete aircon solutions you can trust.",
  },
  services: [
    {
      title: "Aircon Sales",
      text: "Wide selection of trusted brands and high-quality airconditioning units.",
      image: "/service-air-sales.jpg",
      badge: "Cooling",
      icon: "snow",
      iconImage: "/service-air-sales.png",
    },
    {
      title: "Parts Sales",
      text: "Genuine and high-quality aircon parts for all brands and models.",
      image: "/service-parts.jpg",
      badge: "Parts",
      icon: "gear",
      iconImage: "/service-parts.png",
    },
    {
      title: "Installation Services",
      text: "Professional installation for residential, commercial, and industrial spaces.",
      image: "/install.jpg",
      badge: "Install",
      icon: "tools",
      iconImage: "/service-install.png",
    },
    {
      title: "Maintenance Services",
      text: "Regular cleaning and maintenance to keep your aircon running efficiently.",
      image: "/maintenance.jpg",
      badge: "Maintain",
      icon: "shield",
      iconImage: "/service-maintenance-shield.png",
    },
  ],
  contactInfo: [
    {
      title: "Email",
      value: "admin@parallelaire.com",
      detail: "We'll get back to you as soon as possible.",
      icon: "mail",
    },
    {
      title: "Phone",
      value: "0999 223 6272",
      detail: "Call us for quick assistance.",
      icon: "phone",
    },
    {
      title: "Address",
      value: "National Highway, San Jose del Monte, Philippines, 3023",
      detail: "Visit our office.",
      icon: "map-pin",
    },
    {
      title: "Business Hours",
      value: "9:00 AM - 6:00 PM Daily",
      detail: "We're open every day to serve you better.",
      icon: "clock3",
    },
  ],
  inquiryOptions: [
    "Aircon Sales",
    "Parts Sales",
    "Installation Services",
    "Maintenance Services",
    "General Inquiry",
  ],
  supportPoints: [
    {
      title: "Quick Response",
      detail: "We reply to all inquiries promptly.",
      icon: "message-circle",
    },
    {
      title: "Trusted Service",
      detail: "Your satisfaction is our priority.",
      icon: "shield-check",
    },
    {
      title: "Expert Support",
      detail: "Our team is ready to assist you.",
      icon: "headset",
    },
  ],
  testimonials: [
    {
      quote:
        "Professional installation and very accommodating team. Our aircon works perfectly! Highly recommended.",
      author: "Raymond D.",
      place: "San Jose del Monte, Bulacan",
    },
    {
      quote:
        "Genuine products and affordable prices. Their after-sales service is excellent.",
      author: "Maria Teresa L.",
      place: "Quezon City",
    },
    {
      quote:
        "Quick response and reliable service. They handled our installation perfectly.",
      author: "Carlo A.",
      place: "Manila",
    },
  ],
};

export const defaultCatalogServices: CatalogService[] = defaultSiteContent.services.map((service, index) => ({
  name: service.title, description: service.text, image_url: service.image,
  cta_text: "LEARN MORE", display_order: index + 1, is_active: true,
}));

let browserClient: SupabaseClient | null = null;

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClient;
}

export async function loadPublicSiteContent() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return defaultSiteContent;
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("content")
    .eq("slug", "home")
    .maybeSingle();

  if (error || !data?.content) {
    return defaultSiteContent;
  }

  return {
    ...defaultSiteContent,
    ...(data.content as Partial<SiteContent>),
  };
}

export async function saveSiteContent(content: SiteContent) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  const { error } = await supabase.from("site_content").upsert(
    {
      slug: "home",
      content,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );

  if (error) {
    throw error;
  }
}

export async function signInToCms(email: string, password: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
}

export async function signOutFromCms() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return;
  }

  await supabase.auth.signOut();
}

export async function getCmsSession() {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}

export async function uploadCmsAsset(file: File, folder = "general") {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Use a JPG, PNG, or WEBP image.");
  }
  const limit = folder === "brands" ? 1024 * 1024 : 5 * 1024 * 1024;
  if (!file.size || file.size > limit) {
    throw new Error(folder === "brands" ? "Logo must be between 1 byte and 1 MB." : "Image must be between 1 byte and 5 MB.");
  }
  if (!["hero", "about", "products", "services", "brands", "projects", "general", "cms"].includes(folder)) throw new Error("Unsupported media folder.");
  const { data: allowed, error: permissionError } = await supabase.rpc("is_cms_admin");
  if (permissionError || !allowed) throw new Error("An approved CMS admin account is required to upload media.");
  // Decode before uploading to reject files with a false image MIME type.
  const bitmap = await createImageBitmap(file);
  bitmap.close();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filePath = `${folder}/${crypto.randomUUID()}-${sanitizedName}`;

  const { error } = await supabase.storage
    .from("site-assets")
    .upload(filePath, file, { upsert: false, contentType: file.type, cacheControl: "31536000" });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("site-assets").getPublicUrl(filePath);
  return data.publicUrl;
}

type CatalogTable = "products" | "services" | "brands";
const catalogFallbacks = { products: defaultProducts, services: defaultCatalogServices, brands: defaultBrands } as const;

export async function loadPublicCatalog<T extends CatalogProduct | CatalogService | CatalogBrand>(table: CatalogTable): Promise<T[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return catalogFallbacks[table] as T[];
  const { data, error } = await supabase.from(table).select("*").eq("is_active", true).order("display_order");
  return error || !data?.length ? (catalogFallbacks[table] as T[]) : (data as T[]);
}

export async function loadAdminCatalog<T extends CatalogProduct | CatalogService | CatalogBrand>(table: CatalogTable): Promise<T[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase environment variables are missing.");
  const { data, error } = await supabase.from(table).select("*").order("display_order");
  if (error) throw error;
  return (data ?? []) as T[];
}

export async function saveCatalogItem(table: CatalogTable, item: CatalogProduct | CatalogService | CatalogBrand) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase environment variables are missing.");
  const payload = { ...item, updated_at: new Date().toISOString() };
  const { error } = item.id ? await supabase.from(table).update(payload).eq("id", item.id) : await supabase.from(table).insert(payload);
  if (error) throw error;
}

export async function deleteCatalogItem(table: CatalogTable, id: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase environment variables are missing.");
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

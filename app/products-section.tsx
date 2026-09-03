"use client";

import type { CatalogProduct } from "../lib/site-content";

const defaultProductGroups = [
  {
    id: "residential",
    label: "Residential",
    cards: [
      {
        name: "Wall Mounted",
        models: "Optima • Aura",
        image:
          "https://strapi.carrier.com.ph/uploads/Image_23_12aadcdd46.png",
        alt: "Carrier wall mounted split type air conditioner for residential use",
      },
      {
        name: "Window Type",
        models: "Optima • Aura",
        image:
          "https://strapi.carrier.com.ph/uploads/CAR_Optima_Inverter_0_75_HP_1_0_HP_1_45ec258d94.png",
        alt: "Carrier window type air conditioner product image",
      },
      {
        name: "Floor Mounted",
        models: "Slim • Opus",
        image:
          "https://strapi.carrier.com.ph/uploads/carrier_opus_668a980c25.webp",
        alt: "Carrier floor mounted air conditioner product image",
      },
    ],
  },
  {
    id: "commercial",
    label: "Commercial",
    cards: [
      {
        name: "Floor Mounted",
        models: "Optima",
        image:
          "https://strapi.carrier.com.ph/uploads/Image_20_ea0469d063.png",
        alt: "Carrier commercial floor mounted air conditioner",
      },
      {
        name: "Under Ceiling",
        models: "Commercial Series",
        image:
          "https://brandportal.carrier.com/transform/da527147-7b33-49da-ba3f-fcf331fb7c82/carrier-40vmu-30k-underceiling-indoor-unit",
        alt: "Carrier under ceiling air conditioner indoor unit",
      },
      {
        name: "Cassette Type",
        models: "Optima Cassette",
        image:
          "https://strapi.carrier.com.ph/uploads/Image_25_b12cf24e90.png",
        alt: "Carrier cassette type air conditioner product image",
      },
      {
        name: "VRF",
        models: "XCT7 System",
        image:
          "https://strapi.carrier.com.ph/uploads/Image_11_4f19e889a4.png",
        alt: "Carrier VRF outdoor air conditioning system",
      },
    ],
  },
] as const;

function ProductCard({
  name,
  models,
  image,
  alt,
}: {
  name: string;
  models: string;
  image: string;
  alt: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-[#DDE6F1] bg-white p-4 shadow-[0_12px_28px_rgba(15,35,89,0.06)]">
      <div className="flex min-h-[250px] items-center justify-center rounded-[16px] bg-[linear-gradient(180deg,#FAFCFF_0%,#F1F6FE_100%)] p-6">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-[190px] w-full object-contain object-center"
        />
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-left text-[24px] font-bold leading-tight text-[#08275B]">
          {name}
        </h3>
        <p className="mt-2 text-left text-[15px] font-semibold tracking-[0.02em] text-[#1557C8]">
          {models}
        </p>
        <a
          href="#contact-us"
          className="mt-auto pt-6 text-left text-[15px] font-semibold text-[#1262D6] transition hover:text-[#0F4FB2]"
        >
          View / Inquire
        </a>
      </div>
    </article>
  );
}

export default function ProductsSection({ products }: { products?: CatalogProduct[] }) {
  const fallbackProducts: CatalogProduct[] = defaultProductGroups.flatMap((group, groupIndex) =>
    group.cards.map((card, cardIndex) => ({
      name: card.name, category: group.label, type: card.name, models: card.models,
      description: "", image_url: card.image, display_order: groupIndex * 10 + cardIndex, is_active: true,
    })),
  );
  const activeProducts = products ?? fallbackProducts;
  const productGroups = [
    { id: "residential", label: "Residential", cards: activeProducts.filter((item) => item.category === "Residential") },
    { id: "commercial", label: "Commercial", cards: activeProducts.filter((item) => item.category === "Commercial") },
  ];
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

      <div className="mt-14 space-y-14">
        {productGroups.map((group) => (
          <div key={group.id}>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[3px] w-10 rounded-full bg-[#F58220]" />
              <h3 className="text-[24px] font-bold uppercase tracking-[0.04em] text-[#08275B]">
                {group.label}
              </h3>
            </div>

            <div
              className={`grid gap-6 ${
                group.cards.length === 3
                  ? "md:grid-cols-2 xl:grid-cols-3"
                  : "md:grid-cols-2 xl:grid-cols-4"
              }`}
            >
              {group.cards.map((card) => (
                <ProductCard key={card.id ?? `${group.id}-${card.name}-${card.display_order}`} name={card.name} models={card.models} image={card.image_url} alt={`${card.name} air conditioning product`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

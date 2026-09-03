"use client";

const guides: Record<string, { title: string; steps: string[] }> = {
  general: { title: "CMS Manual / Paano gamitin", steps: [
    "Pumili ng section sa kaliwa, saka baguhin ang fields. Hindi direktang nae-edit ang text sa website preview.",
    "Hero, About, Contact at Footer: pindutin ang Save changes sa itaas para i-publish. Walang automatic save.",
    "Products, Services at Brands: buksan ang card, mag-edit, saka Apply changes. Direktang napu-publish ang item na iyon.",
    "Gamitin ang Desktop, Tablet at Mobile buttons para tingnan ang preview. View live ang magbubukas ng public website; i-refresh ito pagkatapos mag-save.",
    "Huwag mag-refresh o mag-sign out habang may hindi pa nai-save. Kapag may error, basahin ang message at huwag munang isara ang editor.",
  ] },
  hero: { title: "Gabay: Hero", steps: ["Ito ang unang banner ng website. Eyebrow ang maliit na text sa ibabaw ng headline.", "Halimbawa ng headline: Your Trusted / Aircon Partner. Panatilihing maikli ang dalawang linya.", "Palitan ang description o photo, tingnan ang preview, saka Save changes."] },
  "about-us": { title: "Gabay: About", steps: ["Ilagay ang pagpapakilala ng kumpanya sa heading at description.", "Pumili ng totoong company o service photo. Pagkatapos mag-edit, pindutin ang Save changes."] },
  products: { title: "Gabay: Products", steps: ["Pindutin ang existing card para baguhin ito, o Add product para gumawa ng bago.", "Physical products lang. Halimbawa: Wall Mounted; Residential; models: Optima / Aura. Huwag maglagay ng hindi kumpirmadong specifications.", "Piliin ang photo at display order, saka Apply changes para i-publish ang item."] },
  services: { title: "Gabay: Services", steps: ["Pumili ng service card o Add service. Halimbawa: Installation Services at maikling paliwanag ng serbisyo.", "Gumamit ng photo na tugma sa service. Apply changes ang nagse-save at nagpu-publish ng item."] },
  brands: { title: "Gabay: Brands We Service", steps: ["Pumili ng brand o Add brand. Ilagay ang tamang brand name at official logo.", "Transparent PNG o WEBP ang magandang gamitin. Logo upload limit: 1 MB. Apply changes para i-publish."] },
  projects: { title: "Gabay: Projects", steps: ["Hindi pa nakakabit sa CMS ang pag-edit ng Projects. Huwag gamitin ang brand cards para mag-edit ng project.", "Ang kasalukuyang project photos at descriptions ay nasa website files pa."] },
  "contact-us": { title: "Gabay: Contact", steps: ["Email: admin@parallelaire.com. Sa email field, address lang; huwag lagyan ng mailto:.", "Facebook at Messenger: ilagay ang buong https:// link. Halimbawa: https://m.me/61559878689817.", "Save changes pagkatapos mag-edit. I-check sa View live ang contact areas at links; may ilang business details na nasa website files pa."] },
  footer: { title: "Gabay: Footer", steps: ["Footer description ang maikling company introduction sa pinakababa.", "Registration label: DTI & BIR Registered. Save changes para i-publish. Contact email ay nasa Contact panel."] },
  catalog: { title: "Gabay: Pag-save ng card", steps: ["Display order: mas mababang numero, mas nauuna. Halimbawa: 1 bago 2.", "Published ang visibility setting. Apply changes ang magse-save ng fields, photo at visibility sa live site.", "Cancel o X: hindi ise-save ang edits ng card. Ang na-upload na file ay mananatili sa Media Library.", "Delete: buburahin ang catalog record pagkatapos ng confirmation. Hindi nito binubura ang image file sa Storage. Walang undo button.", "Limitasyon ngayon: kapag walang active items sa isang catalog, maaaring bumalik ang default website cards. Huwag muna gamitin ito para itago ang buong section."] },
  media: { title: "Gabay: Photos / Upload", steps: ["Upload o Replace: pumili ng JPG, PNG o WEBP mula sa device. Maximum 5 MB; brand logos maximum 1 MB.", "Hintaying matapos ang upload. Ang file ay mapupunta sa Supabase Storage, hindi sa GitHub.", "Choose from Media: gamitin ulit ang photo na nasa Supabase. Kung empty, mag-upload muna gamit ang Upload o Replace.", "Remove: aalisin lang ang napiling photo sa field, hindi buburahin ang file sa Storage.", "Pagkatapos pumili o mag-upload, kailangan pa rin ang Save changes o Apply changes para magamit ito sa live website."] },
};

export const fieldHelp: Record<string, string> = {
  Price: "Optional. Halimbawa: ₱25,999. Iwanang blank o burahin ang laman para walang presyong ipakita. Apply changes para i-save.",
  Eyebrow: "Maliit na text sa ibabaw ng main heading.",
  "Display order": "Numero ng pagkakasunod: 1 ang una, kasunod ang 2.",
  "Models / variants": "Mga kumpirmadong model lang. Halimbawa: Optima / Aura.",
  "Product type": "Halimbawa: Wall Mounted, Window Type o Cassette Type.",
  Email: "Email address lang, walang mailto: prefix.",
  Password: "Password ng CMS account, hindi password ng Supabase dashboard.",
  "Facebook URL": "Buong Facebook page link, nagsisimula sa https://.",
  "Messenger URL": "Buong Messenger link: https://m.me/PAGE_ID.",
};

export default function EditorGuide({ topic = "general" }: { topic?: string }) {
  const guide = guides[topic] ?? guides.general;
  return <details className="rounded-lg border border-[#D8E2F0] bg-[#F5F8FC] p-3 text-[#08275B]">
    <summary className="cursor-pointer text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1557C8]">{guide.title}</summary>
    <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-relaxed">{guide.steps.map(step => <li key={step}>{step}</li>)}</ol>
  </details>;
}

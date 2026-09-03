"use client";

import { useState } from "react";
import EditorGuide from "./editor-guide";
import { getSupabaseBrowserClient } from "../../lib/site-content";

type Asset = { path: string; url: string };

export default function MediaLibrary({ onSelect }: { onSelect: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setOpen(true);
    setLoading(true);
    setError("");
    try {
      const client = getSupabaseBrowserClient();
      if (!client) throw new Error("Supabase is not configured.");
      const bucket = client.storage.from("site-assets");
      const found: Asset[] = [];
      const folders = [""];
      while (folders.length) {
        const folder = folders.shift()!;
        let offset = 0;
        while (true) {
          const { data, error: failure } = await bucket.list(folder, { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
          if (failure) throw failure;
          for (const entry of data ?? []) {
            const path = folder ? `${folder}/${entry.name}` : entry.name;
            if (!entry.id) folders.push(path);
            else if (/\.(jpe?g|png|webp|svg)$/i.test(path)) found.push({ path, url: bucket.getPublicUrl(path).data.publicUrl });
          }
          if (!data || data.length < 100) break;
          offset += 100;
        }
      }
      setAssets(found);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load Storage images.");
    } finally { setLoading(false); }
  }

  return <>
    <button type="button" onClick={() => void load()} className="rounded-lg border px-3 py-2 text-xs font-bold">Choose from Media</button>
    {open && <div role="dialog" aria-modal="true" aria-label="Supabase media library" className="fixed inset-0 z-[80] overflow-auto bg-white p-6 text-[#08275B]">
      <div className="flex items-center justify-between"><h2 className="text-xl font-bold">Media Library</h2><button type="button" onClick={() => setOpen(false)}>Close</button></div>
      <p className="my-3 text-sm">Select an existing Supabase image to reuse it.</p>
      <div className="mb-4 max-w-xl"><EditorGuide topic="media" /></div>
      {loading && <p role="status">Loading images...</p>}
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {!loading && !error && !assets.length && <p>No uploaded images yet. Use Upload or Replace to add one.</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{assets.map(asset => <button type="button" key={asset.path} onClick={() => { onSelect(asset.url); setOpen(false); }} className="rounded-xl border p-3 text-left">
        <img src={asset.url} alt={asset.path.split('/').pop()} loading="lazy" className="h-32 w-full object-contain" />
        <span className="mt-2 block break-all text-xs">{asset.path}</span>
      </button>)}</div>
    </div>}
  </>;
}

"use client";

import { useEffect, useState } from "react";
import {
  defaultSiteContent,
  getCmsSession,
  loadPublicSiteContent,
  saveSiteContent,
  signInToCms,
  signOutFromCms,
  uploadCmsAsset,
  type SiteContent,
} from "../../lib/site-content";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-[#08275B]">{children}</h2>;
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-[#08275B]">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-[120px] rounded-xl border border-[#D5DFED] px-4 py-3 text-sm text-[#08275B] outline-none focus:border-[#1557C8]"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 rounded-xl border border-[#D5DFED] px-4 text-sm text-[#08275B] outline-none focus:border-[#1557C8]"
        />
      )}
    </label>
  );
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      const session = await getCmsSession();
      const loadedContent = await loadPublicSiteContent();

      if (!isMounted) return;

      setContent(loadedContent);
      setIsAuthenticated(Boolean(session));
      setIsLoading(false);
    };

    void initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateContent = (updater: (current: SiteContent) => SiteContent) => {
    setContent((current) => updater(current));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Signing in...");

    try {
      await signInToCms(email, password);
      setIsAuthenticated(true);
      setStatus("Signed in successfully.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to sign in.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatus("Saving content...");

    try {
      await saveSiteContent(content);
      setStatus("Content saved to Supabase.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to save content.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOutFromCms();
    setIsAuthenticated(false);
    setStatus("Signed out.");
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (url: string) => void,
    folder: string,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("Uploading image...");

    try {
      const url = await uploadCmsAsset(file, folder);
      onUploaded(url);
      setStatus("Image uploaded.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Upload failed.");
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] px-4 py-10 text-[#08275B]">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
          Loading CMS...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F5F8FC] px-4 py-10 text-[#08275B]">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
          <h1 className="text-2xl font-bold">Parallel Aire CMS</h1>
          <p className="mt-3 text-sm leading-6 text-[#64748B]">
            Sign in with your Supabase CMS account to edit the live site content.
          </p>
          <form className="mt-6 grid gap-4" onSubmit={handleLogin}>
            <Field label="Email" value={email} onChange={setEmail} />
            <Field label="Password" value={password} onChange={setPassword} />
            <button
              type="submit"
              className="h-12 rounded-xl bg-[#1557C8] text-sm font-bold text-white"
            >
              Sign In
            </button>
          </form>
          {status ? <p className="mt-4 text-sm text-[#64748B]">{status}</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] px-4 py-10 text-[#08275B]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Parallel Aire CMS</h1>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              This admin page is part of the deployed site. Content saves to Supabase.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="h-11 rounded-xl bg-[#1557C8] px-5 text-sm font-bold text-white disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="h-11 rounded-xl border border-[#D5DFED] px-5 text-sm font-bold text-[#08275B]"
            >
              Sign Out
            </button>
          </div>
        </div>

        {status ? (
          <div className="rounded-2xl border border-[#D5DFED] bg-white px-5 py-4 text-sm text-[#64748B]">
            {status}
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
            <SectionTitle>Company</SectionTitle>
            <Field
              label="Company Name"
              value={content.company.name}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  company: { ...current.company, name: value },
                }))
              }
            />
            <Field
              label="Tagline"
              value={content.company.tagline}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  company: { ...current.company, tagline: value },
                }))
              }
            />
            <Field
              label="Footer Description"
              value={content.company.footerDescription}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  company: { ...current.company, footerDescription: value },
                }))
              }
              multiline
            />
            <Field
              label="Registration Label"
              value={content.company.registrationLabel}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  company: { ...current.company, registrationLabel: value },
                }))
              }
            />
          </div>

          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
            <SectionTitle>Top Bar and Social</SectionTitle>
            <Field
              label="Badge Label"
              value={content.topBar.badgeLabel}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  topBar: { ...current.topBar, badgeLabel: value },
                }))
              }
            />
            <Field
              label="Location"
              value={content.topBar.location}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  topBar: { ...current.topBar, location: value },
                }))
              }
            />
            <Field
              label="Hours"
              value={content.topBar.hours}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  topBar: { ...current.topBar, hours: value },
                }))
              }
            />
            <Field
              label="Phone Label"
              value={content.topBar.phoneLabel}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  topBar: { ...current.topBar, phoneLabel: value },
                }))
              }
            />
            <Field
              label="Phone Link"
              value={content.topBar.phoneHref}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  topBar: { ...current.topBar, phoneHref: value },
                }))
              }
            />
            <Field
              label="Facebook Page URL"
              value={content.social.facebook}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  social: { ...current.social, facebook: value },
                }))
              }
            />
            <Field
              label="Messenger URL"
              value={content.social.messenger}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  social: { ...current.social, messenger: value },
                }))
              }
            />
            <Field
              label="Email Address"
              value={content.social.email}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  social: { ...current.social, email: value },
                }))
              }
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
            <SectionTitle>Hero</SectionTitle>
            <Field
              label="Eyebrow"
              value={content.hero.eyebrow}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  hero: { ...current.hero, eyebrow: value },
                }))
              }
            />
            <Field
              label="Headline Line 1"
              value={content.hero.titleLineOne}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  hero: { ...current.hero, titleLineOne: value },
                }))
              }
            />
            <Field
              label="Headline Line 2"
              value={content.hero.titleLineTwo}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  hero: { ...current.hero, titleLineTwo: value },
                }))
              }
            />
            <Field
              label="Hero Description"
              value={content.hero.description}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  hero: { ...current.hero, description: value },
                }))
              }
              multiline
            />
            <Field
              label="Hero Image URL"
              value={content.hero.image}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  hero: { ...current.hero, image: value },
                }))
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                void handleImageUpload(
                  event,
                  (url) =>
                    updateContent((current) => ({
                      ...current,
                      hero: { ...current.hero, image: url },
                    })),
                  "hero",
                )
              }
            />
          </div>

          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
            <SectionTitle>About</SectionTitle>
            <Field
              label="About Eyebrow"
              value={content.about.eyebrow}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  about: { ...current.about, eyebrow: value },
                }))
              }
            />
            <Field
              label="About Title Line 1"
              value={content.about.titleLineOne}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  about: { ...current.about, titleLineOne: value },
                }))
              }
            />
            <Field
              label="About Title Line 2"
              value={content.about.titleLineTwo}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  about: { ...current.about, titleLineTwo: value },
                }))
              }
            />
            <Field
              label="About Description"
              value={content.about.description}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  about: { ...current.about, description: value },
                }))
              }
              multiline
            />
            <Field
              label="About Image URL"
              value={content.about.image}
              onChange={(value) =>
                updateContent((current) => ({
                  ...current,
                  about: { ...current.about, image: value },
                }))
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                void handleImageUpload(
                  event,
                  (url) =>
                    updateContent((current) => ({
                      ...current,
                      about: { ...current.about, image: url },
                    })),
                  "about",
                )
              }
            />
          </div>
        </div>

        <div className="space-y-6 rounded-3xl bg-white p-8 shadow-[0_20px_40px_rgba(15,35,89,0.08)]">
          <SectionTitle>Raw JSON Editor</SectionTitle>
          <p className="text-sm leading-6 text-[#64748B]">
            For arrays like services, contact info, support points, and testimonials, edit the
            JSON below. This keeps the CMS simple while still letting the deployed site manage
            richer content.
          </p>
          <textarea
            value={JSON.stringify(content, null, 2)}
            onChange={(event) => {
              try {
                setContent(JSON.parse(event.target.value) as SiteContent);
                setStatus("JSON updated locally.");
              } catch {
                setStatus("JSON has a syntax error. Fix it before saving.");
              }
            }}
            className="min-h-[420px] w-full rounded-2xl border border-[#D5DFED] px-4 py-3 font-mono text-sm text-[#08275B] outline-none focus:border-[#1557C8]"
          />
        </div>
      </div>
    </main>
  );
}

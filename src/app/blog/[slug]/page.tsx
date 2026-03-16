/**
 * Blog Post Detail Page
 * Dynamic route: /blog/[slug]
 * Reads from shared Supabase blog_posts table (brand = 'overwater')
 */

import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const revalidate = 3600;

/** Strip dangerous tags/attributes from blog HTML to prevent XSS */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^>]*\/?>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "")
    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    .replace(/javascript\s*:/gi, "");
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  category: string;
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  published_at: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_title, meta_description, excerpt")
    .eq("slug", slug)
    .eq("brand", "overwater")
    .eq("published", true)
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("brand", "overwater")
    .eq("published", true)
    .single();

  if (!post) notFound();

  const p = post as BlogPost;

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8e0d0]">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-[#c9a55a] hover:underline text-sm">
            ← Back to Journal
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <p className="text-[#c9a55a] text-xs uppercase tracking-wide mb-3">
            {p.category}
            {p.published_at && (
              <span className="text-[#5a5a6a] ml-2">
                ·{" "}
                {new Date(p.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#e8e0d0] leading-tight">
            {p.title}
          </h1>
          <p className="text-[#8a7a6a] mt-3">By {p.author}</p>
        </header>

        {/* Cover Image */}
        {p.cover_image && (
          <div className="aspect-video rounded-xl overflow-hidden mb-10 relative">
            <Image
              src={p.cover_image}
              alt={p.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {/* Content — sanitized to prevent XSS */}
        <div
          className="prose prose-invert prose-amber max-w-none
            prose-headings:text-[#c9a55a]
            prose-p:text-[#c8c0b0] prose-p:leading-relaxed
            prose-a:text-[#c9a55a] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#e8e0d0]
            prose-li:text-[#c8c0b0]"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(p.content) }}
        />

        {/* Tags */}
        {p.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#c9a55a1a]">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#c9a55a1a] text-[#c9a55a] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Ecosystem CTA */}
        <div className="mt-12 bg-[#1a1a2e] border border-[#c9a55a33] rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#c9a55a] mb-3">
            Continue Your Journey
          </h2>
          <p className="text-[#8a7a6a] mb-6">
            Discover your element and find your place overwater.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/quiz"
              className="px-5 py-2.5 bg-[#c9a55a] text-[#0a0a1a] rounded-lg font-semibold hover:bg-[#d4b36a] transition text-sm"
            >
              Element Quiz
            </Link>
            <Link
              href="https://magic.overwater.com?utm_source=overwater&utm_medium=blog&utm_campaign=ecosystem"
              className="px-5 py-2.5 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cosmic Blueprint ✦
            </Link>
            <Link
              href="https://linapoint.com?utm_source=overwater&utm_medium=blog&utm_campaign=ecosystem"
              className="px-5 py-2.5 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book at Lina Point ↗
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

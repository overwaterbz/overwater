/**
 * Overwater Blog — Auto-populated from ecosystem marketing crew
 * Reads published blog_posts where brand = 'overwater' from shared Supabase
 */

import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string | null;
  author: string;
  category: string;
  tags: string[];
  published_at: string;
}

export const revalidate = 3600; // ISR: revalidate every hour

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image, author, category, tags, published_at")
    .eq("brand", "overwater")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  return (
    <main className="min-h-screen bg-[#0a0a1a] text-[#e8e0d0]">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#c9a55a] mb-4">
          The Overwater Journal
        </h1>
        <p className="text-[#8a7a6a] max-w-xl mx-auto text-lg">
          Stories of elemental living, fractional paradise, and the soul&apos;s journey overwater.
        </p>
      </section>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(posts as BlogPost[]).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-[#1a1a2e] border border-[#c9a55a1a] rounded-xl overflow-hidden hover:border-[#c9a55a44] transition"
              >
                {post.cover_image && (
                  <div className="aspect-video bg-[#0d0d20] overflow-hidden relative">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-[#c9a55a] text-xs uppercase tracking-wide mb-2">
                    {post.category}
                    {post.published_at && (
                      <span className="text-[#5a5a6a] ml-2">
                        · {new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    )}
                  </p>
                  <h2 className="text-xl font-semibold text-[#e8e0d0] group-hover:text-[#c9a55a] transition mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[#8a7a6a] text-sm line-clamp-3">{post.excerpt}</p>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-[#c9a55a1a] text-[#c9a55a] px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#5a5a6a] text-lg">Journal entries are being crafted by our AI storytellers.</p>
            <p className="text-[#3a3a4a] text-sm mt-2">Check back soon — new content publishes daily.</p>
          </div>
        )}
      </section>

      {/* Ecosystem CTA */}
      <section className="bg-[#1a1a2e] border-t border-[#c9a55a1a] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-[#c9a55a] mb-4">Begin Your Journey</h2>
        <p className="text-[#8a7a6a] max-w-lg mx-auto mb-8">
          Discover your element, explore your cosmic blueprint, and find your place overwater.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/quiz"
            className="px-6 py-3 bg-[#c9a55a] text-[#0a0a1a] rounded-lg font-semibold hover:bg-[#d4b36a] transition"
          >
            Take the Element Quiz
          </Link>
          <Link
            href="https://linapoint.com?utm_source=overwater&utm_medium=blog&utm_campaign=ecosystem"
            className="px-6 py-3 border border-[#c9a55a44] text-[#c9a55a] rounded-lg font-semibold hover:bg-[#c9a55a11] transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book at Lina Point ↗
          </Link>
        </div>
      </section>
    </main>
  );
}

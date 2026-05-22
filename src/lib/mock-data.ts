import type { Scan } from "./types";

export const MOCK_SCAN: Scan = {
  id: "mock-scan-001",
  user_id: "mock-user-001",
  url: "https://example.com",
  status: "complete",
  score: 52,
  issues_critical: [
    {
      title: "Your website loads too slowly on phones",
      description:
        "When someone finds you on their phone, your website takes over 9 seconds to fully load. Most people give up after 3 seconds and go to a competitor instead. You're losing visitors before they even see what you offer.",
      fix_simple:
        "1. Ask your web developer to compress all images on your site\n2. Remove any videos that auto-play when the page loads\n3. Ask if your hosting plan is fast enough — a slow host makes everything slow\n4. Check if you have any plugins or widgets you're not actually using and remove them",
      fix_technical:
        "LCP is 9.1s (target: <2.5s). Primary causes:\n- Unoptimized hero image: 4.2MB PNG, should be WebP ≤200KB\n- No CDN configured — assets served from origin (us-east-1)\n- Render-blocking CSS: 3 external stylesheets in <head>\n- No resource hints (preconnect, prefetch)\n\nFix:\n1. Convert images to WebP with sharp/squoosh, add width/height attrs\n2. Enable CDN (Cloudflare/Vercel Edge)\n3. Inline critical CSS, defer non-critical with media=\"print\" hack\n4. Add <link rel=\"preconnect\"> for Google Fonts and analytics domains",
    },
    {
      title: "Google is getting distracted by pages that shouldn't exist",
      description:
        "Your website has dozens of pages that serve no purpose — old tags, empty categories, and duplicate content. Google is spending its limited time crawling these junk pages instead of the ones that actually matter to your business.",
      fix_simple:
        "1. Look at your website's sitemap (usually at yoursite.com/sitemap.xml)\n2. Check if there are pages listed that don't matter to customers\n3. Ask your developer to add 'noindex' tags to pages like tag archives, author pages, and empty categories\n4. If you have duplicate pages (same content, different URLs), pick one and redirect the others",
      fix_technical:
        "Crawl budget waste detected: 47 indexable URLs are thin/duplicate content.\n- 18 tag archive pages with <50 words each\n- 12 paginated archive pages with duplicate meta\n- 9 parameter URLs (?sort=, ?filter=) not blocked by robots.txt\n- 8 author archive pages (single author site)\n\nFix:\n1. Add <meta name=\"robots\" content=\"noindex, follow\"> to tag/author archives\n2. Add rel=\"canonical\" to paginated pages pointing to page 1\n3. Block parameter URLs in robots.txt: Disallow: /*?sort= /*?filter=\n4. Submit updated sitemap via GSC after cleanup",
    },
  ],
  issues_improve: [
    {
      title: "AI assistants don't know enough about you to recommend you",
      description:
        "When potential customers ask ChatGPT, Google AI, or other AI assistants for recommendations in your industry, you're not being mentioned. Your website doesn't provide the structured information these AI systems need to understand and recommend your business.",
      fix_simple:
        "1. Add a clear, detailed 'About' page that explains what you do, who you serve, and what makes you different\n2. Add FAQ sections to your main service pages answering common customer questions\n3. Make sure your business name, address, and phone number are consistent everywhere online\n4. Ask satisfied customers to leave reviews on Google and industry-specific sites",
      fix_technical:
        "GEO (Generative Engine Optimization) gaps identified:\n- No Schema.org JSON-LD markup (Organization, LocalBusiness, FAQPage)\n- About page: 42 words, no E-E-A-T signals\n- No structured FAQ content on service pages\n- Missing: author bios, publication dates, citation sources\n- NAP inconsistency across 3 directories\n\nFix:\n1. Add JSON-LD: Organization + LocalBusiness + FAQPage schemas\n2. Expand About page with founder story, credentials, awards, team\n3. Add 5-8 FAQ items per service page in <details> elements with FAQPage schema\n4. Add author markup with rel=\"author\" and bio snippets\n5. Audit and fix NAP on Yelp, BBB, and industry directories",
    },
    {
      title: "People can't find you when they search in your area",
      description:
        "When someone nearby searches for the services you offer, your competitors show up but you don't. Your website is missing key local signals that help search engines connect you to customers in your area.",
      fix_simple:
        "1. Claim and fully complete your Google Business Profile if you haven't already\n2. Make sure your city and neighborhood names appear naturally on your homepage and service pages\n3. Add a page for each area you serve with relevant local information\n4. Ask local customers to mention your city in their Google reviews",
      fix_technical:
        "Local SEO signals weak:\n- Google Business Profile: claimed but 40% incomplete (missing hours, categories, attributes)\n- No LocalBusiness schema on any page\n- City/region mentioned only once across entire site (footer)\n- No location-specific landing pages\n- Only 4 Google reviews (competitors avg: 47)\n\nFix:\n1. Complete GBP: add all categories, attributes, hours, photos (weekly cadence)\n2. Add LocalBusiness JSON-LD to homepage and contact page\n3. Create /areas/[city] pages with unique local content (not just city-name swaps)\n4. Implement review generation: post-service email with direct review link",
    },
  ],
  issues_good: [
    {
      title: "Your website is secure and trustworthy",
      description:
        "Your site uses HTTPS encryption, which means visitors see a padlock icon in their browser. This tells both customers and search engines that your site is safe to use.",
    },
    {
      title: "Your website works well on all devices",
      description:
        "Your site adjusts properly to fit phones, tablets, and desktop screens. Visitors get a good experience no matter how they find you.",
    },
  ],
  created_at: "2025-05-22T10:30:00Z",
  updated_at: "2025-05-22T10:32:00Z",
};

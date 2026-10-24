/**
 * Short follow-up section, so the pinned hero has somewhere to release into
 * and the scroll-driven exit transition is visible. Content is generic
 * agency placeholder copy for the demo.
 */
const SERVICES = [
  {
    title: "Web Development",
    body: "Fast, responsive websites and landing pages built with modern stacks.",
  },
  {
    title: "Performance Marketing",
    body: "Campaigns tuned to measurable outcomes — traffic, leads and conversions.",
  },
  {
    title: "Brand & Content",
    body: "Positioning, design and content that make the numbers above possible.",
  },
];

export default function AfterHero() {
  return (
    <section className="relative z-10 bg-[#0B0F14] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Beyond the hero</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-white/70">
          The hero above is pinned while it animates, then releases into this
          section. Scroll back up to replay the animation.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-bold text-lime-300">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

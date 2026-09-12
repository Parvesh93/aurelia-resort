"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Menu,
  Palmtree,
  Waves,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const villas = [
  {
    title: "Ocean Nest Villa",
    meta: "Private pool · Sea deck",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1800",
  },
  {
    title: "Garden Hideaway",
    meta: "Courtyard · Outdoor bath",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1800",
  },
  {
    title: "Cliff Residence",
    meta: "Sunset lounge · Butler",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1800",
  },
];

const experiences = [
  [
    "Spa Rituals",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
  ],
  [
    "Ocean Dining",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
  ],
  [
    "Island Trails",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
  ],
];

export default function Home() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    const isMobile = window.innerWidth < 768;

    gsap
      .timeline()
      .fromTo(".hero-title", { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".hero-sub", { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.55")
      .fromTo(".hero-btn", { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.45");

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 70 }, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".mobile-expand").forEach((section) => {
      const box = section.querySelector<HTMLElement>(".mobile-expand-box");
      const image = section.querySelector<HTMLElement>("img");
      if (!box || !image) return;

      gsap.fromTo(box, { scaleX: 1, borderRadius: "34px" }, {
        scaleX: isMobile ? 1.16 : 1,
        borderRadius: isMobile ? "0px" : "34px",
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 82%", end: "bottom 35%", scrub: 1 },
      });

      gsap.fromTo(image, { scale: 1 }, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top 82%", end: "bottom 35%", scrub: 1 },
      });
    });

    gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((card, index) => {
      gsap.fromTo(card, { opacity: 0, y: 80, rotate: index % 2 === 0 ? -5 : 5 }, {
        opacity: 1,
        y: 0,
        rotate: index % 2 === 0 ? -1.5 : 1.5,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%" },
      });
    });

    gsap.to(".marquee-content", {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".magnetic").forEach((btn) => {
        const move = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const leave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1,0.35)",
          });
        };

        btn.addEventListener("mousemove", move);
        btn.addEventListener("mouseleave", leave);
      });

      gsap.utils.toArray<HTMLElement>(".hover-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".hover-img");

        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateY = (x / rect.width - 0.5) * 10;
          const rotateX = -(y / rect.height - 0.5) * 10;

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1000,
            duration: 0.45,
            ease: "power3.out",
          });

          if (img) {
            gsap.to(img, {
              scale: 1.08,
              y: -12,
              duration: 0.7,
              ease: "power3.out",
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.8,
            ease: "power3.out",
          });

          if (img) {
            gsap.to(img, {
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          }
        });
      });
    }

    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, mainRef);

  return () => ctx.revert();
}, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden bg-[#f3eadc] text-[#17130f]">
      <Header />
      <Hero />
      <BookingBar />
      <Story />
      <Villas />
      <Experiences />
      <Gallery />
      <Wellness />
      <Marquee />
      <Contact />
    </main>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const links = ["Story", "Villas", "Experiences", "Gallery", "Reserve"];

  useEffect(() => {
    if (!menuRef.current) return;

    if (open) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        menuRef.current,
        { opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.75,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        ".menu-item",
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.15,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed left-0 top-0 z-[100] w-full px-4 py-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#f3eadc]/75 px-5 backdrop-blur-xl">
          <a href="#" className="text-xs font-semibold uppercase tracking-[0.38em]">
            Aurelia
          </a>

          <nav className="hidden gap-8 text-xs uppercase tracking-[0.22em] text-black/55 md:flex">
            <a href="#story">Story</a>
            <a href="#villas">Villas</a>
            <a href="#experiences">Experiences</a>
            <a href="#gallery">Gallery</a>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[90] h-[100dvh] overflow-hidden bg-[#17130f] text-[#f3eadc]"
        >
          <div className="relative flex h-[100dvh] flex-col justify-between overflow-y-auto px-6 pb-24 pt-28">
            <div>
              <p className="menu-item mb-8 text-xs uppercase tracking-[0.45em] text-white/35">
                Resort Navigation
              </p>

              <nav className="space-y-5">
                {links.map((link, index) => (
                  <a
                    key={link}
                    href={link === "Reserve" ? "#contact" : `#${link.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="menu-item flex items-center justify-between border-b border-white/10 pb-5"
                  >
                    <span className="text-5xl font-light tracking-[-0.07em]">
                      {link}
                    </span>
                    <span className="text-sm text-white/35">0{index + 1}</span>
                  </a>
                ))}
              </nav>
            </div>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="menu-item inline-flex w-fit items-center gap-3 rounded-full bg-[#f3eadc] px-7 py-4 text-xs uppercase tracking-[0.22em] text-black"
            >
              Reserve Stay <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2400"
        alt="Ocean"
        className="hero-bg absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[#f3eadc]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-20 pt-28 md:px-6 md:pb-28">
        <p className="hero-sub mb-6 text-xs uppercase tracking-[0.5em] text-white/75">
          Private Island Resort
        </p>

        <h1 className="hero-title max-w-6xl text-6xl font-light leading-[0.88] tracking-[-0.075em] text-white md:text-[142px]">
          Find Your
          <br />
          Stillness.
        </h1>

        <div className="hero-btn magnetic mt-8 flex max-w-3xl flex-col gap-6 md:flex-row md:items-center">
          <a
            href="#villas"
            className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-xs uppercase tracking-[0.22em] text-black"
          >
            Explore Villas <ArrowUpRight size={16} />
          </a>
          <p className="text-sm leading-7 text-white/70">
            Oceanfront villas, slow rituals, private dining and soft island days.
          </p>
        </div>

        <div className="hero-float float-one absolute right-5 top-32 hidden rounded-full border border-white/30 px-8 py-8 text-center text-white backdrop-blur-md md:block">
          <Waves className="mx-auto mb-3" />
          <p className="text-xs uppercase tracking-[0.25em]">2 Beaches</p>
        </div>
      </div>
    </section>
  );
}

function BookingBar() {
  return (
    <section className="relative z-10 px-5 md:px-6">
      <form className="reveal mx-auto -mt-12 grid max-w-6xl gap-4 rounded-[32px] bg-[#17130f] p-5 text-white shadow-2xl md:grid-cols-4 md:p-6">
        <label className="rounded-3xl border border-white/10 p-5">
          <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/35">
            Check In
          </span>
          <input
            type="date"
            className="w-full bg-transparent text-xl font-light text-white outline-none [color-scheme:dark]"
          />
        </label>

        <label className="rounded-3xl border border-white/10 p-5">
          <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/35">
            Check Out
          </span>
          <input
            type="date"
            className="w-full bg-transparent text-xl font-light text-white outline-none [color-scheme:dark]"
          />
        </label>

        <label className="rounded-3xl border border-white/10 p-5">
          <span className="mb-3 block text-xs uppercase tracking-[0.25em] text-white/35">
            Guests
          </span>
          <select className="w-full bg-transparent text-xl font-light text-white outline-none">
            <option className="text-black">1 Guest</option>
            <option className="text-black">2 Guests</option>
            <option className="text-black">3 Guests</option>
            <option className="text-black">4 Guests</option>
            <option className="text-black">5+ Guests</option>
          </select>
        </label>

        <button
          type="submit"
          className="magnetic flex items-center justify-center gap-3 rounded-3xl bg-[#f3eadc] p-5 text-xs uppercase tracking-[0.22em] text-black transition hover:bg-white"
        >
          <CalendarDays size={16} /> Check Availability
        </button>
      </form>
    </section>
  );
}

function ImageBlock({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className="mobile-expand hover-card w-full overflow-visible">
      <div className="mobile-expand-box w-full overflow-hidden rounded-[34px]">
        <img
          src={src}
          alt={alt}
          className={`soft-image hover-img w-full object-cover ${className}`}
        />
      </div>
    </div>
  );
}

function Story() {
  return (
    <section id="story" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1fr_1.1fr] md:px-6">
        <div className="reveal">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-black/40">
            The Place
          </p>
          <h2 className="text-5xl font-light leading-tight tracking-[-0.06em] md:text-8xl">
            Built between palms, tide and stillness.
          </h2>
        </div>

        <div className="space-y-10">
          <p className="reveal text-2xl font-light leading-relaxed text-black/65 md:text-4xl">
            A fictional resort concept designed to showcase mobile-safe image expansion,
            floating cards, cinematic layouts and premium hospitality motion.
          </p>

          <ImageBlock
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1800"
            alt="Resort pool"
            className="h-[520px] md:h-[720px]"
          />
        </div>
      </div>
    </section>
  );
}

function Villas() {
  return (
    <section id="villas" className="bg-[#17130f] py-24 text-[#f3eadc] md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="reveal mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/35">
              Private Stays
            </p>
            <h2 className="text-5xl font-light tracking-[-0.06em] md:text-8xl">
              Villas by the sea
            </h2>
          </div>
          <p className="max-w-md leading-7 text-white/50">
            Designed as quiet private worlds with open-air living, natural textures and soft light.
          </p>
        </div>

        <div className="space-y-20">
          {villas.map((villa, index) => (
            <article
              key={villa.title}
              className={`grid gap-8 md:grid-cols-2 md:items-center ${
                index % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="reveal">
                <p className="mb-5 text-sm text-white/35">0{index + 1}</p>
                <h3 className="text-4xl font-light tracking-[-0.05em] md:text-7xl">
                  {villa.title}
                </h3>
                <p className="mt-5 text-white/50">{villa.meta}</p>
                <a className="magnetic mt-8 inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-xs uppercase tracking-[0.22em] text-white/70">
                  View Suite <ArrowUpRight size={16} />
                </a>
              </div>

              <ImageBlock
                src={villa.image}
                alt={villa.title}
                className="h-[460px] md:h-[640px]"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experiences() {
  return (
    <section id="experiences" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="reveal mb-14 text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-black/40">
            Experiences
          </p>
          <h2 className="mx-auto max-w-5xl text-5xl font-light tracking-[-0.06em] md:text-8xl">
            Days shaped by ritual.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map(([title, image], index) => (
            <article
              key={title}
              className={`tilt-card hover-card rounded-[42px] bg-white/55 p-4 shadow-xl ${
  index === 1 ? "md:mt-16" : ""
}`}
            >
              <div className="overflow-hidden rounded-[32px]">
                <img
  src={image}
  alt={title}
  className="hover-img h-[390px] w-full object-cover"
/>
              </div>
              <div className="p-4">
                <p className="mb-3 text-sm text-black/35">0{index + 1}</p>
                <h3 className="text-3xl font-light tracking-[-0.05em]">{title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-[#17130f] py-24 text-[#f3eadc] md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="reveal mb-16">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/35">
            Gallery
          </p>
          <h2 className="max-w-5xl text-5xl font-light tracking-[-0.06em] md:text-8xl">
            A visual rhythm of water, stone and shade.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <ImageBlock
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600"
              alt="Resort"
              className="h-[430px] md:h-[620px]"
            />
          </div>
          <div className="reveal md:col-span-5 md:pt-24">
            <ImageBlock
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600"
              alt="Hotel"
              className="h-[430px] md:h-[520px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Wellness() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[0.95fr_1.05fr] md:px-6">
        <div className="reveal rounded-[44px] bg-[#d7c8af] p-8 md:p-12">
          <Palmtree className="mb-10" />
          <h2 className="text-5xl font-light tracking-[-0.06em] md:text-7xl">
            Wellness without schedule.
          </h2>
          <p className="mt-8 leading-7 text-black/55">
            Gentle treatments, saltwater rituals, guided movement and quiet spaces
            designed for complete reset.
          </p>
        </div>

        <ImageBlock
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800"
          alt="Spa"
          className="h-[520px] md:h-[650px]"
        />
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <section className="overflow-hidden border-y border-black/10 py-8">
      <div className="marquee-wrap">
        <div className="marquee-content flex w-max gap-10 text-5xl font-light uppercase tracking-[-0.06em] text-black/25 md:text-8xl">
          <span>Ocean</span>
          <span>Villas</span>
          <span>Wellness</span>
          <span>Silence</span>
          <span>Escape</span>
          <span>Ocean</span>
          <span>Villas</span>
          <span>Wellness</span>
          <span>Silence</span>
          <span>Escape</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-5 py-24 text-center md:px-6 md:py-36">
      <p className="reveal mb-6 text-xs uppercase tracking-[0.45em] text-black/40">
        Reserve
      </p>
      <h2 className="reveal mx-auto max-w-5xl text-5xl font-light leading-tight tracking-[-0.06em] md:text-8xl">
        Begin your stay where the world slows down.
      </h2>
      <a className="reveal mt-10 inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-xs uppercase tracking-[0.22em] text-white">
        Reserve Your Stay <ArrowUpRight size={16} />
      </a>
    </section>
  );
}
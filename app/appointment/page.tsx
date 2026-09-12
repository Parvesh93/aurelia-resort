"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Menu,
  Users,
  Waves,
  X,
} from "lucide-react";

export default function AppointmentPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f3eadc] text-[#17130f]">
      <header className="fixed left-0 top-0 z-50 w-full px-4 py-4">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#f3eadc]/80 px-5 backdrop-blur-xl">
          <a href="/" className="text-xs font-semibold uppercase tracking-[0.38em]">
            Aurelia
          </a>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.22em] text-black/55 md:flex">
            <a href="/#story">Story</a>
            <a href="/#villas">Villas</a>
            <a href="/#experiences">Experiences</a>
            <a href="/#gallery">Gallery</a>
            <a href="/appointment" className="text-black">
              Appointment
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a
            href="/#contact"
            className="hidden items-center gap-2 rounded-full bg-black px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-white md:inline-flex"
          >
            Reserve <ArrowUpRight size={14} />
          </a>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex h-[100dvh] flex-col bg-[#17130f] px-6 pb-10 pt-28 text-[#f3eadc] md:hidden">
          <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/35">
            Resort Navigation
          </p>
          <nav className="space-y-5">
            {[
              ["Story", "/#story"],
              ["Villas", "/#villas"],
              ["Experiences", "/#experiences"],
              ["Gallery", "/#gallery"],
              ["Appointment", "/appointment"],
              ["Reserve", "/#contact"],
            ].map(([label, href], index) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/10 pb-5"
              >
                <span className="text-4xl font-light tracking-[-0.06em]">{label}</span>
                <span className="text-sm text-white/35">0{index + 1}</span>
              </a>
            ))}
          </nav>
        </div>
      )}

      <section className="relative overflow-hidden bg-[#17130f] px-5 pb-24 pt-36 text-[#f3eadc] md:px-6 md:pb-32 md:pt-44">
        <div className="absolute inset-0 opacity-35">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2200"
            alt="Aurelia resort"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#17130f] via-[#17130f]/85 to-[#17130f]/45" />

        <div className="relative mx-auto max-w-7xl">
          <a
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/55 transition hover:text-white"
          >
            <ArrowLeft size={15} /> Back to Aurelia
          </a>

          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/45">
            Private Appointments
          </p>
          <h1 className="max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.07em] md:text-[118px]">
            Plan your
            <br />
            Aurelia visit.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            Choose your preferred day and time for a private resort consultation, villa viewing,
            celebration planning session, or wellness experience discussion.
          </p>
        </div>
      </section>

      <section className="px-5 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="space-y-6">
            <div className="rounded-[36px] bg-[#d7c8af] p-8 md:p-10">
              <Waves className="mb-8" size={28} />
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/45">
                Your private time
              </p>
              <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-5xl">
                Designed around your stay.
              </h2>
              <p className="mt-6 leading-7 text-black/55">
                Tell us what you would like to explore and our concierge team can shape the conversation around your visit.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                [CalendarDays, "Flexible dates", "Choose your preferred day"],
                [Clock3, "Private time", "Select a convenient slot"],
                [Users, "Personal planning", "For individuals, couples or groups"],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof CalendarDays;
                return (
                  <div key={title as string} className="rounded-[28px] border border-black/10 bg-white/35 p-6">
                    <FeatureIcon className="mb-5" size={22} />
                    <h3 className="text-lg font-medium">{title as string}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/50">{text as string}</p>
                  </div>
                );
              })}
            </div>
          </aside>

          <div className="rounded-[40px] bg-white/60 p-6 shadow-[0_30px_80px_rgba(23,19,15,0.08)] md:p-10 lg:p-12">
            <div className="mb-10">
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-black/40">
                Appointment Request
              </p>
              <h2 className="text-4xl font-light tracking-[-0.05em] md:text-6xl">
                When would you like to visit?
              </h2>
            </div>

            <form className="grid gap-6 md:grid-cols-2" action="/appointment" method="get">
              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Full Name</span>
                <input
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition placeholder:text-black/30 focus:border-black/35"
                />
              </label>

              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Email</span>
                <input
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition placeholder:text-black/30 focus:border-black/35"
                />
              </label>

              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your contact number"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition placeholder:text-black/30 focus:border-black/35"
                />
              </label>

              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Guests</span>
                <select
                  name="guests"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition focus:border-black/35"
                  defaultValue="2"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5+">5+ Guests</option>
                </select>
              </label>

              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Preferred Date</span>
                <input
                  name="date"
                  required
                  type="date"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition focus:border-black/35"
                />
              </label>

              <label className="space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Preferred Time</span>
                <select
                  name="time"
                  required
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition focus:border-black/35"
                  defaultValue=""
                >
                  <option value="" disabled>Select a time</option>
                  <option>10:00 AM</option>
                  <option>11:30 AM</option>
                  <option>1:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:30 PM</option>
                </select>
              </label>

              <label className="space-y-3 md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Appointment Type</span>
                <select
                  name="type"
                  className="w-full rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition focus:border-black/35"
                >
                  <option>Resort & Villa Consultation</option>
                  <option>Private Villa Viewing</option>
                  <option>Celebration & Event Planning</option>
                  <option>Wellness Experience</option>
                  <option>Dining Experience</option>
                </select>
              </label>

              <label className="space-y-3 md:col-span-2">
                <span className="text-xs uppercase tracking-[0.2em] text-black/45">Anything we should know?</span>
                <textarea
                  name="notes"
                  rows={5}
                  placeholder="Tell us what you would like to discuss..."
                  className="w-full resize-none rounded-2xl border border-black/10 bg-[#f3eadc]/65 px-5 py-4 outline-none transition placeholder:text-black/30 focus:border-black/35"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#17130f] px-8 py-5 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-black md:w-auto"
                >
                  Request Appointment <ArrowUpRight size={16} />
                </button>
                <p className="mt-4 max-w-xl text-xs leading-5 text-black/40">
                  This form captures your preferred appointment details. Final availability is subject to concierge confirmation.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

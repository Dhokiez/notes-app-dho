"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap, Rocket, Users, StickyNote, Lightbulb, Code, User, Star } from "lucide-react";

const AboutPage = () => {
  const [isInViewHimatifta, setIsInViewHimatifta] = useState(false);
  const [isInViewAboutMe, setIsInViewAboutMe] = useState(false);

  useEffect(() => {
    const observerHimatifta = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewHimatifta(true);
        }
      });
    });

    const targetHimatifta = document.getElementById("himatifta-section");
    if (targetHimatifta) observerHimatifta.observe(targetHimatifta);

    const observerAboutMe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInViewAboutMe(true);
        }
      });
    });

    const targetAboutMe = document.getElementById("about-me-section");
    if (targetAboutMe) observerAboutMe.observe(targetAboutMe);

    return () => {
      if (targetHimatifta) observerHimatifta.unobserve(targetHimatifta);
      if (targetAboutMe) observerAboutMe.unobserve(targetAboutMe);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1d2533] text-white font-sans">
      {/* Tentang NotesApp */}
      <section className="py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/images/notesapp.jpeg"
            alt="NotesApp Preview"
            className="rounded-lg w-full h-auto object-cover shadow-2xl border border-blue-500 animate-slideUp"
          />
          <div className="animate-fadeIn">
            <div className="mb-4">
              <StickyNote className="w-20 h-20 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase flex items-center gap-2">
                Notes App
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-3">
              <strong>NotesApp</strong> adalah proyek utama dalam pelatihan Next.js ini. Aplikasi ini membantu pengguna mencatat ide, tugas, dan inspirasi dengan antarmuka modern, responsif, dan intuitif.
            </p>
            <p className="text-gray-400 text-sm">
              Fitur termasuk sistem tagging, animasi transisi, dan kemampuan menyimpan data secara lokal maupun via API. Dibangun menggunakan Next.js, Tailwind CSS, dan ikon dari Lucide React.
            </p>
          </div>
        </div>
      </section>

      {/* Teknologi dan Skill */}
      <section className="py-16 px-6 md:px-20 bg-[#283141] text-white">
        <div className="text-center mb-12 flex items-center justify-center gap-3">
          <Lightbulb className="w-16 h-16 text-yellow-300 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            Hal Yang Dipelajari
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cards */}
          <div className="p-6 rounded-xl bg-[#374151] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-2">
            <Code className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Next.js Framework</h3>
            <p className="text-sm text-gray-300">
              Framework React untuk membuat aplikasi web modern dengan fitur SSR, routing, dan API routing.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#374151] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-2">
            <StickyNote className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">NotesApp Architecture</h3>
            <p className="text-sm text-gray-300">
              Implementasi CRUD, data persistence, dan manajemen state menggunakan hooks dan localStorage/API.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-[#374151] hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:translate-y-2">
            <Rocket className="w-12 h-12 text-purple-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Deploy ke Vercel</h3>
            <p className="text-sm text-gray-300">
              Mempelajari bagaimana melakukan deploy projek Next.js ke Vercel dengan setup yang optimal dan aman.
            </p>
          </div>
        </div>
      </section>

      {/* Section Organisasi HIMATIFTA dengan Background Image dan Overlay */}
   <section
  id="himatifta-section"
  className={`py-16 px-6 md:px-20 bg-[#2a3948] text-white ${
    isInViewHimatifta ? "animate-slideUp opacity-100" : "opacity-0"
  }`}
>
  <div className="grid md:grid-cols-2 gap-10 items-center">
    <img
      src="/images/himatifta.png"
      alt="HIMATIFTA"
      className="rounded-lg w-full h-auto object-cover shadow-lg border-none"
    />
    <div className="transition-opacity duration-700 ease-in-out">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase flex items-center gap-2">
        <Users className="w-8 h-8 text-green-400" />
        HIMATIFTA
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed mb-3">
        Event pelatihan ini diselenggarakan oleh HIMATIFTA melalui divisi UKM Website dan diikuti oleh mahasiswa berbagai angkatan.
      </p>
      <p className="text-gray-400 text-sm">
        Para peserta berkesempatan untuk mempelajari dan praktek cara membangun aplikasi nyata dengan pendekatan praktis, didampingi oleh mentor berpengalaman yang siap memberikan bimbingan langsung.
      </p>
    </div>
  </div>
</section>


      {/* About Me Section */}
      <section
        id="about-me-section"
        className={`py-16 px-6 md:px-20 bg-[#283141] text-white ${
          isInViewAboutMe ? "animate-slideUp opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">
            About Me
          </h2>
        </div>
        <div className="text-center mb-6">
          <Star className="w-20 h-20 text-yellow-400 mb-4 mx-auto" />
          <h3 className="text-xl font-bold mb-2">Nama Saya</h3>
          <h3 className="text-xl font-bold mb-2">Mochamad Alridho Hidayatullah</h3>
          <p className="text-sm text-gray-300 max-w-3xl mx-auto">
            Saya seorang pemula dalam pengembangan perangkat lunak yang sedang belajar pengembangan web menggunakan teknologi modern seperti React, Next.js, dan Tailwind CSS melalui program pelatihan Next.js.
          </p>
          <p className="text-sm text-gray-300 mt-3 max-w-3xl mx-auto">
            Di luar pengembangan perangkat lunak, saya juga tertarik pada teknologi baru, desain UI/UX, dan berbagi pengetahuan dengan komunitas.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

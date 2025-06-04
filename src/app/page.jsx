// page: pages.jsx/index.jsx
"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
      } else {
        try {
          const decodedToken = jwt.decode(token);
          setIsLoggedIn(!!decodedToken?.userId);
        } catch {
          setIsLoggedIn(false);
        }
      }
    };

    checkToken(); // cek pertama kali saat komponen dimuat

    // event listener untuk detect perubahan token di tab lain atau saat login/logout
    window.addEventListener("storage", checkToken);

    return () => window.removeEventListener("storage", checkToken);
  }, []);

  // fungsi tombol create note
  const handleCreateNoteClick = () => {
    if (isLoggedIn) {
      router.push("/notes/create");
    } else {
      router.push("/login");
    }
  };

  return (
   <main className="w-full min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 font-sans">

      <div className="flex items-center justify-center pt-24">
      <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl w-full text-center space-y-8 p-10 
             bg-white/5 backdrop-blur-lg 
             border border-cyan-400/40 
             shadow-[0_0_30px_rgba(0,255,255,0.2)] 
             rounded-3xl ring-1 ring-cyan-300/30"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl font-bold tracking-wide text-cyan-400 drop-shadow-md"
          >
            Welcome to NotesApp
          </motion.h1>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-300 text-lg max-w-xl mx-auto leading-relaxed"
          >
            A simple and powerful note-taking app for  
            your everyday thoughts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mt-6"
          >
            {isLoggedIn ? (
              <Link
                href="/notes"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-800 transition shadow-indigo-500/30 text-lg font-medium"
              >
                Go To Notes
              </Link>
            ) : (
              <button
                onClick={handleCreateNoteClick}
                className="px-6 py-3 rounded-xl transition text-lg font-medium shadow-md bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30"
              >
                Create New Notes
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>

   {/* Features Section */}
<div className="mt-12 max-w-7xl mx-auto w-full px-4 pb-8">
  <h2
    className="text-3xl md:text-4xl font-bold text-white mb-10 text-center opacity-0 translate-y-6 animate-fadeIn"
    style={{ animationDelay: "0.8s" }}
  >
    Features
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        title: "Write Notes",
        link: "/notes/create",
        description: "Create and organize your notes with ease. Add title and content to each note.",
        icon: (
          <svg
            className="w-10 h-10 text-white mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536M9 13l6-6 3.536 3.536-6 6H9v-3.536z"
            />
          </svg>
        ),
      },
      {
        title: "Check Notes",
        link: "/notes",
        description: "Browse all your notes and find them easily whenever you need.",
        icon: (
          <svg
            className="w-10 h-10 text-white mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
          </svg>
        ),
      },
      {
        title: "Edit Notes",
        link: "/",
        description: "Update and modify your notes whenever needed with just a few clicks.",
        icon: (
          <svg
            className="w-10 h-10 text-white mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ),
      },
    ].map(({ title, description, icon, link }, i) => (
      <div
        key={title}
        className="opacity-0 translate-y-6 animate-fadeIn"
        style={{ animationDelay: `${1 + i * 0.2}s` }}
      >
        <Link href={link} legacyBehavior passHref>
          <a
            className="block bg-gray-800 rounded-xl p-6 shadow-md cursor-pointer transform transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-80 hover:-translate-y-2"
          >
            {icon}
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </a>
        </Link>
      </div>
    ))}
  </div>
</div>

<style jsx>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeIn {
    animation-name: fadeIn;
    animation-duration: 0.6s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }
`}</style>
    </main>
  );
}


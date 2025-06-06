"use client";

import React, { useEffect, useState } from "react";
import CardNotes from "@/components/my-components/CardNotes";
import { Loader, FilePlus2 } from "lucide-react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation"; // Import useRouter untuk navigasi

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Untuk cek apakah user sudah login
  const [errorMessage, setErrorMessage] = useState(""); // Menyimpan pesan error
  const router = useRouter(); // Untuk navigasi

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        const data = await response.json();
        if (data.code === 200) {
          setNotes(data.data.notes);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    // Cek apakah token ada di localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode token dan periksa apakah token valid
        const decoded = jwt.decode(token);
        if (decoded) {
          setUserId(decoded.userId); // Set userId dari token
          setIsAuthenticated(true);  // Menandakan user sudah login
          setErrorMessage(""); // Hapus pesan error jika valid
        } else {
          // Jika token tidak valid, logout pengguna
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setErrorMessage("Token tidak valid. Silakan login kembali.");
        }
      } catch (error) {
        console.error("Token tidak valid:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setErrorMessage("Terjadi kesalahan saat memverifikasi token. Silakan login kembali.");
      }
    } else {
      setIsAuthenticated(false);
      setErrorMessage("Anda harus login terlebih dahulu untuk melihat notes.");
    }

    if (isAuthenticated) {
      fetchNotes(); // Ambil notes hanya jika sudah login
    }
  }, [isAuthenticated, router]);

  return (
    <div className="container max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-12">
        📝 List Notes
      </h1>

      {errorMessage ? (
        <div className="mt-20 flex flex-col justify-center items-center gap-4 text-center text-xl text-red-500">
          <p>{errorMessage}</p>
          <button
            className="mt-4 py-2 px-6 bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/30 text-white rounded-md"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      ) : loading ? (
        <div className="mt-20 flex flex-col justify-center items-center gap-4 text-center text-xl text-primary animate-pulse">
          <Loader size={32} className="animate-spin text-primary" />
          <p>Loading Notes...</p>
        </div>
      ) : notes.length === 0 ? (
        <div className="mt-24 flex flex-col items-center justify-center text-gray-500">
          <FilePlus2 size={48} className="mb-4 text-blue-400" />
          <p className="text-lg">Belum ada catatan yang dibuat.</p>
          <p className="text-sm mt-2 text-muted-foreground">Klik tombol tambah catatan untuk memulai.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {notes.map((note) => (
            <CardNotes key={note.id_notes} note={note} isOwner={note.id_user === userId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesPage;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import jwt from "jsonwebtoken";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      router.push("/");
    } else {
      try {
        const decodedToken = jwt.decode(savedToken);
        setUser(decodedToken.userId);
        setToken(savedToken);
      } catch (error) {
        console.error("Error decoding token", error);
        router.push("/");
      }
    }
  }, [router]);

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Judul dan isi tidak boleh kosong.",
      });
      return;
    }

    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Token atau data pengguna tidak valid.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: user,
          title,
          content,
        }),
      });

      if (!res.ok) throw new Error("Gagal menambahkan catatan");

      toast({
        className: cn("bg-green-500", "text-white"),
        title: "Catatan dibuat",
        description: "Catatan berhasil ditambahkan.",
      });

      router.push("/notes");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menambahkan catatan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">
      <Card
        className="max-w-xl w-full p-8 space-y-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg"
        style={{ boxShadow: "0 0 15px 3px rgba(0, 255, 255, 0.3)" }}
      >
        <h1 className="text-4xl font-extrabold text-cyan-400 text-center tracking-wide drop-shadow-lg">
          Buat Catatan Baru
        </h1>

        <div>
          <Label
            htmlFor="title"
            className="ml-1 block text-lg font-semibold text-cyan-300 mb-2 tracking-wide"
          >
            Judul
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul catatan"
            className="bg-transparent border-b-2 border-cyan-500 focus:border-cyan-400 placeholder-cyan-400 text-white transition-colors duration-300"
          />
        </div>

        <div>
          <Label
            htmlFor="content"
            className="ml-1 block text-lg font-semibold text-cyan-300 mb-2 tracking-wide"
          >
            Isi
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Tulis catatanmu di sini..."
            className="bg-transparent border-b-2 border-cyan-500 focus:border-cyan-400 placeholder-cyan-400 text-white resize-none transition-colors duration-300"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-cyan-400 hover:text-cyan-300 hover:bg-transparent hover:border hover:border-cyan-400 transition duration-300">
          Batal
          </Button>

          <Button
            onClick={handleCreate}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-md shadow-cyan-600/50 transition-all duration-300 hover:shadow-cyan-700/80"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

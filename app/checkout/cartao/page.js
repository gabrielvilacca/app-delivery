"use client";

import { CardForm } from "@/components/CardForm";

export default function CartaoPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8">
        <CardForm />
      </div>
    </main>
  );
}

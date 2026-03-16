"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

// 型をここに直接定義します
interface Listing {
  id: string;
  title: string;
  station: string;
  monthlyTotal: number;
}

export default function HomePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<string>("price_asc");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "sourceListings"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Listing, "id">),
      }));
      
      data.sort((a, b) => {
        if (sortBy === "price_asc") return a.monthlyTotal - b.monthlyTotal;
        if (sortBy === "price_desc") return b.monthlyTotal - a.monthlyTotal;
        return 0;
      });
      
      setListings(data);
    });
    return () => unsubscribe();
  }, [sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="pb-24 bg-pink-50 min-h-screen font-sans">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md p-6 shadow-sm z-10 rounded-b-3xl">
        <h1 className="text-xl font-bold text-pink-400 text-center tracking-widest">♡ まゆ引っ越し大作戦 ♡</h1>
        
        <div className="flex justify-center gap-2 mt-4">
          <button onClick={() => setSortBy("price_asc")} className={`text-[10px] px-3 py-1 rounded-full ${sortBy === "price_asc" ? "bg-pink-400 text-white" : "bg-pink-100 text-pink-500"}`}>安い順</button>
          <button onClick={() => setSortBy("price_desc")} className={`text-[10px] px-3 py-1 rounded-full ${sortBy === "price_desc" ? "bg-pink-400 text-white" : "bg-pink-100 text-pink-500"}`}>高い順</button>
        </div>
      </header>

      <main className="p-4 grid gap-6">
        {listings.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden">
            <div className="h-40 bg-pink-100 flex items-center justify-center text-pink-300">ᕱ⑅ᕱ</div>
            <div className="p-5">
              <h2 className="font-bold text-gray-700 text-lg">{item.title}</h2>
              <p className="text-pink-400 text-sm font-medium">{item.station}駅</p>
              <div className="mt-4 flex justify-between items-end">
                <p className="text-3xl font-black text-pink-500">{item.monthlyTotal.toLocaleString()}円</p>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className={`p-3 rounded-full transition-colors ${favorites.has(item.id) ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-500"}`}
                >♥</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 rounded-t-3xl p-4 shadow-2xl flex justify-around items-center z-50">
        {['ホーム', '条件', 'お気に入り', '通知'].map((label) => (
          <button key={label} className="text-pink-400 text-xs font-bold flex flex-col items-center hover:opacity-70">
            <span className="text-xl mb-1">♡</span>{label}
          </button>
        ))}
      </nav>
    </div>
  );
}

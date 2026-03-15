"use client";
import { db } from "../lib/firebase"; 
import { collection, addDoc } from "firebase/firestore";

export default function SimulatorPage() {
  const seedKamataListings = async () => {
    const kamataData = [
      { title: "蒲田ガーデンテラス", station: "蒲田", monthlyTotal: 98000 },
      { title: "大田区ルミナスライフ", station: "蒲田", monthlyTotal: 115000 },
      { title: "わんこ歓迎ハイツ", station: "蒲田", monthlyTotal: 88000 },
      { title: "大田区の隠れ家", station: "京急蒲田", monthlyTotal: 92000 },
      { title: "蒲田駅徒歩3分パーク", station: "蒲田", monthlyTotal: 125000 },
    ];

    try {
      for (const item of kamataData) {
        await addDoc(collection(db, "sourceListings"), item);
      }
      alert("蒲田エリアの物件を5件登録したよ！ホーム画面を見てみてね♡");
    } catch (e) {
      console.error(e);
      alert("エラーが出ちゃった…");
    }
  };

  return (
    <div className="p-10 bg-pink-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">デモデータ作成ツール</h1>
      <button 
        onClick={seedKamataListings} 
        className="bg-pink-400 text-white p-6 rounded-2xl font-bold shadow-lg hover:bg-pink-500"
      >
        蒲田エリアの物件を5件投入する♡
      </button>
    </div>
  );
}

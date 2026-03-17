"use client";
import { useState, useEffect } from "react";

export default function ConditionsPage() {
  // 条件の状態を管理するための変数
  const [area, setArea] = useState("kamata");
  const [maxRent, setMaxRent] = useState(120000);

  // 最初にページが開かれた時、保存された条件を読み込む
  useEffect(() => {
    const savedConditions = localStorage.getItem("mayu-conditions");
    if (savedConditions) {
      const { area, maxRent } = JSON.parse(savedConditions);
      setArea(area);
      setMaxRent(maxRent);
    }
  }, []);

  // 「保存する」ボタンが押された時の処理
  const handleSave = () => {
    const conditions = { area, maxRent };
    // localStorageにJSON形式で保存
    localStorage.setItem("mayu-conditions", JSON.stringify(conditions));
    alert("条件を保存したよ！ホーム画面で確認してね♡");
  };

  return (
    <div className="p-6 bg-pink-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-pink-400 text-center tracking-widest">♡ 条件設定 ♡</h1>
      </header>

      <main className="space-y-8">
        {/* エリア選択 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <label className="text-lg font-bold text-gray-600 block mb-3">📍 エリア</label>
          <select 
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full p-4 bg-pink-100 border-none rounded-lg text-pink-500 font-bold focus:ring-2 focus:ring-pink-400"
          >
            <option value="kamata">蒲田</option>
            <option value="keikyu-kamata">京急蒲田</option>
            <option value="ota-ku">大田区全体</option>
          </select>
        </div>

        {/* 家賃上限 */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <label className="text-lg font-bold text-gray-600 block mb-2">💴 家賃の上限</label>
          <p className="text-3xl font-black text-pink-500 text-center mb-4">
            {maxRent.toLocaleString()} 円
          </p>
          <input 
            type="range"
            min="50000"
            max="200000"
            step="5000"
            value={maxRent}
            onChange={(e) => setMaxRent(Number(e.target.value))}
            className="w-full h-3 bg-pink-200 rounded-lg appearance-none cursor-pointer range-lg"
          />
        </div>

        {/* 保存ボタン */}
        <div className="pt-4">
          <button 
            onClick={handleSave}
            className="w-full bg-pink-400 text-white p-5 rounded-2xl font-bold text-lg shadow-lg hover:bg-pink-500 transition-all"
          >
            この条件で保存する♡
          </button>
        </div>
      </main>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      title: 'SIR Theory',
      description: '感染症数理モデルの理論解説',
      longDescription:
        '解析的モデルとエージェントベースモデルの数学的背景、パラメータの関係性を詳しく解説',
      href: '/works/sir-theory',
      icon: '📚',
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple',
    },
    {
      title: 'SIR Analytical',
      description: '解析的SIRモデル',
      longDescription:
        '常微分方程式を4次ルンゲクッタ法で解く。パラメータを調整してリアルタイムにグラフを確認',
      href: '/works/sir-analytical',
      icon: '📈',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue',
    },
    {
      title: 'SIR Simulation',
      description: 'エージェントベースモデル',
      longDescription:
        '個体レベルのシミュレーション。2次元空間での感染の広がりを視覚的に確認',
      href: '/works/sir-simulation',
      icon: '🎯',
      gradient: 'from-green-500 to-emerald-500',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-16">
          <div
            className={`text-center transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SIR Model Simulation
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              感染症の数理モデルを体験する
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              解析的手法とエージェントベースの2つのアプローチで
              <br />
              感染症の広がりをシミュレーション
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Link
                key={project.href}
                href={project.href}
                className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-500 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  mounted
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: mounted ? `${index * 150}ms` : '0ms',
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>

                {/* Title */}
                <h2 className="relative text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="relative text-gray-400 mb-4 text-sm">
                  {project.description}
                </p>

                {/* Long Description */}
                <p className="relative text-gray-500 text-xs leading-relaxed mb-6">
                  {project.longDescription}
                </p>

                {/* Arrow */}
                <div className="relative flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                  <span>詳しく見る</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>矢印アイコン</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="container mx-auto px-6 py-16">
          <div
            className={`max-w-6xl mx-auto transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* 概要 */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-8">
              <h3 className="text-3xl font-bold mb-6 text-center">
                🧬 SIRモデルとは？
              </h3>
              <p className="text-gray-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
                SIRモデルは、感染症の流行を数理的にシミュレーションするための基本的なモデルです。
                人口を3つのグループに分類し、時間とともにどのように感染が広がり、収束していくかを予測します。
              </p>

              {/* 3つの状態 */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-900/50 rounded-xl p-6 border border-blue-500/30">
                  <div className="text-5xl mb-4 text-center">🔵</div>
                  <h4 className="font-bold text-xl mb-3 text-blue-400 text-center">
                    Susceptible
                  </h4>
                  <p className="text-sm text-gray-300 text-center mb-2">
                    感受性保持者（未感染）
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    感染者と接触すると感染する可能性があります。
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-6 border border-red-500/30">
                  <div className="text-5xl mb-4 text-center">🔴</div>
                  <h4 className="font-bold text-xl mb-3 text-red-400 text-center">
                    Infected
                  </h4>
                  <p className="text-sm text-gray-300 text-center mb-2">
                    感染者（発症中）
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    他者に感染を広げる可能性があり、時間経過で回復します。
                  </p>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-6 border border-green-500/30">
                  <div className="text-5xl mb-4 text-center">🟢</div>
                  <h4 className="font-bold text-xl mb-3 text-green-400 text-center">
                    Recovered
                  </h4>
                  <p className="text-sm text-gray-300 text-center mb-2">
                    回復者（免疫獲得）
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    再び感染することはありません。
                  </p>
                </div>
              </div>

              {/* 感染の流れ */}
              <div className="bg-gray-900/30 rounded-xl p-6 border border-gray-600">
                <h4 className="font-semibold text-lg mb-4 text-center text-gray-200">
                  📊 感染の流れ
                </h4>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔵</div>
                    <p className="text-xs text-gray-400">未感染</p>
                  </div>
                  <div className="text-2xl text-gray-500">→</div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">🔴</div>
                    <p className="text-xs text-gray-400">感染</p>
                  </div>
                  <div className="text-2xl text-gray-500">→</div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">🟢</div>
                    <p className="text-xs text-gray-400">回復</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 text-center mt-4">
                  S → I → R の順に状態が変化し、後戻りすることはありません
                </p>
              </div>
            </div>

            {/* 重要なパラメータ */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
                <h4 className="font-bold text-xl mb-4 text-blue-400">
                  🔢 重要なパラメータ
                </h4>
                <div className="space-y-3">
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-white mb-1">
                      β (ベータ): 感染率
                    </p>
                    <p className="text-xs text-gray-400">
                      感受性者が感染者と接触したときの感染のしやすさ
                    </p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-white mb-1">
                      γ (ガンマ): 回復率
                    </p>
                    <p className="text-xs text-gray-400">
                      感染者が回復するまでの速さ（= 1 / 回復日数）
                    </p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-3">
                    <p className="font-semibold text-sm text-white mb-1">
                      R₀: 基本再生産数
                    </p>
                    <p className="text-xs text-gray-400">
                      1人の感染者が平均何人に感染させるか（R₀ &gt; 1
                      で流行拡大）
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                <h4 className="font-bold text-xl mb-4 text-green-400">
                  💡 実世界での応用
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🦠</span>
                    <div>
                      <p className="font-semibold text-sm text-white">
                        感染症対策の評価
                      </p>
                      <p className="text-xs text-gray-400">
                        ワクチン接種や行動制限の効果を事前予測
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">📈</span>
                    <div>
                      <p className="font-semibold text-sm text-white">
                        流行のピーク予測
                      </p>
                      <p className="text-xs text-gray-400">
                        医療リソースの準備に必要な情報を提供
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🎓</span>
                    <div>
                      <p className="font-semibold text-sm text-white">
                        教育・研究
                      </p>
                      <p className="text-xs text-gray-400">
                        疫学の基礎として広く使われる標準モデル
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* このサイトで学べること */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="font-bold text-xl mb-4 text-center text-white">
                ✨ このサイトで学べること
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-purple-400 font-semibold mb-2">📚 理論</p>
                  <p className="text-gray-400 text-xs">
                    数式の意味と2つのモデルの違いを理解
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 font-semibold mb-2">
                    📈 解析的アプローチ
                  </p>
                  <p className="text-gray-400 text-xs">
                    微分方程式による正確な予測
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-semibold mb-2">
                    🎯 シミュレーション
                  </p>
                  <p className="text-gray-400 text-xs">
                    個体レベルでの感染の可視化
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>Made with ❤️ by SDNC hiro • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

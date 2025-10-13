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
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-center">
                🧬 SIRモデルとは？
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl mb-3">🔵</div>
                  <h4 className="font-semibold mb-2 text-blue-400">
                    Susceptible
                  </h4>
                  <p className="text-sm text-gray-400">
                    感受性保持者
                    <br />
                    未感染の人々
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🔴</div>
                  <h4 className="font-semibold mb-2 text-red-400">Infected</h4>
                  <p className="text-sm text-gray-400">
                    感染者
                    <br />
                    他者に感染させる可能性
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🟢</div>
                  <h4 className="font-semibold mb-2 text-green-400">
                    Recovered
                  </h4>
                  <p className="text-sm text-gray-400">
                    回復者
                    <br />
                    免疫を獲得
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

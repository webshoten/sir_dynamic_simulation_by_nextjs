'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const skills = [
    { category: '言語', items: ['TypeScript', 'Javascript', 'Python'] },
    {
      category: 'フロントエンド',
      items: ['Next.js', 'React', 'Vue', 'Remix', 'Tailwind CSS'],
    },
    {
      category: 'バックエンド',
      items: ['Node.js', 'AWS Lambda', 'API Gateway'],
    },
    { category: 'データベース', items: ['DynamoDB', 'MySQL'] },
    { category: 'インフラ', items: ['AWS', 'AWS CDK', 'SST', 'Azure'] },
    { category: 'その他', items: ['GraphQL', 'tRPC'] },
  ];

  const projects = [
    {
      title: 'visiting_care_saas_app',
      description: '訪問介護SaaSアプリケーション（デモ版）',
      tech: ['TypeScript', 'SST v3', 'AWS', 'Monorepo'],
      icon: '🏥',
      url: 'https://github.com/webshoten/visiting_care_saas_app',
    },
    {
      title: 'expense-application',
      description: '経費申請システム',
      tech: ['TypeScript', 'Remix', 'GraphQL', 'SST'],
      icon: '💰',
      url: 'https://github.com/webshoten/expense-application',
    },
    {
      title: 'recipii',
      description: 'レシピ管理アプリケーション',
      tech: ['TypeScript', 'React', 'AWS'],
      icon: '🍳',
      url: 'https://github.com/webshoten/recipii',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        {/* Profile Header */}
        <section className="container mx-auto px-6 pt-20 pb-12">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700">
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-5xl font-bold">
                    大
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                </div>

                <div className="text-center md:text-left flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    大嶋 寛之
                  </h1>
                  <p className="text-xl text-gray-400 mb-4">Hiroyuki Oshima</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    フルスタックエンジニア・数理モデリング愛好家
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-4 justify-center md:justify-start">
                    <Link
                      href="https://github.com/webshoten"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-all duration-300 hover:scale-105"
                    >
                      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  💫 About Me
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  サーバーレスアーキテクチャとモダンなフロントエンド技術を活用したWebアプリケーション開発が得意です。
                  最近は特にAWS SST, Lambda、DynamoDB、Vue.js/React
                  を使った開発を好んで使います。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container mx-auto px-6 py-12">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              🛠️ Skills & Technologies
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.category}
                  className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all duration-500 delay-${index * 100}`}
                >
                  <h3 className="text-lg font-semibold mb-4 text-purple-400">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 border border-gray-600 hover:border-purple-500 hover:text-white transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-6 py-12">
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              🚀 Featured Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, _index) => (
                <Link
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105 block"
                >
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-purple-400 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View on GitHub</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="https://github.com/webshoten?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105"
              >
                <span>すべてのプロジェクトを見る</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-6 py-12 pb-20">
          <div
            className={`max-w-2xl mx-auto transition-all duration-1000 delay-700 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center">
              <h2 className="text-2xl font-bold mb-4">📬 Get In Touch</h2>
              <p className="text-gray-300 mb-6">
                プロジェクトやコラボレーションに興味がある方は、GitHubでお気軽にご連絡ください。
              </p>
              <Link
                href="https://github.com/webshoten"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Contact on GitHub</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

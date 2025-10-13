'use client';

import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export const SirTheoryMain = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-5xl mx-auto p-6 md:p-8 lg:p-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            SIRモデルの理論解説
          </h1>
        </div>

        {/* 解析的SIRモデル */}
        <section className="mb-12 bg-gray-900/50 rounded-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            1. 解析的SIRモデル（常微分方程式）
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              常微分方程式
            </h3>
            <p className="text-gray-300 mb-4">
              以下の常微分方程式について、4次のルンゲクッタ法を用いた数値解析を行います：
            </p>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="text-white text-lg">
                <BlockMath math="\frac{dS(t)}{dt} = -\beta S(t) I(t)" />
              </div>
              <div className="text-white text-lg">
                <BlockMath math="\frac{dI(t)}{dt} = \beta S(t) I(t) - \gamma I(t)" />
              </div>
              <div className="text-white text-lg">
                <BlockMath math="\frac{dR(t)}{dt} = \gamma I(t)" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              パラメータと変数の定義
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    1. 人口（N）：
                  </span>
                  総人口（例：10,000人）
                </p>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    2. 解析的感染率係数（
                    <InlineMath math="\beta_{\text{analytical}}" />
                    ）：
                  </span>
                </p>
                <div className="ml-4 bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\beta_{\text{analytical}} = \frac{(\text{接触者数}) \times (\text{感染率})}{N}" />
                  <p className="text-sm text-gray-400 mt-2">
                    ※接触者数、感染率は1日1人あたり
                  </p>
                </div>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    3. 回復率（
                    <InlineMath math="\gamma" />
                    ）：
                  </span>
                </p>
                <div className="ml-4 bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\gamma = \frac{1}{\text{回復までの日数}}" />
                </div>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    4. 基本再生産数（
                    <InlineMath math="R_0" />
                    ）：
                  </span>
                </p>
                <div className="ml-4 bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="R_0 = \frac{S(0) \beta_{\text{analytical}}}{\gamma}" />
                  <p className="text-sm text-gray-400 mt-2">
                    ※ S(0)は初期感受性者数（= N - 初期感染者数）
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              4次ルンゲクッタ法
            </h3>
            <p className="text-gray-300 mb-4">
              常微分方程式を数値的に解く手法。時刻 t から t+dt
              への変化を以下の式で計算：
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-white space-y-2">
                <BlockMath math="k_1 = f(t, y)" />
                <BlockMath math="k_2 = f(t + \frac{dt}{2}, y + \frac{k_1}{2})" />
                <BlockMath math="k_3 = f(t + \frac{dt}{2}, y + \frac{k_2}{2})" />
                <BlockMath math="k_4 = f(t + dt, y + k_3)" />
                <BlockMath math="y_{new} = y + \frac{k_1 + 2k_2 + 2k_3 + k_4}{6} \cdot dt" />
              </div>
            </div>
          </div>
        </section>

        {/* 個体ベースモデル */}
        <section className="mb-12 bg-gray-900/50 rounded-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            2. 個体ベースSIRモデル
          </h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              シミュレーション手法
            </h3>
            <p className="text-gray-300 mb-4">
              各個体（エージェント）を独立して追跡し、空間的な接触を明示的にモデル化します：
            </p>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    1. 空間配置（2次元平面）：
                  </span>
                  各エージェントはキャンバス上を自由に移動
                </p>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    2. 接触判定（円形範囲）：
                  </span>
                  感染者から接触半径（r）内のエージェントが接触対象
                </p>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    3. 感染過程：
                  </span>
                  接触したエージェントが確率的に感染
                </p>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    4. 回復過程：
                  </span>
                  感染者が一定期間後に回復（免疫獲得）
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              パラメータ定義
            </h3>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    1. 接触時の感染率パラメータ（
                    <InlineMath math="\beta_{\text{agent}}" />
                    ）：
                  </span>
                </p>
                <div className="ml-4 text-sm">
                  <p>接触が発生した場合の単位時間あたりの感染率パラメータ</p>
                </div>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    2. 接触半径（r）：
                  </span>
                </p>
                <div className="ml-4 text-sm">
                  <p className="mb-2">
                    感染者との接触を判定する距離（ピクセル単位）
                  </p>
                  <p className="text-gray-400 text-xs mb-3">
                    <span className="font-semibold text-gray-300">目的：</span>
                    接触半径を持たない解析的SIRモデルと個体ベースモデルの結果をフィッティングさせるため、接触半径を
                    40px に設定し、画面サイズに応じてスケーリングする
                  </p>
                  <div className="bg-gray-900 rounded p-3 mt-2 [&_.katex]:text-white">
                    <p className="text-gray-400 mb-2">
                      動的計算式：
                      <InlineMath math="r = 0.039 \times \sqrt{A}" />
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      （A = キャンバス面積 [px²]）
                    </p>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-400 text-xs font-semibold mb-1">
                        係数 0.039 の導出：
                      </p>
                      <p className="text-gray-500 text-xs mb-2">
                        基準画面サイズ（1,049,760
                        px²）で、解析的モデルとフィッティングするための接触半径を
                        40px と設定
                      </p>
                      <p className="text-gray-400 text-xs">
                        <InlineMath math="k = \frac{r_{\text{基準}}}{\sqrt{A_{\text{基準}}}} = \frac{40}{\sqrt{1049760}} \approx 0.039" />
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        この係数により、どの画面サイズでも適切な接触半径が自動計算され、両モデルの整合性が保たれます
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-gray-300">
                <p className="mb-2">
                  <span className="text-white font-semibold">
                    3. 回復率（
                    <InlineMath math="\gamma" />
                    ）：
                  </span>
                </p>
                <div className="ml-4 text-sm">
                  <p>解析的モデルと同じ定義（単位時間あたりの回復率）</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              確率的感染・回復モデル（ポアソン過程）
            </h3>
            <p className="text-gray-300 mb-4">
              微小時間 dt における感染・回復の確率：
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-white space-y-4">
                <div>
                  <p className="text-gray-300 mb-2">感染確率：</p>
                  <BlockMath math="P(\text{感染}) = 1 - e^{-\beta_{\text{agent}} \cdot dt}" />
                </div>
                <div>
                  <p className="text-gray-300 mb-2">回復確率：</p>
                  <BlockMath math="P(\text{回復}) = 1 - e^{-\gamma \cdot dt}" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-green-400 mb-4">
              解析的モデルへの換算
            </h3>
            <p className="text-gray-300 mb-4">
              個体ベースモデルのパラメータを解析的モデルに換算：
            </p>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-white font-semibold mb-2">
                  接触者数の推定（2次元空間）：
                </p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\text{接触者数} = \frac{N}{A} \times \pi r^2" />
                  <p className="text-sm text-gray-400 mt-2">
                    ※ N: 人口、A: キャンバス面積、r: 接触半径
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      💡 3次元空間の場合：
                    </p>
                    <div className="ml-3 space-y-2">
                      <p className="text-xs text-gray-400">
                        3次元空間では、接触範囲が球体となるため：
                      </p>
                      <div className="bg-gray-800 rounded p-2 [&_.katex]:text-white">
                        <BlockMath math="\text{接触者数}_{3D} = \frac{N}{V} \times \frac{4}{3}\pi r^3" />
                      </div>
                      <p className="text-xs text-gray-500">
                        V: 空間体積、接触範囲が r² → r³ に変化
                      </p>
                      <p className="text-xs text-gray-500">
                        本シミュレーションは2次元平面を想定（画面上での可視化のため）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">
                  解析的 β への換算：
                </p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\beta_{\text{analytical}} = \frac{\text{接触者数}}{N} \times \beta_{\text{agent}}" />
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">
                  回復率 γ（換算不要）：
                </p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\gamma_{\text{analytical}} = \gamma_{\text{agent}} = \gamma" />
                  <p className="text-sm text-gray-400 mt-2">
                    ※ 回復率は両モデルで同じ定義のため、換算の必要なし
                  </p>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">
                  基本再生産数（
                  <InlineMath math="R_0" />
                  ）：
                </p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="R_0 = \frac{S(0) \times \beta_{\text{analytical}}}{\gamma}" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 両者の接続と関係性 */}
        <section className="mb-12 bg-gray-900/50 rounded-lg p-6 md:p-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            3. 両者の接続と関係性
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              βパラメータの関係
            </h3>
            <p className="text-gray-300 mb-4">
              2つのモデルにおけるβの定義は異なりますが、以下の関係で結ばれています：
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">解析的モデル：</p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\beta_{\text{analytical}} = \frac{\text{接触者数} \times \text{感染率}}{N}" />
                  <p className="text-sm text-gray-400 mt-2">
                    人口全体に対する感染率係数（集団レベル）
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">
                  個体ベースモデル：
                </p>
                <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                  <BlockMath math="\beta_{\text{agent}}" />
                  <p className="text-sm text-gray-400 mt-2">
                    接触時の感染率パラメータ（個体レベル）
                  </p>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">換算式：</p>
                <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded p-4 border-2 border-purple-500 [&_.katex]:text-white">
                  <BlockMath math="\beta_{\text{analytical}} = \frac{\text{接触者数}}{N} \times \beta_{\text{agent}}" />
                  <p className="text-sm text-gray-300 mt-3">
                    接触者数 = 人口密度 × 接触範囲面積 ={' '}
                    <InlineMath math="\frac{N}{A} \times \pi r^2" />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              γパラメータの一貫性
            </h3>
            <p className="text-gray-300 mb-4">
              回復率γは両モデルで同じ定義を共有します：
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="bg-gray-900 rounded p-4 [&_.katex]:text-white">
                <BlockMath math="\gamma = \frac{1}{\text{回復までの日数}}" />
                <p className="text-sm text-gray-400 mt-2">
                  両モデルとも単位時間あたりの回復率として扱われます
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              基本再生産数（R₀）の整合性
            </h3>
            <p className="text-gray-300 mb-4">
              適切にパラメータを換算すれば、両モデルで同じR₀が得られます：
            </p>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 rounded p-4 border-2 border-purple-500 [&_.katex]:text-white">
                <BlockMath math="R_0 = \frac{S(0) \times \beta_{\text{analytical}}}{\gamma}" />
                <div className="mt-4 pt-4 border-t border-purple-400/30">
                  <p className="text-sm text-gray-300 mb-2">
                    <span className="font-semibold text-white">
                      S(0) について：
                    </span>
                  </p>
                  <div className="ml-4 space-y-2">
                    <p className="text-sm text-gray-300">
                      S(0) =
                      初期感受性者数（シミュレーション開始時点で感染していない人数）
                    </p>
                    <div className="bg-gray-900/50 rounded p-3 [&_.katex]:text-white">
                      <BlockMath math="S(0) = N - I(0)" />
                      <p className="text-xs text-gray-400 mt-2">
                        N: 総人口、I(0): 初期感染者数
                      </p>
                    </div>
                    <p className="text-xs text-gray-400">
                      例：人口2,000人、初期感染者2人の場合 → S(0) = 1,998人
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-4">
                  この式は両モデルで同じ値を返します（パラメータが正しく換算されている場合）
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 参考文献 */}
        <section className="bg-gray-900/50 rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">参考文献</h2>
          <div className="space-y-2 text-gray-300 text-sm">
            <p>
              [1]{' '}
              <a
                href="https://iopscience.iop.org/article/10.1088/1742-6596/1040/1/012021/pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                IOP Conference Series (2018)
              </a>
            </p>
            <p>
              [2]{' '}
              <a
                href="https://wagtail.cds.tohoku.ac.jp/coda/python/p-6-application-sup-ode-sir-model.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                東北大学 - SIRモデル
              </a>
            </p>
            <p>
              [3]{' '}
              <a
                href="https://www.naika.or.jp/jsim_wp/wp-content/uploads/2020/11/nichinaishi-109-11-article_4.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                日本内科学会雑誌 - 感染症の数理モデル (2020)
              </a>
            </p>
            <p>
              [4]{' '}
              <a
                href="http://pc-physics.com/rk1.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                ルンゲクッタ法
              </a>
            </p>
            <p>
              [5]{' '}
              <a
                href="https://ja.wikipedia.org/wiki/SIR%E3%83%A2%E3%83%87%E3%83%AB"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Wikipedia - SIRモデル
              </a>
            </p>
          </div>
        </section>

        {/* フッター */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>{new Date().getFullYear()} — SDNC hiro</p>
        </footer>
      </div>
    </div>
  );
};

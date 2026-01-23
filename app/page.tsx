import { HeroSection } from "@/components/hero-section";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-transparent text-primary selection:bg-secondary/30">
            <Header />
            <HeroSection />

            {/* Philosophy Section */}
            <section id="philosophy" className="py-24 border-t border-[#333333] bg-background/20 backdrop-blur-[2px]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="font-mono text-xs text-secondary/60 tracking-widest block mb-2">01 // PHILOSOPHY</span>
                        <h2 className="text-2xl font-serif text-primary tracking-wide">CORE PHILOSOPHY</h2>
                    </div>
                    <div className="md:col-span-9">
                        <div className="max-w-3xl">
                            <p className="text-lg md:text-xl text-secondary leading-loose font-light mb-8">
                                ツール導入はゴールではない。解析なきデータはノイズに過ぎない。
                                我々は「何を可視化すべきか」という問いから設計を開始し、経営者の暗黙知を実装可能な資産へと変換する。
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t border-[#333333]/50 pt-8">
                                <div>
                                    <h3 className="font-mono text-xs text-secondary/80 mb-4 uppercase tracking-wider">Metric Definition</h3>
                                    <p className="text-sm text-secondary/60 leading-relaxed">
                                        事業の成長係数を特定し、追跡可能な指標として再定義するプロセス。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-mono text-xs text-secondary/80 mb-4 uppercase tracking-wider">Implementation</h3>
                                    <p className="text-sm text-secondary/60 leading-relaxed">
                                        理論上の最適解でなく、現場が運用可能な「動くシステム」への落とし込み。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-24 border-t border-[#333333] bg-transparent">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="font-mono text-xs text-secondary/60 tracking-widest block mb-2">02 // APPROACH</span>
                        <h2 className="text-2xl font-serif text-primary tracking-wide">METHODOLOGY</h2>
                    </div>
                    <div className="md:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    id: "01",
                                    title: "Strategy",
                                    desc: "「何を決める必要があるか」から逆算し、必要なデータだけを定義。",
                                    meta: "PHASE: DEFINITION"
                                },
                                {
                                    id: "02",
                                    title: "Data Design",
                                    desc: "既存の業務フローに負荷をかけない、持続可能なデータ収集プロセス。",
                                    meta: "PHASE: ARCHITECTURE"
                                },
                                {
                                    id: "03",
                                    title: "Analytics",
                                    desc: "高度な統計手法と現場の肌感を融合させた、納得感のある分析。",
                                    meta: "PHASE: EXECUTION"
                                }
                            ].map((item) => (
                                <div key={item.id} className="group border border-[#333333] hover:border-secondary/30 transition-colors p-6 flex flex-col justify-between min-h-[240px] bg-background/30 backdrop-blur-sm">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="font-mono text-xs text-secondary/40">{item.id}</span>
                                            <div className="w-2 h-2 bg-[#333333] rounded-full group-hover:bg-primary/50 transition-colors"></div>
                                        </div>
                                        <h3 className="text-lg font-serif text-primary mb-4">{item.title}</h3>
                                        <p className="text-sm text-secondary/60 leading-relaxed font-light">{item.desc}</p>
                                    </div>
                                    <div className="mt-8 pt-4 border-t border-[#333333]/50">
                                        <span className="font-mono text-[10px] text-secondary/40 uppercase tracking-widest">{item.meta}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 border-t border-[#333333] bg-background/20 backdrop-blur-[2px]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="font-mono text-xs text-secondary/60 tracking-widest block mb-2">03 // SERVICES</span>
                        <h2 className="text-2xl font-serif text-primary tracking-wide">CAPABILITIES</h2>
                    </div>
                    <div className="md:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Data Pipeline Architecture",
                                    jp: "データ基盤設計",
                                    desc: "散在するデータを収集・整理し、信頼できる資産へと変換します。API連携、スクレイピング、ETL構築まで完結。",
                                    specs: ["ETL PIPELINES", "CLOUD INFRA", "DATA WAREHOUSING"],
                                    timeline: "Est. 4-8 Weeks"
                                },
                                {
                                    title: "Executive Dashboarding",
                                    jp: "経営判断ダッシュボード",
                                    desc: "データと直感の橋渡し。経営者が自信を持って判断を下せるよう、論理的な裏付けを提供します。",
                                    specs: ["BI TOOLS", "REAL-TIME METRICS", "CUSTOM VISUALIZATION"],
                                    timeline: "Est. 2-4 Weeks"
                                },
                                {
                                    title: "System Architecture",
                                    jp: "システム設計",
                                    desc: "持続可能な成長のための、堅牢なデータ基盤とシステム設計。",
                                    specs: ["SCALABILITY", "SECURITY", "MAINTENANCE"],
                                    timeline: "Est. 8+ Weeks"
                                },
                                {
                                    title: "AI Integration",
                                    jp: "AI導入支援",
                                    desc: "実務に即したAI導入。流行ではなく、成果のための技術選定。",
                                    specs: ["LLM", "SENSITIVITY ANALYSIS", "AUTOMATION"],
                                    timeline: "Variable"
                                }
                            ].map((service, idx) => (
                                <div key={idx} className="border border-[#333333] p-8 hover:bg-[#333333]/30 transition-colors group bg-background/40 backdrop-blur-sm">
                                    <div className="flex justify-between items-start mb-8">
                                        <h3 className="text-xl font-serif text-primary max-w-[70%] leading-tight">
                                            {service.title}
                                            <span className="block text-xs font-sans text-secondary/50 mt-2 font-normal">{service.jp}</span>
                                        </h3>
                                        <span className="font-mono text-xs text-secondary/40 border border-[#333333] px-2 py-1">
                                            SRV-{String(idx + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-secondary/70 leading-relaxed font-light mb-8 min-h-[3em]">
                                        {service.desc}
                                    </p>
                                    <div className="space-y-4 border-t border-[#333333] pt-6">
                                        <div className="flex flex-wrap gap-2">
                                            {service.specs.map(spec => (
                                                <span key={spec} className="text-[10px] font-mono text-secondary/60 bg-[#333333]/30 px-2 py-1">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="font-mono text-[10px] text-secondary/40">TIMELINE</span>
                                            <span className="font-mono text-[10px] text-primary">{service.timeline}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 border-t border-[#333333] bg-background/20 backdrop-blur-[2px]">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <span className="font-mono text-xs text-secondary/60 tracking-widest block mb-2">04 // CONTACT</span>
                        <h2 className="text-2xl font-serif text-primary tracking-wide">Initialize Project</h2>
                    </div>
                    <div className="md:col-span-9 flex flex-col md:flex-row justify-between items-start gap-12 text-left">
                        <div className="max-w-xl text-left items-start">
                            <p className="text-secondary/60 font-light leading-relaxed mb-8 text-left">
                                プロジェクトのご相談、協業のご依頼はこちらから。<br />
                                現在、新規案件の着手は翌月以降となります。
                            </p>
                            <a href="mailto:contact@neuralpoint.jp" className="inline-block px-10 py-4 border border-secondary/40 text-primary hover:bg-white hover:text-background hover:border-white transition-all duration-300 font-mono text-xs tracking-widest uppercase rounded-none">
                                Contact Us
                            </a>
                        </div>
                        <div className="text-right">
                            <p className="font-mono text-xs text-secondary/40 mb-2">NEURAL POINT ANALYTICA</p>
                            <p className="font-mono text-xs text-secondary/40">TOKYO, JAPAN</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-[#333333] bg-transparent">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
                    <p className="text-[10px] font-mono text-secondary/30">&copy; 2024 NEURAL POINT ANALYTICA. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
}

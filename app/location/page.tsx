import { Header } from "@/components/header";
import { WavyBackground } from "@/components/ui/wavy-background";
import { TiltCard } from "@/components/ui/tilt-card";

export default function LocationPage() {
    return (
        <div className="min-h-screen bg-[#1a1614] text-primary selection:bg-secondary/30 relative overflow-hidden">
            <Header />

            {/* Background Effects */}
            {/* Background Effects */}
            <WavyBackground />

            <main className="relative z-10 pt-32 px-6 md:px-12 max-w-[1400px] mx-auto min-h-[calc(100vh-100px)] flex flex-col justify-center items-center text-center">
                <span className="font-mono text-xs text-secondary/60 tracking-widest block mb-4">LOCATION</span>
                <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 tracking-wide">
                    Office Address
                </h1>

                <a
                    href="https://www.google.com/maps/search/?api=1&query=〒150-0043+東京都渋谷区道玄坂１丁目１０−８"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <TiltCard className="p-8 md:p-12 border border-[#333333] bg-white/5 backdrop-blur-md rounded-none max-w-2xl w-full cursor-pointer hover:border-secondary/50 transition-colors group">
                        <p className="text-lg md:text-xl text-primary font-serif mb-2 group-hover:text-white transition-colors">
                            〒150-0043
                        </p>
                        <p className="text-xl md:text-2xl text-primary font-medium mb-4 leading-relaxed group-hover:text-white transition-colors">
                            東京都渋谷区道玄坂1丁目10番8号<br />
                            渋谷道玄坂東急ビル2F-C
                        </p>
                        <div className="w-full h-[1px] bg-[#333333] my-8 group-hover:bg-secondary/50 transition-colors"></div>
                        <p className="font-mono text-sm text-secondary/60 group-hover:text-secondary/90 transition-colors">
                            NEURAL POINT ANALYTICA
                        </p>
                    </TiltCard>
                </a>
            </main>
        </div>
    );
}

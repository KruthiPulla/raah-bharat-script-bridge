import { Button } from "@/components/ui/button";
import { ArrowDown, Camera, Languages, Map } from "lucide-react";
import raahLogo from "@/assets/raah-logo.png";

const Hero = () => {
  const scrollToTransliterator = () => {
    document.getElementById('transliterator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-white/5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-warm">
              <img 
                src={raahLogo} 
                alt="Raah Logo - Unlocking every direction" 
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="block text-2xl md:text-3xl font-normal mb-2 opacity-90">
              Bridge Every Script, Unlock Every Direction
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Bridging Bharat's diverse scripts. Read any signboard, in any script, 
            wherever your journey takes you across our beautiful nation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToTransliterator}
              className="group"
            >
              <Map className="w-5 h-5 mr-2 group-hover:rotate-3 transition-transform" />
              Start Transliterating
            </Button>
            <Button variant="ghost-hero" size="lg">
              Learn More
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">22+</div>
              <div className="text-sm">Official Languages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">∞</div>
              <div className="text-sm">Cultural Unity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">1</div>
              <div className="text-sm">Nation, Many Scripts</div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToTransliterator}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};

export default Hero;
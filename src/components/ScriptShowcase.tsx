import { Card, CardContent } from "@/components/ui/card";

const supportedScripts = [
  {
    name: "Devanagari",
    native: "देवनागरी",
    description: "Used for Hindi, Marathi, Nepali, and Sanskrit",
    sample: "भारत की विविधता में एकता",
    regions: ["North India", "Central India", "Nepal"]
  },
  {
    name: "Gurmukhi",
    native: "ਗੁਰਮੁਖੀ",
    description: "Sacred script of the Sikh faith and Punjabi language",
    sample: "ਪੰਜਾਬ ਦੀ ਭਾਸ਼ਾ ਅਤੇ ਸੱਭਿਆਚਾਰ",
    regions: ["Punjab", "Haryana", "Delhi"]
  },
  {
    name: "Malayalam",
    native: "മലയാളം",
    description: "Distinctive script of Kerala with unique rounded letters",
    sample: "കേരളത്തിന്റെ സുന്ദരമായ ലിപി",
    regions: ["Kerala", "Lakshadweep"]
  },
  {
    name: "Telugu",
    native: "తెలుగు",
    description: "Elegant script of Andhra Pradesh and Telangana",
    sample: "తెలుగు భాష మరియు సంస్కృతి",
    regions: ["Andhra Pradesh", "Telangana"]
  },
  {
    name: "Tamil",
    native: "தமிழ்",
    description: "Ancient script of Tamil Nadu and Sri Lanka",
    sample: "தமிழ் மொழியின் பெருமை",
    regions: ["Tamil Nadu", "Puducherry", "Sri Lanka"]
  },
  {
    name: "Bengali",
    native: "বাংলা",
    description: "Beautiful script of Bengal and Bangladesh",
    sample: "বাংলা ভাষার ঐতিহ্য",
    regions: ["West Bengal", "Bangladesh", "Tripura"]
  },
  {
    name: "Gujarati",
    native: "ગુજરાતી",
    description: "Script of Gujarat and the business community",
    sample: "ગુજરાત નો વ્યાપારિક વારસો",
    regions: ["Gujarat", "Mumbai", "Dadra & Nagar Haveli"]
  },
  {
    name: "Kannada",
    native: "ಕನ್ನಡ",
    description: "Royal script of Karnataka",
    sample: "ಕರ್ನಾಟಕದ ಭಾಷೆ ಮತ್ತು ಸಂಸ್ಕೃತಿ",
    regions: ["Karnataka"]
  }
];

const ScriptShowcase = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Supported Scripts
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Raah supports transliteration across India's major scripts, connecting millions of people 
            across linguistic boundaries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {supportedScripts.map((script) => (
            <Card 
              key={script.name} 
              className="bg-gradient-card border-0 shadow-soft hover:shadow-warm transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {script.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                    {script.native}
                  </div>
                </div>
                
                <div className="text-lg font-medium text-accent mb-3 leading-relaxed">
                  {script.sample}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {script.description}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {script.regions.map((region) => (
                    <span 
                      key={region}
                      className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More scripts are continuously being added to serve every corner of our diverse nation. 
            Together, we're building bridges across all of Bharat's linguistic heritage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScriptShowcase;
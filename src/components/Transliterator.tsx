import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightLeft, Copy, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const scripts = [
  { value: "devanagari", label: "देवनागरी (Devanagari)", example: "नमस्ते" },
  { value: "gurmukhi", label: "ਗੁਰਮੁਖੀ (Gurmukhi)", example: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
  { value: "malayalam", label: "മലയാളം (Malayalam)", example: "നമസ്കാരം" },
  { value: "telugu", label: "తెలుగు (Telugu)", example: "నమస్కారం" },
  { value: "tamil", label: "தமிழ் (Tamil)", example: "வணக்கம்" },
  { value: "bengali", label: "বাংলা (Bengali)", example: "নমস্কার" },
  { value: "gujarati", label: "ગુજરાતી (Gujarati)", example: "નમસ્તે" },
  { value: "kannada", label: "ಕನ್ನಡ (Kannada)", example: "ನಮಸ್ಕಾರ" },
  { value: "odia", label: "ଓଡ଼ିଆ (Odia)", example: "ନମସ୍କାର" },
  { value: "assamese", label: "অসমীয়া (Assamese)", example: "নমস্কাৰ" },
];

const Transliterator = () => {
  const [fromScript, setFromScript] = useState("devanagari");
  const [toScript, setToScript] = useState("gurmukhi");
  const [inputText, setInputText] = useState("नमस्ते, मैं राह का उपयोग कर रहा हूँ");
  const [outputText, setOutputText] = useState("ਨਮਸਤੇ, ਮੈਂ ਰਾਹ ਕਾ ਉਪਯੋਗ ਕਰ ਰਿਹਾ ਹੂੰ");
  const { toast } = useToast();

  const handleSwapScripts = () => {
    setFromScript(toScript);
    setToScript(fromScript);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({
        title: "Copied!",
        description: "Transliterated text copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the text manually",
        variant: "destructive",
      });
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(outputText);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="transliterator" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Script Transliterator
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert text from one Indian script to another while preserving the sound and meaning
          </p>
        </div>

        <Card className="bg-gradient-card shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Live Transliteration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Script Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">From Script:</label>
                <Select value={fromScript} onValueChange={setFromScript}>
                  <SelectTrigger className="bg-white border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scripts.map((script) => (
                      <SelectItem key={script.value} value={script.value}>
                        {script.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapScripts}
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">To Script:</label>
                <Select value={toScript} onValueChange={setToScript}>
                  <SelectTrigger className="bg-white border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scripts.map((script) => (
                      <SelectItem key={script.value} value={script.value}>
                        {script.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Input Text:</label>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to transliterate..."
                  className="min-h-[200px] text-lg bg-white border-border resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Transliterated Text:</label>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSpeak}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] text-lg bg-muted border-border resize-none"
                />
              </div>
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg" className="shadow-warm">
                Transliterate Text
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Transliterator;
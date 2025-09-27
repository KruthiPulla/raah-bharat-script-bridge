import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, X, RotateCcw, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createWorker } from 'tesseract.js';

interface CameraOCRProps {
  onTextDetected: (text: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CameraOCR = ({ onTextDetected, isOpen, onClose }: CameraOCRProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCapturing(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
    setCapturedImage(null);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageDataUrl);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const processImage = useCallback(async () => {
    if (!capturedImage) return;

    setIsProcessing(true);
    
    try {
      const worker = await createWorker('eng+hin+tel+tam+ben+guj+kan+mal+asm+ori+pan');
      const { data: { text } } = await worker.recognize(capturedImage);
      await worker.terminate();
      
      if (text.trim()) {
        onTextDetected(text.trim());
        toast({
          title: "Text Detected!",
          description: "Text has been extracted from the image",
        });
        onClose();
      } else {
        toast({
          title: "No Text Found",
          description: "Could not detect any text in the image",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "OCR Error",
        description: "Failed to process the image",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [capturedImage, onTextDetected, toast, onClose]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Camera OCR</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            {capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            )}
            
            <canvas ref={canvasRef} className="hidden" />
            
            {isCapturing && (
              <div className="absolute inset-0 border-4 border-primary/30 rounded-lg">
                <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Position text within frame</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 justify-center">
            {!isCapturing && !capturedImage && (
              <Button onClick={startCamera} variant="primary" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Start Camera
              </Button>
            )}
            
            {isCapturing && (
              <Button onClick={captureImage} variant="primary" size="lg">
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </Button>
            )}
            
            {capturedImage && (
              <>
                <Button 
                  onClick={retakePhoto} 
                  variant="outline" 
                  size="lg"
                  disabled={isProcessing}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Retake
                </Button>
                <Button 
                  onClick={processImage} 
                  variant="primary" 
                  size="lg"
                  disabled={isProcessing}
                >
                  <Check className="w-5 h-5 mr-2" />
                  {isProcessing ? "Processing..." : "Extract Text"}
                </Button>
              </>
            )}
          </div>
          
          {isProcessing && (
            <div className="text-center text-muted-foreground">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Analyzing image with OCR...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CameraOCR;

import { useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import MicrophoneButton from "@/components/MicrophoneButton";
import MusicResult from "@/components/MusicResult";
import { Music, Headphones } from "lucide-react";

const Index = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [searchResult, setSearchResult] = useState<any | null>();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // const token = process.env.REACT_APP_API_TOKEN;


  const handleRecordStart = async () => {

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    console.log("🔊 Microfone ativo:", stream);
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      console.log("🔊 Áudio gravado:", url);
      audioChunks.current = [];
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const handleRecordEnd = async () => {

    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
  
    mediaRecorderRef.current.onstop = async () => {

      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("api_token", '4f9b41849933808cb4295edf951de480');
      formData.append("file", audioBlob, "audio.webm");
      formData.append("return", "apple_music,spotify");
  
      try {
        const res = await fetch("https://api.audd.io/", {
          method: "POST",
          body: formData,
        });
  
        const data = await res.json();
        setSearchResult(data);
        console.log("🎵 Resultado:", data);
  
        if (data.status === "success" && data.result) {
          console.log("🎶 Música encontrada:", data.result);
        } else {
          toast({ title: "Não foi possível identificar a música." });
        }
      } catch (error) {
        console.error("Erro ao conectar com AudD:", error);
        toast({ title: "Erro na detecção de música" });
      }
  
      setAudioUrl(URL.createObjectURL(audioBlob));
      audioChunks.current = [];
      setIsRecording(false);
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#7226FF] via-[#160078] to-[#010030]">
      <div className="container max-w-4xl px-4 py-12">
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-white font-satisfy">HearNew.</h1>
            <Headphones className="h-10 w-10 text-hearNew-purple" />
          </div>
          <p className="text-xl text-white/50 text-muted-foreground">
            Descubra qualquer música instantaneamente
          </p>
        </header>

        <main className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <MicrophoneButton 
              onRecordStart={handleRecordStart} 
              onRecordEnd={handleRecordEnd}
              isRecording={isRecording}
            />
            <p className="text-lg font-medium text-gray-300">
              {isRecording 
                ? "Ouvindo..." 
                : "Toque para reconhecer música"}
            </p>
          </div>

          {searchResult && (
            <div className="w-full animate-fade-in">
              <MusicResult result={searchResult} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Index;

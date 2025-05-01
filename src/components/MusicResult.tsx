import { Music, ExternalLink, Clock, Calendar, Disc, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MusicApiResult } from "@/interfaces/music";
import { useState, useRef, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

interface MusicResultProps {
  result: MusicApiResult | null;
}

const MusicResult = ({ result }: MusicResultProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("play", () => setIsPlaying(true));
      audioRef.current.addEventListener("pause", () => setIsPlaying(false));
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", () => setIsPlaying(true));
        audioRef.current.removeEventListener("pause", () => setIsPlaying(false));
        audioRef.current.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  if (!result) return null;

  const coverImage =
    result.apple_music?.artwork?.url?.replace("{w}", "500").replace("{h}", "500") ||
    result.spotify?.album?.images?.[0]?.url;

  const previewUrl = result.apple_music?.previews?.[0]?.url;
  const spotifyUrl = result.spotify?.external_urls?.spotify;
  const appleUrl = result.apple_music?.url;

  const formatDuration = (ms?: number) => {
    if (!ms) return result.timecode || "-:--";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full max-w-lg rounded-2xl overflow-hidden border-none bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl shadow-2xl">
      <div className="relative w-full">
        {coverImage && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl" 
              style={{ backgroundImage: `url(${coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 to-gray-900/60" />
          </>
        )}
      
        <CardHeader className="relative pb-2 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gradient">
                Música Encontrada
              </CardTitle>
              <CardDescription className="text-gray-300">
                Informações detalhadas sobre a música
              </CardDescription>
            </div>
            {result.spotify?.popularity && (
              <div className="flex items-center bg-black/30 px-3 py-1 rounded-full">
                <Award className="h-4 w-4 mr-1 text-yellow-400" />
                <span className="text-sm text-yellow-200">Popularidade: {result.spotify.popularity}/100</span>
              </div>
            )}
          </div>
        </CardHeader>
      </div>

      <CardContent className="relative z-10 p-6">
        {/* Cabeçalho da música - Capa e informações principais */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div 
            className={cn(
              "h-56 w-56 md:h-64 md:w-64 rounded-xl overflow-hidden flex items-center justify-center music-gradient shadow-lg mx-auto md:mx-0",
              isPlaying ? "pulse-animation" : ""
            )}
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt={`${result.title} cover`}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-300",
                  isImageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsImageLoaded(true)}
              />
            ) : (
              <Music className="h-20 w-20 text-white" />
            )}
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-2xl md:text-3xl text-white mb-1">
              {result.title}
            </h2>
            <h3 className="text-xl text-gray-200 mb-4">
              {result.artist}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Disc className="h-4 w-4 mr-2 text-purple-400" />
                <span>Álbum: {result.album || result.apple_music?.albumName || "Desconhecido"}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-purple-400" />
                <span>Lançamento: {result.release_date}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="h-4 w-4 mr-2 text-purple-400" />
                <span>Duração: {formatDuration(result.apple_music?.durationInMillis || result.spotify?.duration_ms)}</span>
              </div>
              
              {result.label && (
                <div className="flex items-center text-sm text-gray-300">
                  <Award className="h-4 w-4 mr-2 text-purple-400" />
                  <span>Gravadora: {result.label}</span>
                </div>
              )}
            </div>
            
            {/* Gêneros musicais */}
            {result.apple_music?.genreNames && result.apple_music.genreNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {result.apple_music.genreNames.map((genre, index) => (
                  <span key={index} className="badge-genre">
                    {genre}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Preview de áudio */}
        {previewUrl && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Prévia:</h4>
            <audio 
              ref={audioRef} 
              controls 
              className="audio-player w-full"
            >
              <source src={previewUrl} type="audio/mp4" />
              Seu navegador não suporta o player de áudio.
            </audio>
          </div>
        )}

        {/* Links para serviços de streaming */}
        <div className="flex flex-wrap gap-2 mb-4">
          {result.song_link && (
            <Button
              variant="default"
              className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white"
              asChild
            >
              <a href={result.song_link} target="_blank" rel="noopener noreferrer">
                Ouvir Agora <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}

          {appleUrl && (
            <Button
              variant="outline"
              className="border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white"
              asChild
            >
              <a href={appleUrl} target="_blank" rel="noopener noreferrer">
                Apple Music <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}

          {spotifyUrl && (
            <Button
              variant="outline"
              className="border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-white"
              asChild
            >
              <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
                Spotify <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}
        </div>

        {/* Informações adicionais */}
        {result.apple_music?.composerName && (
          <>
            <Separator className="my-4 bg-gray-700/50" />
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Informações adicionais:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <p className="text-sm text-gray-400">
                  <span className="font-medium text-gray-300">Compositor(es):</span> {result.apple_music.composerName}
                </p>
                {result.apple_music.trackNumber && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">Faixa nº:</span> {result.apple_music.trackNumber}
                  </p>
                )}
                {result.apple_music.discNumber && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">Disco nº:</span> {result.apple_music.discNumber}
                  </p>
                )}
                {result.apple_music.isrc && (
                  <p className="text-sm text-gray-400">
                    <span className="font-medium text-gray-300">ISRC:</span> {result.apple_music.isrc}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MusicResult;
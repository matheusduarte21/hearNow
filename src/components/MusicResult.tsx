import { Music, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApiMusicResult {
  artist: string;
  title: string;
  album: string;
  release_date: string;
  song_link?: string;
  apple_music?: {
    url?: string;
    albumName?: string;
    previews?: { url: string }[];
    artwork?: {
      url: string;
    };
  };
  spotify?: {
    external_urls?: {
      spotify: string;
    };
    album?: {
      name?: string;
      images?: { url: string }[];
    };
  };
}

interface MusicResultProps {
  result: ApiMusicResult | null;
}

const MusicResult = ({ result }: MusicResultProps) => {
  if (!result) return null;

  const coverImage =
    result.apple_music?.artwork?.url?.replace("{w}", "300").replace("{h}", "300") ||
    result.spotify?.album?.images?.[0]?.url;

  const previewUrl = result.apple_music?.previews?.[0]?.url;

  return (
    <Card className="w-full max-w-md rounded-2xl border-2 border-white/20 bg-white/5 backdrop-blur-2xl shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gradient">
          Música encontrada!
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "h-20 w-20 rounded-md overflow-hidden flex items-center justify-center music-gradient"
            )}
          >
            {coverImage ? (
              <img
                src={coverImage}
                alt={`${result.title} cover`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Music className="h-12 w-12 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-xl text-white line-clamp-1">
              {result.title}
            </h3>
            <p className="text-gray-300">{result.artist}</p>
            <p className="text-sm text-gray-400">
              {result.album || result.apple_music?.albumName}
            </p>
            <p className="text-xs text-gray-500">
              Lançamento: {result.release_date}
            </p>
          </div>
        </div>

        {previewUrl && (
          <audio controls className="w-full mt-2 rounded-md">
            <source src={previewUrl} type="audio/mp4" />
            Seu navegador não suporta o player de áudio.
          </audio>
        )}

        <div className="flex gap-2 mt-2 flex-wrap">
          {result.song_link && (
            <Button
              variant="secondary"
              className="text-white"
              asChild
            >
              <a href={result.song_link} target="_blank" rel="noopener noreferrer">
                Link Direto <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}

          {result.apple_music?.url && (
            <Button
              variant="secondary"
              className="text-white"
              asChild
            >
              <a href={result.apple_music.url} target="_blank" rel="noopener noreferrer">
                Apple Music <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}

          {result.spotify?.external_urls?.spotify && (
            <Button
              variant="secondary"
              className="text-white"
              asChild
            >
              <a href={result.spotify.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                Spotify <ExternalLink className="ml-1 w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicResult;

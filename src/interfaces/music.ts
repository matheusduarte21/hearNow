
export interface AppleMusicArtwork {
    width: number;
    height: number;
    url: string;
    bgColor?: string;
    textColor1?: string;
    textColor2?: string;
    textColor3?: string;
    textColor4?: string;
  }
  
  export interface AppleMusicPreview {
    url: string;
  }
  
  export interface AppleMusicPlayParams {
    id: string;
    kind: string;
  }
  
  export interface AppleMusicData {
    previews?: AppleMusicPreview[];
    artwork?: AppleMusicArtwork;
    artistName?: string;
    url?: string;
    discNumber?: number;
    genreNames?: string[];
    durationInMillis?: number;
    releaseDate?: string;
    name?: string;
    isrc?: string;
    albumName?: string;
    playParams?: AppleMusicPlayParams;
    trackNumber?: number;
    composerName?: string;
  }
  
  export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
  }
  
  export interface SpotifyExternalUrls {
    spotify: string;
  }
  
  export interface SpotifyArtist {
    external_urls: SpotifyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }
  
  export interface SpotifyAlbum {
    album_type?: string;
    artists?: SpotifyArtist[];
    available_markets?: string[] | null;
    external_urls?: SpotifyExternalUrls;
    href?: string;
    id?: string;
    images?: SpotifyImage[];
    name?: string;
    release_date?: string;
    release_date_precision?: string;
    total_tracks?: number;
    type?: string;
    uri?: string;
  }
  
  export interface SpotifyExternalIds {
    isrc: string;
  }
  
  export interface SpotifyData {
    album?: SpotifyAlbum;
    artists?: SpotifyArtist[];
    available_markets?: string[] | null;
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: SpotifyExternalIds;
    external_urls?: SpotifyExternalUrls;
    href?: string;
    id?: string;
    is_local?: boolean;
    name?: string;
    popularity?: number;
    track_number?: number;
    type?: string;
    uri?: string;
  }
  
  export interface MusicApiResult {
    artist: string;
    title: string;
    album: string;
    release_date: string;
    label?: string;
    timecode?: string;
    song_link?: string;
    apple_music?: AppleMusicData;
    spotify?: SpotifyData;
  }
  
  export interface MusicApiResponse {
    status: string;
    result: MusicApiResult;
  }
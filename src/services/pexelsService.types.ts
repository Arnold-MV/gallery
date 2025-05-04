export type PexelsPhotoSource = {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
};

export type PexelsPhoto = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: PexelsPhotoSource;
  liked: boolean;
  alt: string;
};

export type PexelsResponse = {
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  total_results: number;
  next_page?: string;
  prev_page?: string;
};

export type PexelsSearchParams = {
  query: string;
  page?: number;
  per_page?: number;
};

export type PexelsCuratedParams = {
  page?: number;
  per_page?: number;
};

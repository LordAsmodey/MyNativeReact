export type FavoriteAsset = {
  id: string;
  maxPrice: number;
  minPrice: number;
};

export type User = {
  email: string;
  password: string;
  userId: string;
  deviceId: string;
  favoriteAssets: FavoriteAsset[];
  refreshToken: string | null;
  accessToken: string | null;
};

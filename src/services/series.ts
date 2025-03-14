import axios from "axios";

export type Serie = {
  _id: {
    $oid: string;
  };
  id: string;
  created_at: string;
  background: string;
  image: string;
  language: string;
  productionYear: number;
  review: string;
  status: "PUBLISHED" | "DRAFT"; // o cualquier otro estado que puedas tener
  studioId: string;
  title: string;
  valoration: number;
  slug: string;
  resource: string;
};

type Season = {
  _id: {
    $oid: string;
  };
  id: string;
  created_at: string;
  serieId: string;
  title: string;
};

type Episode = {
  _id: {
    $oid: string;
  };
  id: string;
  created_at: string;
  title: string;
  seasonId: string;
  numberEpisode: number;
  video: string;
  slug: string;
};

export type JSON_SCHEMA = {
  serie: Serie;
  seasons: {
    season: Season;
    episodes: Episode[];
  }[];
};

export const fetchListSeries = async (): Promise<Serie[]> => {
  return (await axios.get(process.env.NEXT_PUBLIC_SERIES ?? "")).data;
};

export const fetchSerie = async (
  url: string | null
): Promise<{
  serie: Serie;
  seasons: {
    season: Season;
    episodes: Episode[];
  }[];
}> => {
  return (await axios.get(url ?? "")).data;
};

import { decompressURL } from "@/utils/hash";
import axios from "axios";

type Serie = {
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

export const fetchListSeries = async (): Promise<Serie[]> => {
  return (await axios.get(process.env.NEXT_PUBLIC_SERIES ?? "")).data;
};

export const fetchSerie = async (
  id: string | null
): Promise<{
  serie: Serie;
  seasons: {
    season: Season;
    episodes: Episode[];
  }[];
}> => {
  return (await axios.get(decompressURL(id ?? ""))).data;
};

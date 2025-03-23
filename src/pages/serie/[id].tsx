/* eslint-disable @next/next/no-img-element */
import { Seo } from "@/components/seo";
import { JSON_SCHEMA, Serie } from "@/services/series";

import type { GetStaticPaths } from "next";
import { useState } from "react";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetch(process.env.NEXT_PUBLIC_SERIES ?? "").then((res) =>
    res.json()
  );
  const paths = posts.map((post: Serie) => ({
    params: { id: String(post.slug) },
  }));

  // We'll prerender only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const serie: JSON_SCHEMA = await fetch(
    `${process.env.NEXT_PUBLIC_SEO}${params.id}.json`
  ).then((res) => res.json());

  return {
    props: serie,
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    // revalidate: 86400,
  };
};

const SeriePage = ({ serie, seasons }: JSON_SCHEMA) => {
  // const URL = `${process.env.NEXT_PUBLIC_SEO}${serie?.slug}.json`;

  // const { data } = useQuery({
  //   queryKey: ["serie_page", URL],
  //   queryFn: async () => fetchSerie(URL as string),
  //   enabled: URL !== undefined,
  // });

  const title = `LaToons - ${serie?.title}`;
  const url = `${process.env.NEXT_PUBLIC_URL}/serie/${serie?.slug}`;
  const description = serie?.review?.slice(0, 155);

  const [selectSeasonId, setselectSeasonId] = useState<string | null>(
    seasons?.[0]?.season?.id ?? null
  );

  return (
    <>
      <Seo
        description={description}
        title={title}
        image={serie?.image ?? ""}
        keywords="cartoons,latoons,animation, series, serie, details, studio, temporadas, episodios"
        url={url}
      />

      <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 w-full">
        {/* Banner */}
        <div className="relative w-full  sm:aspect-video md:h-[60vh]">
          <img
            src={serie?.background}
            alt={`backgorund-serie-image-${serie?.title}`}
            className="w-full h-full  object-cover object-center"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="flex flex-col gap-6">
            {/* Series details */}
            <div className="bg-card rounded-lg p-6 border border-neutral-200 shadow bg-white dark:border-neutral-700 dark:bg-neutral-800">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 w-full md:w-[200px]">
                  <img
                    loading="lazy"
                    src={serie?.image}
                    alt={`backgorund-serie-image-${serie?.title}`}
                    className="w-full h-full  object-cover rounded-lg aspect-square"
                  />
                </div>
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {serie?.title}
                    {/* {series.title} */}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {/* <Badge variant="secondary">Drama</Badge>
                    <Badge variant="secondary">Sci-Fi</Badge>
                    <Badge variant="secondary">Mystery</Badge> */}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Rating:
                      </span>
                      <div className="flex items-center">
                        <span className="font-bold mr-1">
                          {serie.valoration / 2}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-star w-4 h-4 fill-primary text-primary "
                              data-darkreader-inline-stroke=""
                              // style="--darkreader-inline-stroke: currentColor;"
                            >
                              <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                                fill="black"
                                className="fill-neutral-900 dark:fill-neutral-100"
                              ></polygon>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Year:
                      </span>
                      <span className="font-semibold">
                        {serie?.productionYear}
                        {/* {series.productionYear} */}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Seasons:
                      </span>
                      <span className="font-medium">{seasons?.length}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{serie?.review}</p>
                  <div className="flex gap-2">
                    {/* <Button>Watch Now</Button>
                    <Button variant="outline">Add to Watchlist</Button> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Seasons and episodes */}
            <div className="bg-card rounded-lg p-6 border border-neutral-200 shadow bg-white dark:border-neutral-700 dark:bg-neutral-800">
              <h2 className="text-2xl font-bold mb-4">Seasons & Episodes</h2>
              <div className="flex flex-col gap-4">
                {seasons.map(({ season, episodes }) => (
                  <div
                    key={season.id}
                    className="border border-neutral-200 dark:border-neutral-600 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full cursor-pointer flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors bg-neutral-100 dark:bg-neutral-700"
                      onClick={() =>
                        setselectSeasonId(
                          selectSeasonId === season?.id ? null : season?.id
                        )
                      }
                    >
                      <h3 className="text-lg font-semibold">
                        {season.title?.replace("Temporada", "Season")}
                      </h3>
                      {selectSeasonId === season?.id ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-chevron-up h-5 w-5 text-muted-foreground"
                        >
                          <path d="m18 15-6-6-6 6"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-chevron-down h-5 w-5 text-muted-foreground"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      )}
                    </button>
                    {selectSeasonId === season?.id ? (
                      <div className="p-4">
                        <div className="grid gap-4">
                          {episodes.map((episode) => (
                            <div
                              key={episode.id}
                              className="bg-card rounded-lg border border-neutral-200  bg-white dark:border-neutral-700 dark:bg-neutral-800"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 items-center">
                                <button
                                  className="relative cursor-pointer h-[100px] rounded-lg md:h-full bg-black flex justify-center items-center"
                                  onClick={() =>
                                    window.open(episode?.video, "blank")
                                  }
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.409 9.35331C21.8893 9.60872 22.291 9.99 22.5712 10.4563C22.8514 10.9226 22.9994 11.4563 22.9994 12.0003C22.9994 12.5443 22.8514 13.078 22.5712 13.5443C22.291 14.0106 21.8893 14.3919 21.409 14.6473L8.597 21.6143C6.534 22.7373 4 21.2773 4 18.9683V5.03331C4 2.72331 6.534 1.26431 8.597 2.38531L21.409 9.35331Z"
                                      fill="white"
                                    />
                                  </svg>
                                </button>
                                <div className="p-4 flex flex-col gap-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-semibold">
                                      {episode.title}
                                    </h4>
                                    <span className="text-sm text-muted-foreground">
                                      EP: {episode?.numberEpisode}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground opacity-75">
                                    {season?.title?.replace(
                                      "Temporada",
                                      "Season"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SeriePage;

/* eslint-disable @next/next/no-img-element */
import { Seo } from "@/components/seo";
import { fetchSerie, JSON_SCHEMA, Serie } from "@/services/series";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import type { GetStaticPaths } from "next";

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
    revalidate: 86400,
  };
};

const SeriePage = ({ serie }: JSON_SCHEMA) => {
  const URL = `${process.env.NEXT_PUBLIC_SEO}${serie?.slug}.json`;

  const { data } = useQuery({
    queryKey: ["serie_page", URL],
    queryFn: async () => fetchSerie(URL as string),
    enabled: URL !== undefined,
  });

  const title = `LaToons - ${serie?.title}`;
  const url = `${process.env.NEXT_PUBLIC_URL}/serie/${serie?.slug}`;
  const description = serie?.review?.slice(0, 155);

  if (!data) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Seo
          description={description}
          title={title}
          image={serie?.image ?? ""}
          keywords="cartoons,latoons,animation, series, serie, details, studio, temporadas, episodios"
          url={url}
        />
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center pt-4 pb-12">
      <Seo
        description={description}
        title={title}
        image={serie?.image ?? ""}
        keywords="cartoons,latoons,animation, series, serie, details, studio, temporadas, episodios"
        url={url}
      />
      <section className=" flex flex-col gap-4 max-w-[1024px] w-full px-4">
        <img
          loading="lazy"
          className="w-full bg-black aspect-video object-cover object-center rounded-lg"
          src={data?.serie?.background ?? ""}
          alt={data?.serie?.title + "_alt_background"}
        />
        <h1 className="font-bold text-2xl">{data?.serie?.title}</h1>
        <p>{data?.serie?.review}</p>
        <ul className="flex flex-col-reverse gap-4">
          {data?.seasons?.map((e) => {
            return (
              <li key={e?.season?.id}>
                <p className="font-bold mb-4 px-2 sticky top-[10px] border bg-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-white p-2 text-black rounded-md">
                  🎬 {e?.season?.title}
                </p>
                <ul className="flex flex-col gap-4 pl-5">
                  {e?.episodes?.map((i, indx) => {
                    return (
                      <li key={i?.id}>
                        <Link href={i?.video} target="_blank" referrerPolicy="">
                          <p>
                            {indx + 1}. {i?.title} ▶️
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};
export default SeriePage;

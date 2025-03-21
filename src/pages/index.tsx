/* eslint-disable @next/next/no-img-element */
import { Seo } from "@/components/seo";
import { Serie } from "@/services/series";
import Link from "next/link";
import { useRouter } from "next/router";
// import { fetchListSeries } from "@/services/series";
// import { useQuery } from "@tanstack/react-query";

export const getStaticProps = async () => {
  const series: Serie[] = await fetch(
    process.env.NEXT_PUBLIC_SERIES ?? ""
  ).then((res) => res.json());

  return {
    props: { series },
    // Next.js will invalidate the cache when a
    // request comes in, at most once every 60 seconds.
    // revalidate: 86400,
  };
};

export default function Home({ series }: { series: Serie[] }) {
  const router = useRouter();

  const serie = series?.[Number(router?.query?.n) || 0];

  return (
    <>
      <Seo
        description="Encuentra y disfruta de tus series animadas favoritas en un solo lugar. Nuestro sitio te permite buscar y ver una amplia selección de series animadas clásicas"
        title="LaToons - Las mejores series animadas de tu infancia"
        image="https://res.cloudinary.com/whil/image/upload/v1731221265/app/latoons/images/Screenshot_2024-11-10_at_12.47.05_AM_p5cclh.png"
        keywords="cartoons,latoons,animation, series, serie, details, studio, temporadas, episodios"
        url={`${process.env.NEXT_PUBLIC_URL ?? "https://latoons.vercel.app/"}`}
      />

      <section className="relative bg-red-300 w-full">
        <div className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={serie?.background}
            alt="Featured Series"
            loading="lazy"
            className="object-cover w-full h-full brightness-50"
            // priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-12 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              {/* <TrendingUp className="h-5 w-5 text-primary" /> */}
              <span className="text-sm font-medium text-primary">
                Trending Now
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {serie?.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {/* <Star className="h-4 w-4 fill-primary text-primary" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-star"
                >
                  <path
                    d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                    fill="white"
                    className="fill-neutral-700 dark:fill-white"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium">
                  {serie?.valoration / 2}
                </span>
              </div>
              <span className="text-sm">{serie?.productionYear}</span>
              <span className="text-sm">{serie?.language}</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
              {serie?.review?.split(". ").slice(0, 2)}
            </p>
            <div className="flex gap-4">
              <Link
                href={`/serie/${serie?.slug}`}
                className="w-fit bg-neutral-700 dark:bg-neutral-100 rounded-sm text-sm font-bold p-2 px-4 cursor-pointer"
              >
                <p className="text-white dark:text-neutral-700">Watch now</p>
              </Link>
              {/* <Button>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Watch Now
                </Button>
                <Button variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to List
                </Button> */}
            </div>
          </div>
        </div>
      </section>
      <section className=" flex flex-col gap-4 max-w-[1024px] w-full px-4  min-h-[100dvh]">
        <ul className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 ">
          {series?.map((e) => {
            return (
              <li key={e?.id} className="flex flex-col">
                <Link
                  href={`/serie/${e?.slug}`}
                  className="h-full flex flex-col"
                >
                  <div className="bg-neutral-200 dark:bg-neutral-800 w-full h-[370px]  ">
                    <img
                      loading="lazy"
                      src={e?.image}
                      alt={e?.title + " image_alt_description"}
                      className="object-cover h-full w-full rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2 pb-4 h-[80px] ">
                    <p className="font-bold text-sm line-clamp-2 col-span-2">
                      {e?.title}
                    </p>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-star"
                        >
                          <path
                            d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
                            fill="white"
                            className="fill-neutral-700 dark:fill-white"
                          />
                        </svg>
                        <p className="text-sm">{e?.valoration / 2}</p>
                      </div>
                      <p className="text-sm">{e?.productionYear}</p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

/* eslint-disable @next/next/no-img-element */
import { Seo } from "@/components/seo";
import { fetchSerie } from "@/services/series";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

const SeriePage = () => {
  const params = useRouter();

  const { data } = useQuery({
    queryKey: ["serie_page", params?.query?.id],
    queryFn: async () => fetchSerie(params?.query?.id as string),
    enabled: params?.query?.id !== undefined,
  });

  if (!data) {
    return null;
  }
  const title = `LaToons - ${data?.serie?.title}`;
  const url = `${process.env.NEXT_PUBLIC_URL}/serie/${params?.query?.id}`;
  const description = data?.serie?.review?.slice(0, 155);

  return (
    <main className="flex flex-col items-center justify-center pt-4">
      <Seo
        description={description}
        title={title}
        image={data?.serie?.image ?? ""}
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

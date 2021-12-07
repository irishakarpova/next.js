import React from "react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  CategoryProduct,
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
  useProductsQuery
} from "../generated/frontend-graphql";
import styles from "../styles/Home.module.css";
import { initializeApollo } from "../lib/client";
import TasksList from "../components/Products";
import Link from "next/link";
import TaskFilter from "../components/Filter";
import { useRouter } from "next/router";
import Error from "next/error";
import { GetServerSideProps } from "next";
import clsx from "clsx";
import TasksListSceleton from "../components/Sceleton";

const isCategory = (value: string): value is CategoryProduct =>
  Object.values(CategoryProduct).includes(value as CategoryProduct);

export default function Home() {
  const router = useRouter();

  const category =
    Array.isArray(router.query.category) && router.query.category.length
      ? router.query.category[0]
      : undefined;

  if (category !== undefined && !isCategory(category)) {
    return <Error statusCode={404} />;
  }

  const categoryLimit = category === undefined ? 10 : 30;

  const prevCategory = useRef(category);

  useEffect(() => {
    prevCategory.current = category;
  }, [category]);

  const result = useProductsQuery({
    variables: { category },
    fetchPolicy:
      prevCategory.current === category ? "cache-first" : "cache-and-network",
    errorPolicy: "all"
  });
  const tasks = result.data?.products;

  const [limit, setLimit] = useState(categoryLimit);

  const handleClick = () => {
    setLimit(limit * 2);
  };

  let errorMessage: string | undefined;

  if (result.error) {
    if (
      result.error.networkError &&
      typeof window !== "undefined" &&
      !window.navigator.onLine
    ) {
      errorMessage = "Sorry, your browser is offline.";
    } else {
      errorMessage = "An error occurred.";
    }
  }

  return (
    <div className="container-xl container-fluid">
      <Head>
        <title>Saint Petersburg tours</title>
        <meta
          name="description"
          content="Experience the Taste of Saint Petersburg Food Tour"
        />
      </Head>

      <main>
        <nav
          className={clsx(styles.subnavbar, "nav justify-content-end pt-5")}
          aria-label="Secondary navigation"
        >
          <Link href="/createTour" passHref={true} as={`/create-tour`}>
            <a>Start with new tour </a>
          </Link>
        </nav>
        <div
          className={clsx(styles.taskwrap, "d-flex flex-column flex-lg-row")}
        >
          <div className="col-md-12 col-lg-2">
            <TaskFilter category={category} />
          </div>

          {result.loading && !tasks ? (
            <div className="col-md-12 col-lg-10 d-flex flex-column">
              <TasksListSceleton />
            </div>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : tasks && tasks.length > 0 ? (
            <div className="col-md-12 col-lg-10 d-flex flex-column">
              <TasksList tasks={tasks} />
            </div>
          ) : (
            <div className="col-md-12 col-lg-10 d-flex flex-column">
              <TasksListSceleton />
            </div>
          )}
        </div>
        <section
          className={clsx(
            styles.footerBar,
            "d-flex justify-content-end mt-5 pt-3 mb-5"
          )}
        >
          <button onClick={handleClick} className={styles.nextBtn}>
            Show more
          </button>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category =
    typeof context.params?.category === "string"
      ? context.params.category
      : undefined;

  if (category === undefined || isCategory(category)) {
    const apolloClient = initializeApollo();

    await apolloClient.query<ProductsQuery, ProductsQueryVariables>({
      query: ProductsDocument,
      variables: { category }
    });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract()
      }
    };
  }

  return { props: {} };
};

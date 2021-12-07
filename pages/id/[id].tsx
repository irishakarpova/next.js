import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ProductDocument,
  ProductQuery,
  ProductDatesDocument,
  ProductDatesQuery,
  ProductDatesQueryVariables,
  ProductImagesQueryVariables,
  useProductQuery,
  useProductDatesQuery
} from "../../generated/frontend-graphql";
import InfoBlock from "../../components/UpdateForm";
import ImagesBlock from "../../components/ProductImages";
import { initializeApollo } from "../../lib/client";
import Error from "next/error";
import ToursCalendar from "../../components/ProductsCalendar";
import style from "../../styles/Home.module.css";
import clsx from "clsx";
import Link from "next/link";

const GetTask = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id, 10) : NaN;
  if (!id) {
    <Error statusCode={404} />;
  }

  const { data, loading, error } = useProductQuery({ variables: { id } });
  const task = data?.product;

  const task_id = id;

  const {
    data: dateData,
    loading: dateLoading,
    error: dateError
  } = useProductDatesQuery({ variables: { task_id } });

  return (
    <div className="container">
      <nav
        className={clsx(style.subnavbar, "nav justify-content-end pt-5")}
        aria-label="Secondary navigation"
      >
        <Link href="/createTour" passHref={true} as={`/create-tour`}>
          <a>Update Info</a>
        </Link>
      </nav>
      <div className={clsx(style.page, "row col-md-12 m-0")}>
        <div className="col-xl-6 col-lg-6 col-sm-12 p-0 pt-5">
          <div className="d-flex flex-row">
            <ImagesBlock task_id={task_id} isEdit={false} />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-sm-12 pt-5 pb-4 p-2">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error</p>
          ) : task ? (
            <InfoBlock
              id={id}
              isOpen={false}
              initialValues={{
                title: task?.title,
                desc_tour: task?.desc_tour,
                location: task?.location,
                category: task?.category,
                price: task?.price
              }}
            />
          ) : (
            <p>No task</p>
          )}
          <>
            {dateLoading ? (
              <p>Loading...</p>
            ) : dateError ? (
              <p>Error</p>
            ) : task ? (
              <div className={style.block}>
                <div className={style.divider}></div>
                <ToursCalendar
                  isEdit={false}
                  isOpen={false}
                  task_id={task_id}
                />
                <div className="pt-5">
                  <button className={style.btnBook}>Book</button>
                </div>
              </div>
            ) : (
              <p>No dates</p>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === "string"
      ? parseInt(context.params.id, 10)
      : NaN;
  const task_id =
    typeof context.params?.task_id === "string"
      ? parseInt(context.params.task_id, 10)
      : NaN;

  if (id) {
    const apolloClient = initializeApollo();

    await apolloClient.query<ProductQuery, ProductImagesQueryVariables>({
      query: ProductDocument,
      variables: { id }
    });

    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }
  if (task_id) {
    const apolloClient = initializeApollo();

    await apolloClient.query<ProductDatesQuery, ProductDatesQueryVariables>({
      query: ProductDatesDocument,
      variables: { task_id }
    });

    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }
  return { props: {} };
};

export default GetTask;

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Error from "next/error";
import style from "../../styles/Home.module.css";
import UpdateForm from "../../components/UpdateForm";
import {
  ProductDocument,
  ProductQuery,
  ProductQueryVariables,
  useProductQuery
} from "../../generated/frontend-graphql";
import { initializeApollo } from "../../lib/client";
import TaskImages from "../../components/ProductImages";
import CalendarDates from "../../components/CalendarDates";
import clsx from "clsx";

const GetInfo = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id, 10) : NaN;
  if (!id) {
    console.log("statusCode");
    <Error statusCode={404} />;
  }

  const { data, loading, error } = useProductQuery({ variables: { id } });

  const task = data?.product;

  return (
    <div className={clsx(style.bgPage, "container-fluid")}>
      <div className="row">
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-4 p-0">
          <TaskImages isEdit={true} task_id={id} />
        </div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-5 p-0">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error</p>
          ) : task ? (
            <UpdateForm
              id={id}
              isOpen={true}
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
        </div>

        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 p-0">
          <CalendarDates task_id={id} />
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

  if (id) {
    const apolloClient = initializeApollo();

    await apolloClient.query<ProductQuery, ProductQueryVariables>({
      query: ProductDocument,
      variables: { id }
    });

    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }

  return { props: {} };
};

export default GetInfo;

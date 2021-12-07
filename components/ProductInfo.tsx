import { GetServerSideProps } from "next";

import {
  ProductDocument,
  ProductQuery,
  TourImagesQueryVariables,
  useProductQuery
} from "../generated/frontend-graphql";
import { initializeApollo } from "../lib/client";

import UpdateForm from "./UpdateForm";

interface Props {
  id: number;
}
const GetInfo: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useProductQuery({ variables: { id } });
  const task = data?.product;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : task ? (
        <UpdateForm
          isOpen={false}
          id={id}
          initialValues={{
            title: task.title,
            desc_tour: task.desc_tour,
            location: task.location,
            price: task.price,
            category: task.category
          }}
        />
      ) : (
        <p>No task</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id =
    typeof context.params?.id === "string"
      ? parseInt(context.params.id, 10)
      : NaN;

  console.log("GetServerSideProps2");
  if (id) {
    const apolloClient = initializeApollo();

    await apolloClient.query<ProductQuery, TourImagesQueryVariables>({
      query: ProductDocument,
      variables: { id }
    });

    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }

  return { props: {} };
};

export default GetInfo;

import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCommentsDollar } from "react-icons/fa";
import {
  ProductImagesDocument,
  ProductImagesQuery,
  ProductImagesQueryVariables,
  useProductImagesQuery
} from "../generated/frontend-graphql";
import CreateTaskImage from "./CreateProductImage";
import UpdateTaskImage from "./UpdateImages";
import GetTaskImages from "./ShowProductImages";
import Error from "next/error";
import { GetServerSideProps } from "next";
import { initializeApollo } from "../lib/client";

interface Props {
  task_id: number;
  isEdit: boolean;
}

const TaskImages: React.FC<Props> = ({ task_id, isEdit }) => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id, 10) : NaN;
  if (!id) {
    <Error statusCode={404} />;
  }
  const result = useProductImagesQuery({
    variables: { id }
  });
  console.log("result.data", result.data);

  return (
    <div>
      {result.loading ? (
        <p>Loading...</p>
      ) : result.error ? (
        <p>Error</p>
      ) : result.data ? (
        <CreateTaskImage
          initialValues={result.data && result.data.productImages}
          task_id={task_id}
          onSuccess={result.refetch}
          isEdit={isEdit}
        />
      ) : (
        <p>No images</p>
      )}
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

    await apolloClient.query<ProductImagesQuery, ProductImagesQueryVariables>({
      query: ProductImagesDocument,
      variables: { id }
    });

    return { props: { initialApolloState: apolloClient.cache.extract() } };
  }

  return { props: {} };
};
export default TaskImages;

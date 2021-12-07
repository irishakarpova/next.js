import { GetServerSideProps } from "next";
import {
  ProductImagesDocument,
  ProductImagesQuery,
  ProductImagesQueryVariables,
  useProductImagesQuery
} from "../generated/frontend-graphql";
import { initializeApollo } from "../lib/client";
import { useRouter } from "next/router";
import Error from "next/error";
import clsx from "clsx";
import style from "../styles/Home.module.css";
import { BsPencilSquare } from "react-icons/bs";

const GetTaskImages = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id, 10) : NaN;
  if (!id) {
    <Error statusCode={404} />;
  }
  const { data, loading, error } = useProductImagesQuery({ variables: { id } });
  console.log("data", data);
  const tourImages = data?.productImages;

  return (
    <div className={clsx(style.rootNoBg)}>
      <div className={style.displayInRow}>
        <h5 className={clsx(style.titleSteps)}>Title and description</h5>

        <button>
          <BsPencilSquare fontSize={20} color="#9c81bc" />
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error</p>
      ) : data ? (
        <div className="d-flex flex-row flex-wrap">
          {tourImages &&
            tourImages.map((tour, index) => {
              return (
                tour.product_image && (
                  <div key={index} className={clsx(style.imageBlock)}>
                    <div className={style.imageContainer}>
                      <img
                        src={tour.product_image}
                        alt="uploaded image"
                        width="100%"
                      />
                    </div>
                  </div>
                )
              );
            })}
        </div>
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

export default GetTaskImages;

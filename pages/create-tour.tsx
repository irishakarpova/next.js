import React, { useState } from "react";
import router from "next/router";
import { CategoryProduct } from "../generated/frontend-graphql";
import { useCreateProductMutation } from "../generated/frontend-graphql";
import CreateInfo from "../components/CreateInfo";
import { useForm } from "react-hook-form";
import { isApolloError } from "@apollo/client";
import style from "../styles/Home.module.css";
import clsx from "clsx";

interface Values {
  title: string;
  desc_tour: string;
  location: string;
}
const CreateTask: React.FC = () => {
  const { errors, setError, reset } = useForm<Values>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const [values, setValues] = useState({
    title: "",
    desc_tour: "",
    location: ""
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const [price, setPrice] = useState<number>();
  const [category, setCategory] = useState<CategoryProduct>();

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== undefined) {
      setPrice(parseInt(e.target.value));
    }
  };

  const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value as keyof typeof CategoryProduct) {
      setCategory(e.target.value as CategoryProduct);
    }
  };

  const [createTask, { loading, error, data }] = useCreateProductMutation();

  const task = data && data?.createProduct?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();

    if (!loading) {
      try {
        if (price) {
          const result = await createTask({
            variables: {
              input: {
                title: values.title,
                price,
                desc_tour: values.desc_tour,
                location: values.location,
                category
              }
            }
          });
          if (result.data?.createProduct) {
            router.push(`/update/${result.data?.createProduct.id}`);
          }
        }
      } catch (e: any) {
        let messageShown = false;

        if (isApolloError(e)) {
          if (typeof window !== "undefined" && !window.navigator.onLine) {
            messageShown = true;
          }
          for (const gqlError of e.graphQLErrors) {
            if (gqlError.extensions?.code === "BAD_USER_INPUT") {
              if (Array.isArray(gqlError.extensions?.errors)) {
                setErrorMessage(gqlError.message);

                for (const fieldError of gqlError.extensions.errors) {
                  setError(fieldError.property, {
                    message: fieldError.message
                  });
                }
                messageShown = true;
              }
            }
          }
        }
        if (!messageShown) {
          setErrorMessage("An error occurred.");
        }
      }
    }
  };

  return (
    <div className={clsx(style.bgPage, "container")}>
      <div className="row g-0">
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-5 p-0">
          {error && (
            <div className={clsx(style.errorMessage)} role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className=" col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0"></div>
        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-0">
          <CreateInfo
            handleSubmit={handleSubmit}
            changeCategory={changeCategory}
            handleChangeLocation={handleChange}
            handleChangeTitle={handleChange}
            handleChangeDesc={handleChange}
            handleChangePrice={handleChangePrice}
            title={values.title}
            price={price ? price : 0}
            location={values.location}
            desc_tour={values.desc_tour}
            errors={errors}
            error={error}
            task={task}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTask;

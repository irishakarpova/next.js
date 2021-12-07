import React, { useEffect } from "react";
import {
  ProductDatesDocument,
  ProductDatesQuery,
  ProductDatesQueryVariables,
  useDeleteProductDateMutation,
  useProductDatesQuery
} from "../generated/frontend-graphql";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { initializeApollo } from "../lib/client";
import { AiFillCloseCircle } from "react-icons/ai";
import { Reference } from "@apollo/client";
import clsx from "clsx";

interface Props {
  task_id: number;
  isOpen: boolean;
  isEdit: boolean;
}

const ToursCalendar: React.FC<Props> = ({ task_id, isOpen, isEdit }) => {
  const result = useProductDatesQuery({
    variables: { task_id }
  });

  const tasks = result.data?.productDates;

  const [deleteTaskDate, { loading, error }] = useDeleteProductDateMutation({
    errorPolicy: "all",
    update: (cache, result) => {
      const deletedTaskDate = result.data?.deleteProductDate;
      if (deletedTaskDate) {
        cache.modify({
          fields: {
            taskDates(dateRefs: Reference[], { readField }) {
              return dateRefs.filter((taskRef) => {
                return readField("id", taskRef) !== deletedTaskDate.id;
              });
            }
          }
        });
      }
    }
  });
  error?.networkError && <p>Error...</p>;

  const handleDeleteDate = async (id: any) => {
    if (!loading) {
      try {
        await deleteTaskDate({
          variables: { id }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const array =
    tasks &&
    tasks.map((eachDate) => {
      return eachDate.active_date;
    });

  const converted =
    array &&
    array.map((item) => {
      if (item) {
        return new Date(+item);
      }
    });

  const setClass = (date: Date) => {
    const dateobj = converted?.find((x) => {
      if (x) {
        return (
          date.getDay() === new Date(x).getDay() &&
          date.getMonth() === new Date(x).getMonth() &&
          date.getDate() === new Date(x).getDate()
        );
      }
    });
    return dateobj ? style.highlight : null;
  };

  return (
    <div className={isOpen ? style.opacityOn : style.opacityOff}>
      {result.loading && !tasks ? (
        <p>Loading tasks...</p>
      ) : result.error ? (
        <p>An error occurred.</p>
      ) : (
        tasks && (
          <>
            {isEdit && (
              <div className={style.activeDaysContainer}>
                <p>Chosen dates:</p>
                {tasks &&
                  tasks.map((date) => {
                    if (date) {
                      let active = new Date(+date.active_date!);
                      return (
                        <div key={date.id} className={style.chip}>
                          <span className={style.chipLabel}>
                            {new Date(active).toLocaleString([], {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric"
                            })}
                          </span>

                          <button
                            disabled={loading}
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => date.id && handleDeleteDate(date.id)}
                          >
                            <AiFillCloseCircle color="#3c3c3c" />
                          </button>
                        </div>
                      );
                    }
                  })}
              </div>
            )}

            <Calendar tileClassName={({ date }) => setClass(date)} />
          </>
        )
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const task_id =
    typeof context.params?.task_id === "string"
      ? parseInt(context.params.task_id, 10)
      : undefined;

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

export default ToursCalendar;

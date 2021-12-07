import React from "react";
import { useProductDatesQuery } from "../generated/frontend-graphql";
import "react-calendar/dist/Calendar.css";
import CreateTaskDate from "./CreateTaskDate";

interface Props {
  task_id: number;
}

const ToursCalendar: React.FC<Props> = ({ task_id }) => {
  const result = useProductDatesQuery({
    variables: { task_id }
  });

  return <CreateTaskDate task_id={task_id} onSuccess={result.refetch} />;
};

export default ToursCalendar;

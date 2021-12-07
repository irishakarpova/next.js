import React, { useState } from "react";
import { useCreateProductDateMutation } from "../generated/frontend-graphql";
import ToursCalendar from "./ProductsCalendar";
import style from "../styles/Home.module.css";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

interface Props {
  task_id: number;
  onSuccess: () => void;
}

const CreateTask: React.FC<Props> = ({ task_id, onSuccess }) => {
  const [active_date, setDate] = useState(moment().toDate());

  const [isOpen, setOpen] = useState(false);
  const handleCalendarOpen = () => {
    setOpen(true);
  };
  const handleCalendarClose = () => {
    setOpen(false);
  };

  const handleChangeDate = (date: any) => {
    setDate(date);
  };

  const [createTaskDate, { loading, error }] = useCreateProductDateMutation({
    onCompleted: () => {
      setDate(active_date);
      onSuccess();
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      try {
        await createTaskDate({
          variables: {
            input: {
              task_id,
              active_date: moment(active_date).format("YYYY-MM-DD H:mm")
            }
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={style.root}>
      <form onSubmit={handleSubmit}>
        <h5 className={style.titleSteps}>
          <span>Select dates and times</span>
        </h5>
        {error && <p>Error...</p>}
        <div className={clsx(style.datetimeContainer)}>
          <DatePicker
            selected={active_date}
            onChange={(date) => date && handleChangeDate(date)}
            showTimeSelect
            onCalendarOpen={handleCalendarOpen}
            onCalendarClose={handleCalendarClose}
          />

          <button className={clsx(style.submitDateTimeBtn)}>Select</button>
        </div>
      </form>
      <ToursCalendar isEdit={true} isOpen={isOpen} task_id={task_id} />
    </div>
  );
};

export default CreateTask;

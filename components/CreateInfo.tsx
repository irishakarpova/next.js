import { CategoryProduct } from "../generated/frontend-graphql";
import { DeepMap, FieldError } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import style from "../styles/Home.module.css";
import clsx from "clsx";

interface Values {
  title: string;
  desc_tour: string;
  location: string;
  price: number;
}

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDesc: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangePrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  location: string;
  desc_tour: string;
  price: number;
  errors: DeepMap<Values, FieldError>;
  error: any;
  task: number | null | undefined;
}

const CreateInfo: React.FC<Props> = ({
  handleSubmit,
  changeCategory,
  handleChangeLocation,
  handleChangeTitle,
  handleChangeDesc,
  handleChangePrice,
  task,
  title,
  price,
  location,
  desc_tour,
  errors,
  error
}) => {
  return (
    <div className={clsx(error ? style.rootError : style.root, "col-md-12")}>
      <form className={style.rootForm} onSubmit={handleSubmit}>
        <div className={clsx(style.displayItemsInField, "col-md-12")}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
            autoComplete="off"
          />
          <p className={style.errors}>
            <ErrorMessage
              errors={errors}
              name="title"
              message={errors.title?.message}
            />
          </p>
        </div>

        <div className={clsx(style.displayItemsIn, "col-md-12")}>
          <div className={clsx(style.displayItemsInField, "col-md-6")}>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={location}
              name="location"
              onChange={handleChangeLocation}
            />
            <p className={style.errors}>
              <ErrorMessage
                errors={errors}
                name="location"
                message={errors.location?.message}
              />
            </p>
          </div>
          <div className={clsx(style.displayItemsInField, "col-md-6 ps-3")}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={handleChangePrice}
            />
            <p className={style.errors}>
              <ErrorMessage
                errors={errors}
                name="price"
                message={errors.price?.message}
              />
            </p>
          </div>
        </div>
        <div className={clsx(style.displayItemsInField, "col-md-12")}>
          <label htmlFor="desc_tour">Description:</label>
          <textarea
            value={desc_tour}
            id="desc_tour"
            name="desc_tour"
            rows={6}
            onChange={handleChangeDesc}
            autoComplete="off"
            className={style.formDescription}
          />
          <p className={style.errors}>
            <ErrorMessage
              errors={errors}
              name="desc_tour"
              message={errors.title?.message}
            />
          </p>
        </div>
        <article className="pt-2 pb-3">
          <h6 className={style.subTitle}>Category</h6>
          <div className={clsx(style.displayItemsIn, "col-md-12, p-4 ps-0")}>
            <div className={clsx(style.displayItemsInStart, "col-md-4")}>
              <input
                type="radio"
                name="category"
                id="category"
                value={CategoryProduct.Food}
                onChange={changeCategory}
              />
              <label htmlFor="category">Food</label>
            </div>
            <div className={clsx(style.displayItemsInStart, "col-md-4")}>
              <input
                type="radio"
                id="category"
                name="category"
                value={CategoryProduct.Sport}
                onChange={changeCategory}
              />
              <label htmlFor="category">Sport</label>
            </div>
            <div className={clsx(style.displayItemsInStart, "col-md-4")}>
              <input
                type="radio"
                id="category"
                name="category"
                value={CategoryProduct.Masterclass}
                onChange={changeCategory}
              />
              <label htmlFor="category">Education</label>
            </div>
          </div>
        </article>

        <button className={style.submitBtn}>Sent</button>
      </form>
    </div>
  );
};

export default CreateInfo;

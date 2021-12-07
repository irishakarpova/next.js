import {
  CategoryProduct,
  useUpdateProductMutation
} from "../generated/frontend-graphql";
import { BsFillPersonFill, BsPencilSquare } from "react-icons/bs";
import { BiFoodMenu } from "react-icons/bi";
import style from "../styles/Home.module.css";
import clsx from "clsx";
import { IoBicycle, IoLocationSharp, IoSchoolSharp } from "react-icons/io5";
import { ChangeEvent, useState } from "react";

interface Values {
  title: string;
  desc_tour: string;
  location: string;
  category: CategoryProduct | undefined | null;
  price: number;
}

interface Props {
  id: number;
  initialValues: Values;
  isOpen: boolean;
}

const UpdateForm: React.FC<Props> = ({ id, initialValues, isOpen }) => {
  const [isActive, setActive] = useState(true);
  const handleEdit = () => {
    setActive(!isActive);
  };
  const [values, setValues] = useState<Values>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const [updateTask, { loading, error }] = useUpdateProductMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateTask({
        variables: {
          input: {
            id,
            title: values.title,
            desc_tour: values.desc_tour,
            location: values.location,
            category: values.category,
            price: +values.price
          }
        }
      });
      if (result.data) {
        setActive(!isActive);
      }
    } catch (e) {
      // Log the error.
    }
  };

  let errorMessage = "";
  if (error) {
    if (error.networkError) {
      errorMessage = "A network error occurred, please try again.";
    } else {
      errorMessage = "Sorry, an error occurred.";
    }
  }

  return (
    <div className={clsx(style.rootNoBg, style.addPadding)}>
      {isOpen && (
        <div className={style.displayInRow}>
          <h5 className={clsx(style.titleSteps)}>Title and description</h5>
          {isActive && (
            <button onClick={handleEdit}>
              <BsPencilSquare fontSize={20} color="#9c81bc" />
            </button>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h3 className={clsx(style.titleTour, "col-md-12")}>
          {!isActive ? (
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              autoComplete="off"
              className={isActive ? style.field : style.activeField}
            />
          ) : (
            values.title
          )}
        </h3>

        <div className={clsx(style.displayItemsInField)}>
          {!isActive ? (
            <textarea
              name="desc_tour"
              value={values.desc_tour}
              onChange={handleChange}
              autoComplete="off"
              className={isActive ? style.field : style.activeField}
            />
          ) : (
            <p className={style.textCommon}>{values.desc_tour}</p>
          )}
        </div>

        {isActive ? (
          <div className={style.displayIconsBetween}>
            {values.category === "sport" && (
              <div className={style.displayIconsBetween}>
                <IoBicycle fontSize={24} color="#4B4B4B" />
                <h6 className={clsx(style.textCommonSmall, "m-0 ps-1")}>
                  Sport
                </h6>
              </div>
            )}

            {values.category === "food" && (
              <div className={style.displayIconsBetween}>
                <BiFoodMenu fontSize={18} color="#4B4B4B" />
                <h6 className={clsx(style.textCommonSmall, "m-0 ps-1")}>
                  Food
                </h6>
              </div>
            )}
            {values.category === "masterclass" && (
              <div className={style.displayIconsBetween}>
                <IoSchoolSharp fontSize={18} color="#4B4B4B" />
                <h6 className={clsx(style.textCommonSmall, "m-0 ps-1")}>
                  MasterClass
                </h6>
              </div>
            )}
            <div className={style.displayIconsBetween}>
              <IoLocationSharp fontSize={18} color="#4B4B4B" />
              <h6 className={clsx(style.textCommonSmall, "m-0 ps-1")}>
                {values.location}
              </h6>
            </div>
            <div className={clsx(style.displayIconsBetween)}>
              <h6 className={style.textBoldSmall}>{values.price}</h6>
              <h6 className={clsx(style.textCommonSmall, "ps-.5")}>$</h6>
              <h6 className={clsx(style.textCommonSmall, "ps-2")}>
                Per person
              </h6>
            </div>
          </div>
        ) : (
          <>
            <div className="col-md-8 d-flex flex-row align-items-center">
              <input
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                className={style.activeField}
              />
              <p className={clsx(style.textPurple, "ps-.5")}>$</p>
              <BsFillPersonFill className={clsx(style.textCommonSmall)} />
            </div>
            <h6 className="col-md-8 pt-2">
              <input
                type="text"
                name="location"
                value={values.location}
                onChange={handleChange}
                autoComplete="off"
                className={isActive ? style.field : style.activeField}
              />
            </h6>

            <div className={clsx(style.displayItemsIn, "col-md-12, p-4 ps-0")}>
              <div className={clsx(style.displayItemsInStart)}>
                <input
                  type="radio"
                  name="category"
                  id="category"
                  value={CategoryProduct.Food}
                  onChange={handleChange}
                />
                <label htmlFor="category">Food</label>
              </div>
              <div className={clsx(style.displayItemsInStart)}>
                <input
                  type="radio"
                  id="category"
                  name="category"
                  value={CategoryProduct.Sport}
                  onChange={handleChange}
                />
                <label htmlFor="category">Sport</label>
              </div>
              <div className={clsx(style.displayItemsInStart)}>
                <input
                  type="radio"
                  id="category"
                  name="category"
                  value={CategoryProduct.Masterclass}
                  onChange={handleChange}
                />
                <label htmlFor="category">Education</label>
              </div>
            </div>
          </>
        )}

        {!isActive && (
          <div>
            <button className={style.submitBtn}>Edit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateForm;

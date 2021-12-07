import { Product } from "../generated/frontend-graphql";
import Link from "next/link";
import style from "../styles/Home.module.css";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";
import clsx from "clsx";
import { IoLocationSharp } from "react-icons/io5";
import no_picture from "../public/no-picture.svg";

interface Props {
  task: Product;
}

const TaskComponent: React.FC<Props> = ({ task }) => {
  return (
    <article className={style.tourCard}>
      <div className="d-flex flex-column flex-md-row col-12 justify-content-end align-items-end">
        {task.product_image ? (
          <picture className={style.imageWrap}>
            <img src={task.product_image} width="100%" alt={task.title} />
          </picture>
        ) : (
          <picture className={style.imageWrap}>
            <Image src={no_picture} alt="no picture" />
          </picture>
        )}
        <div className={style.descriptionBlock}>
          <div
            className={clsx(
              style.smallText,
              style.textAlignRight,
              "mb-4 mt-4 "
            )}
          >
            <span className="pe-2">
              <IoLocationSharp fill="#3c3c3c" fontSize={18} />
            </span>
            <span>{task.location}</span>
          </div>
          <h4>{task.title}</h4>
          <p>{task.desc_tour}</p>
          <div className="d-flex flex-row  flex-md-row justify-content-between align-items-center mt-5">
            <Link href="/[category]/[id]" as={`/id/${task.id}`}>
              <a>
                <button className={style.bookBtn}>
                  details <BiRightArrowAlt strokeWidth=".5" />
                </button>
              </a>
            </Link>
            <div className="d-flex flex-row">
              <p className={clsx(style.textBoldSmall, "pe-2")}>{task.price}$</p>
              <p className={style.textCommonSmall}>per person</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default TaskComponent;

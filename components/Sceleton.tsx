import { Product } from "../generated/frontend-graphql";
import Link from "next/link";
import style from "../styles/Home.module.css";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";
import clsx from "clsx";
import { IoLocationSharp } from "react-icons/io5";
import no_picture from "../public/no-picture.svg";

const TaskComponent: React.FC = () => {
  return (
    <article className={style.tourCard}>
      <div className="d-flex flex-column flex-md-row col-12 justify-content-end align-items-end">
        <div className={style.imageWrap}>
          <Image src={no_picture} alt="no picture" />
        </div>

        <div className={style.descriptionBlock}>
          <div className={style.sceletonh4}></div>
          <div className={style.sceletonh4}></div>
          <div className={style.sceletonh4}></div>
        </div>
      </div>
    </article>
  );
};
export default TaskComponent;

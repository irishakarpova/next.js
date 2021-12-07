import { useEffect, useState } from "react";
import { CategoryProduct } from "../generated/frontend-graphql";
import Link from "next/link";
import style from "../styles/Home.module.css";
import useWindowDimensions from "./utils/getWidth";
import clsx from "clsx";
import { BiArrowFromTop } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

interface Props {
  category: CategoryProduct | undefined;
}
const TaskFilter: React.FC<Props> = ({ category }) => {
  const { width } = useWindowDimensions();
  useEffect(() => {
    width > 992 ? setOpen(true) : setOpen(false);
  }, [width]);

  const [isOpen, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!isOpen);
  };
  return (
    <nav className={clsx(style.navLayer, "d-flex flex-column")}>
      <div onClick={handleToggle} className={clsx(style.navbarToggler)}>
        Categories
        <span className="ps-2 flex-fill">
          <BiArrowFromTop />
        </span>
        {isOpen && (
          <button>
            <AiOutlineCloseSquare />
          </button>
        )}
      </div>

      <ul className={clsx(isOpen ? style.navbar : style.navbarExp, "nav")}>
        <li className={style.navItem}>
          <Link href="/" shallow={true}>
            <a
              className={
                !category ? style.filter_active : style.filter_no_active
              }
            >
              All Categories
            </a>
          </Link>
        </li>
        <li className={style.navItem}>
          <Link
            href="/[category]"
            as={`/${CategoryProduct.Sport}`}
            shallow={true}
          >
            <a
              className={
                category === CategoryProduct.Sport
                  ? style.filter_active
                  : style.filter_no_active
              }
            >
              Sport
            </a>
          </Link>
        </li>
        <li className={style.navItem}>
          <Link
            href="/[category]"
            as={`/${CategoryProduct.Food}`}
            shallow={true}
          >
            <a
              className={
                category === CategoryProduct.Food
                  ? style.filter_active
                  : style.filter_no_active
              }
            >
              Food
            </a>
          </Link>
        </li>
        <li className={style.navItem}>
          <Link
            href="/[category]"
            as={`/${CategoryProduct.Masterclass}`}
            shallow={true}
          >
            <a
              className={
                category === CategoryProduct.Masterclass
                  ? style.filter_active
                  : style.filter_no_active
              }
            >
              Masterclass
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default TaskFilter;

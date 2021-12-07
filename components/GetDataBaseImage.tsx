import clsx from "clsx";
import style from "../styles/Home.module.css";

const GetImageFromDataBase = () => {
  return (
    <>
      {initialImages.length > 0 &&
        initialImages.map((initialImage, index) => {
          return (
            <AiFillDelete
              key={index}
              className={style.deleteImageBtn}
              onClick={() => handleDeleteTaskImage(initialImage.id)}
            />
          );
        })}
    </>
  );
};
export default GetImageFromDataBase;

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  ImageType,
  useUpdateTaskImagesMutation
} from "../generated/frontend-graphql";
import style from "../styles/Home.module.css";
import {
  AiOutlineCloudUpload,
  AiFillDelete,
  AiOutlinePlus
} from "react-icons/ai";
import { TaskImage } from "../generated/backend-graphql";

interface Props {
  initialValues: TaskImage[];
  task_id: number;
  id: number;
}

const CreateTask: React.FC<Props> = ({ initialValues, task_id, id }) => {
  const initialImages = Object.values(initialValues);
  const test = initialValues.map((item) => {
    return item.product_image;
  });

  useEffect(() => {
    if (initialImages.length > 0) {
      let newImages = [...test];
      setTotal(newImages);
    }
  }, []);

  const [coverIndex, setCoverIndex] = useState(1);
  const [maxTotal] = useState(9);
  const totalLength =
    initialImages.length > 0
      ? Array.from(Array(initialImages.length))
      : Array.from(Array(4));

  const [total, setTotal] = useState(totalLength);
  const [images, setImages] = useState(Array.from(Array(4)));

  const handleClickAdd = () => {
    setTotal([...total, undefined]);
  };
  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index = parseInt(e.target.name);
    setCoverIndex(index);
  };
  const handleDeleteImage = (index: number) => {
    let newImages = [...total];
    newImages.splice(index, 1);
    setTotal(newImages);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let index = parseInt(e.target.name);
      let file: File = e.target.files[0];
      let reader: FileReader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          let newImages = [...total];

          newImages.splice(index, 1, e.target.result as string);
          setTotal(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [updateTaskImages, { loading, error }] = useUpdateTaskImagesMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task_id !== undefined && !loading) {
      const result = total.filter(function (item) {
        return item !== undefined;
      });

      result.map((product_image, index) => {
        try {
          updateTaskImages({
            variables: {
              input: {
                id,
                task_id,
                product_image,
                image_type:
                  index === coverIndex ? ImageType.Main : ImageType.Additional
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  return (
    <div className={style.root}>
      <form onSubmit={handleSubmit}>
        <h5 className={clsx(style.titleSteps)}>Create title and description</h5>
        {error && <p>Error...</p>}

        <div className="d-flex flex-row flex-wrap">
          {total.map((item, index) => {
            return (
              <div key={index} className={clsx(style.imageBlock, "flex-fill")}>
                <div className={style.imageContainer}>
                  {!total[index] && (
                    <div>
                      <label htmlFor={index.toString()}>
                        {!total[index] && (
                          <AiOutlineCloudUpload fontSize={40} color="9C81BC" />
                        )}
                      </label>
                      <input
                        type="file"
                        id={index.toString()}
                        name={index.toString()}
                        accept="image/*"
                        onChange={(e) => {
                          onFileChange(e);
                        }}
                      />
                    </div>
                  )}

                  {total[index] && <img src={total[index]} width="100%" />}
                </div>
                {total[index] && (
                  <div className={style.containerSet}>
                    <div className={style.setCover}>
                      <input
                        type="radio"
                        name={index.toString()}
                        checked={index === coverIndex}
                        onChange={handleChangeType}
                      />

                      <label style={{ fontSize: 10 }} htmlFor="checkType">
                        Set as cover photo?
                      </label>
                    </div>

                    <AiFillDelete
                      className={style.deleteImageBtn}
                      onClick={() => handleDeleteImage(index)}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {total.length < maxTotal && (
            <div className={clsx(style.imageBlock, "flex-fill")}>
              <div className={clsx(style.addContainerBtn)}>
                <button className={style.addIcon} onClick={handleClickAdd}>
                  <AiOutlinePlus fontSize="25px" color="#fefefe" />
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          className={
            total.length &&
            total.reduce((previousValue, currentValue) => {
              return previousValue || currentValue;
            })
              ? style.submitBtn
              : style.submitBtnDisabled
          }
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default CreateTask;

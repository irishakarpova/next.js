import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  ImageType,
  ProductImage,
  useCreateImagesMutation
} from "../generated/frontend-graphql";
import style from "../styles/Home.module.css";
import {
  AiOutlineCloudUpload,
  AiFillDelete,
  AiOutlinePlus
} from "react-icons/ai";

interface Props {
  initialValues: ProductImage[];
  task_id: number;
  onSuccess: () => void;
  isEdit: boolean;
}

const CreateTask: React.FC<Props> = ({
  task_id,
  initialValues,
  onSuccess,
  isEdit
}) => {
  useEffect(() => {
    if (initialValues.length > 0) {
      setImages(initialValues);
      let initialIndex = [...initialValues];
      initialIndex.find((value, index) => {
        if (value.image_type === ImageType.Main) {
          setCoverIndex(index);
        }
      });
    }
  }, []);

  const [coverIndex, setCoverIndex] = useState(0);
  const [maxTotal] = useState(9);

  const [images, setImages] = useState(Array.from(Array(4).fill({ id: null })));

  const handleClickAdd = () => {
    setImages([...images, { id: null }]);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    let index = parseInt(e.target.name);
    setCoverIndex(index);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let index = parseInt(e.target.name);
      let file: File = e.target.files[0];
      let reader: FileReader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          let newImages: ProductImage[] = [...images];
          newImages.splice(index, 1, {
            product_image: e.target.result as string,
            task_id: task_id
          });
          setImages(newImages);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index: number) => {
    let newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const [createImages, { loading, error }] = useCreateImagesMutation({
    onCompleted: () => {
      onSuccess();
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task_id !== undefined && !loading) {
      const newImages: ProductImage[] = [];

      images.map((image, index) => {
        newImages[index] = { ...image };
        newImages[index].image_type = ImageType.Additional;
        delete newImages[index]["__typename"];
      });

      if (newImages[coverIndex]) {
        newImages[coverIndex].image_type = ImageType.Main;
      }

      const result = newImages.filter((image) => {
        return image.id !== null;
      });

      try {
        createImages({
          variables: {
            input: result
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={initialValues.length ? style.rootNoBg : style.root}>
      {isEdit && (
        <h5 className={clsx(style.titleSteps)}>
          {initialValues.length
            ? "Update set of images"
            : "Create set of images"}
        </h5>
      )}
      {error && <p>Error...</p>}
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-row flex-wrap">
          {images.map((image, index) => {
            return (
              <div key={index} className={clsx(style.imageBlock, "flex-fill")}>
                <div
                  className={
                    initialValues.length
                      ? style.imageContainerUpdate
                      : style.imageContainer
                  }
                >
                  {!image.product_image && (
                    <>
                      <label htmlFor={index.toString()}>
                        <AiOutlineCloudUpload fontSize={40} color="9C81BC" />
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
                    </>
                  )}
                  {image.product_image && (
                    <img src={image.product_image} width="100%" />
                  )}
                </div>

                {isEdit && image.product_image && (
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
          {isEdit && images.length < maxTotal && (
            <div className={clsx(style.imageBlock)}>
              <div
                className={
                  images[0].product_image
                    ? style.addContainerBtnUpdate
                    : style.addContainerBtn
                }
              >
                <div className={style.addIcon} onClick={handleClickAdd}>
                  <AiOutlinePlus fontSize="25px" color="#fefefe" />
                </div>
              </div>
            </div>
          )}
        </div>
        {isEdit && (
          <button disabled={loading} className={style.submitBtn}>
            Sent
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateTask;

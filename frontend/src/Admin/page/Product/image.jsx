import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./image.css";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

function Image({ images, setImages, setDeletedImageUrls, max }) {
  const fileInputRef = useRef(null);
  console.log(images);
  useEffect(() => {
    setDeletedImageUrls([]);
  }, []);
  const selectFiles = () => {
    fileInputRef.current.click();
    console.log(images);
  };
  const onFileSelect = (event) => {
    const files = event.target.files;
    const maxImageCount = max;

    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      if (images.length >= maxImageCount) {
        alert(`Bạn đã chọn đủ ${max} ảnh. Không thể thêm nữa.`);
        break;
      }

      if (files[i].type.split("/")[0] !== "image") continue;

      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            file: files[i],
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  };

  const deleteImage = (index) => {
    setDeletedImageUrls((prevImages) => [
      ...prevImages,
      {
        url: images[index].url,
      },
    ]);

    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="card5">
      <input
        type="file"
        className="file"
        multiple
        ref={fileInputRef}
        onChange={onFileSelect}
        hidden
      ></input>
      <div className="container1">
        {images &&
          images?.map((image, index) => (
            <div className="image" key={index}>
              <span className="delete" onClick={() => deleteImage(index)}>
                x
              </span>
              <img className="anh" src={image.url} alt={image.name} />
            </div>
          ))}
        {images && images.length < max && (
          <div
            className="image"
            style={{ border: "0.1px soild #818181" }}
            role="button"
            onClick={selectFiles}
          >
            <FontAwesomeIcon icon={faArrowUpFromBracket} className="poisi" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Image;

import React from 'react';

const UploadImageInput = ({ addImage, children }) => {
  return (
    <>
      <div>이미지 업로드</div>
      <label htmlFor="upload" onChange={addImage}>
        {children}
        <input
          id="upload"
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          multiple
          hidden
        />
      </label>
    </>
  );
};

export default UploadImageInput;

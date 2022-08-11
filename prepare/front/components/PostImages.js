import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  //이미지가 몇개냐 따라서 화면이 달라짐
  const styleImgWrap = useMemo(() => ({ display : 'inline-block', width : '50%', textAlign : 'center', verticalAlign : 'middle'}), []);
  const styleImgViewFull = useMemo(() => ({ display : 'inline-block', width : '100%'}), []);
  const styleImgViewHalf = useMemo(() => ({ display : 'inline-block', width : '50%'}), []);



  if (images.length === 1) {
    return (
      <>
        <img role="presentation" style={styleImgViewFull} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={styleImgViewHalf} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
        <img role="presentation" style={styleImgViewHalf} src={images[1].src} alt={images[1].src} onClick={onZoom}/>
      </>
    );
  }


  return (
    <>
      <div>
        <img role="presentation" style={styleImgViewHalf} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
        <div 
          role="presentation"
          style={styleImgWrap}
          onClick={onZoom}>
            <PlusOutlined/>
            <br/>
            {images.length - 1} 개의 사진 더보기
        </div>
      </div>
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;

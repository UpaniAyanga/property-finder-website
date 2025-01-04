import React, { useEffect, useRef } from "react";
import "./floorplan.css";

function Floorplan({ imgSrc, imgWidth, imgHeight }) {
  const imgRef = useRef(null);
  const resultRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    const result = resultRef.current;
    const lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    lensRef.current = lens;
    img.parentElement.insertBefore(lens, img);

    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    result.style.backgroundImage = `url('${imgSrc}')`;
    result.style.backgroundSize = `${imgWidth * cx}px ${imgHeight * cy}px`;

    const moveLens = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight)
        y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    const getCursorPos = (e) => {
      const a = img.getBoundingClientRect();
      const x = e.pageX - a.left - window.pageXOffset;
      const y = e.pageY - a.top - window.pageYOffset;
      return { x, y };
    };

    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    return () => {
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchmove", moveLens);
      lens.remove();
    };
  }, [imgSrc, imgWidth, imgHeight]);

  return (
    <div className="img-zoom-container">
      <img ref={imgRef} src={imgSrc} alt="" />
      <div ref={resultRef} className="img-zoom-result"></div>
    </div>
  );
}

export default Floorplan;

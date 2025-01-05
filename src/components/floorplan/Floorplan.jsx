import { useEffect, useRef } from "react";
import "./floorplan.css";

/**
 * Floorplan component provides an image zoom functionality.
 * @component
 * @param {string} imgSrc - The source URL of the image to be zoomed.
 * @param {number} imgWidth - The width of the image.
 * @param {number} imgHeight - The height of the image.
 * @returns {JSX.Element} The rendered Floorplan component.
 */
function Floorplan({ imgSrc, imgWidth, imgHeight }) {
  // References to DOM elements
  const imgRef = useRef(null); // Reference to the image element
  const resultRef = useRef(null); // Reference to the zoom result container
  const lensRef = useRef(null); // Reference to the lens element

  useEffect(() => {
    // Get the image and result elements
    const img = imgRef.current;
    const result = resultRef.current;

    // Create a div element to serve as the zoom lens
    const lens = document.createElement("div");
    lens.setAttribute("class", "img-zoom-lens");
    lensRef.current = lens;

    // Insert the lens element into the DOM, just before the image
    img.parentElement.insertBefore(lens, img);

    // Calculate the zoom factor for x and y axes
    const cx = result.offsetWidth / lens.offsetWidth;
    const cy = result.offsetHeight / lens.offsetHeight;

    // Set the background properties of the result container
    result.style.backgroundImage = `url('${imgSrc}')`;
    result.style.backgroundSize = `${imgWidth * cx}px ${imgHeight * cy}px`;

    /**
     * Moves the lens over the image and updates the background position of the result.
     * @param {Object} e - The event object.
     */
    const moveLens = (e) => {
      e.preventDefault(); // Prevent default behavior for mouse or touch events

      // Get the cursor position relative to the image
      const pos = getCursorPos(e);

      // Calculate the lens position
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      // Prevent the lens from moving outside the image boundaries
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      // Set the lens position
      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      // Update the background position of the zoom result
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    /**
     * Gets the cursor position relative to the image.
     * @param {Object} e - The event object.
     * @returns {Object} The x and y coordinates of the cursor.
     */
    const getCursorPos = (e) => {
      const a = img.getBoundingClientRect(); // Get the image's bounding box
      const x = e.pageX - a.left - window.pageXOffset; // Calculate x coordinate
      const y = e.pageY - a.top - window.pageYOffset; // Calculate y coordinate
      return { x, y };
    };

    // Add event listeners for mouse and touch movements
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    // Cleanup function to remove event listeners and lens element
    return () => {
      lens.removeEventListener("mousemove", moveLens);
      img.removeEventListener("mousemove", moveLens);
      lens.removeEventListener("touchmove", moveLens);
      img.removeEventListener("touchmove", moveLens);
      lens.remove(); // Remove the lens element from the DOM
    };
  }, [imgSrc, imgWidth, imgHeight]); // Dependencies for the effect (runs when these change)

  return (
      <div className="img-zoom-container">
        {/* Image to be zoomed */}
        <img ref={imgRef} src={imgSrc} alt="" />
        {/* Container to display the zoomed result */}
        <div ref={resultRef} className="img-zoom-result"></div>
      </div>
  );
}

export default Floorplan;

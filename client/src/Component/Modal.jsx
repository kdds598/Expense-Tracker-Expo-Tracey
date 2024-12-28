// Modal.js
import React, { useState, useEffect } from "react";

function Modal({ isOpen, onClose, method = () => {}, children }) {
  if (!isOpen) return null;

  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5000,
    },
    modal: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      width: window.innerWidth < 600 ? "90%" : "60%",
      maxWidth: "500px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      border: "none",
      padding: "4px 8px",
      borderRadius: "03px",
      fontSize: "16px",
      cursor: "pointer",
      color: isHovered ? "white" : "black",
      backgroundColor: isHovered ? "red" : "transparent",
    },
  };
  const [modalWidth, setModalWidth] = useState(
    window.innerWidth < 600 ? "90%" : "300px"
  );

  useEffect(() => {
    const handleResize = () => {
      setModalWidth(window.innerWidth < 600 ? "90%" : "300px");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button
          style={styles.closeButton}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;

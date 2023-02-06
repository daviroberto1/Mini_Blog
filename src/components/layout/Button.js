import styles from "./Button.module.css";

const Button = ({ text, className, deleteDocument }) => {
  return (
    <button
      className={`${styles.btn} ${className === "dark" && styles.btn_dark} ${
        className === "outline" && styles.btn_outline
      }
  ${className === "danger" && styles.btn_danger}`}
      onClick={deleteDocument}
    >
      {text}
    </button>
  );
};

export default Button;

import styles from "./Button.module.css";

function Button(props) {
  return (
    <button
      className={styles.btn + " " + styles[props.class]}
      onClick={props.clicked}
    >
      {props.text}
    </button>
  );
}

export default Button;

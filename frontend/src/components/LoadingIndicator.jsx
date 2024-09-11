import styles from "./loadindicator.module.css";

export default function LoadingIndicator() {
  return (
    <>
      <div className={styles.loading_container}>
        <div className={styles.loader}></div>
      </div>
    </>
  );
}

import styles from "../../../views/tasks.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>Task Manager</header>
      <main>{children}</main>
    </div>
  );
}

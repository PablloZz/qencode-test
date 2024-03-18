import styles from "./styles.module.css";
import logo from "~/assets/images/logo.svg";

type Properties = {
  children: React.ReactNode;
};

function Auth({ children }: Properties) {
  return (
    <main className={styles["auth-layout"]}>
      <div className={styles["auth-content"]}>
        <div className={styles["logo-wrapper"]}>
          <img
            src={logo}
            alt="Qencode Logo"
            role="img"
            width="178"
            height="32"
          />
        </div>
        <section>{children}</section>
      </div>
    </main>
  );
}

export { Auth };

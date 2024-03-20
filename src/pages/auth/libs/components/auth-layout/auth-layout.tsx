import styles from "./styles.module.css";
import logo from "~/assets/images/logo.svg";

type Properties = {
  children: React.ReactNode;
};

function AuthLayout({ children }: Properties) {
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
        <section className={styles["form-wrapper"]}>
          <form className={styles.form}>{children}</form>
        </section>
      </div>
    </main>
  );
}

export { AuthLayout };

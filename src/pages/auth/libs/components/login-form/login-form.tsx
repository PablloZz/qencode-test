import googleIcon from "~/assets/images/google-icon.svg";
import gitHubIcon from "~/assets/images/github-icon.svg";
import showPasswordIcon from "~/assets/images/show-password-icon.svg";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.ts";

function LoginForm() {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>Log in to your account</h2>
      <div className={styles["auth-buttons"]}>
        <button className={styles["auth-button"]}>
          <img
            src={googleIcon}
            alt=""
            role="presentation"
            width="18"
            height="18"
          />
          Google
        </button>
        <button className={styles["auth-button"]}>
          <img
            src={gitHubIcon}
            alt=""
            role="presentation"
            width="21"
            height="18"
          />
          Github
        </button>
      </div>
      <span className={styles.separator}>or</span>
      <label className={`${styles.label} ${styles["email-label"]}`}>
        <span className="visually-hidden">Work Email</span>
        <input
          type="email"
          name="email"
          placeholder="Work email"
          className={styles.input}
        />
      </label>
      <label className={`${styles.label} ${styles["password-label"]}`}>
        <span className="visually-hidden">Password</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
        />
        <button className={styles["password-visibility-button"]}>
          <img src={showPasswordIcon} alt="Show password" role="img" />
        </button>
      </label>
      <NavLink
        to={AppRoute.FORGOT_PASSWORD}
        className={styles["forgot-password-link"]}
      >
        Forgot your password?
      </NavLink>
      <button className={styles["log-in-button"]}>Log in to Qencode</button>
      <div className={styles["sign-up-description"]}>
        Is your company new to Qencode?
        <NavLink to={AppRoute.SIGN_UP} className={styles["sign-up-link"]}>
          Sign up
        </NavLink>
      </div>
    </form>
  );
}

export { LoginForm };

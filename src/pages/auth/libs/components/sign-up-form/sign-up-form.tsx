import googleIcon from "~/assets/images/google-icon.svg";
import gitHubIcon from "~/assets/images/github-icon.svg";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.ts";
import { Button, Input } from "~/libs/components/components.ts";

function SignUpForm() {
  return (
    <>
      <h2 className={styles.title}>Sign up to your account</h2>
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
      <Input
        type="email"
        name="email"
        placeholder="Work Email"
        value=""
        error=""
        onChange={() => {}}
        labelText="Work Email"
        labelClassName={styles["email-label"]}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value=""
        error=""
        onChange={() => {}}
        labelText="Password"
        labelClassName={styles["password-label"]}
      />
      <Button
        label="Sign up to Qencode"
        type="button"
        className={styles["sign-up-button"]}
        variant="primary"
      />
      <div className={styles["login-description"]}>
        Already have an account?
        <NavLink to={AppRoute.LOGIN} className={styles["login-link"]}>
          Log in
        </NavLink>
      </div>
    </>
  );
}

export { SignUpForm };

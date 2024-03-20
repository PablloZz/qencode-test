import googleIcon from "~/assets/images/google-icon.svg";
import gitHubIcon from "~/assets/images/github-icon.svg";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
import { AppRoute } from "~/libs/enums/enums.ts";
import { Button, Input, PasswordInput } from "~/libs/components/components.ts";

function LoginForm() {
  return (
    <>
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
      <Input
        type="email"
        name="email"
        placeholder="Work Email"
        value=""
        error=""
        onChange={() => {}}
        labelText="Work Email"
        wrapperClassName={styles["email-wrapper"]}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        value=""
        error=""
        onChange={() => {}}
        labelText="Password"
        wrapperClassName={styles["password-wrapper"]}
      />
      <NavLink
        to={AppRoute.FORGOT_PASSWORD}
        className={styles["forgot-password-link"]}
      >
        Forgot your password?
      </NavLink>
      <Button
        label="Log in to Qencode"
        type="button"
        className={styles["login-button"]}
        variant="primary"
      />
      <div className={styles["sign-up-description"]}>
        Is your company new to Qencode?
        <NavLink to={AppRoute.SIGN_UP} className={styles["sign-up-link"]}>
          Sign up
        </NavLink>
      </div>
    </>
  );
}

export { LoginForm };

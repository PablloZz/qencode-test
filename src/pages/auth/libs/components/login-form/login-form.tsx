import { NavLink } from "react-router-dom";
import googleIcon from "~/assets/images/google-icon.svg";
import gitHubIcon from "~/assets/images/github-icon.svg";
import { AppRoute } from "~/libs/enums/enums.ts";
import { Button, Input } from "~/libs/components/components.ts";
import { useLogin } from "../../contexts/contexts.ts";
import { useLoginForm } from "./libs/hooks/hooks.ts";
import styles from "./styles.module.css";

function LoginForm() {
  const {
    formValues,
    formErrors,
    validEmail,
    handleChangeEmail,
    handleValidateEmail,
    handleChangePassword,
    handleValidatePassword,
    handleFormSubmit,
  } = useLoginForm();
  const { loading, handleLogin } = useLogin();

  return (
    <form
      onSubmit={handleFormSubmit(handleLogin)}
      noValidate
      className={styles.form}
    >
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
        value={formValues.email}
        error={formErrors.email}
        onChange={handleChangeEmail}
        onBlur={handleValidateEmail}
        labelText="Work Email"
        labelClassName={styles["email-label"]}
      />
      {validEmail && (
        <>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            error={formErrors.password}
            onChange={handleChangePassword}
            onBlur={handleValidatePassword}
            labelText="Password"
            labelClassName={styles["password-label"]}
          />
          <NavLink
            to={AppRoute.FORGOT_PASSWORD}
            className={styles["forgot-password-link"]}
          >
            Forgot your password?
          </NavLink>
        </>
      )}
      <Button
        label="Log in to Qencode"
        type="submit"
        className={styles["login-button"]}
        variant="primary"
        loading={loading}
      />
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

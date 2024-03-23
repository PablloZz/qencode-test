import { Button, Input } from "~/libs/components/components.ts";
import { useForgotPasswordForm } from "./libs/hooks/hooks.ts";
import styles from "./styles.module.css";

function ForgotPasswordForm() {
  const {
    formValues,
    formErrors,
    handleChangeEmail,
    handleValidateEmail,
    handleFormSubmit,
  } = useForgotPasswordForm();

  return (
    <>
      <h2 className={styles.title}>Forgot Password?</h2>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formValues.email}
        error={formErrors.emailError}
        onChange={handleChangeEmail}
        onBlur={handleValidateEmail}
        labelText="Email"
        labelClassName={styles["email-label"]}
      />
      <Button
        label="Send"
        type="button"
        className={styles["send-button"]}
        variant="primary"
        onClick={handleFormSubmit}
      />
      <Button label="Cancel" type="button" variant="outlined" />
    </>
  );
}

export { ForgotPasswordForm };

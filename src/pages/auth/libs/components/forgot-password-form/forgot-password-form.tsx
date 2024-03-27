import { Button, Input } from "~/libs/components/components.ts";
import { useForgotPasswordForm } from "./libs/hooks/hooks.ts";
import { useForgotPassword } from "../../contexts/contexts.ts";
import styles from "./styles.module.css";

function ForgotPasswordForm() {
  const {
    formValues,
    formErrors,
    handleFormSubmit,
    handleChangeEmail,
    handleValidateEmail,
  } = useForgotPasswordForm();
  const { loading, handleResetPassword } = useForgotPassword();

  return (
    <form
      onSubmit={handleFormSubmit(handleResetPassword)}
      noValidate
      className={styles.form}
    >
      <h2 className={styles.title}>Forgot Password?</h2>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formValues.email}
        error={formErrors.email}
        onChange={handleChangeEmail}
        onBlur={handleValidateEmail}
        labelText="Email"
        labelClassName={styles["email-label"]}
      />
      <Button
        label="Send"
        type="submit"
        className={styles["send-button"]}
        variant="primary"
        loading={loading}
      />
      <Button label="Cancel" type="button" variant="outlined" />
    </form>
  );
}

export { ForgotPasswordForm };

import { Button, Input } from "~/libs/components/components.ts";
import { useCreateNewPasswordForm } from "./libs/hooks/hooks.ts";
import styles from "./styles.module.css";

function CreateNewPasswordForm() {
  const {
    formValues,
    formErrors,
    handleChangePassword,
    handleValidatePassword,
    handleChangeConfirmPassword,
    handleValidateConfirmPassword,
    handleFormSubmit,
  } = useCreateNewPasswordForm();

  return (
    <>
      <h2 className={styles.title}>Create new Password?</h2>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        error={formErrors.passwordError}
        onChange={handleChangePassword}
        onBlur={handleValidatePassword}
        labelText="Password"
        showLabelText
        labelClassName={styles["password-label"]}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Password"
        value={formValues.confirmPassword}
        error={formErrors.confirmPasswordError}
        onChange={handleChangeConfirmPassword}
        onBlur={handleValidateConfirmPassword}
        labelText="Confirm Password"
        showLabelText
      />
      <Button
        label="Reset Password"
        type="button"
        className={styles["reset-password-button"]}
        variant="primary"
        onClick={handleFormSubmit}
      />
    </>
  );
}

export { CreateNewPasswordForm };

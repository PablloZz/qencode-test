import { Button, Input } from "~/libs/components/components.ts";
import { useSetNewPassword } from "../../contexts/contexts.ts";
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
  const { loading, handleSetNewPassword } = useSetNewPassword();

  return (
    <form
      onSubmit={handleFormSubmit(handleSetNewPassword)}
      noValidate
      className={styles.form}
    >
      <h2 className={styles.title}>Create new Password?</h2>
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        error={formErrors.password}
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
        error={formErrors.confirmPassword}
        onChange={handleChangeConfirmPassword}
        onBlur={handleValidateConfirmPassword}
        labelText="Confirm Password"
        showLabelText
      />
      <Button
        label="Reset Password"
        type="submit"
        className={styles["reset-password-button"]}
        variant="primary"
        loading={loading}
      />
    </form>
  );
}

export { CreateNewPasswordForm };

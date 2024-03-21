import styles from "./styles.module.css";
import { Button, Input } from "~/libs/components/components.ts";

function CreateNewPasswordForm() {
  return (
    <>
      <h2 className={styles.title}>Create new Password?</h2>
      <Input
        type="password"
        name="newPassword"
        placeholder="Password"
        value=""
        error=""
        onChange={() => {}}
        labelText="Password"
        showLabelText
        labelClassName={styles["password-label"]}
      />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Password"
        value=""
        error=""
        onChange={() => {}}
        labelText="Confirm Password"
        showLabelText
      />
      <Button
        label="Reset Password"
        type="button"
        className={styles["reset-password-button"]}
        variant="primary"
      />
    </>
  );
}

export { CreateNewPasswordForm };

import styles from "./styles.module.css";
import { Button, Input } from "~/libs/components/components.ts";

function ForgotPassword() {
  return (
    <>
      <h2 className={styles.title}>Forgot Password</h2>
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value=""
        error=""
        onChange={() => {}}
        labelText="Email"
        wrapperClassName={styles["email-wrapper"]}
      />
      <Button
        label="Send"
        type="button"
        className={styles["send-button"]}
        variant="primary"
      />
      <Button label="Send" type="button" variant="outlined" />
    </>
  );
}

export { ForgotPassword };

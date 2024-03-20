import styles from "./styles.module.css";
import { Input } from "~/libs/components/components.ts";

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
      <button type="button" className={styles["send-button"]}>
        Send
      </button>
      <button type="button" className={styles["cancel-button"]}>
        Cancel
      </button>
    </>
  );
}

export { ForgotPassword };

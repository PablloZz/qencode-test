import styles from "./styles.module.css";
import { useState } from "react";
import { Input } from "~/libs/components/components.js";
import { type InputProperties } from "~/libs/components/input/input.js";
import showPasswordIcon from "~/assets/images/show-password-icon.svg";
import { getValidClassNames } from "~/libs/helpers/helpers.ts";

function PasswordInput({ wrapperClassName, ...properties }: InputProperties) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  function handleTogglePasswordVisibility() {
    setPasswordVisibility(previousValue => !previousValue);
  }

  return (
    <div
      className={getValidClassNames(
        styles["password-input-wrapper"],
        wrapperClassName
      )}
    >
      <button
        type="button"
        className={styles["password-visibility-button"]}
        onClick={handleTogglePasswordVisibility}
        aria-label={`${
          isPasswordVisible ? "Hide" : "Show"
        } password visibility`}
      >
        <img src={showPasswordIcon} alt="Eye icon" role="img" />
      </button>
      <Input
        {...properties}
        type={isPasswordVisible ? "text" : "password"}
        className={styles["password-input"]}
      />
    </div>
  );
}

export { PasswordInput };

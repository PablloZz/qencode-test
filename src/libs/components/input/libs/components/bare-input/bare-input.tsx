import { useState } from "react";
import { type InputType } from "./libs/types/types.ts";
import { getValidClassNames } from "~/libs/helpers/helpers.js";
import showPasswordIcon from "~/assets/images/show-password-icon.svg";
import styles from "./styles.module.css";

type Properties = {
  type?: InputType;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | (() => void);
  required?: boolean;
  className?: string;
  hasError: boolean;
};

function BareInput({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  onBlur,
  required,
  className,
  hasError,
}: Properties) {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const isPasswordType = type === "password";
  const classes = getValidClassNames(
    styles.input,
    isPasswordType && styles["password-input"],
    hasError && styles.error,
    className
  );

  function handleTogglePasswordVisibility() {
    setPasswordVisibility(previousValue => !previousValue);
  }

  if (isPasswordType) {
    return (
      <div className={styles["password-input-wrapper"]}>
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
        <input
          type={isPasswordVisible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={classes}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={classes}
      placeholder={placeholder}
      required={required}
    />
  );
}

export { BareInput };
export { type Properties as BareInputProperties };

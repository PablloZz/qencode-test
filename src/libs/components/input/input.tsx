import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type InputType } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
  labelText?: string;
  type?: InputType;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent) => void;
  placeholder?: string;
  error: string;
  className?: string;
  wrapperClassName?: string;
  labelTextClassName?: string;
  required?: boolean;
};

function Input({
  labelText,
  type = "text",
  value,
  name,
  onChange,
  placeholder = "",
  error = "",
  className,
  wrapperClassName,
  required,
}: Properties) {
  const hasError = Boolean(error);

  return (
    <label className={getValidClassNames(styles.label, wrapperClassName)}>
      <span className="visually-hidden">{labelText}</span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={getValidClassNames(
          styles.input,
          hasError && styles.error,
          className
        )}
        placeholder={placeholder}
        type={type}
        required={required}
      />
      <span className={styles.errorMessage}>{hasError && error}</span>
    </label>
  );
}

export { Input, type Properties as InputProperties };

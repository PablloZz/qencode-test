import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { BareInput } from "./libs/components/components.ts";
import { type BareInputProperties } from "./libs/components/bare-input/bare-input.tsx";
import styles from "./styles.module.css";

type Properties = {
  labelText?: string;
  showLabelText?: boolean;
  error: string;
  labelClassName?: string;
  labelTextClassName?: string;
} & Omit<BareInputProperties, "hasError">;

function Input({
  showLabelText = false,
  error = "",
  labelText,
  labelClassName,
  ...properties
}: Properties) {
  const hasError = Boolean(error);

  return (
    <label className={getValidClassNames(styles.label, labelClassName)}>
      <span
        className={getValidClassNames(
          !showLabelText && "visually-hidden",
          styles.labelText
        )}
      >
        {labelText}
      </span>
      <BareInput hasError={hasError} {...properties} />
      {hasError && <span className={styles["error-message"]}>{error}</span>}
    </label>
  );
}

export { Input, type Properties as InputProperties };

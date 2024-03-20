import { getValidClassNames } from "~/libs/helpers/helpers.js";
import { type ButtonVariant, type ButtonType } from "./libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
  variant?: ButtonVariant;
  label: React.ReactNode;
  type?: ButtonType;
  className?: string;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

function Button({
  type = "button",
  label,
  className = "",
  onClick,
  variant = "primary",
}: Properties) {
  const variantClassNameMapper: Record<ButtonVariant, string> = {
    primary: styles["button-primary"],
    outlined: styles["button-outlined"],
  };

  return (
    <button
      type={type}
      className={getValidClassNames(
        styles.button,
        variantClassNameMapper[variant],
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export { Button };

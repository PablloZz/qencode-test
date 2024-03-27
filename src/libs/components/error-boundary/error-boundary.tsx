import { Component, ErrorInfo, ReactNode } from "react";
import styles from "./styles.module.css";

interface Properties {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Properties, State> {
  constructor(props: Properties) {
    super(props);

    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1 className={styles.error}>Something went wrong...</h1>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

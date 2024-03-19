import googleIcon from "~/assets/images/google-icon.svg";
import gitHubIcon from "~/assets/images/github-icon.svg";

function LoginForm() {
  return (
    <>
      <h2>Log in to your account</h2>
      <div>
        <button>
          <img
            src={googleIcon}
            alt=""
            role="presentation"
            width="18"
            height="18"
          />
          Google
        </button>
        <button>
          <img
            src={gitHubIcon}
            alt=""
            role="presentation"
            width="21"
            height="18"
          />
          Github
        </button>
        <span>or</span>
        <label>
          <span className="visually-hidden">Work Email</span>
          <input type="email" name="email" placeholder="Work email" />
        </label>
        <button>Log in to Qencode</button>
        <div>
          Is your company new to Qencode?
          <span>Sign up</span>
        </div>
      </div>
    </>
  );
}

export { LoginForm };

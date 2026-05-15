import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { useState, useActionState } from "react";
import LoginInput from "./LoginInput";
import { isValidEmail, isNotEmpty } from "../../util/validation";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    let errors = {};

    if (!isValidEmail(email)) {
      errors.email = "Email is not valid";
    }

    if (!isNotEmpty(password)) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      return { enteredValues: { email, password } }; // ← you removed this!
    }

    try {
      await login({ email, password });

      navigate("/dashboard");
    } catch (error) {
      return {
        errors: { general: error.message, errors },
        enteredValues: { email, password },
      };
    }
  }

  const [formState, formAction] = useActionState(loginAction, {
    errors: null,
  });

  function handleToggleShowPass() {
    setShowPass((prevState) => !prevState);
  }

  return (
    <form action={formAction} className="flex flex-col gap-2.5">
      {formState.errors?.general && (
        <p className="text-red-400 text-xs text-center">
          {formState.errors.general}
        </p>
      )}
      <LoginInput
        LeftIcon={Mail}
        type="email"
        placeholder="Email"
        name="email"
        defaultValue={formState.enteredValues?.email}
        error={formState.errors?.email}
      />
      <LoginInput
        LeftIcon={Lock}
        type={showPass ? "text" : "password"}
        placeholder="Password"
        name="password"
        defaultValue={formState.enteredValues?.password}
        right={
          <button
            type="button"
            onClick={handleToggleShowPass}
            className="text-gray-300 hover:text-gray-500"
          >
            {showPass ? (
              <Eye size={16} color="#8A929F" />
            ) : (
              <EyeOff size={16} color="#8A929F" />
            )}
          </button>
        }
        error={formState.errors?.password}
      />
      <button className="bg-black w-37.5 self-center text-white py-2 rounded-xl cursor-pointer">
        Login
      </button>
    </form>
  );
}

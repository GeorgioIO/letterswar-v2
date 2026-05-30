import FormInput from "./FormInput";
import FormRadio from "./FormRadio";
import { useActionState, useState } from "react";
import {
  isNotEmpty,
  isValidEmail,
  notStrongPass,
} from "../../../../util/validation";
import { Eye, EyeOff } from "lucide-react";

const adminRoles = [
  { value: "superadmin", label: "Super Admin" },
  { value: "editor", label: "Editor" },
];

export default function AdminForm({ onSubmit }) {
  const [formState, formAction] = useActionState(submitAdminAction, {
    errors: null,
  });
  const [showPass, setShowPass] = useState(false);

  async function submitAdminAction(prevState, formData) {
    // Get needed data
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    let role = formData.get("role");

    let errors = {};

    if (!isNotEmpty(username)) {
      errors.username = "Username is required";
    }

    if (!isNotEmpty(email)) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Not a valid email";
    }

    if (!isNotEmpty(password)) {
      errors.password = "Password is required";
    } else if (notStrongPass(password)) {
      errors.password =
        "Weak password use atleast 8 characters , one uppercase and one number";
    }

    if (!isNotEmpty(role)) {
      errors.role = "Role is required";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, enteredValues: { username, email, password, role } };
    }

    try {
      onSubmit({ username, email, password, role });
      return { errors: null };
    } catch (error) {
      return {
        errors: {
          general: error.response?.data?.message || "Fail to add admin",
          errors,
        },
        enteredValues: { username, email, password, role },
      };
    }
  }

  function handleToggleShowPass() {
    setShowPass((prevState) => !prevState);
  }

  return (
    <form
      action={formAction}
      autoComplete="off"
      className="flex flex-col gap-4 p-1"
    >
      <FormInput
        label="Username*"
        id="username"
        name="username"
        placeholder="Username"
        error={formState.errors?.username}
        defaultValue={formState.enteredValues?.username}
      />
      <FormInput
        label="Email*"
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        error={formState.errors?.email}
        defaultValue={formState.enteredValues?.email}
      />
      <FormInput
        label="Password*"
        id="password"
        name="password"
        placeholder="Password"
        type={showPass ? "text" : "password"}
        defaultValue={formState.enteredValues?.password}
        error={formState.errors?.password}
        toggleButton={
          <button
            type="button"
            onClick={handleToggleShowPass}
            className="cursor-pointer "
          >
            {showPass ? <Eye color="#8A929F" /> : <EyeOff color="#8A929F" />}
          </button>
        }
      />
      <FormRadio
        label="Select Admin Role"
        name="role"
        options={adminRoles}
        error={formState.errors?.role}
        defaultValue={formState.enteredValues?.role}
      />
      {formState.errors?.general && (
        <p className="text-red-400 text-xs text-center">
          {formState.errors.general}
        </p>
      )}
      <button
        type="submit"
        className="cursor-pointer mt-2 h-10 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
      >
        Submit
      </button>
    </form>
  );
}

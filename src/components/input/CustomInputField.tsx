import React, { useState } from "react";
import { useFormContext, RegisterOptions, FieldError } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface CustomInputFieldProps {
  name: string;
  placeholder?: string;
  validation?: RegisterOptions;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode; // LEFT icon
  rightIcon?: React.ReactNode; // RIGHT icon (optional)
  type?: React.HTMLInputTypeAttribute;
  showPasswordToggle?: boolean;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  name,
  placeholder = "Search...",
  validation,
  className = "",
  inputClassName = "",
  disabled = false,
  icon,
  rightIcon,
  type = "text",
  showPasswordToggle,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const actualType =
    isPassword && showPasswordToggle ? (show ? "text" : "password") : type;

  // safer error typing
  const fieldError = (errors as Record<string, FieldError | undefined>)[name];
  const errorMessage = fieldError?.message as string | undefined;

  const hasLeftIcon = Boolean(icon);
  const hasRightIcon = Boolean(rightIcon);

  return (
    <div className={`relative w-full min-w-72 flex flex-col ${className}`}>
      <div className="relative text-light_mode_gray_color dark:text-dark_mode_gray_color">
        {/* LEFT icon */}
        {hasLeftIcon && (
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2
                       text-light_mode_gray1_color dark:text-dark_mode_gray1_color
                       pointer-events-none"
          >
            {icon}
          </span>
        )}

        {/* RIGHT icon */}
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-light_mode_yellow_color dark:text-dark_mode_yellow_color"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}

        <input
          type={actualType}
          {...register(name, validation)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg
            ${hasLeftIcon ? "pl-10" : "pl-4"}
            ${hasRightIcon ? "pr-10" : "pr-4"}
            py-3
            text-light_mode_gray_color dark:text-dark_mode_gray_color
            placeholder-light_mode_gray1_color dark:placeholder-dark_mode_gray1_color
            bg-light_mode_color2 dark:bg-dark_mode_color2
            focus:outline-none focus:border focus:border-light_mode_yellow_color dark:focus:border-dark_mode_yellow_color
            ${inputClassName}
          `}
        />
      </div>

      {errorMessage && (
        <span className="text-sm text-red-500 mt-1 ml-1">{errorMessage}</span>
      )}
    </div>
  );
};

export default CustomInputField;

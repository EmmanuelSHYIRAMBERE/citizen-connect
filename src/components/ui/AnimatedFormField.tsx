"use client";

import { ReactNode, useEffect, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select } from "./select";
import { Motion } from "../animations/MotionWrapper";

interface AnimatedFormFieldProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  children?: ReactNode;
  value?: string | number | boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

interface SelectProps {
  id: string;
  name: string;
  label: string;
  description?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

export function AnimatedFormField({
  label,
  description,
  error,
  as = "input",
  children,
  ...props
}: AnimatedFormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    if (props.value && props.value.toString().length > 0) {
      setHasValue(true);
    }
  }, [props.value]);

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  const InputComponent = as === "textarea" ? Textarea : Input;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <Label htmlFor={props.id || props.name}>
        <Motion.span
          animate={{
            color: error ? "red" : isFocused || hasValue ? "black" : "gray",
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </Motion.span>
      </Label>

      {as === "select" ? (
        <Select {...(props as SelectProps)}>{children}</Select>
      ) : (
        <InputComponent
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={error ? "border-red-500" : ""}
          value={typeof props.value === "boolean" ? "" : props.value}
        />
      )}

      {description && !error && (
        <Motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="text-sm text-gray-500"
        >
          {description}
        </Motion.p>
      )}

      {error && (
        <Motion.p
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="text-sm text-red-500"
        >
          {error}
        </Motion.p>
      )}
    </Motion.div>
  );
}

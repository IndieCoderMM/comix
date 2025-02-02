"use client";
import { useLogin } from "../hooks/useLogin";
import BorderButton, { BorderButtonProps } from "./border-button";

const HeroButton = ({ children, ...props }: BorderButtonProps) => {
  const login = useLogin();

  return (
    <BorderButton {...props} onClick={login}>
      {children}
    </BorderButton>
  );
};

export default HeroButton;

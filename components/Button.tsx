import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  className,
  loading,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        `my-1 rounded-[10px] bg-primary py-2 px-5 text-center text-lg text-white hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200`,
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

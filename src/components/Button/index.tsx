import clsx from 'clsx';
import React from 'react';

import styles from './Button.module.scss';

const colors = {
  transparent: styles.buttonTransparent,
  blue: styles.buttonBlue,
};

interface ButtonProps {
  disabled?: boolean;
  color?: keyof typeof colors;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  disabled,
  color,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(className, styles.button, color ? colors[color] : '')}
      disabled={disabled}>
      {children}
    </button>
  );
};

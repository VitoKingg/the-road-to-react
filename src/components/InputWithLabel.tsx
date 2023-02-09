import { useEffect, useRef } from 'react';

interface InputWithLabelProps {
  id: string;
  type?: string;
  value: string;
  isFocused: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

function InputWithLabel(props: InputWithLabelProps) {
  const {
    id,
    type = 'text',
    value,
    isFocused = false,
    onInputChange,
    children
  } = props;

  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div>
      <label htmlFor={id}>
        <strong>{children}&nbsp;</strong>
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        autoFocus={isFocused}
        onChange={onInputChange}
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </div>
  );
}

export default InputWithLabel;

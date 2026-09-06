import styles from "./Input.module.scss";

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}

export const Input = ({
  label,
  placeholder,
  onChange,
  name,
  value,
}: InputProps) => {
  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
      />
    </div>
  );
};

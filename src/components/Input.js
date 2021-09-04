const Input = ({ value, onChange, ...rest }) => {
  return (
    <input
      value={value || ""}
      onChange={onChange}
      className="input"
      {...rest}
    />
  );
};

export default Input;

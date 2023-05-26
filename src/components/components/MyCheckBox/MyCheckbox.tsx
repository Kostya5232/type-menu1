const MyCheckbox = ({ text, checked, onClick }) => {
  const id = `checkbox-${Math.random()}`;
  
  return (
    <>
      <input
        id={id}
        defaultChecked={checked}
        type="checkbox"
        onClick={(event) => onClick(event.target.checked)}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
};
export default MyCheckbox;

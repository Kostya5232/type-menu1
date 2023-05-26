import React from "react";

interface MyCheckboxProps{
  text: string;
  checked: boolean;
  onClick
}

const MyCheckbox:React.FC<MyCheckboxProps> = ({ text, checked, onClick }) => {
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

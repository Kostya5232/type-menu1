import React from "react";

interface MyCheckboxProps{
  text: string;
  checked: boolean;
  onClick: (a: boolean) => void;
}

const MyCheckbox:React.FC<MyCheckboxProps> = ({ text, checked, onClick }) => {
  const id = `checkbox-${Math.random()}`;

  const handlerClick = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick((event.target as HTMLInputElement).checked);
  }
  
  return (
    <>
      <input
        id={id}
        defaultChecked={checked}
        type="checkbox"
        onClick={handlerClick}
      />
      <label htmlFor={id}>{text}</label>
    </>
  );
};
export default MyCheckbox;

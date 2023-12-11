import { v4 as uuid } from "uuid";
import { useState } from "react";
import ListItemComponent from "./ListItemComponent";
import ButtonComponent from "./ButtonComponent";

const ListComponent = () => {
  const [input, setInput] = useState('');
  const [item, setItem] = useState([
    { id: uuid(), name: 'Iaroslav' },
    { id: uuid(), name: 'Yuliia' },
    { id: uuid(), name: 'Stanislav' },
    { id: uuid(), name: 'Alex' }
  ]);

  const newId = uuid();

  const onClickHandler = () => {
    const newItem = {
      id: newId,
      name: input
    };

    const updatedElements = [...item, newItem];
    setItem(updatedElements);
    setInput('');
  };

  const onChengeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      const newItem = {
        id: newId,
        name: input
      };

      const updatedElements = [...item, newItem];
      setItem(updatedElements);
      setInput('');
    }
  };

  const hendleDelete = (id) => {
    const updatedElements = item.filter((element) => element.id !== id);
    setItem(updatedElements);
  };

  return (
    <>
      <input
        onChange={onChengeHandler}
        value={input}
        onKeyDown={handleEnterPress} />
      <h2>{item.length}</h2>
      <ul>
        {item.map((element) => (
          <div key={element.id}>
            <ListItemComponent id={element.id} element={element.name}>
              <ButtonComponent text={'Remove'} onClick={() => hendleDelete(element.id)} type={'button'} />
            </ListItemComponent>
          </div>
        ))}
      </ul>
      <button onClick={onClickHandler}>Add new element</button>
    </>
  );
};

export default ListComponent;

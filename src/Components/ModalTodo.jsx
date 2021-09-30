import React, { useState,useEffect } from 'react';
import { Modal } from 'antd';

export default function ModalTodo(props) {

  const [title, setTitle] = useState();
  const [color, setColor] = useState();

  //console.log(props.selectedTodo);

  const handleOk = () => {
    if (props.selectedTodo) {    
      props.selectedTodo.title = title
      props.selectedTodo.color = color
      props.updateTodo(props.selectedTodo)
    } else {
      props.createTodo({
        "title" : title,
        "color" : color
      })
    }

    props.setShowModalTodo(false);
  };

  const handleCancel = () => {
    props.setShowModalTodo(false);
  };

  useEffect(() => {
    if (props.selectedTodo) {
      setTitle(props.selectedTodo.title)
      setColor(props.selectedTodo.color)
      } else {
        setTitle("Nouveau")
        setColor("#8B8BDD")
      }
  },[props.selectedTodo])

      return (
        <>
          <Modal title={title} visible={props.showModalTodo} onOk={handleOk} onCancel={handleCancel}>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
            <input type="color" value={color} onChange={(e)=> setColor(e.target.value)} />
          </Modal>
        </>
      );
    };
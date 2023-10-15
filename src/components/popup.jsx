import React, { useState, useEffect, useRef } from 'react'
import { Modal, Button,Form } from 'react-bootstrap';
// import axios from 'axios'
export default function popup({ showPopup, handleModal, handlesubmit, tasks, chossebtn }) {
  const name = useRef()
  const phone = useRef()
  const email = useRef()
  const [task, setTask] = useState()

  const handleClick = (e) => {
    e.preventDefault();
    handlesubmit(task);
  }
  const id = localStorage.getItem("id");
  const tid = localStorage.getItem("tid")
  const handleChange = (event) => {
    setTask({ title: title.current.value, description: description.current.value, date: date.current.value, uid: id })
  }

  const handleDelete = () => {

    // axios.delete(`http://localhost:8081/${tasks.id}`)
    //   .then(res => {
    //     console.log(res.data)
    //     window.location.reload();
    //   })



  }


  const taskDisplay = (e) => {
    e.preventDefault();
    console.log(task)
    // axios.put(`http://localhost:8081/${tasks.id}`, task)
    //   .then(res => {
    //     console.log(res.data)
    //     window.location.reload();
    //   })
    console.log(task)
  }

  const update = () => (
    <>
      <Modal show={showPopup} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="" onSubmit={taskDisplay}>
            <div className="form-group">
              <label htmlFor="name">name:</label>
              <input
                ref={name}
                onChange={handleChange}
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                defaultValue={tasks?.name}
              />
            </div>

            <div className="form-group">
              <label htmlFor="desc">Phone:</label>
              <textarea
                onChange={handleChange}
                ref={phone}
                id="desc"
                className="form-control"
                placeholder="phone"
                name="phone"
                defaultValue={tasks?.phone}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email:</label>
              <input
                onChange={handleChange}
                id="email"
                ref={email}
                type="email"
                className="form-control"
                placeholder="Date"
                name="email"
                defaultValue={tasks?.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">email:</label>
              <input
                onChange={handleChange}
                id="password"
                ref={email}
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                defaultValue={tasks?.passowrd}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
  const Delete = (
    <div className='delete-popup'>
      <div className="delete-div">
        <h1>Are you sure  </h1>
        <button className='delete-x delete-btn' onClick={handleModal}>x</button>
      </div>
      <button className='delete-yes delete-btn' onClick={handleDelete}>yes</button>
      <button className='delete-no delete-btn' >No</button>
    </div>
  )
  const Add = () => (
    <>
      <Modal show={showPopup} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form action="" onSubmit={taskDisplay}>
            <div className="form-group">
              <label htmlFor="name">name:</label>
              <input
                ref={name}
                onChange={handleChange}
                id="name"
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
               
              />
            </div>

            <div className="form-group">
              <label htmlFor="desc">Phone:</label>
              <textarea
                onChange={handleChange}
                ref={phone}
                id="desc"
                className="form-control"
                placeholder="phone"
                name="phone"
               
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">email:</label>
              <input
                onChange={handleChange}
                id="email"
                ref={email}
                type="email"
                className="form-control"
                placeholder="Date"
                name="email"
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">email:</label>
              <input
                onChange={handleChange}
                id="password"
                ref={email}
                type="password"
                className="form-control"
                placeholder="password"
                name="password"
                
              />
            </div>
          </form>

            <Button type="submit" variant="primary">
              Add
            </Button>
        </Modal.Body>
      </Modal>
    </>
  )
  let display

  if (chossebtn === "update") {
    display = update()
  } else if (chossebtn === "Add") {
    display = Add()
  } else if (chossebtn === "delete") {
    display = Delete
  }


  return (

    <>
      {display}
    </>

  )
}

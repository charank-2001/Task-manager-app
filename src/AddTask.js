import Modal from "./Modal";
import { useState } from "react";
import "./addTask.css";
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask({ onClose, open }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignto, setAssignto] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        deadline: deadline,
        completed: false,
        assignto:assignto,
        created: Timestamp.now(),
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
          required
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
          required
        ></textarea>
        Deadline:
        <input
          type="date"
          name="deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Enter deadline"
          required
        />
        <input
          type="text"
          name="assignedTo"
          value={assignto}
          onChange={(e) => setAssignto(e.target.value)}
          placeholder="Assign To"
        />
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
}

export default AddTask;

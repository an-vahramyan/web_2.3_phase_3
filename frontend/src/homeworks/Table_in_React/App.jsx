import { useState } from "react";
import "./App.css";

function Table_in_React() {
  const [students, setStudents] = useState([
    { id: 1, student_name: "Alex", age: 19, gender: "male" },
    { id: 2, student_name: "Anna", age: 20, gender: "female" },
    { id: 3, student_name: "Jhon", age: 22, gender: "male" },
    { id: 4, student_name: "Stephan", age: 19, gender: "male" },
  ]);
  const deleteBTN = (idToDelete) => {
    const updated = students.filter((student) => student.id !== idToDelete);
    setStudents(updated);
  };
  return (
    <div className="box">
      <h2>Student list</h2>
      <table>
        <thead className="table-head">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student_name}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <button
                  onClick={() => deleteBTN(student.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table_in_React;

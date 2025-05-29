import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Data() {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [useredit, setUserEdit] = useState(null);

  useEffect(() => {
    getAllData();
  }, []);

  //  display data
  async function getAllData() {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  }

  //  tambah data
  async function addData(e) {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    const response = await axios.post(API_URL, { name, email });
    setName("");
    setEmail("");
    getAllData();
  }

  //  Edit Data
  function editData(data) {
    setUserEdit(data);
    setName(data.name);
    setEmail(data.email);
  }
  // Update data

  async function updateData(e) {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    const response = await axios.put(API_URL + "/" + useredit.id, {
      name,
      email,
    });
    setName("");
    setEmail("");
    getAllData();
    setUserEdit(null);
  }

  // HandleClick
  async function handleClick(e) {
    e.preventDefault();
    if (useredit) {
      await updateData(e);
    } else {
      await addData(e);
    }
  }

  // Delete data
  async function deleteData(id) {
    const response = await axios.delete(API_URL + "/" + id);
    getAllData();
  }

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h3>{useredit ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
          <form className="input-box" type="submit" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">
              {" "}
              {useredit ? "Update data" : "Tambah data"}
            </button>
          </form>
        </div>
        <div className="data-pengguna">
          <h3>Data Pengguna</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  {user.name} <span className="email">({user.email})</span>
                </div>
                <div>
                  <a href="#" className="edit" onClick={() => editData(user)}>
                    Edit
                  </a>
                  -
                  <a href="#" className="delete" onClick={() => deleteData(user.id)}>
                    Delete
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}


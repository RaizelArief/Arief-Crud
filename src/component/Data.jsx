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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const getUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/person");
//       setUsers(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const saveUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8000/person", { name, email });
//       getUsers();
//       setName("");
//       setEmail("");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/person/${id}`);
//       getUsers();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const editUser = (id) => {
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-5xl mx-auto p-4">
//         {/* Form Tambah Pengguna */}
//         <div className="bg-blue-600 text-white p-6 rounded-lg">
//           <h1 className="text-xl font-semibold mb-4">Tambah Pengguna</h1>
//           <form onSubmit={saveUser} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               placeholder="Nama"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded text-center"
//             >
//               Simpan
//             </button>
//           </form>
//         </div>

//         {/* Daftar Pengguna */}
//         <div className="mt-8 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-gray-800 text-xl font-semibold mb-4">
//             Data Pengguna
//           </h2>
//           <div className="divide-y divide-gray-200">
//             {users.map((user) => (
//               <div
//                 key={user.id}
//                 className="flex items-center justify-between py-2"
//               >
//                 <div>
//                   <span className="text-gray-800 font-medium">{user.name}</span>
//                   <span className="text-gray-600 ml-2">({user.email})</span>
//                 </div>
//                 <div className="flex space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => editUser(user.id)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => deleteUser(user.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

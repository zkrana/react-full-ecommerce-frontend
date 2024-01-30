// components/Users.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost/reactcrud/backend/auth/api/api.php"
//         );
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>User Data:</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               User ID: {user.id}, Username: {user.username}, Email: {user.email}
//               ,{" "}
//               <img
//                 src={`http://localhost/reactcrud/backend/auth/${user.profile_photo}`}
//                 alt={`Profile of ${user.username}`}
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

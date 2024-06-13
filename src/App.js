import './App.css';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import Homepage from './components/LoginSignup/Homepage';
import HelloUser from './components/LoginSignup/HelloUser';
import Navbar from './components/Navbar/Navbar';
import Students from './components/Pages/StudentPages/Students';
import StudentForm from './components/Pages/StudentPages/StudentForm';
import StudentDetail from './components/Pages/StudentPages/StudentDetail';
import LikedStudents from './components/Pages/StudentPages/LikedStudents'
import Freelancers from './components/Pages/FreelancerPages/Freelancers';
import FreelancerForm from './components/Pages/FreelancerPages/FreelancerForm';
import FreelancerDetail from './components/Pages/FreelancerPages/FreelancerDetail';
import LikedFreelancers from './components/Pages/FreelancerPages/LikedFreelancers';
import RoleSelection from './components/Pages/RoleProfilePages/RoleSelection';
import RoleProfile from './components/Pages/RoleProfilePages/RoleProfile';
import RoleProfileDetail from './components/Pages/RoleProfilePages/RoleProfileDetail';
import Footer from './components/Navbar/Footer/Footer';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';

export const AppContext = createContext(null);


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("authToken"))
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState(null);
    const [freelancers, setFreelancers] = useState(null);
    const [likedStudents, setLikedStudents] = useState([]);
    const [likedFreelancers, setLikedFreelancers] = useState([]);
    const [comments, setComments] = useState([]);

    // Below code handles login and signup state-----------------------------------------------------------------------------------
    const navigate = useNavigate()
    const URL = process.env.REACT_APP_URL

    const fetchUser = async (id) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const response = await fetch(URL + `user/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser(data.data);
      } else {
        console.log("no token");
      }
    };

    const handleLogin = async (user) => {
      const response = await fetch(URL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if (response.status !== 200) {
        return data;
      }
      localStorage.setItem("authToken", data.token);
      setIsLoggedIn(true);
      console.log("User logged in");
      console.log(data);
      console.log(user)
      navigate(`/`);
    };
  
    const handleSignUp = async (user) => {
      const response = await fetch(URL + "auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
      navigate("/login");
    };
  
    const handleLogout = () => {
      console.log(" in logout handle log");
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/");
    };
    
    // Below is the code handles student state--------------------------------------------------------------------------
    const getStudent = async () => {
      try {
          if (!isLoggedIn) {
              console.log("User is not logged in. Cannot fetch students.");
              return;
          }
  
          // Fetch students
          const response = await fetch(`${URL}students`, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              }
          });
  
          const data = await response.json();
  
          if (response.ok) {
              setStudents(data.data);
              console.log("Students fetched successfully.");
              console.log(data.data);
          } else {
              console.log("Failed to fetch students.");
          }
      } catch (error) {
          console.error("Error fetching students or role profiles:", error);
      }
    };

    const createStudent = async (student) => {      
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot create student.");
          return;
      }
      await fetch(`${URL}students`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
          body: JSON.stringify(student),
      }).then((response) => {
          if (response.ok) {
              console.log("Student created successfully.");
              getStudent()
              navigate(`/students`)
              
          } else {
              console.log("Failed to create student.");
          }
      });
    }
    
    const updateStudent = async (student, id) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot update Student.");
          return;
      }
      try {
          const response = await fetch(`${URL}students/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              },
              body: JSON.stringify(student),
          });
    
          if (response.ok) {
              console.log("Student updated successfully.");
              await getStudent(); 
          } else {
              throw new Error(`Failed to update student with status: ${response.status}`);
          }
      } catch (err) {
          console.error("Error updating student:", err.message);
      }
    };
    
    const deleteStudent = async (id) => {
        if (!isLoggedIn) {
            console.log("User is not logged in. Cannot delete student.");
            return;
        }
        await fetch(`${URL}students/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
        }).then((response) => {
            if (response.ok) {
                console.log("Student deleted successfully.");
            } else {
                console.log("Failed to delete student.");
            }
        });
        getStudent();
    }

    // Get Student and Freelancer By User
    const getRoleProfileData = async () => {
      try {
          if (!isLoggedIn) {
              console.log("User is not logged in. Cannot fetch role profile data.");
              return;
          }
  
          const response = await fetch(`${URL}role-profile`, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              }
          });
  
          const data = await response.json();
  
          if (response.ok) {
              setStudents(data.students);
              setFreelancers(data.freelancers);
              console.log("Role profile data fetched successfully.");
          } else {
              console.log("Failed to fetch role profile data.");
          }
      } catch (error) {
          console.error("Error fetching role profile data:", error);
      }
  };
    
    // Below is the code handles freelancer state--------------------------------------------------------------------------
    const getFreelancer = async () => {
      try {
          if (!isLoggedIn) {
              console.log("User is not logged in. Cannot fetch freelancers.");
              return;
          }

          // Fetch freelancers
          const response = await fetch(`${URL}freelancers`, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              }
          });

          const data = await response.json();

          if (response.ok) {
              setFreelancers(data.data);
              console.log("Freelancers fetched successfully.");
              console.log(data.data);
          } else {
              console.log("Failed to fetch freelancers.");
          }
      } catch (error) {
          console.error("Error fetching freelancers or role profiles:", error);
      }
    };

    const createFreelancer = async (freelancer) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot create freelancer.");
          return;
      }
      await fetch(`${URL}freelancers`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          },
          body: JSON.stringify(freelancer),
      }).then((response) => {
          if (response.ok) {
              console.log("Freelancer created successfully.");
              getFreelancer()
              navigate(`/freelancers`)
              
          } else {
              console.log("Failed to create freelancer.");
          }
      });
    }

    const updateFreelancer = async (freelancer, id) => {
      if (!isLoggedIn) {
          console.log("User is not logged in. Cannot update Freelancer.");
          return;
      }
      try {
          const response = await fetch(`${URL}freelancers/${id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("authToken")}`
              },
              body: JSON.stringify(freelancer),
          });
    
          if (response.ok) {
              console.log("Freelancer updated successfully.");
              await getFreelancer(); 
          } else {
              throw new Error(`Failed to update freelancer with status: ${response.status}`);
          }
      } catch (err) {
          console.error("Error updating freelancer:", err.message);
      }
    };
    
    const deleteFreelancer = async (id) => {
        if (!isLoggedIn) {
            console.log("User is not logged in. Cannot delete freelancer.");
            return;
        }
        await fetch(`${URL}freelancers/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
        }).then((response) => {
            if (response.ok) {
                console.log("Freelancer deleted successfully.");
            } else {
                console.log("Failed to delete freelancer.");
            }
        });
        getFreelancer();
    }

    // Below is the code handles STUDENT LIKE----------------------------------------------------------------------------------------------

    const getLikedStudents = async () => {
      try {
        const response = await fetch(`${URL}liked-students`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Liked students fetched successfully.");
          console.log(data);
          setLikedStudents(data); 
        } else {
          console.log("Failed to fetch liked students.");
        }
      } catch (error) {
        console.error("Error fetching liked students:", error);
      }
    };

    const handleStudentLike = async (studentId) => {
      try {
        // Fetch the list of liked students for the user
        const likedResponse = await fetch(`${URL}liked-students`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (likedResponse.ok) {
          const likedStudents = await likedResponse.json();
          console.log("Fetched liked students:", likedStudents);
          const existingLike = likedStudents.find(student => student.studentId._id === studentId);

          // Check if the student is already liked by the user
          if (existingLike) {
            console.log('Student already liked');
            return;
          }

          // If not already liked, proceed to like the student
          const response = await fetch(`${URL}liked-students`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({ studentId }),
          });

          if (response.ok) {
            console.log("Student liked successfully.");
            getLikedStudents(); 
          } else {
            console.log(studentId)
            console.log("Failed to like student.");
          }
        } else {
          console.log("Failed to fetch liked students.");
        }
      } catch (error) {
        console.error("Error liking student:", error);
      }
    };
    // Delete liked student
    const deleteLikedStudent = async (studentId) => {
      try {
        const response = await fetch(`${URL}liked-students/${studentId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (response.ok) {
          console.log("Student unliked successfully.");
          getLikedStudents(); // Refresh the list of liked students
        } else {
          console.log("Failed to unlike student.");
        }
      } catch (error) {
        console.error("Error unliking student:", error);
      }
    };

    // Below is the code handles Freelancer LIKE---------------------------------------------------------------------------------------

    const getLikedFreelancers = async () => {
      try {
        const response = await fetch(`${URL}liked-freelancers`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Liked freelancers fetched successfully.");
          console.log(data);
          setLikedFreelancers(data);
        } else {
          console.log("Failed to fetch liked freelancers.");
        }
      } catch (error) {
        console.error("Error fetching liked freelancers:", error);
      }
    };

    const handleFreelancerLike = async (freelancerId) => {
      try {
        // Fetch the list of liked freelancers for the user
        const likedResponse = await fetch(`${URL}liked-freelancers`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (likedResponse.ok) {
          const likedFreelancers = await likedResponse.json();
          console.log("Fetched liked freelancers:", likedFreelancers);
          const existingLike = likedFreelancers.find(freelancer => freelancer.freelancerId._id === freelancerId);

          // Check if the freelancer is already liked by the user
          if (existingLike) {
            console.log('Freelancer already liked');
            return;
          }

          // If not already liked, proceed to like the freelancer
          const response = await fetch(`${URL}liked-freelancers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            },
            body: JSON.stringify({ freelancerId }),
          });

          if (response.ok) {
            console.log("Freelancer liked successfully.");
            getLikedFreelancers(); 
          } else {
            console.log(freelancerId)
            console.log("Failed to like freelancer.");
          }
        } else {
          console.log("Failed to fetch liked freelancers.");
        }
      } catch (error) {
        console.error("Error liking freelancer:", error);
      }
    };
    // Delete liked freelancer
    const deleteLikedFreelancer = async (freelancerId) => {
      try {
        const response = await fetch(`${URL}liked-freelancers/${freelancerId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
          }
        });

        if (response.ok) {
          console.log("Freelancer unliked successfully.");
          getLikedFreelancers(); // Refresh the list of liked freelancers
        } else {
          console.log("Failed to unlike freelancer.");
        }
      } catch (error) {
        console.error("Error unliking freelancer:", error);
      }
    };
    
    // Below is the code handles all Comments ----------------------------------------------------------------------------------------

    // Get comments for a specific student or freelancer
    const getComments = async (id, type) => {
        try {
            const response = await fetch(`${URL}${type}/${id}/comments`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);
                console.log("Comments fetched successfully.");
                console.log(data);
            } else {
                console.log("Failed to fetch comments.");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // Create a new comment for a student or freelancer
    const createComment = async (comment, id, type) => {
        try {
            const response = await fetch(`${URL}${type}/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify(comment),
            });

            if (response.ok) {
                console.log("Comment created successfully.");
                const newComment = await response.json();
                setComments([...comments, newComment]);
            } else {
                console.log("Failed to create comment.");
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    // Update an existing comment
    const updateComment = async (commentId, updatedContent) => {
        try {
            const response = await fetch(`${URL}comments/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify({ content: updatedContent }),
            });

            if (response.ok) {
                console.log("Comment updated successfully.");
                const updatedComment = await response.json();
                setComments(comments.map(comment => 
                    comment._id === commentId ? updatedComment : comment
                ));
            } else {
                console.log("Failed to update comment.");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    // Delete a comment
    const deleteComment = async (commentId) => {
        try {
            const response = await fetch(`${URL}comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                },
            });

            if (response.ok) {
                console.log("Comment deleted successfully.");
                setComments(comments.filter(comment => comment._id !== commentId));
            } else {
                console.log("Failed to delete comment.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
        getStudent();
        getFreelancer();
        getLikedStudents();
        getComments();
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    


  return (

    <AppContext.Provider value={{ 
      getStudent, getFreelancer, createStudent, createFreelancer, updateStudent, updateFreelancer, deleteStudent, deleteFreelancer, 
      handleStudentLike, getLikedStudents, handleFreelancerLike, getLikedFreelancers, deleteLikedStudent, deleteLikedFreelancer,
      students, freelancers, likedStudents, likedFreelancers, getRoleProfileData,
      comments, getComments, createComment, updateComment, deleteComment,
      isLoggedIn, handleLogin, handleSignUp, handleLogout, fetchUser, user 
      }}>
      
      <div className='bg-gray-100 w-full h-screen' style={{background:'linear-gradient(#C6F6D5, #000000)'}}>
        <Navbar />
        <Routes >

          <Route path="/" element={<Homepage />} />
          <Route path="/hello-user" element={<HelloUser />} />

          {/* Controls Role Profile */}
          <Route path='/role-selection' element={<RoleSelection/>} />
          <Route path='/role-profile' element={<RoleProfile />} />
          <Route path='role-profile/:id' element={<RoleProfileDetail />} />

          {/* Controls Login / Signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Controls Student */}
          <Route path='/student-form' element={<StudentForm />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path= "/liked-students" element={<LikedStudents />} />

          {/* Controls Freelancer */}
          <Route path="/freelancers" element={<Freelancers />} />
          <Route path='/freelancer-form' element={<FreelancerForm />} />
          <Route path='/freelancers/:id' element={<FreelancerDetail />} />
          <Route path='/liked-freelancers' element={<LikedFreelancers />} />
        </Routes>

        <Footer />

    </div>
  </AppContext.Provider>

  );
}

export default App;

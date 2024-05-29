import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../App';
import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_URL;

const StudentDetail = () => {
    const { id } = useParams();
    const { students, isLoggedIn } = useContext(AppContext);
    const [student, setStudent] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState("");

    useEffect(() => {
        const studentData = students.find((student) => student._id === id);
        setStudent(studentData);
        fetchComments();
    }, [id, students]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`${URL}student/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                setComments(data.data);
            } else {
                console.error("Failed to fetch comments");
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        try {
            const response = await fetch(`${URL}students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify({ content: newComment, studentId: id })
            });
            const data = await response.json();
            if (response.ok) {
                setComments([...comments, data.data]);
                setNewComment("");
            } else {
                console.error("Failed to create comment");
            }
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    const handleCommentUpdate = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        try {
            const response = await fetch(`${URL}${editCommentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                },
                body: JSON.stringify({ content: editCommentContent })
            });
            const data = await response.json();
            if (response.ok) {
                setComments(comments.map(comment => comment._id === editCommentId ? data.data : comment));
                setEditCommentId(null);
                setEditCommentContent("");
            } else {
                console.error("Failed to update comment");
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        try {
            const response = await fetch(`${URL}students/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`
                }
            });

            if (response.ok) {
                setComments(comments.filter(comment => comment._id !== commentId));
                console.log("Comment deleted successfully.");
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditClick = (comment) => {
        setEditCommentId(comment._id);
        setEditCommentContent(comment.content);
    };

    const handleCancelEdit = () => {
        setEditCommentId(null);
        setEditCommentContent("");
    };

    return (
        <div className="pt-28 min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {student && (
                    <>
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center">{student.fullname}</h2>
                        {student.photo && (
                            <img
                                src={student.photo}
                                alt={student.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-gray-700"><strong>Age:</strong> {student.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {student.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {student.hobby}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {student.description}</p>
                            <p className="text-gray-700"><strong>Location:</strong> {student.location}</p>
                        </div>
                    </>
                )}

                <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Comments</h3>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Write a comment..."
                            required
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add Comment
                        </button>
                    </form>

                    <div className="mt-8">
                        {comments.map((comment) => (
                            <div key={comment._id} className="mb-4">
                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-800">{comment.content}</p>
                                    <p className="text-gray-500 text-sm">- {comment.user.fullname}</p>
                                    {isLoggedIn && (
                                        <div className="flex justify-end space-x-2 mt-2">
                                            <button
                                                onClick={() => handleEditClick(comment)}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(comment._id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {editCommentId === comment._id && (
                                    <form onSubmit={handleCommentUpdate} className="mt-4 space-y-2">
                                        <textarea
                                            value={editCommentContent}
                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Edit your comment..."
                                            required
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                type="submit"
                                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                                            >
                                                Update Comment
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../App';

const FreelancerDetail = () => {
    const { id } = useParams();
    const { freelancers, isLoggedIn, comments, getComments, createComment, updateComment, deleteComment, user } = useContext(AppContext);
    const [freelancer, setFreelancer] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState("");

    useEffect(() => {
        if (freelancers && freelancers.length > 0) {
            const freelancerData = freelancers.find((freelancer) => freelancer._id === id);
            setFreelancer(freelancerData);
            getComments(id, 'freelancers');
        }
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        await createComment({ content: newComment }, id, 'freelancers');
        setNewComment("");
    };

    const handleCommentUpdate = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        await updateComment(editCommentId, editCommentContent);
        setEditCommentId(null);
        setEditCommentContent("");
    };

    const handleDeleteComment = async (commentId) => {
        if (!isLoggedIn) {
            console.error("User is not logged in");
            return;
        }

        await deleteComment(commentId);
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
                {freelancer && (
                    <>
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center">{freelancer.fullname}</h2>
                        {freelancer.photo && (
                            <img
                                src={freelancer.photo}
                                alt={freelancer.fullname}
                                className="w-32 h-32 rounded-full mx-auto mb-4"
                            />
                        )}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-gray-700"><strong>Age:</strong> {freelancer.age}</p>
                            <p className="text-gray-700"><strong>Career:</strong> {freelancer.career}</p>
                            <p className="text-gray-700"><strong>Hobby:</strong> {freelancer.hobby}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {freelancer.description}</p>
                            <p className="text-gray-700"><strong>Location:</strong> {freelancer.location}</p>
                        </div>
                    </>
                )}

                <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Comments</h3>
                    
                    <div className="mt-8">
                        {comments.map((comment) => (
                            <div key={comment._id} className="mb-4">
                                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                    <p className="text-gray-800">{comment.content}</p>
                                    <p className="text-gray-500 text-sm">- {comment.User?.fullname || 'Unknown User'}</p>
                                    {/* {isLoggedIn && comment.User?._id === user?._id && ( */}
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
                </div>
            </div>
        </div>
    );
};

export default FreelancerDetail;
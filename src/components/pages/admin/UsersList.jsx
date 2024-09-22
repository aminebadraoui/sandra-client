import React, { useState, useEffect } from 'react';
import useUserStore from '../../../state/userStore';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const { makeAdmin } = useUserStore();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleMakeAdmin = async (userId) => {
        const success = await makeAdmin(userId);
        if (success) {
            fetchUsers(); // Refresh the user list
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <ul className="space-y-2">
                {users.map(user => (
                    <li key={user.id} className="border p-4 rounded">
                        {user.email} - {user.isAdmin ? 'Admin' : 'Not Admin'}
                        {!user.isAdmin && (
                            <button
                                onClick={() => handleMakeAdmin(user.id)}
                                className="ml-4 bg-rose-500 text-white px-2 py-1 rounded hover:bg-rose-600"
                            >
                                Make Admin
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
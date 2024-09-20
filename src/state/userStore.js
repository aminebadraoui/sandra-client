import { create } from 'zustand'

const TOKEN_KEY = 'token';

const useUserStore = create((set, get) => ({
    user: null,
    isLoading: true,  // Add this line
    setUser: (userData) => set({ user: userData, isLoading: false }),
    clearUser: () => {
        localStorage.removeItem(TOKEN_KEY);
        set({ user: null, isLoading: false });
    },
    initializeUser: async () => {
        set({ isLoading: true });  // Set loading to true when starting initialization
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const userData = await response.json();
                    set({ user: userData, isLoading: false });
                } else {
                    localStorage.removeItem(TOKEN_KEY);
                    set({ user: null, isLoading: false });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                localStorage.removeItem(TOKEN_KEY);
                set({ user: null, isLoading: false });
            }
        } else {
            set({ isLoading: false });  // If no token, we're done loading
        }
    },
    toggleRole: async () => {
        const { user } = get();
        if (!user) return;
        const newRole = user.role === "organizer" ? "serviceProvider" : "organizer";
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/update-role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
                body: JSON.stringify({ role: newRole })
            });
            if (response.ok) {
                set({ user: { ...user, role: newRole } });
            } else {
                console.error('Failed to update role');
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    },
    makeAdmin: async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/make-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                },
                body: JSON.stringify({ userId })
            });
            if (response.ok) {
                const updatedUser = await response.json();
                // Only update the store if the current user is the one being made admin
                if (updatedUser.id === get().user.id) {
                    set({ user: updatedUser });
                }
                return true;
            } else {
                console.error('Failed to make user admin');
                return false;
            }
        } catch (error) {
            console.error('Error making user admin:', error);
            return false;
        }
    }
}))

export default useUserStore
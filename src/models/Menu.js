import modalStore from '../state/modalStore'
import useUserStore from '../state/userStore'

export const noSessionMenu = [
    {
        name: "Sign up",
        action: () => {
            modalStore.getState().openRegisterModal()
        }
    },
    {
        name: "Sign in",
        action: () => {
            modalStore.getState().openLoginModal()
        }
    }
]

export const serviceProviderMenu = [

    {
        name: "Manage Services",
        path: '/manage-listings'
    },
    {
        name: "Account",
        path: '/account'
    },
    {
        name: "Help Center",
        path: '/help-center'
    },
    {
        name: "Sign out",
        action: () => {
            const clearUser = useUserStore.getState().clearUser;
            clearUser();
            // Navigation will be handled in the component
        }
    },
]

export const organizerMenu = [
    {
        name: "Add Event Listing",
        path: '/add-event-listing'
    },
    {
        name: "Manage Events",
        path: '/manage-events'
    },
    {
        name: "Account",
        path: '/account'
    },
    {
        name: "Help Center",
        path: '/help-center'
    },
    {
        name: "Sign out",
        action: () => {
            const clearUser = useUserStore.getState().clearUser;
            clearUser();
        }
    },
]



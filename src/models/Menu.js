import modalStore from '../state/modalStore'

export const noSessionMenu = [
    {
        name: "Sign up",
        action: () => {
            console.log("sign up clicked")
            modalStore.getState().openRegisterModal()
        }
    }
    ,
    {
        name: "Sign in",
        action: () => {
            console.log("sign in clicked")
            modalStore.getState().openLoginModal()
        }
    }
]

export const serviceProviderMenu = [
    {
        name: "Manage Listing",
        action: () => { }
    }
    ,
    {
        name: "Account",
        action: () => { }
    },
    {
        name: "Help Center",
        action: () => { }
    },
    {
        name: "Sign out",
        action: () => { }
    },
]



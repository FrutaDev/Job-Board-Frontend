export const handleCreateJob = (navigate: any, setOpen: any) => {
    try {
        navigate('/create-job');
    } catch (e) {
        console.error("An error has ocurred", e)
    } finally {
        setOpen(false)
    }
}

export const handleCreateEnterprise = (navigate: any, setOpen: any) => {
    try {
        navigate('/create-enterprise');
    } catch (e) {
        console.error("An error has ocurred", e)
    } finally {
        setOpen(false)
    }
}

export const handlePostulate = (navigate: any, setOpen: any) => {
    try {
        navigate('/postulates/jobs');
    } catch (e) {
        console.error("An error has ocurred", e)
    } finally {
        setOpen(false)
    }
}

export const handleRequests = (navigate: any, setOpen: any) => {
    try {
        navigate('/requests/jobs');
    } catch (e) {
        console.error("An error has ocurred", e)
    } finally {
        setOpen(false)
    }
}

export const handleLogout = (setOpen: any, logout: any) => {
    logout()
    setOpen(false)
}
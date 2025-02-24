import { selectAuthState } from '@/stores/slices/authSlice'
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const user = useSelector(selectAuthState)
    console.log(user)
    return (
        <div>Profile</div>
    )
}

export default Profile
import { resetAuthorization } from '@/stores/slices/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  const dispatch = useDispatch()

  const onClickHandler = () => {
    dispatch(resetAuthorization())
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-yellow-500">403</h1>
      <h2 className="text-2xl font-semibold mt-2">Access Denied</h2>
      <p className="text-gray-600 mt-2 text-center">
        You do not have permission to view this page.
      </p>
      <Link to="/login" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={onClickHandler}>
        Go to Login
      </Link>
    </div>
  );
};

export default NotAuthorized;

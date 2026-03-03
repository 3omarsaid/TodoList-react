import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = useAuth();
    if (auth?.loading) return <div>Loading...</div>;
    if (!auth?.user) return <Navigate to="/auth" replace />;
    return children;
}

export default ProtectedRoute
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { axiosApiInstance } from '../../helper/axios';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const getProfile = async () => {
    return await axiosApiInstance.get('/profile')
      .then((res) => {
        setUser(res.data);
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }
  useEffect(() => {
    getProfile();
  }, [])
  return (
    <div>Hi {user?.name}</div>
  )
}
export default Dashboard;

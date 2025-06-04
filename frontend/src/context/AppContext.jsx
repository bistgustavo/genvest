import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { teamMembers } from "../assets/assest";

export const AppContext = createContext();

export const AppContexProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [stakeholderInfo, setStakeholderInfo] = useState([]);

  // fetch all info of stakeholder

  const fetchStakeholerInfo = async () => {
    setStakeholderInfo(teamMembers);
  };

  useEffect(() => {
    fetchStakeholerInfo();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

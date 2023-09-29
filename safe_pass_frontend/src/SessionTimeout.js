import { useEffect } from "react";
import { toast } from "react-toastify";

const SessionTimeout = ({ timeout, onTimeout }) => {
  useEffect(() => {
    const sessionTimeout = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(sessionTimeout);
      toast.success("Session Time out , Signin Again..");
    };
  }, [timeout, onTimeout]);

  return null; // This component doesn't render anything
};

export default SessionTimeout;

import { useAppSelector } from "@/hooks/redux-hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected({
  children,
  authentication = true,
}: {
  children: React.ReactNode;
  authentication?: boolean;
}) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.auth.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      // navigate("/login");
    } else if (authentication && !authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h2>Loading...</h2> : <>{children}</>;
}

export default Protected;

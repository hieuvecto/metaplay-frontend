import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseContext } from "../libs/supabase-context";
import { User } from "@supabase/supabase-js";
import { CopyBlock, monokaiSublime } from "react-code-blocks";

type UserData = {
  user: User;
  accessToken: string;
} | null;

const Success = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const supabase = useSupabaseContext();

  const getUserData = useCallback(async () => {
    const [userResponse, sessionResponse] = await Promise.all([
      supabase!.auth.getUser(),
      supabase!.auth.getSession(),
    ]);

    if (
      userResponse.data?.user &&
      sessionResponse?.data?.session?.access_token
    ) {
      console.log(userResponse.data.user);
      setUserData({
        user: userResponse.data.user,
        accessToken: sessionResponse.data.session.access_token,
      });
    }
  }, [supabase]);

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = async () => {
    const { error } = await supabase!.auth.signOut();
    if (error) {
      console.error(error);
      return;
    }
    navigate("/");
  };

  return (
    <div className="App">
      <header className="App-header">
        {userData && (
          <Fragment>
            <h1>Success</h1>
            <p>Email: {userData?.user?.email}</p>
            <h3>Access token</h3>
            <div style={{ width: "500px" }}>
              <CopyBlock
                text={userData.accessToken}
                language={"html"}
                showLineNumbers={false}
                theme={monokaiSublime}
                codeBlock
              />
            </div>
            <br />
            <button onClick={() => signOut()}>Sign Out</button>
          </Fragment>
        )}
      </header>
    </div>
  );
};

export default Success;

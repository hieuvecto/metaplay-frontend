import { useNavigate } from "react-router-dom";
import { useSupabaseContext } from "../libs/supabase-context";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseContext();

  supabase?.auth.onAuthStateChange(async (event) => {
    if (event !== "SIGNED_OUT") {
      navigate("/success");
    } else {
      navigate("/");
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <Auth
          supabaseClient={supabase!}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord"]}
        />
      </header>
    </div>
  );
};

export default Login;

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { createContext, useContext, FunctionComponent } from "react";
import configs from "../configs";
import { ReactNode } from "react";

const SupabaseContext = createContext<SupabaseContextType>(null);

export type SupabaseContextType = SupabaseClient | null;

export type SupabaseProps = {
  children?: ReactNode;
};

const SupabaseProvider: FunctionComponent<SupabaseProps> = ({ children }) => {
  const client = createClient(configs.supabaseUrl, configs.supabaseAnonKey);

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
};

const useSupabaseContext = () => useContext(SupabaseContext);

export { SupabaseContext, SupabaseProvider, useSupabaseContext };

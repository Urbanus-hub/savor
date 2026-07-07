import { supabase } from "../utils/supabase";

const signup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
};

// insert user to database after signup

const insertUser = async (
  userId: string,
  full_name: string,
  email: string,
  phone: string,
) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ id: userId, full_name, email, phone }]);
  if (error) {
    return { error };
  }
  return { data };
};

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// get app session when the app starts

const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};

export { getSession, insertUser, login, signOut, signup };

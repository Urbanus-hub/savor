import {createContext,useState,useEffect} from 'react'
import { supabase } from '@/utils/supabase'
type UserContextType = {
    user: user | null;
    setUser: (user: user | null) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
  };

  type user={
    id: string;
    email: string;
    full_name: string;
    phone: string;
  }

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    loading: true,
    setLoading: () => {},
  });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<user | null>(null)
  const [loading, setLoading] = useState(true)
  async function fetchUser() {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authData?.user) {
      // Fetch additional user information if needed
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (!userError && userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}
import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthStoreProps {
	user: User | null;
	updateUser: (user: User | null) => void;
}

const useAuth = create<AuthStoreProps>((set) => ({
	user: null,
	updateUser: (value) => set({ user: value }),
}));

export default useAuth;

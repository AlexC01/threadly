"use client";
import { useEffect } from "react";
import useAuth from "@/lib/stores/useAuth";
import { supabase } from "@/lib/supabase/client";

const SessionManager = () => {
	const { updateUser } = useAuth();
	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			updateUser(session?.user ?? null);
		});

		return () => {
			data.subscription.unsubscribe();
		};
	}, [updateUser]);

	return null;
};

export default SessionManager;

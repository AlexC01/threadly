"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import routes from "@/lib/routes";
import { profileSchema } from "@/lib/schemas/userSchema";
import { createClient } from "@/lib/supabase/server";

export default async function updateUserProfile(
	initialState: any,
	formData: FormData,
) {
	const data = {
		username: formData.get("username") as string,
		firstName: formData.get("firstName") as string,
		lastName: formData.get("lastName") as string,
	};

	const validatedFields = profileSchema.safeParse(data);

	if (!validatedFields.success) {
		return {
			errors: z.flattenError(validatedFields.error),
			submittedData: data,
		};
	}

	const supabase = await createClient();

	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) throw new Error("User is not connected");

		const { error } = await supabase.auth.updateUser({
			data: validatedFields.data,
		});

		if (error) throw new Error("Error while updating information");

		const { error: error2 } = await supabase
			.from("profiles")
			.update({ username: validatedFields.data.username })
			.eq("id", user.id);

		if (error2) throw new Error("Error while updating information");

		revalidatePath(routes.profile);
		return { errors: null, success: true };
	} catch (err) {
		console.error("Error updating your profile");
		throw err;
	}
}

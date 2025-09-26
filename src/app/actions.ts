"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

		if (!user)
			return {
				error: "You must be logged in to update your profile",
				success: false,
			};

		const { error } = await supabase.auth.updateUser({
			data: validatedFields.data,
		});

		if (error) throw new Error("Error while updating information");

		const { error: error2 } = await supabase
			.from("profiles")
			.update({
				username: validatedFields.data.username,
				first_name: validatedFields.data.firstName,
				last_name: validatedFields.data.lastName,
			})
			.eq("id", user.id);

		if (error2) throw new Error("Error while updating information");

		revalidatePath(routes.profile);
	} catch (err) {
		console.error("Error updating your profile");
		throw err;
	}

	redirect(routes.profile);
}

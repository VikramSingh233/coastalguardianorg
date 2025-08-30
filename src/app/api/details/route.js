import { NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, contactNumber, country, state, organization, notificationPreference } = body;
    console.log("hii",body);
    // Find user
    const user = await User.findOne({ email });
    console.log("user",user)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    function normalizePref(pref, fallback = false) {
  if (typeof pref === "boolean") {
    return { selected: pref, messages: [] };
  }
  if (typeof pref === "object" && pref !== null) {
    return {
      selected: pref.selected ?? fallback,
      messages: pref.messages ?? []
    };
  }
  return { selected: fallback, messages: [] };
}

let normalizedPreferences = {
  floodingAlerts: normalizePref(notificationPreference?.floodingAlerts, false),
  cyclonicalActivity: normalizePref(notificationPreference?.cyclonicalActivity, false),
  seaLevelRise: normalizePref(notificationPreference?.seaLevelRise, false),
};

    console.log("new ",normalizedPreferences)
const updatedUser = await User.findOneAndUpdate(
  { email },
  {
    $set: {
      name,
      contactNumber,
      country,
      state,
      organization,
      notificationPreference: normalizedPreferences,
    },
  },
  { new: true, runValidators: true }  // ✅ ensure schema is respected
);

    console.log("updated user",updatedUser)
    return NextResponse.json(
      { message: "User details updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { businessEmail } from "@/lib/site";
export function prepareDraft(data: FormData) {
  const read = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const custom = read("inquiry") === "custom-application";
  const venue = read("venue"),
    city = read("city"),
    courts = read("courts"),
    contact = read("contact"),
    email = read("email"),
    notes = read("notes");
  if (
    (!custom &&
      (!venue ||
        !city ||
        !/^[1-9]\d*$/.test(courts) ||
        !Number.isSafeInteger(Number(courts)))) ||
    (custom && !notes) ||
    !contact ||
    [venue, city, contact].some(
      (value) => value.length > 120 || /[\r\n]/.test(value) || value.includes("\0"),
    ) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    (email.length > 254 || email.includes("\0")) ||
    notes.length > 1000 ||
    notes.includes("\0")
  ) {
    return {
      error: custom
        ? "Enter your contact name, a valid email and a project description of up to 1,000 characters."
        : "Check your venue and contact details. Enter a valid email and a positive whole number of courts.",
      url: "",
    };
  }
  const body = [
    "Hello WrenLabs,",
    "",
    custom
      ? "Custom application inquiry for WrenLabs PH."
      : "I’d like a DinkVision quote for my venue.",
    "",
    ...(custom
      ? ["Company or organization: " + (venue || "Not provided")]
      : [
          "Venue: " + venue,
          "City or province: " + city,
          "Courts to equip: " + courts,
        ]),
    "Contact: " + contact,
    "Email: " + email,
    notes && (custom ? "Project details: " : "Equipment notes: ") + notes,
  ].join("\r\n");
  return {
    error: "",
    url:
      "mailto:" +
      businessEmail +
      "?subject=" +
      encodeURIComponent(
        custom
          ? "Custom application inquiry — " + contact
          : "DinkVision quote request — " + venue,
      ) +
      "&body=" +
      encodeURIComponent(body),
  };
}

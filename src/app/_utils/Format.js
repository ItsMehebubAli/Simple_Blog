export function formatMemberSince(inputDateString) {
	const options = { month: "short", day: "2-digit", year: "numeric" };
	const formattedDate = new Date(inputDateString).toLocaleDateString("en-US", options);
	return formattedDate;
}

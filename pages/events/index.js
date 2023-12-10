import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

const AllEventsPage = () => {
	const events = getAllEvents();
	const router = useRouter();

	const filterEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	};

	return (
		<>
			<EventsSearch onFilter={filterEventsHandler} />
			<EventList items={events} />
		</>
	);
};

export default AllEventsPage;

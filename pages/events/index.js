import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "@/helpers/api-util";
import Head from "next/head";
import { useRouter } from "next/router";

const AllEventsPage = (props) => {
	const router = useRouter();
	const { events } = props;

	const filterEventsHandler = (year, month) => {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	};

	return (
		<>
			<Head>
				<title>All Events</title>
				<meta
					name="description"
					content="Find a lot of great events that allow you to evolve..."
				/>
			</Head>
			<EventsSearch onFilter={filterEventsHandler} />
			<EventList items={events} />
		</>
	);
};

export const getStaticProps = async () => {
	const events = await getAllEvents();

	return {
		props: {
			events: events,
		},
		revalidate: 60,
	};
};

export default AllEventsPage;

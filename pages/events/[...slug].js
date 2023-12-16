import { useRouter } from "next/router";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

const FilteredEventsPage = () => {
	const [loadedEvents, setLoadedEvents] = useState();

	const router = useRouter();

	const filterData = router.query.slug;

	const { data, error } = useSWR(
		"https://next-events-29f94-default-rtdb.firebaseio.com/events.json",
		(url) => fetch(url).then((res) => res.json())
	);

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setLoadedEvents(events);
		}
	}, [data]);

	let pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta name="description" content="A list of filtered events." />
		</Head>
	);

	if (!loadedEvents) {
		return (
			<>
				{pageHeadData}
				<p className="center">Loading...</p>
			</>
		);
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	pageHeadData = (
		<Head>
			<title>Filtered Events</title>
			<meta
				name="description"
				content={`All events for ${numMonth}/${numYear}`}
			/>
		</Head>
	);

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (
		isNaN(numMonth) ||
		isNaN(numYear) ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<>
				{pageHeadData}
				<ErrorAlert>Invalid Filter. Please adjust the values!</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				{pageHeadData}
				<ErrorAlert>No events found for the chosen filter</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			{pageHeadData}
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export default FilteredEventsPage;

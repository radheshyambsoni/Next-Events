// import { useRouter } from "next/router";
import { getFilteredEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

const FilteredEventsPage = (props) => {
	// const router = useRouter();

	// const filterData = router.query.slug;

	// if (!filterData) {
	// 	return <p className="center">Loading...</p>;
	// }

	// const filteredYear = filterData[0];
	// const filteredMonth = filterData[1];

	// const numYear = +filteredYear;
	// const numMonth = +filteredMonth;

	if (props.hasError) {
		return (
			<>
				<ErrorAlert>Invalid Filter. Please adjust the values!</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	// const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
	const { events: filteredEvents } = props;

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>No events found for the chosen filter</ErrorAlert>
				<div className="center">
					<Button link="/events">Show All Events</Button>
				</div>
			</>
		);
	}

	// const date = new Date(numYear, numMonth - 1);
	const date = new Date(props.date.year, props.date.month - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
};

export const getServerSideProps = async (context) => {
	const { params } = context;

	const filterData = params.slug;

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (isNaN(numMonth) || isNaN(numYear) || numMonth < 1 || numMonth > 12) {
		return {
			props: {
				hasError: true,
			},
			// notFound: true
		};
	}

	const filteredEvents = await getFilteredEvents({
		year: numYear,
		month: numMonth,
	});

	return {
		props: {
			events: filteredEvents,
			date: { year: numYear, month: numMonth },
		},
	};
};

export default FilteredEventsPage;

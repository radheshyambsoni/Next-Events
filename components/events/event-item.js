import Link from "next/link";
import classes from "./event-item.module.css";

const EventItem = (props) => {
	const { title, image, date, location, id } = props;

	const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const formattedAddress = location.replace(", ", "\n");
	const exploreLink = `/events/${id}`;

	return (
		<li className={classes.item}>
			<img src={"/" + image} alt="" />
			<div>
				<div className={classes.content}>
					<h2>{title}</h2>
					<div>
						<time className={classes.date}>{humanReadableDate}</time>
					</div>
					<div>
						<address className={classes.address}>{formattedAddress}</address>
					</div>
				</div>
				<div className={classes.actions}>
					<Link href={exploreLink}>Explore Event</Link>
				</div>
			</div>
		</li>
	);
};

export default EventItem;

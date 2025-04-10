import styles from "./Loader.module.css";

export default function Loader({ color = "emerald-600" }) {
	return (
		<div
			className={`${styles.loader} ${
				color === "emerald-600"
					? styles["loader-emerald-600"]
					: styles["loader-white"]
			}`}
		/>
	);
}

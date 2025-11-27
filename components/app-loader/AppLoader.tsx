import styles from "./AppLoader.module.css";

export default function AppLoader({ color = "emerald-600" }) {
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

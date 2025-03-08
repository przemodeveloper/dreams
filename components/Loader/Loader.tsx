import styles from "./Loader.module.css";

export function Loader({ color = "black" }) {
	return (
		<div
			className={`${styles.loader} ${
				color === "black" ? styles["loader-black"] : styles["loader-white"]
			}`}
		/>
	);
}

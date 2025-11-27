import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<p className="text-left text-emerald-600">
				&copy; {new Date().getFullYear()} Dreams. All rights reserved.
			</p>
		</footer>
	);
}

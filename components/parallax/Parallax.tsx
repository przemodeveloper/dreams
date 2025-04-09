import type { MotionValue } from "motion/react";
import { useScroll, useTransform, motion, useSpring } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import styles from "./Parallax.module.css";
import photo1 from "../../assets/photos/1.jpg";
import photo2 from "../../assets/photos/2.jpg";
import photo3 from "../../assets/photos/3.jpg";

export interface ParallaxItem {
	id: number;
	image: StaticImageData;
	title: string;
	description?: string;
}

export const parallaxData: ParallaxItem[] = [
	{
		id: 1,
		image: photo1,
		title: "Have you ever dreamed...",
	},
	{
		id: 2,
		image: photo2,
		title: "...of finding someone...",
	},
	{
		id: 3,
		image: photo3,
		title: "...who shares your dreams?",
	},
];

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxImage({ item }: { item: ParallaxItem }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref });
	const y = useParallax(scrollYProgress, 300);

	return (
		<section className={styles.section}>
			<div ref={ref} className={styles.imageWrapper}>
				<Image
					src={item.image}
					alt={item.title}
					width={400}
					height={600}
					className={styles.image}
				/>
			</div>
			<motion.h2
				initial={{ visibility: "hidden" }}
				animate={{ visibility: "visible" }}
				style={{ y }}
				className={styles.title}
			>
				{item.title}
			</motion.h2>
			{item.description && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="absolute bottom-4 left-4 text-white text-lg"
				>
					{item.description}
				</motion.p>
			)}
		</section>
	);
}

export default function Parallax() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<div className={styles.container}>
			{parallaxData.map((item) => (
				<ParallaxImage key={item.id} item={item} />
			))}
			<motion.div className={styles.progress} style={{ scaleX }} />
		</div>
	);
}

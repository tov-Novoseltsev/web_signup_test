import type { Metadata } from "next";
import styles from './styles.module.css';
import StarIcon from '@/public/star.svg';

export const metadata: Metadata = {
  title: 'Sign up',
  description: 'Sign up form',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={styles['stars-container']}>
        <StarIcon width={21.05} height={21.05} className={styles.star2} />
        <StarIcon width={27.06} height={27.06} className={styles.star3} />
        <StarIcon width={14.28} height={14.28} className={styles.star4} />
        <StarIcon width={21.05} height={21.05} className={styles.star5} />
        <StarIcon width={27.06} height={27.06} className={styles.star6} />
        <StarIcon width={14.28} height={14.28} className={styles.star7} />
        <StarIcon width={14.28} height={14.28} className={styles.star8} />
      </div>
      <div>{children}</div>
    </div>
  );
};

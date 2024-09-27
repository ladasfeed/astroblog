import type { CollectionEntry } from "astro:content";
import { getRouter } from "src/routes";
import styles from "./PostCard.module.scss";
import i18next from "i18next";

type PropsType = CollectionEntry<"posts"> & {
  view?: "small" | "large";
};

export const PostCard: React.FC<PropsType> = ({ view, ...postData }) => {
  const router = getRouter(i18next.language);

  return (
    <a
      href={`${router.blog.root}/${postData.slug}`}
      className={`${styles.container} relative ${styles[`container-${view}`]}`}
    >
      <div className={styles.body}>
        <div className={styles.content}>
          <h5 className={styles.title}>{postData.data.title}</h5>
          <p className={styles.description}>{postData.data.description}</p>
          <div className={styles.details}>
            <ul className={styles.tags}>
              {postData.data.tags?.map((item) => (
                <span className={styles.tag}>#{item}</span>
              ))}
            </ul>
            <div className="reading-time"></div>
            <div className="rating"></div>
          </div>
        </div>

        <div
          className={styles.image}
          style={{ backgroundImage: `url("${postData.data.heroImage}")` }}
        ></div>
      </div>
    </a>
  );
};

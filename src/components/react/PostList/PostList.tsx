import type { CollectionEntry, ContentCollectionKey } from "astro:content";
import styles from "./PostList.module.scss";
import React, { useEffect } from "react";
import { PostCard } from "../PostCard/PostCard";

type PropsType = {
  posts: CollectionEntry<"posts">[];
  tags: CollectionEntry<"tags">;
};

export const PostList = ({ posts, tags }: PropsType) => {
  const [chosenTags, setChosenTags] = React.useState(new Set());

  const filteredList = React.useMemo(() => {
    if (chosenTags.size == 0) return posts;

    return posts.filter((post) => {
      return Boolean(
        post.data.tags?.find((tag) => {
          return chosenTags.has(tag);
        })
      );
    });
  }, [chosenTags]);

  useEffect(() => {
    console.log(tags);
  }, []);

  const onChangeTag = (e) => {
    setChosenTags((value) => {
      const tagToToggle = e.target.value;
      if (value.has(tagToToggle)) {
        value.delete(tagToToggle);
      } else {
        value.add(tagToToggle);
      }

      return value;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {tags.data.map((tag) => (
          <label className={styles.checkbox}>
            <input
              className={styles.checkbox__input}
              name="tags"
              onChange={onChangeTag}
              type="checkbox"
              value={tag}
              checked={chosenTags.has(tag)}
            ></input>
            <span className={styles.checkbox__label}>{tag}</span>
          </label>
        ))}
      </div>

      <div className={styles.list}>
        {filteredList.map((item) => {
          return <PostCard {...item} />;
        })}
      </div>
    </div>
  );
};

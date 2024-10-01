import type { CollectionEntry, ContentCollectionKey } from "astro:content";
import styles from "./PostList.module.scss";
import React, { useEffect, useState } from "react";
import { PostCard } from "../PostCard/PostCard";
import cn from "classnames";
import { TagCheckbox } from "../Tag";

type PropsType = {
  posts: CollectionEntry<"posts">[];
  tags: CollectionEntry<"tags">;
  defaultValue: string;
};

export const PostList = ({ posts, tags, defaultValue }: PropsType) => {
  const [chosenTags, setChosenTags] = React.useState(
    new Set(defaultValue ? [defaultValue] : undefined)
  );

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

  const onChangeTag = (e) => {
    setChosenTags((value) => {
      const tagToToggle = e.target.value;
      if (value.has(tagToToggle)) {
        value.delete(tagToToggle);
      } else {
        value.add(tagToToggle);
      }

      return new Set(value);
    });
  };

  const resetHandler = () => {
    setChosenTags((prev) => {
      prev.clear();
      return new Set(prev);
    });
  };

  return (
    <>
      <div className={styles.filters}>
        <div className={cn(styles.filters__list, "section-container")}>
          {tags.data.map((tag) => (
            <TagCheckbox
              name="tags"
              onChange={onChangeTag}
              value={tag}
              checked={chosenTags.has(tag)}
            />
          ))}
        </div>
      </div>

      <div className={cn(styles.container, "section-container")}>
        <div className={styles.list}>
          {filteredList.map((item) => {
            return <PostCard {...item} />;
          })}
        </div>
      </div>
    </>
  );
};

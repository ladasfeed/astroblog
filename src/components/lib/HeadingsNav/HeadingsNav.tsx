import React, { type HTMLAttributes } from "react";
import styles from "./styles.module.css";

const TAG_NAMES = {
  h2: "H2",
  h3: "H3",
  h4: "H4",
  h5: "H5",
  h6: "H6",
};

const TAGS_AS_ARRAY = [
  TAG_NAMES.h2,
  TAG_NAMES.h3,
  TAG_NAMES.h4,
  TAG_NAMES.h5,
  TAG_NAMES.h6,
];

type VirtualTreeNodeType = {
  childRaw: Array<Element>;
  child?: Array<VirtualTreeNodeType>;
  headingNode: Element;
  id: string;
  text: string | null;
  tag: string;
};

class VirtualTree {
  tree = null;
  _asMap = {};
  _asArray = [];

  constructor(collection: Array<Element>) {
    if (collection) {
      this.setTree(this.renderVirtualTree(collection));
    }
  }

  renderVirtualTree(collection: Array<Element>) {
    const rootTag = collection[0].tagName;
    let treeLayer: Array<VirtualTreeNodeType> = [];
    let current: null | VirtualTreeNodeType = null;

    collection.forEach((item) => {
      if (item.tagName === rootTag) {
        if (current?.childRaw.length) {
          current.child = this.renderVirtualTree(current.childRaw);
        }

        current = {
          headingNode: item,
          id: item.id,
          text: item.textContent,
          tag: item.tagName,
          childRaw: [],
        };

        treeLayer.push(current);
      } else {
        current?.childRaw.push(item);
      }
    });

    // @ts-ignore
    if (current?.childRaw.length) {
      // @ts-ignore
      current.child = this.renderVirtualTree(current.childRaw);
    }

    return treeLayer;
  }

  setTree(value) {
    const collectItemsToMap = (arr) => {
      for (let item of arr) {
        this._asMap[item.id] = item;
        if (item.child) {
          collectItemsToMap(item.child);
        }
      }
    };
    collectItemsToMap(value);

    this.tree = value;
  }

  getById(id) {
    return this._asMap[id];
  }

  getAsArray() {
    return Object.values(this._asMap) as Array<VirtualTreeNodeType>;
  }
}

function initObserver(
  tree: VirtualTree,
  options: {
    activeClassName: string;
  }
) {
  let timeoutId: number;
  let currentActive: HTMLElement | null = null;

  const updateActiveState = () => {
    const arrayOfHeadings = tree.getAsArray();

    for (let i = 0; i < arrayOfHeadings.length; i++) {
      if (i == arrayOfHeadings.length - 1) {
        return;
      }

      const { top: top1 } =
        arrayOfHeadings[i].headingNode.getBoundingClientRect();
      const { top: top2 } =
        arrayOfHeadings[i + 1].headingNode.getBoundingClientRect();

      if (
        top1 - window.innerHeight / 2 <= 0 &&
        top2 - window.innerHeight / 2 > 0
      ) {
        const activeClassName = options.activeClassName;

        currentActive?.classList.remove(activeClassName);

        currentActive = document.querySelector(
          `#navigation-${arrayOfHeadings[i].id}`
        );

        currentActive?.classList.add(activeClassName);
      }
    }
  };

  updateActiveState();
  document.addEventListener("scroll", () => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(updateActiveState, 200);
  });
}

type PropsType = {
  containerSelector: string;
} & HTMLAttributes<HTMLDivElement>;

export const HeadingsNavigation: React.FC<PropsType> = ({
  containerSelector,
  ...divProps
}) => {
  const [treeStore, setTreeStore] = React.useState<VirtualTree | null>(null);

  const renderDomTree = (
    collection: VirtualTreeNodeType[] | null
  ): React.ReactNode => {
    if (!collection) return null;

    return (
      <>
        {collection.map((item) => (
          <div className={styles["navigation-item"]}>
            <a
              id={`navigation-${item.id}`}
              href={`#${item.id}`}
              className={styles["navigation-item__text"]}
            >
              {item.text}
            </a>
            {item.child && (
              <span className={styles["navigation-item__child"]}>
                {renderDomTree(item.child)}
              </span>
            )}
          </div>
        ))}
      </>
    );
  };

  const init = () => {
    // Step 1 - get all anchors
    const container = document.querySelector(containerSelector);
    const anchorsCollection = Array.from(
      container!.querySelectorAll(TAGS_AS_ARRAY.join(", "))
    );
    anchorsCollection.forEach((item) => {
      item.id = item.textContent!.replaceAll(" ", "-");
    });

    // Step 2 - Generate virtual dom ( tree )
    const _treeStore = new VirtualTree(anchorsCollection);
    setTreeStore(_treeStore);
  };

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    if (treeStore) {
      initObserver(treeStore, {
        activeClassName: styles._active,
      });
    }
  }, [treeStore]);

  return (
    <div {...divProps} className={styles.container + " " + divProps.className}>
      {treeStore && renderDomTree(treeStore.tree)}
    </div>
  );
};

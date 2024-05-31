"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Photo {
  id: string;
  width: number;
  height: number;
  url: string;
}

interface HashTagLogo {
  url: string;
}

export default function Home() {
  const [hashTagLogo, setHashTagLogo] = useState<HashTagLogo>({
    url: "",
  });
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    loadHashtagLogo();
    loadPhotos();
  }, []);

  const loadHashtagLogo = () => {
    fetch("api/hashtag-logo")
    .then(res => res.json())
    .then(data => {
      setHashTagLogo(data);
    });
  };

  const loadPhotos = () => {
    fetch("/api/photos")
      .then(res => res.json())
      .then(data => {
        setPhotos([...photos, ...data]);
      });
  };

  const galleryPhotos = photos.map(photo => (
    <Image
      key={photo.id}
      src={photo.url}
      alt="gallery photo"
      width={309}
      height={309}
    />
  ));

  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.navbarWrapper}>
            <div className={styles.navLogo}>
              <Image
                src="/instagram.svg"
                alt="Instagram Logo"
                width={103}
                height={36}
                priority
              />
            </div>
            <div className={styles.navLogin}>
            </div>
          </div>
        </div>
      </nav>
      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            {hashTagLogo.url && 
              <Image
                className={styles.hashTagLogo}
                src={hashTagLogo.url}
                alt="Hashtag Logo"
                width={150}
                height={150}
                priority
              />
            }
          </div>
          <div className={styles.hashTagWrapper}>
            <div className={styles.hashTagContent}>
              <div className={styles.hashTag}>#houseplants</div>
              <div>
                <span className={styles.hashTagCounts}>10,690,803 </span>posts
              </div>
            </div>
          </div>
        </header>

        <article className={styles.article}>
          <div className={styles.galleryWrapper}>
            <div className={styles.galleryTitle}>Top posts</div>
            <div>
              <InfiniteScroll
                dataLength={photos.length}
                next={loadPhotos}
                hasMore={true}
                loader={<h4>...</h4>}
              >
                <div className={styles.gallery}>
                  {galleryPhotos}
                </div>
              </InfiniteScroll>
            </div>
          </div>
          
        </article>
      </main>
      <footer>
        footer links
      </footer>
    </>
  );
}

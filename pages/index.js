import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { VscGithubAlt } from 'react-icons/vsc';
import { useState, useEffect } from 'react';
import { app } from '../firebase/initFirebase';
import { getStorage, ref, getDownloadURL, list } from 'firebase/storage';
import { getCurrentNumber } from '../helpers/api-util';

export default function Home({ num }) {
  const [orchidURL, setOrchidURL] = useState('');

  const storage = getStorage(app);

  const storageRef = ref(storage, '/orchid470/frames/');

  const getImgURL = async () => {
    const allImages = await list(storageRef, { maxResults: 361 });

    getDownloadURL(allImages.items[num])
      .then((url) => {
        setOrchidURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getImgURL();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Orchid 0</title>
        <meta
          name="description"
          content="Image generated by the StyleGan2 ML algorithm trained on an evolving personal collection of photos of an orchid."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {orchidURL && (
        <Image
          src={orchidURL}
          alt="Image generated by the StyleGan2 ML algorithm trained on an evolving personal collection of photos of an orchid."
          width={1024}
          height={1024}
        />
      )}
      <div className={styles.footer}>
        <p>Orchid 0</p>
        <Link href="https://github.com/RoskiDeluge/orchid-0">
          <a className={styles.link}>
            <VscGithubAlt />
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const currentNumber = await getCurrentNumber();

  return {
    props: {
      num: currentNumber,
    },
    revalidate: 28800,
  };
}

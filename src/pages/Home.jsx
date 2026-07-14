import React, { useEffect, useState } from 'react'
import styles from "./Home.module.scss"

const videos = [
       { 
        label: "The Little Prince : Waiting", 
        titleEn: "If you come at four in the afternoon, I'll begin to be happy by three.", 
        titleKo: "네가 오후 네 시에 온다면, 난 세 시부터 행복해지기 시작할 거야.",
        src: '/mp4/fox1.mp4' 
    },
    { 
        label: "The Little Prince : Taming", 
        titleEn: "It is the time you have wasted for your rose that makes your rose so important.", 
        titleKo: "네 장미꽃이 그토록 소중한 이유는, 그 꽃을 위해 네가 공들인 시간 때문이야.",
        src: '/mp4/fox2.mp4' 
    },
        { 
        label: "The Little Prince : Secret", 
        titleEn: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.", 
        titleKo: "오직 마음으로 보아야 잘 보인다는 거지. 가장 중요한 것은 눈에 보이지 않아.",
        src: '/mp4/fox3.mp4' 
    }
]

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeVideo = videos[activeIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((idx) => {
                if (idx === videos.length - 1) {
                    return 0;
                }
                return idx + 1;
            });
        }, 4000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <section className={styles.home}>
            <div className={styles.slide}>
                <video key={activeVideo.src} autoPlay muted loop playsInline>
                    <source src={activeVideo.src} type="video/mp4" />
                </video>
            </div>
            
            {/* 자막 박스 구역 */}
            <div className={styles.copy}>
                <h1>{activeVideo.label}</h1>
                <p className={styles.en}>{activeVideo.titleEn}</p>
                <p className={styles.ko}>{activeVideo.titleKo}</p>
            </div>

            <div className={styles.dots}>
                {videos.map((item, index) => {
                    return (
                        <button key={item.label}
                            className={index === activeIndex ? styles.activeDot : ''}
                            onClick={() => {
                                setActiveIndex(index)
                            }} />
                    )
                })}
            </div>
        </section>
    );
};

export default Home;
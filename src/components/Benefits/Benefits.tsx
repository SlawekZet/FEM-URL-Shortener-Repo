import { Benefit } from '../Benefit/Benefit';
import styles from './Benefits.module.css';

const benefitsArray = [
  {
    img: './icons/icon-brand-recognition.svg',
    alt: 'chart icon',
    heading: 'Brand Recognition',
    paragraph:
      'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.',
    className: null,
  },
  {
    img: './icons/icon-detailed-records.svg',
    alt: 'potentiometer icon',
    heading: 'Detailed Records',
    paragraph:
      'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
    className: styles.elementMargin1,
  },
  {
    img: './icons/icon-fully-customizable.svg',
    alt: 'three brushes',
    heading: 'Fully Customizable',
    paragraph:
      'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
    className: styles.elementMargin2,
  },
];

export const Benefits = () => {
  return (
    <div className={styles.elementsWrapper}>
      <hr className={styles.separator} />
      <div className={styles.elements}>
        {benefitsArray.map((e, index) => (
          <Benefit
            key={index}
            img={e.img}
            altImg={e.alt}
            className={e.className !== null ? e.className : undefined}
          >
            <h3 className={styles.elementHeader}>{e.heading}</h3>
            <p className={styles.elementParagraph}>{e.paragraph}</p>
          </Benefit>
        ))}
      </div>
    </div>
  );
};

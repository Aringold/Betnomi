import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@betnomi/libs/components/Button';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { Routes } from '../../constants/routes';

import styles from './styles.module.scss';

import { promotions } from '../Promotions/index';

interface IProps {
}

const PromotionSlug: FC<IProps> = () => {
  const { t } = useTranslation();
  const params: any = useParams();
  const { slug } = params;
  const history = useHistory();
  const [promotion, setPromoiton]: any = useState();

  useEffect(() => {
    if (slug) {
      const newPromotion = promotions.find((item) => item.id === slug);
      setPromoiton(newPromotion);
    } else {
      history.push(`${Routes.Promotions}`);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <img className={styles.promotionBanner} src={promotion?.img} alt="promotion" />

        <h2>{promotion?.title}</h2>

        <p>{promotion?.text}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at cum deleniti, dolor ea eligendi
          reprehenderit rerum sed tenetur vel veritatis! Autem beatae consectetur consequatur ducimus ipsam, ipsum
          libero magni natus odit possimus! Aliquam excepturi numquam, odio quas quisquam saepe. Aspernatur explicabo,
          velit. Adipisci cum delectus dicta eius eum fuga harum iusto, laudantium molestias nam nemo pariatur quidem
          quos ratione repellendus sit tenetur velit voluptas. Adipisci doloribus, mollitia officia perspiciatis
          similique sunt totam. Amet aspernatur assumenda beatae corporis, cupiditate distinctio esse ex fuga hic
          itaque iure labore laudantium magnam natus non nostrum nulla officiis perferendis quidem repellat soluta ut
          voluptatem. Consectetur consequuntur cumque est, ex explicabo quia sunt. Atque dignissimos enim expedita
          fugiat illo, libero molestiae optio porro quaerat quibusdam quisquam quo ratione repellat sed similique sit
          Adipisci alias animi cupiditate, esse, eveniet exercitationem explicabo, nam qui quisquam quod unde velit
          vitae? A ab amet animi atque aut blanditiis commodi consequatur distinctio doloribus eius, eos
          exercitationem explicabo facilis harum ipsum, maxime minima natus necessitatibus obcaecati odio omnis quas
          quasi rem sapiente tempora vel veritatis! Animi autem culpa dicta, illo inventore quisquam repellendus. Est
          facilis magnam quibusdam quidem reiciendis sunt. A, aliquid aperiam, corporis, explicabo inventore libero
          maiores minus molestiae natus nihil non odio officia quidem quis quod reprehenderit sapiente suscipit totam
          ut veniam. Alias aspernatur consequuntur corporis earum eveniet expedita in inventore ipsum itaque, magni
          modi molestias nostrum quidem soluta tempora. Aliquam, aperiam deleniti. Dolor iusto repudiandae sit
          voluptates voluptatum. A aliquid amet, aperiam architecto aspernatur blanditiis doloribus earum error
          expedita facere fuga illum libero minima nam necessitatibus nisi nulla obcaecati pariatur perferendis
          placeat quia quibusdam quidem quis quo repellat saepe suscipit tempora velit voluptatibus voluptatum.
          Adipisci amet animi aperiam assumenda doloribus enim eos hic illo ipsam itaque laboriosam nemo neque nobis,
          officia possimus quia reiciendis sed velit voluptatibus.
        </p>

        <div className={styles.buttonsWrap}>
          <Button className={styles.allGames}>{t('See all Skywind games')}</Button>
          <Button onClick={() => history.push('/promotions')} color="transparent" className={styles.button}>{t('Back to all promotions')}</Button>
        </div>

      </div>

      <div className={styles.otherPromotions}>
        <h3>Other promotions</h3>
        <ul>
          <li>
            <div />
            <p>It’s here! The Betnomi Android & iOS</p>
          </li>
          <li>
            <div />
            <p>It’s here! The Betnomi Android & iOS</p>
          </li>
          <li>
            <div />
            <p>It’s here! The Betnomi Android & iOS</p>
          </li>
        </ul>

        <button>See all promotions</button>
      </div>

    </div>
  );
};

export { PromotionSlug };

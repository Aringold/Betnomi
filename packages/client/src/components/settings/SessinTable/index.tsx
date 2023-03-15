import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ClassNames from 'classnames';
import styles from './styles.module.scss';

interface DataProps {
  browser: string;
  near: string;
  ip: string;
  last: string;
  action: string;
}

interface Props {
  data: DataProps[];
}

export const SessionsTable: FC<Props> = ({ data }) => {
  const { t } = useTranslation('profile');

  return (
    <div className={styles.table_content}>
      <table className={styles.table}>
        <thead className={styles.table_header}>
          <tr>
            <th className={styles.th}>{t('Browser')}</th>
            <th className={styles.th}>{t('Near')}</th>
            <th className={styles.th}>{t('IP Address')}</th>
            <th className={styles.th}>{t('Last Used')}</th>
            <th className={styles.th}>{t('Action')}</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(({
              browser, near, ip, last, action,
            }) => (
              <tr className={styles.tr}>
                <td className={styles.td}>{browser}</td>
                <td className={styles.td}>{near}</td>
                <td className={styles.td}>{ip}</td>
                <td className={ClassNames(styles.td, styles.not_online)}>
                  {last === 'Online' ? (
                    <div className={styles.online}>
                      <div />
                      {last}
                    </div>
                  ) : last}
                </td>
                <td className={styles.td}>{action === 'Remove Devise' ? <div className={styles.red_action}>{action}</div> : action}</td>
              </tr>
            ))
            }
        </tbody>

      </table>
    </div>
  ); 
};

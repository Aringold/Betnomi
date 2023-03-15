/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { useTranslation } from '@betnomi/client/src/i18n';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';

import { profileGetTransactionAll } from '../../../store/profile/actionCreators';
import { transactionAllInitialValues } from '../../../hooks/formik/useTransactionAllForm';
import styles from './styles.module.scss';

type Props = {
  limit?: number,
  total?: number,
  currentPage?: number,
  onChange: (data: any) => void,
};

export const Pagination:React.FC<Props> = ({
  total,
  limit = 8,
  currentPage = 0,
  onChange,
}) => {
  const { t } = useTranslation('profile');
  const [page, setPage] = useState(0);

  const handlePageClick = (data: any) => {
    const { selected } = data;
    const selectedPage = Math.ceil(selected * limit);

    if (total) {
      onChange({
        offset: selectedPage,
        limit,
      });
      setPage(selected);
    }
  };

  useEffect(() => {
    if (currentPage === 0) {
      setPage(currentPage);
    }
  }, [currentPage]);

  return (
    <div id="react-paginate" className={styles.pagination}>
      <ReactPaginate
        previousLabel={(
          <FontIcon
            name={FontIconName.ArrowLeftBold}
            size={16}
          />
        )}
        nextLabel={(
          <FontIcon
            name={FontIconName.ArrowRightBold}
            size={16}
          />
        )}
        forcePage={page}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={total ? total / limit : 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />

      <div className={styles.result}>
        <p>{`Result: 1 -${limit} of ${total}`}</p>
      </div>
    </div>
  );
};

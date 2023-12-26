import React from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { updateOfferModerStatus } from '../../../store/slices/moderSlice';
import styles from './OfferItem.module.sass';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './confirmStyle.css';
import CONSTANTS from '../../../constants';

const OfferItem = ({
  id,
  updateOfferModerStatus,
  fileName,
  moderStatus,
  text,
  userId,
  contestId,
}) => {
  const resolveOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            handleOfferStatusChange(CONSTANTS.MODER_STATUS_ACCEPTED, id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const rejectOffer = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>
            handleOfferStatusChange(CONSTANTS.MODER_STATUS_REJECTED, id),
        },
        {
          label: 'No',
        },
      ],
    });
  };

  const handleOfferStatusChange = (status, offerId) => {
    updateOfferModerStatus({
      offerId,
      moderStatus: status,
    });
  };

  return (
    <div className={styles.offerContainer}>
      <div className={styles.mainInfoContainer}>
        <div className={styles.responseConainer}>
          {fileName ? (
            <span className={styles.response}>
              contest id: {contestId}, <br /> creator id:
              {userId}, <br /> offer: <br />
              <img
                className={styles.responseLogo}
                src={`${CONSTANTS.publicURL}${fileName}`}
                alt="logo"
              />
            </span>
          ) : (
            <span className={styles.response}>
              contest id: {contestId}, <br /> creator id:
              {userId}, <br /> offer: {text}
            </span>
          )}
        </div>
      </div>
      {moderStatus === CONSTANTS.MODER_STATUS_PENDING && (
        <div className={styles.btnsContainer}>
          <div onClick={resolveOffer} className={styles.resolveBtn}>
            Resolve
          </div>
          <div onClick={rejectOffer} className={styles.rejectBtn}>
            Reject
          </div>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateOfferModerStatus: (data) => dispatch(updateOfferModerStatus(data)),
});

export default connect(null, mapDispatchToProps)(OfferItem);

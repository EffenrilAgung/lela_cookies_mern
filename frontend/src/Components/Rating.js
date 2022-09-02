import React from 'react';
import PropTypes from 'prop-types';
const rating = ({ values, text, color }) => {
  return (
    <div className="rating">
      <span>
        <i
          style={{ color }}
          className={
            values >= 1
              ? 'fas fa-star'
              : values >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            values >= 2
              ? 'fas fa-star'
              : values >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            values >= 3
              ? 'fas fa-star'
              : values >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            values >= 4
              ? 'fas fa-star'
              : values >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>

      <span>
        <i
          style={{ color }}
          className={
            values >= 5
              ? 'fas fa-star'
              : values >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  );
};

rating.defaultProps = {
  color: '#f8e825',
};

rating.propTypes = {
  values: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default rating;

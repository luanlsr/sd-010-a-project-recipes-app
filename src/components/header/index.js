import React from 'react';
import PropTypes from 'prop-types';
import SearchBtn from './SearchBtn';
import ProfileBtn from './ProfileBtn';

export default function Header({ title, isSearch = true }) {
  return (
    <div>
      <ProfileBtn />
      <span data-testid="page-title">
        { title }
      </span>
      { isSearch ? <SearchBtn /> : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isSearch: PropTypes.bool,
}.isRequired;

// import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [api, setApi] = useState('');
  const [originalApi, setOriginalApi] = useState('');

  const values = useMemo(() => ({
    api,
    setApi,
    originalApi,
    setOriginalApi,
  }), [api, originalApi]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;

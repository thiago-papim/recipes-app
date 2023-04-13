// import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [api, setApi] = useState('');
  const [originalApi, setOriginalApi] = useState('');
  const [load, setLoad] = useState(true);

  const values = useMemo(() => ({
    api,
    setApi,
    originalApi,
    setOriginalApi,
    load,
    setLoad,
  }), [api, originalApi, load]);

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

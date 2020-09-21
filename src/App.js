import React from 'react';

import Navigator from './navigator';
import {BooksProvider} from './context/books';
import {QuotesProvider} from './context/quotes';
import {AuthProvider} from './context/auth';

const App = () => {
  return (
    <AuthProvider>
      <BooksProvider>
        <QuotesProvider>
          <Navigator />
        </QuotesProvider>
      </BooksProvider>
    </AuthProvider>
  );
};

export default App;

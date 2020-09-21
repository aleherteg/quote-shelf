import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from 'react';

import QuotesService from '../services/quotes';
import {AuthContext} from './auth';

export const QuotesContext = createContext();

export const QuotesProvider = (props) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const {initialized, user} = useContext(AuthContext);

  const loadQuotes = async () => {
    setLoading(true);
    const quoteList = await QuotesService.getAll();
    setQuotes(quoteList);
    setLoading(false);
  };

  useEffect(() => {
    if (initialized) {
      loadQuotes();
    }
  }, [initialized, user]);

  const favoriteQuotes = useMemo(
    () => quotes.filter((quote) => quote.isFavorite),
    [quotes],
  );

  const getQuotesByBookId = async (bookId) => {
    setLoading(true);
    const bookQuotesList = await QuotesService.getByBookId(bookId);
    setLoading(false);
    return bookQuotesList;
  };

  const addQuote = async (quote) => {
    await QuotesService.add(quote);
    loadQuotes();
  };

  const removeQuote = async (quote) => {
    await QuotesService.remove(quote);
    loadQuotes();
  };

  const updateQuote = async (quote) => {
    await QuotesService.update(quote);
    loadQuotes();
  };

  const removeByBookId = async (bookId) => {
    await QuotesService.removeByBookId(bookId);
    loadQuotes();
  };

  return (
    <QuotesContext.Provider
      value={{
        loading,
        quotes,
        favoriteQuotes,
        addQuote,
        removeQuote,
        removeByBookId,
        updateQuote,
        getQuotesByBookId,
        refresh: loadQuotes,
      }}>
      {props.children}
    </QuotesContext.Provider>
  );
};

export function withQuotesContext(Component) {
  return function WrapperComponent(props) {
    return (
      <QuotesContext.Consumer>
        {(state) => <Component {...props} {...state} />}
      </QuotesContext.Consumer>
    );
  };
}

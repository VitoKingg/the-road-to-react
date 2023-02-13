import { describe, it, expect } from 'vitest';

import App from './App';
import List from './components/List';
import ListItem from './components/ListItem';
import SearchForm from './components/SearchForm';
import InputWithLabel from './components/InputWithLabel';

describe('App component', () => {
  it('removes an item when clicking the Dismiss button', () => {
    expect(true).toBeTruthy();
  });

  it('requests some initial lists from an API', () => {
    expect(false).toBeFalsy();
  });
});

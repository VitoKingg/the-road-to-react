import InputWithLabel from './InputWithLabel';

interface SearchFormProps {
  searchValue: string;
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function SearchForm(props: SearchFormProps) {
  return (
    <>
      <form onSubmit={props.onSearchSubmit}>
        <InputWithLabel
          id='search'
          value={props.searchValue}
          isFocused={true}
          onInputChange={props.onSearchInput}
        >
          Search:
        </InputWithLabel>
        <button type='submit' disabled={!props.searchValue.trim()}>
          Submit
        </button>
      </form>
    </>
  );
}

export default SearchForm;

import { ListContentType } from '../interfaces';

type ListItemProps = {
  item: ListContentType;
  onRemoveItem: (item: ListContentType) => void;
};

function ListItem(props: ListItemProps) {
  const { item, onRemoveItem } = props;

  function handleRemoveItem(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onRemoveItem(item);
  }

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.numComments}</span>
      <span>{item.points}</span>
      <span>
        <button type='button' onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
    </li>
  );
}

export default ListItem;

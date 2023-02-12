import { memo } from 'react';
import { ListContentType } from '../types';

type ListItemProps = {
  item: ListContentType;
  onRemoveItem: (item: ListContentType) => void;
};

const ListItem = memo(function ListItem(props: ListItemProps) {
  console.log('ListItem');
  const { item, onRemoveItem } = props;

  function handleRemoveItem(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onRemoveItem(item);
  }

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}&nbsp;</a>
      </span>
      <span>{item.author}&nbsp;</span>
      <span>{new Date(item.createdAt).toLocaleDateString()}&nbsp;</span>
      <span>{item.numComments}&nbsp;</span>
      <span>{item.points}&nbsp;</span>
      <span>
        <button type='button' onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
    </li>
  );
});

export default ListItem;

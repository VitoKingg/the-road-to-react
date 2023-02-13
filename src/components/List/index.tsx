import { ListContentsType, ListContentType } from '../../types';

type ListProps = {
  lists: ListContentsType;
  onRemoveItem: (item: ListContentType) => void;
};

type ListItemProps = {
  item: ListContentType;
  onRemoveItem: (item: ListContentType) => void;
};

function List(props: ListProps) {
  const { lists, onRemoveItem } = props;

  const itemList = lists.map((item) => (
    <ListItem key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
  ));

  return (
    <div>
      <ul>{itemList}</ul>
    </div>
  );
}

export function ListItem(props: ListItemProps) {
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
}

export default List;

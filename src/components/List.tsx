import { ListContentsType, ListContentType } from '../types';
import ListItem from './ListItem';

type ListProps = {
  lists: ListContentsType;
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

export default List;

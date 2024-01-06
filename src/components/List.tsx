import { RefObject, useRef, useImperativeHandle } from 'react';
import { v4 as uuid } from 'uuid';

type ListProps = {
  className?: string, 
  id?: string,
  elements: any[], 
  ListItem: any, 
  style?: any,
  forwardedRef?: RefObject<HTMLUListElement | null>;
}

export default function List({ 
  className = "", 
  id = "", 
  elements, 
  ListItem, 
  style = {}, 
  forwardedRef 
}: ListProps): JSX.Element {
  const listRef = useRef<HTMLUListElement | null>(null);
  useImperativeHandle(forwardedRef, () => listRef.current);
  
  return (
    <ul 
      className={ className } 
      id={ id } 
      style={ style }
      ref={ listRef }
    > { elements.map(element => { return <ListItem itemData={ element } key={ element.id ?? uuid() }/> }) }
    </ul>
  )
}
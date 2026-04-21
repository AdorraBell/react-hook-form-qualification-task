import { Card } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { ReactNode, isValidElement, cloneElement } from 'react';

interface DraggableCardProps {
  id: string;
  children: ReactNode;
}

export const DraggableCard = ({ id, children }: DraggableCardProps) => {
  const { attributes, setNodeRef, transform, transition, listeners } =
    useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    cursor: 'grab',
    marginBottom: 12,
  };

  if (!isValidElement(children)) return null;

  return (
    <Card ref={setNodeRef} {...attributes} sx={style}>
      {cloneElement(children, {
        // override props to add dragHandleProps to the passed child element
        dragHandleProps: { ...listeners, ...attributes },
      })}
    </Card>
  );
};

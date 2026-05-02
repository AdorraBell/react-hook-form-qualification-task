import { useCallback, useState } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ProductItemForm } from '../ProductItemForm';
import { FormDataType, productCardDataType } from '../../types';
import { ProductCard } from '../ProductCard';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { DraggableCard } from '../DraggableCard';
import { RemoveProductModal } from '../RemoveProductModal';

export const ProductsListForm = () => {
  const { control, trigger, getValues, setValue } =
    useFormContext<FormDataType>();

  const {
    fields: products,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'products',
  });

  const [showForm, setShowForm] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = products.findIndex((item) => item.id === active.id);
      const newIndex = products.findIndex((item) => item.id === over.id);

      const reordered = [...products];
      const [moved] = reordered.splice(oldIndex, 1);
      reordered.splice(newIndex, 0, moved);

      setValue('products', reordered);
    },
    [products, setValue],
  );

  const newItemPrefix = 'draftProduct';

  const updateOrderSum = () => {
    const products = getValues('products') as productCardDataType[];
    if (!products?.length) {
      setValue('orderSum', 0);
      return;
    }

    const total = products.reduce((acc, product) => {
      const price = Number(product.priceForOne);
      const count = Number(product.count);
      return acc + price * count;
    }, 0);

    setValue('orderSum', total);
  };

  const handleSaveDraft = async () => {
    const isValid = await trigger([
      `${newItemPrefix}.name`,
      `${newItemPrefix}.count`,
      `${newItemPrefix}.priceForOne`,
      `${newItemPrefix}.category`,
    ]);
    if (!isValid) return;

    const draft = getValues(newItemPrefix);
    append(draft);

    setValue(newItemPrefix, {
      name: '',
      count: 1,
      priceForOne: 1,
      category: '',
      description: '',
    });

    setShowForm(false);

    updateOrderSum();
  };

  const handleClickRemoveItem = (index: number) => {
    setDeleteIndex(index);
  };

  const handleDeleteItem = () => {
    if (deleteIndex !== null) {
      remove(deleteIndex);
      setDeleteIndex(null);
    }
    updateOrderSum();
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={products.map((item) => item.id)}>
        {products.map((item, index) => (
          <DraggableCard key={item.id} id={item.id}>
            <ProductCard
              data={item}
              onDelete={() => handleClickRemoveItem(index)}
            />
          </DraggableCard>
        ))}
      </SortableContext>

      {showForm ? (
        <>
          <Box sx={{ mt: 4 }}>
            <ProductItemForm />
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setShowForm(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveDraft}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Button
            variant="contained"
            sx={{ marginLeft: 'auto', mt: 2 }}
            onClick={() => setShowForm(true)}
            disabled={products.length === 20}
          >
            Add
          </Button>
          {products.length === 20 ? (
            <Typography color="#ff9800">
              The maximum allowed number of items is 20
            </Typography>
          ) : null}
        </>
      )}
      <RemoveProductModal
        showModal={deleteIndex !== null}
        closeModal={() => setDeleteIndex(null)}
        deleteApproved={handleDeleteItem}
      />
    </DndContext>
  );
};

import { useState } from 'react';
import { Button, Box } from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { ProductItemForm } from '../ProductItemForm';
import { FormDataType } from '../../types';
import { ProductCard } from '../ProductCard';
import { NEW_ITEM_PREFIX } from '../../const';

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

  const handleSaveDraft = async () => {
    const isValid = await trigger([
      `${NEW_ITEM_PREFIX}.name`,
      `${NEW_ITEM_PREFIX}.count`,
      `${NEW_ITEM_PREFIX}.priceForOne`,
      `${NEW_ITEM_PREFIX}.category`,
    ]);
    if (!isValid) return;

    const draft = getValues(NEW_ITEM_PREFIX);
    append(draft);

    setValue(NEW_ITEM_PREFIX, {
      name: '',
      count: 1,
      priceForOne: 1,
      category: '',
      description: '',
    });

    setShowForm(false);
  };

  const handleDeleteItem = (index: number) => {
    if (index !== null) {
      remove(index);
    }
  };

  return (
    <>
      {products
        ? products.map((item, index) => (
            <ProductCard data={item} onDelete={() => handleDeleteItem(index)} />
          ))
        : null}
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
            Add new item
          </Button>
        </>
      )}
    </>
  );
};

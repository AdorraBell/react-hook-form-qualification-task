import { Typography, IconButton, Box } from '@mui/material';
import { productCardDataType } from '../../types';
import { productCategory } from '../../const/productCategory';
import DeleteIcon from '@mui/icons-material/Delete';

interface ProductCardProps {
  data: productCardDataType;
  onDelete: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}

export const ProductCard = ({
  data,
  onDelete,
  dragHandleProps,
}: ProductCardProps) => {
  const categoryLabel =
    productCategory.find((cat) => cat.value === data.category)?.text ??
    data.category;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      <Box {...dragHandleProps} style={{ cursor: 'grab', flex: '1' }}>
        <Typography variant="h5">{data.name}</Typography>
        <Typography>
          Price: ${data.priceForOne} x {data.count}
        </Typography>
        <Typography>Category: {categoryLabel}</Typography>
        {data.description ? (
          <Typography>Comment: {data.description}</Typography>
        ) : null}
      </Box>
      {onDelete ? (
        <IconButton onClick={onDelete} size="large" aria-label="Remove">
          <DeleteIcon fontSize="large" />
        </IconButton>
      ) : null}
    </Box>
  );
};

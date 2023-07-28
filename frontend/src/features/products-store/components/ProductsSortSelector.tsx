import { FormControl, InputLabel, Select, styled } from '@mui/material'
import { SortProductsByType } from '../types/product'

type Props = {
  sortBy: SortProductsByType
  onChangeSortBy: (newSortBy: SortProductsByType) => void
}

const StyledForm = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: '200px',
}))

const StyledSelct = styled(Select)(({ theme }) => ({
  backgroundColor: '#2196f3',
  '&:hover': {
    backgroundColor: '#2196f3',
  },
}))

const ProductsSortSelector: React.FC<Props> = ({ sortBy, onChangeSortBy }) => {
  return (
    <StyledForm>
      <StyledSelct
        native
        value={sortBy}
        onChange={(event) => onChangeSortBy(event.target.value as SortProductsByType)}
        inputProps={{
          name: 'sortOrder',
          id: 'sort-order-select',
        }}
      >
        <option value="name">Sort by Name</option>
        <option value="count">Sort by Count</option>
      </StyledSelct>
    </StyledForm>
  )
}

export default ProductsSortSelector

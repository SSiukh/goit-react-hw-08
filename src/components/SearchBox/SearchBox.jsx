import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);

  return (
    <TextField
      color="primary"
      name="filter"
      id="filter"
      label="Find contact"
      variant="outlined"
      type="text"
      value={value}
      onChange={e => dispatch(changeFilter(e.target.value))}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBox;

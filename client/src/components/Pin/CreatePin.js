import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import LandscapeIcon from '@material-ui/icons/LandscapeOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';
import { AuthContext } from '../../AuthContext';

const CreatePin = ({ classes }) => {
  const { discard } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState({
    title: '',
    image: '',
    content: '',
  });

  const handleDiscard = () => {
    setInputValue({
      title: '',
      image: '',
      content: '',
    });
    discard();
  };

  const handleInputChange = ({ target: { name, value, files } }) => {
    setInputValue(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography
        component={'h2'}
        variant={'h4'}
        color={'secondary'}
        className={classes.alignCenter}
      >
        <LandscapeIcon className={classes.iconLarge} />
        Pin Location
      </Typography>
      <div>
        <TextField
          name={'title'}
          label={'Title'}
          placeholder={'insert pin'}
          onChange={handleInputChange}
        />
        <input
          className={classes.input}
          id={'image'}
          name={'image'}
          type={'file'}
          onChange={handleInputChange}
        />
        <label htmlFor={'image'}>
          <Button
            component={'span'}
            size={'small'}
            className={classes.button}
            style={{ color: inputValue.image && 'green' }}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name={'content'}
          label={'Content'}
          variant={'outlined'}
          multiline
          rows={6}
          margin={'normal'}
          fullWidth
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          variant={'contained'}
          color={'primary'}
          onClick={handleDiscard}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          className={classes.button}
          type={'submit'}
          variant={'contained'}
          color={'secondary'}
        >
          Save <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit,
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%',
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0,
  },
});

export default withStyles(styles)(CreatePin);

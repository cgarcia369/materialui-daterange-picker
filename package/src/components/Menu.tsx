import React from 'react';
import {
  Paper,
  Grid,
  Typography,
  Divider,
  makeStyles,
  // eslint-disable-next-line no-unused-vars
  Theme,
  Box,
  Button,
  Popover,
} from '@material-ui/core';
import { format, differenceInCalendarMonths } from 'date-fns';
import { es } from "date-fns/locale";
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {
  // eslint-disable-next-line no-unused-vars
  DateRange,
  // eslint-disable-next-line no-unused-vars
  DefinedRange,
  // eslint-disable-next-line no-unused-vars
  Setter,
  // eslint-disable-next-line no-unused-vars
  NavigationAction,
} from '../types';
import { MARKERS } from './DateRangePicker';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    padding: '20px 70px',
  },
  headerItem: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    borderLeft: `1px solid ${theme.palette.action.hover}`,
    marginBottom: 20,
  },
  actions:{
    margin:'0 0.5rem'
  }
}));

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  handleToggle: any;
  anchorEl:any;
  anchorOrigin:any;
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const classes = useStyles();

  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
    handleToggle,
    anchorEl,
    anchorOrigin,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return (
      <Popover open anchorEl={anchorEl} anchorOrigin={anchorOrigin} onClose={handleToggle}>
        <Paper elevation={5} square>
          <Grid container direction="row" wrap="nowrap">
            <Grid>
              <Grid container className={classes.header} alignItems="center">
                <Grid item className={classes.headerItem}>
                  <Typography variant="subtitle1">
                    {startDate ? format(startDate, 'MM/DD/YYYY',{ locale: es }) : 'Fecha de inicio'}
                  </Typography>
                </Grid>
                <Grid item className={classes.headerItem}>
                  <ArrowRightAlt color="action" />
                </Grid>
                <Grid item className={classes.headerItem}>
                  <Typography variant="subtitle1">
                    {endDate ? format(endDate, 'MM/DD/YYYY',{ locale: es }) : 'Fecha final'}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container direction="row" justifyContent="center" wrap="nowrap">
                <Month
                  {...commonProps}
                  value={firstMonth}
                  setValue={setFirstMonth}
                  navState={[true, canNavigateCloser]}
                  marker={MARKERS.FIRST_MONTH}
                />
                <div className={classes.divider} />
                <Month
                  {...commonProps}
                  value={secondMonth}
                  setValue={setSecondMonth}
                  navState={[canNavigateCloser, true]}
                  marker={MARKERS.SECOND_MONTH}
                />
              </Grid>
            </Grid>
            <div className={classes.divider} />
            <Grid>
              <DefinedRanges
                selectedRange={dateRange}
                ranges={ranges}
                setRange={setDateRange}
              />
            </Grid>
          </Grid>
          <Box display="flex" flexDirection="row" width="100%" paddingBottom="1rem" paddingLeft="1rem">
            <Button onClick={()=>{
              console.log("toggle")
              handleToggle();
            }} className={classes.actions}>
              Guardar
            </Button>
          </Box>
        </Paper>
      </Popover>
  );
};

export default Menu;

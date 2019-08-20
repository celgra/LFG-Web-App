import { helper } from '@ember/component/helper';
import moment from 'moment';

export function date(params/*, hash*/) {
  let formatString = params[1] ? params[1] : 'h:mA M/D/YYYY';
  return moment(params[0]).format(formatString);
}

export default helper(date);

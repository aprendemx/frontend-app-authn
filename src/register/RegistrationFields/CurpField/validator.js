import { CURP_REGEX } from '../../data/llavemxIdentity';
import messages from '../../messages';

// Se conserva el nombre exportado por compatibilidad. Antes era una regex con bandera
// `g`, que hacía fallar una CURP válida en llamadas alternas de `.test()`.
export const URL_REGEX = CURP_REGEX;

const validateCurp = (value, formatMessage) => {
  let fieldError = '';
  if (!value.trim()) {
    fieldError = formatMessage(messages['empty.curp.field.error']);
  } else if (!CURP_REGEX.test(value.trim())) {
    fieldError = formatMessage(messages['curp.validation.message']);
  }
  return fieldError;
};
export default validateCurp;

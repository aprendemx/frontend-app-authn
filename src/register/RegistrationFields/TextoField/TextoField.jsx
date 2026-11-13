import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import validateName from './validator';
import { FormGroup } from '../../../common-components';
import { clearRegistrationBackendError, fetchRealtimeValidations } from '../../data/actions';

/**
 * Name field wrapper. It accepts following handlers
 * - handleChange for setting value change and
 * - handleErrorChange for setting error
 *
 * It is responsible for
 * - Making backend call for generating username suggestions
 * - Performing name field validations
 * - Clearing error on focus
 * - Setting value on change
 */
const TextoField = (props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const validationApiRateLimited = useSelector(state => state.register.validationApiRateLimited);

  const {
    handleErrorChange,
    shouldFetchUsernameSuggestions,
    name,
    opcional,
    readOnly,
  } = props;

  const handleOnBlur = (e) => {
    // Un campo de solo lectura trae datos ya verificados (p. ej. Llave MX): no se valida.
    if (readOnly) {
      return;
    }
    const { value } = e.target;
    if (opcional && !value.trim()) {
      return;
    }
    const fieldError = validateName(value, formatMessage);
    if (fieldError) {
      handleErrorChange(name, fieldError);
    } else if (shouldFetchUsernameSuggestions && !validationApiRateLimited) {
      dispatch(fetchRealtimeValidations({ name: value }));
    }
  };

  const handleOnFocus = () => {
    handleErrorChange(name, '');
    dispatch(clearRegistrationBackendError(name));
  };

  return (
    <FormGroup
      {...props}
      handleBlur={handleOnBlur}
      handleFocus={handleOnFocus}
    />
  );
};

TextoField.defaultProps = {
  errorMessage: '',
  shouldFetchUsernameSuggestions: false,
  opcional: false,
  readOnly: false,
};

TextoField.propTypes = {
  errorMessage: PropTypes.string,
  shouldFetchUsernameSuggestions: PropTypes.bool,
  opcional: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextoField;

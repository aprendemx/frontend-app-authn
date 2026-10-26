import { Provider } from 'react-redux';

import { mergeConfig } from '@edx/frontend-platform';
import { configure, getLocale, IntlProvider } from '@edx/frontend-platform/i18n';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import { REGISTER_NEW_USER } from './data/actions';
import { CURP_GENERICA_EXTRANJERO } from './data/llavemxIdentity';
import RegistrationPage from './RegistrationPage';
import { COMPLETE_STATE } from '../data/constants';

jest.mock('@edx/frontend-platform/analytics', () => ({
  sendPageEvent: jest.fn(),
  sendTrackEvent: jest.fn(),
}));
jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  getLocale: jest.fn(),
}));

const mockStore = configureStore();
const CURP = 'ZASL960327HDFRRS07';

const llaveMX = {
  username: CURP,
  email: 'diana@example.com',
  name: 'Diana López Ruiz',
  nombres: 'Diana',
  primer_apellido: 'López',
  segundo_apellido: 'Ruiz',
  curp: CURP,
  estado: 'Veracruz de Ignacio de la Llave',
  municipio: 'Xalapa',
  es_extranjero: false,
};

const camposVacios = {
  name: '',
  email: '',
  username: '',
  password: '',
  nombres: '',
  estado: '',
  municipio: '',
  ocupacion: '',
  primer_apellido: '',
  segundo_apellido: '',
  curp: '',
};

const crearStore = (pipelineUserDetails, contexto = {}) => mockStore({
  register: {
    registrationResult: { success: false, redirectUrl: '' },
    registrationError: {},
    registrationFormData: {
      configurableFormFields: { marketingEmailsOptIn: true },
      formFields: { ...camposVacios },
      emailSuggestion: { suggestion: '', type: '' },
      errors: { ...camposVacios },
    },
    usernameSuggestions: [],
  },
  commonComponents: {
    thirdPartyAuthApiStatus: COMPLETE_STATE,
    thirdPartyAuthContext: {
      currentProvider: 'oa2-llavemx',
      finishAuthUrl: null,
      providers: [],
      pipelineUserDetails,
      countryCode: null,
      ...contexto,
    },
    fieldDescriptions: {},
    optionalFields: { fields: {}, extended_profile: [] },
  },
});

const montar = (store) => render(
  <IntlProvider locale="en">
    <Provider store={store}>
      <Router>
        <RegistrationPage handleInstitutionLogin={jest.fn()} institutionLogin={false} />
      </Router>
    </Provider>
  </IntlProvider>,
);

const campo = (container, nombre) => container.querySelector(`input[name="${nombre}"]`);

describe('RegistrationPage con identidad de Llave MX', () => {
  mergeConfig({
    PRIVACY_POLICY: 'https://privacy-policy.com',
    TOS_AND_HONOR_CODE: 'https://tos-and-honot-code.com',
    USER_RETENTION_COOKIE_NAME: 'authn-returning-user',
  });

  beforeEach(() => {
    configure({
      loggingService: { logError: jest.fn() },
      config: { ENVIRONMENT: 'production', LANGUAGE_PREFERENCE_COOKIE_NAME: 'yum' },
      messages: { 'es-419': {}, de: {}, 'en-us': {} },
    });
    window.location = { search: '' };
    getLocale.mockImplementation(() => 'en-us');
  });

  it('muestra nombre, apellidos y CURP de Llave MX de solo lectura', () => {
    const { container } = montar(crearStore(llaveMX));
    expect(campo(container, 'nombres').value).toEqual('DIANA');
    expect(campo(container, 'primer_apellido').value).toEqual('LÓPEZ');
    expect(campo(container, 'segundo_apellido').value).toEqual('RUIZ');
    expect(campo(container, 'curp').value).toEqual(CURP);
    ['nombres', 'primer_apellido', 'segundo_apellido', 'curp'].forEach((n) => {
      expect(campo(container, n).readOnly).toBe(true);
    });
  });

  it('ignora un intento de cambiar la CURP o el nombre', () => {
    const { container } = montar(crearStore(llaveMX));
    fireEvent.change(campo(container, 'curp'), { target: { name: 'curp', value: 'OTRA800101HDFAAA01' } });
    fireEvent.change(campo(container, 'nombres'), { target: { name: 'nombres', value: 'CARLOS' } });
    expect(campo(container, 'curp').value).toEqual(CURP);
    expect(campo(container, 'nombres').value).toEqual('DIANA');
  });

  it('muestra la CURP aunque el estado no se haya podido prellenar', () => {
    const { container } = montar(crearStore({ ...llaveMX, estado: 'Nacido en el Extranjero' }));
    expect(campo(container, 'curp')).not.toBeNull();
    expect(campo(container, 'curp').value).toEqual(CURP);
  });

  it('extranjero sin CURP: muestra la genérica bloqueada', () => {
    const { container } = montar(crearStore({
      ...llaveMX, curp: '', es_extranjero: true, estado: '',
    }));
    expect(campo(container, 'curp').value).toEqual(CURP_GENERICA_EXTRANJERO);
    expect(campo(container, 'curp').readOnly).toBe(true);
  });

  it('reconoce Llave MX cuando currentProvider trae el nombre visible del proveedor', () => {
    const { container } = montar(crearStore(llaveMX, {
      currentProvider: 'Llave MX',
      providers: [{ id: 'oa2-llavemx', name: 'Llave MX' }],
    }));
    expect(campo(container, 'curp').readOnly).toBe(true);
    expect(campo(container, 'nombres').readOnly).toBe(true);
  });

  it('no bloquea si el proveedor no es Llave MX', () => {
    const { container } = montar(crearStore(llaveMX, {
      currentProvider: 'Otro',
      providers: [{ id: 'oa2-otro', name: 'Otro' }],
    }));
    expect(campo(container, 'nombres').readOnly).toBe(false);
  });

  it('el envío lleva la CURP y el nombre de Llave MX', () => {
    const store = crearStore(llaveMX);
    store.dispatch = jest.fn(store.dispatch);
    const { container } = montar(store);

    fireEvent.change(campo(container, 'curp'), { target: { name: 'curp', value: 'OTRA800101HDFAAA01' } });
    ['tos', 'honor_code'].forEach((n) => {
      const casilla = campo(container, n);
      if (casilla && !casilla.checked) {
        fireEvent.click(casilla);
      }
    });
    fireEvent.click(container.querySelector('button[type="submit"]'));

    const envio = store.dispatch.mock.calls
      .map(([accion]) => accion)
      .find(accion => accion.type === REGISTER_NEW_USER.BASE);
    expect(envio).toBeDefined();
    expect(envio.payload.registrationInfo).toEqual(expect.objectContaining({
      curp: CURP,
      nombres: 'DIANA',
      primer_apellido: 'LÓPEZ',
      segundo_apellido: 'RUIZ',
      name: 'DIANA LÓPEZ RUIZ',
      estado: '30',
    }));
  });
});

import validateCurp from '../../RegistrationFields/CurpField/validator';
import {
  aplicarIdentidadLlaveMX, CURP_GENERICA_EXTRANJERO, getIdentidadLlaveMX, mapearEstado, normalizarTexto,
} from '../llavemxIdentity';

const ESTADOS = [
  { code: '5', name: 'Coahuila' },
  { code: '9', name: 'Ciudad de México' },
  { code: '15', name: 'México' },
  { code: '16', name: 'Michoacán' },
  { code: '22', name: 'Querétaro' },
  { code: '30', name: 'Veracruz' },
  { code: '33', name: 'Fuera de México' },
];

const CURP = 'ZASL960327HDFRRS07';

describe('normalizarTexto', () => {
  it('quita acentos, pasa a mayúsculas y unifica espacios', () => {
    expect(normalizarTexto('  María   López ')).toEqual('MARIA LOPEZ');
    expect(normalizarTexto(null)).toEqual('');
  });
});

describe('mapearEstado', () => {
  it.each([
    ['Ciudad de México', '9'],
    ['CIUDAD DE MEXICO', '9'],
    ['Veracruz de Ignacio de la Llave', '30'],
    ['Michoacán de Ocampo', '16'],
    ['Coahuila de Zaragoza', '5'],
    ['Querétaro Arteaga', '22'],
    ['Distrito Federal', '9'],
    ['México', '15'],
  ])('mapea "%s" a la clave %s', (texto, clave) => {
    expect(mapearEstado(texto, ESTADOS).estadoCode).toEqual(clave);
  });

  it.each([[''], [null], ['Nacido en el Extranjero']])('no inventa estado para %p', (texto) => {
    expect(mapearEstado(texto, ESTADOS)).toEqual('');
  });
});

describe('getIdentidadLlaveMX', () => {
  const base = {
    nombres: 'Diana', primer_apellido: 'López', segundo_apellido: 'Ruiz', curp: CURP,
  };

  it('bloquea nombre, apellidos y CURP cuando Llave MX los trae', () => {
    const id = getIdentidadLlaveMX(base);
    expect(id).toMatchObject({
      nombres: 'DIANA',
      primer_apellido: 'LÓPEZ',
      segundo_apellido: 'RUIZ',
      curp: CURP,
      bloquearNombres: true,
      bloquearCurp: true,
    });
  });

  it('bloquea un segundo apellido vacío (dato verificado)', () => {
    const id = getIdentidadLlaveMX({ ...base, segundo_apellido: '' });
    expect(id.bloquearNombres).toBe(true);
    expect(id.segundo_apellido).toEqual('');
  });

  it('no bloquea nombres si falta el nombre o el primer apellido', () => {
    expect(getIdentidadLlaveMX({ ...base, nombres: '' }).bloquearNombres).toBe(false);
    expect(getIdentidadLlaveMX({ ...base, primer_apellido: '' }).bloquearNombres).toBe(false);
  });

  it('extranjero sin CURP: CURP genérica bloqueada', () => {
    const id = getIdentidadLlaveMX({ ...base, curp: '', es_extranjero: true });
    expect(id).toMatchObject({ curp: CURP_GENERICA_EXTRANJERO, bloquearCurp: true, esExtranjero: true });
  });

  it('CURP genérica sin bandera de extranjero se trata como extranjero', () => {
    const id = getIdentidadLlaveMX({ ...base, curp: CURP_GENERICA_EXTRANJERO });
    expect(id).toMatchObject({ curp: CURP_GENERICA_EXTRANJERO, bloquearCurp: true, esExtranjero: true });
  });

  it('nacional sin CURP (caso anómalo): CURP editable para no impedir el registro', () => {
    const id = getIdentidadLlaveMX({ ...base, curp: '' });
    expect(id).toMatchObject({ curp: '', bloquearCurp: false });
  });

  it('CURP con formato inválido no se bloquea', () => {
    expect(getIdentidadLlaveMX({ ...base, curp: 'ABC' }).bloquearCurp).toBe(false);
  });
});

describe('aplicarIdentidadLlaveMX', () => {
  it('sobrescribe solo los campos bloqueados y conserva el resto', () => {
    const identidad = getIdentidadLlaveMX({
      nombres: 'Diana', primer_apellido: 'López', segundo_apellido: '', curp: CURP,
    });
    const capturado = {
      nombres: 'CARLOS', primer_apellido: 'PÉREZ', segundo_apellido: 'X', curp: 'OTRA', email: 'a@b.mx',
    };
    expect(aplicarIdentidadLlaveMX(capturado, identidad)).toEqual({
      nombres: 'DIANA', primer_apellido: 'LÓPEZ', segundo_apellido: '', curp: CURP, email: 'a@b.mx',
    });
  });

  it('sin identidad no cambia nada', () => {
    const campos = { curp: 'X' };
    expect(aplicarIdentidadLlaveMX(campos, null)).toBe(campos);
  });
});

describe('validateCurp', () => {
  const formatMessage = (m) => m.defaultMessage;

  it('una CURP válida pasa en llamadas repetidas (antes fallaba en alternas)', () => {
    expect([1, 2, 3, 4].map(() => validateCurp(CURP, formatMessage))).toEqual(['', '', '', '']);
  });

  it('acepta la CURP genérica de extranjero', () => {
    expect(validateCurp(CURP_GENERICA_EXTRANJERO, formatMessage)).toEqual('');
  });

  it('rechaza formatos inválidos y valores con caracteres de más', () => {
    expect(validateCurp('ABC', formatMessage)).not.toEqual('');
    expect(validateCurp(`${CURP}X`, formatMessage)).not.toEqual('');
  });

  it('rechaza vacío', () => {
    expect(validateCurp('  ', formatMessage)).not.toEqual('');
  });
});

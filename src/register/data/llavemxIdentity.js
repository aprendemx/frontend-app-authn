/**
 * Identidad verificada de Llave MX para el formulario de registro.
 *
 * Llave MX entrega nombre, apellidos y CURP verificados contra RENAPO. Esos datos
 * son la fuente de verdad: el formulario los muestra de solo lectura y los envía
 * tal cual, para que la CURP y el nombre de la cuenta (y de la constancia) no
 * puedan diferir de la identidad con la que la persona inició sesión.
 */

// CURP genérica que la plataforma asigna a personas extranjeras sin CURP.
export const CURP_GENERICA_EXTRANJERO = 'XEXX010101HDFXXX04';

// Formato de CURP: 18 caracteres. Sin bandera `g`: con ella, `.test()` guarda
// `lastIndex` entre llamadas y una CURP válida falla en intentos alternos.
export const CURP_REGEX = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i;

/** Mayúsculas, sin acentos y con espacios simples. */
export const normalizarTexto = (texto) => (texto || '')
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toUpperCase()
  .replace(/\s+/g, ' ')
  .trim();

// Nombres oficiales que envía Llave MX y que no coinciden con el catálogo corto.
const ALIAS_ESTADOS = {
  'VERACRUZ DE IGNACIO DE LA LLAVE': 'VERACRUZ',
  'MICHOACAN DE OCAMPO': 'MICHOACAN',
  'COAHUILA DE ZARAGOZA': 'COAHUILA',
  'QUERETARO ARTEAGA': 'QUERETARO',
  'ESTADO DE MEXICO': 'MEXICO',
  'DISTRITO FEDERAL': 'CIUDAD DE MEXICO',
};

/**
 * Busca el estado en el catálogo del formulario ignorando mayúsculas y acentos,
 * y aceptando los nombres oficiales largos. Devuelve '' si no hay coincidencia.
 */
export const mapearEstado = (estadoTexto, estadoList) => {
  const normalizado = normalizarTexto(estadoTexto);
  if (!normalizado) {
    return '';
  }
  const buscado = ALIAS_ESTADOS[normalizado] || normalizado;
  const encontrado = (estadoList || []).find(e => normalizarTexto(e.name) === buscado);
  return encontrado ? { estadoCode: encontrado.code, displayValue: encontrado.name } : '';
};

const limpiar = (valor) => (valor || '').trim().toUpperCase();

/**
 * Extrae la identidad de Llave MX de los pipelineUserDetails y decide qué se bloquea.
 *
 * - Nombres: se bloquean nombre y ambos apellidos si Llave MX trae nombre y primer
 *   apellido (un segundo apellido vacío es dato verificado: la persona no lo tiene).
 * - CURP: si Llave MX trae una CURP válida, se bloquea con ese valor. Si la persona es
 *   extranjera, se bloquea con la CURP genérica. Si es nacional y no llegó CURP
 *   (caso anómalo), queda editable para no impedir el registro.
 */
export const getIdentidadLlaveMX = (pipelineUserDetails) => {
  const d = pipelineUserDetails || {};
  const nombres = limpiar(d.nombres);
  const primerApellido = limpiar(d.primer_apellido);
  const segundoApellido = limpiar(d.segundo_apellido);
  const curpLlave = limpiar(d.curp);
  const esExtranjero = Boolean(d.es_extranjero || d.esExtranjero || curpLlave === CURP_GENERICA_EXTRANJERO);

  const bloquearNombres = Boolean(nombres && primerApellido);

  let curp = '';
  let bloquearCurp = false;
  if (curpLlave && CURP_REGEX.test(curpLlave) && curpLlave !== CURP_GENERICA_EXTRANJERO) {
    curp = curpLlave;
    bloquearCurp = true;
  } else if (esExtranjero) {
    curp = CURP_GENERICA_EXTRANJERO;
    bloquearCurp = true;
  }

  return {
    nombres,
    primer_apellido: primerApellido,
    segundo_apellido: segundoApellido,
    curp,
    esExtranjero,
    bloquearNombres,
    bloquearCurp,
  };
};

/**
 * Sobrescribe en los campos del formulario los datos bloqueados con los de Llave MX.
 * Se aplica justo antes de enviar, para que el envío nunca lleve otros valores.
 */
export const aplicarIdentidadLlaveMX = (formFields, identidad) => {
  if (!identidad) {
    return formFields;
  }
  const campos = { ...formFields };
  if (identidad.bloquearNombres) {
    campos.nombres = identidad.nombres;
    campos.primer_apellido = identidad.primer_apellido;
    campos.segundo_apellido = identidad.segundo_apellido;
  }
  if (identidad.bloquearCurp) {
    campos.curp = identidad.curp;
  }
  return campos;
};

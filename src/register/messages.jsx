import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'register.page.title': {
    id: 'register.page.title',
    defaultMessage: 'Register | {siteName}',
    description: 'register page title',
  },
  // Field labels
  'registration.fullname.label': {
    id: 'registration.fullname.label',
    defaultMessage: 'Full name',
    description: 'Label that appears above fullname field',
  },
  'registration.email.label': {
    id: 'registration.email.label',
    defaultMessage: 'Email',
    description: 'Label that appears above email field on register page',
  },
  'registration.username.label': {
    id: 'registration.username.label',
    defaultMessage: 'Public username',
    description: 'Label that appears above username field',
  },
  'registration.password.label': {
    id: 'registration.password.label',
    defaultMessage: 'Password',
    description: 'Label that appears above password field',
  },
  'registration.country.label': {
    id: 'registration.country.label',
    defaultMessage: 'Country/Region',
    description: 'Placeholder for the country options dropdown.',
  },
  'registration.opt.in.label': {
    id: 'registration.opt.in.label',
    defaultMessage: 'I agree that {siteName} may send me marketing messages.',
    description: 'Text for opt in option on register page.',
  },
  // Help text
  'help.text.name': {
    id: 'help.text.name',
    defaultMessage: 'This name will be used by any certificates that you earn.',
    description: 'Help text for fullname field on registration page',
  },
  'help.text.username.1': {
    id: 'help.text.username.1',
    defaultMessage: 'The name that will identify you in your courses.',
    description: 'Part of help text for username field on registration page',
  },
  'help.text.username.2': {
    id: 'help.text.username.2',
    defaultMessage: 'This can not be changed later.',
    description: 'Part of help text for username field on registration page',
  },
  'help.text.email': {
    id: 'help.text.email',
    defaultMessage: 'For account activation and important updates',
    description: 'Help text for email field on registration page',
  },
  'help.text.dni': {
    id: 'help.text.dni',
    defaultMessage: 'ID / Cédula de Identidad / DNI ',
    description: 'ID / Cédula de Identidad / DNI ',
  },
  'help.text.pais': {
    id: 'help.text.pais',
    defaultMessage: 'País de origen ',
    description: 'País de origen ',
  },

  // Form buttons
  'create.account.for.free.button': {
    id: 'create.account.for.free.button',
    defaultMessage: 'Create an account for free',
    description: 'Label text for registration form submission button',
  },
  'create.account.cta.button': {
    id: 'create.account.cta.button',
    defaultMessage: '{label}',
    description: 'Label text for registration form submission button for those users who are landing through redirections',
  },
  // Institution login
  'register.institution.login.page.title': {
    id: 'register.institution.login.page.title',
    defaultMessage: 'Register with institution/campus credentials',
    description: 'Heading of institution page',
  },
  // Validation messages
  'empty.name.field.error': {
    id: 'empty.name.field.error',
    defaultMessage: 'Enter your full name',
    description: 'Error message for empty fullname field',
  },
  'empty.email.field.error': {
    id: 'empty.email.field.error',
    defaultMessage: 'Enter your email',
    description: 'Error message for empty email field',
  },
  'empty.username.field.error': {
    id: 'empty.username.field.error',
    defaultMessage: 'Username must be between 2 and 30 characters',
    description: 'Error message for empty username field',
  },
  'empty.password.field.error': {
    id: 'empty.password.field.error',
    defaultMessage: 'Password criteria has not been met',
    description: 'Error message for empty password field',
  },
  'empty.country.field.error': {
    id: 'empty.country.field.error',
    defaultMessage: 'Select your country or region of residence',
    description: 'Error message when no country/region is selected',
  },



  'invalid.country.field.error': {
    id: 'invalid.country.field.error',
    defaultMessage: 'Country must match with an option available in the dropdown.',
    description: 'Error message when country is invalid',
  },



  'empty.pais.field.error': {
    id: 'empty.pais.field.error',
    defaultMessage: 'Select your country or region of residence',
    description: 'Error message when no country/region is selected',
  },



  'invalid.pais.field.error': {
    id: 'invalid.pais.field.error',
    defaultMessage: 'Country must match with an option available in the dropdown.',
    description: 'Error message when country is invalid',
  },




  'email.do.not.match': {
    id: 'email.do.not.match',
    defaultMessage: 'The email addresses do not match.',
    description: 'Email not match to confirm email',
  },
  'email.invalid.format.error': {
    id: 'email.invalid.format.error',
    defaultMessage: 'Enter a valid email address',
    description: 'Validation error for invalid email address',
  },
  'username.validation.message': {
    id: 'username.validation.message',
    defaultMessage: 'Username must be between 2 and 30 characters',
    description: 'Error message for empty username field',
  },
  'name.validation.message': {
    id: 'name.validation.message',
    defaultMessage: 'Enter a valid name',
    description: 'Validation message that appears when fullname contain URL',
  },
  'password.validation.message': {
    id: 'password.validation.message',
    defaultMessage: 'Password criteria has not been met',
    description: 'Error message for empty or invalid password',
  },
  'username.format.validation.message': {
    id: 'username.format.validation.message',
    defaultMessage: 'Usernames can only contain letters (A-Z, a-z), numerals (0-9), underscores (_), and hyphens (-). Usernames cannot contain spaces',
    description: 'Validation message that appears when username format is invalid',
  },
  // Error messages
  'registration.request.failure.header': {
    id: 'registration.request.failure.header',
    defaultMessage: 'We couldn\'t create your account.',
    description: 'error message when registration failure.',
  },
  'registration.empty.form.submission.error': {
    id: 'registration.empty.form.submission.error',
    defaultMessage: 'Please check your responses and try again.',
    description: 'Error message that appears on top of the form when empty form is submitted',
  },
  'registration.request.server.error': {
    id: 'registration.request.server.error',
    defaultMessage: 'An error has occurred. Try refreshing the page, or check your internet connection.',
    description: 'Error message for internal server error.',
  },
  'registration.rate.limit.error': {
    id: 'registration.rate.limit.error',
    defaultMessage: 'Too many failed registration attempts. Try again later.',
    description: 'Error message that appears when an anonymous user has made too many failed registration attempts',
  },
  'registration.tpa.session.expired': {
    id: 'registration.tpa.session.expired',
    defaultMessage: 'Registration using {provider} has timed out.',
    description: '',
  },
  'registration.forbidden.username': {
    id: 'registration.forbidden.username',
    defaultMessage: 'Usernames can\'t include words that could be mistaken for course roles. Please choose a different username.',
    description: '',
  },
  'registration.tpa.authentication.failure': {
    id: 'registration.tpa.authentication.failure',
    defaultMessage: 'We are sorry, you are not authorized to access {platform_name} via this channel. '
        + 'Please contact your learning administrator or manager in order to access {platform_name}.'
        + '{lineBreak}{lineBreak}Error Details:{lineBreak}{errorMessage}',
    description: 'Error message third party authentication pipeline fails',
  },
  // Terms of Service and Honor Code
  'terms.of.service.and.honor.code': {
    id: 'terms.of.service.and.honor.code',
    defaultMessage: 'Terms of Service and Honor Code',
    description: 'Text for the hyperlink that redirects user to terms of service and honor code',
  },
  'privacy.policy': {
    id: 'privacy.policy',
    defaultMessage: 'Privacy Policy',
    description: 'Text for the hyperlink that redirects user to privacy policy',
  },
  'honor.code': {
    id: 'honor.code',
    defaultMessage: 'Leer Código de Honor Code',
    description: 'Texto hiperenlazado al código de honor',
  },
  'terms.of.service': {
    id: 'terms.of.service',
    defaultMessage: 'Aviso de privacidad',
    description: 'Text for the hyperlink that redirects user to the terms of service',
  },

  'aviso.de.privacidad': {
    id: 'aviso.de.privacidad',
    defaultMessage: 'Aviso de privacidad',
    description: 'Aviso de privacidad',
  },
  // miscellaneous strings
  'registration.username.suggestion.label': {
    id: 'registration.username.suggestion.label',
    defaultMessage: 'Suggested:',
    description: 'Suggested usernames label text.',
  },
  'did.you.mean.alert.text': {
    id: 'did.you.mean.alert.text',
    defaultMessage: 'Did you mean',
    description: 'Did you mean alert suggestion',
  },


  'empty.curp.field.error': {
    id: 'empty.curp.field.error',
    defaultMessage: 'CURP no puede estar vacío',
    description: 'CURP no puede estar vacío',
  },
  'empty.estado.field.error': {
    id: 'empty.estado.field.error',
    defaultMessage: 'Selecciona un estado',
    description: 'Debes seleccionar un estado',
  },
  'invalid.estado.field.error': {
    id: 'invalid.estado.field.error',
    defaultMessage: 'Selecciona un estado',
    description: 'Debes seleccionar un estado',
  },
  'help.text.nombres': {
    id: 'help.text.nombres',
    defaultMessage: 'Escribe tu nombre(s)',
    description: 'Debes Escribe tu nombre(s)',
  },
  'registration.pais.label': {
    id: 'registration.pais.label',
    defaultMessage: 'País de orígen',
    description: 'Selecciona el país de origen',
  },
  'registration.estado.label': {
    id: 'registration.estado.label',
    defaultMessage: 'Estado de residencia',
    description: 'Selecciona el  estado de residencia',
  },

    'help.text.primer_apellido': {
    id: 'help.text.primer_apellido',
    defaultMessage: 'Escribe tu primer apellido',
    description: 'Debes Escribe tu primer apellido',
    },
    'help.text.segundo_apellido': {
    id: 'help.text.segundo_apellido',
    defaultMessage: 'Escribe tu segundo apellido',
    description: 'Debes Escribe tu segundo apellido'
    },


  'help.text.municipio': {
    id: 'help.text.municipio',
    defaultMessage: 'Escribe tu municipio',
    description: 'Debes Escribe tu municipio',
  },

  'help.text.estado': {
    id: 'help.text.estado',
    defaultMessage: 'Selecciona tu estado',
    description: 'Debes seleccionar tu estado',
  },


  'help.text.funcion': {
    id: 'help.text.funcion',
    defaultMessage: 'Selecciona tu función en tu escuela',
    description: 'Selecciona tu función en tu escuela',
  },

  'registration.funcion.label': {
    id: 'registration.funcion.label',
    defaultMessage: 'Selecciona la función que desempeñas en tu escuela',
    description: 'Selecciona la función que desempeñas en tu escuela',
  },
  'empty.funcion.field.error': {
    id: 'empty.funcion.field.error',
    defaultMessage: 'Selecciona la función que desempeñas en tu escuela',
    description: 'Selecciona la función que desempeñas en tu escuela',
  },
  'invalid.funcion.field.error': {
    id: 'invalid.funcion.field.error',
    defaultMessage: 'Selecciona la función que desempeñas en tu escuela',
    description: 'Selecciona la función que desempeñas en tu escuela',
  },

  'help.text.ocupacion': {
    id: 'help.text.ocupacion',
    defaultMessage: 'Escribe tu ocupación(s)',
    description: 'Debes Escribe tu ocupación(s)',
  },

  'registration.ocupacion.label': {
    id: 'registration.ocupacion.label',
    defaultMessage: 'Selecciona la ocupación que desempeñas',
    description: 'Selecciona la función que desempeñas',
  },
  'empty.ocupacion.field.error': {
    id: 'empty.ocupacion.field.error',
    defaultMessage: 'Selecciona la ocupación que desempeñas',
    description: 'Selecciona la ocupacion que desempeñas',
  },
  'invalid.ocupacion.field.error': {
    id: 'invalid.ocupacion.field.error',
    defaultMessage: 'Selecciona la ocupación que desempeñas',
    description: 'Selecciona la ocupacion que desempeñas',
  },


  'help.text.nivel_Educativo': {
    id: 'help.text.nivel_Educativo',
    defaultMessage: 'Selecciona el nivel educativo en que desarrollas tu actividad',
    description: 'Selecciona el nivel educativo en que desarrollas tu actividad',
  },
  'registration.nivel_Educativo.label': {
    id: 'registration.nivel_Educativo.label',
    defaultMessage: 'Selecciona el nivel educativo en que desarrollas tu actividad',
    description: 'Selecciona el nivel educativo en que desarrollas tu actividad',
  },
  'empty.nivel_Educativo.field.error': {
    id: 'empty.nivel_Educativo.field.error',
    defaultMessage: 'Selecciona el nivel educativo en que desarrollas tu actividad',
    description: 'Selecciona el nivel educativo en que desarrollas tu actividad',
  },
  'invalid.nivel_Educativo.field.error': {
    id: 'invalid.nivel_Educativo.field.error',
    defaultMessage: 'Selecciona el nivel educativo en que desarrollas tu actividad',
    description: 'Selecciona el nivel educativo en que desarrollas tu actividad',
  },


  'help.text.maximo_nivel': {
    id: 'help.text.maximo_nivel',
    defaultMessage: 'Selecciona el máximo nivel educativo que cursaste',
    description: 'Selecciona el máximo nivel educativo que cursaste',
  },
  'registration.maximo_nivel.label': {
    id: 'registration.nivel_Educativo.label',
    defaultMessage: 'Selecciona el máximo nivel educativo que cursaste',
    description: 'Selecciona el máximo nivel educativo que cursaste',
  },
  'empty.maximo_nivel.field.error': {
    id: 'empty.nivel_Educativo.field.error',
    defaultMessage: 'Selecciona el máximo nivel educativo que cursaste',
    description: 'Selecciona el máximo nivel educativo que cursaste',
  },
  'invalid.maximo_nivel.field.error': {
    id: 'invalid.nivel_Educativo.field.error',
    defaultMessage: 'Selecciona el máximo nivel educativo que cursaste',
    description: 'Selecciona el máximo nivel educativo que cursaste',
  },





  'help.text.asignatura': {
    id: 'help.text.asignatura',
    defaultMessage: 'Escribe el campo formativo en el que te especializas',
    description: 'Escribe el campo formativo en el que te especializas',
  },


 'help.text.cct': {
    id: 'help.text.cct',
    defaultMessage: 'Escribe la Clave del Centro de Trabajo donde te desarrollas',
    description: 'Escribe la Clave del Centro de Trabajo donde te desarrollas',
  },


 'help.text.curp': {
    id: 'help.text.curp',
    defaultMessage: 'Escribe tu CURP',
    description: 'Escribe tu CURP',
  },






  'curp.validation.message': {
    id: 'curp.validation.message',
    defaultMessage: 'CURP inválido',
    description: 'CURP inválido',
  },



  'registration.municipio.label': {
    id: 'registration.municipio.label',
    defaultMessage: 'Selecciona tu municipio',
    description: 'Selecciona tu municipio',
  },
  'empty.municipio.field.error': {
    id: 'empty.municipio.field.error',
    defaultMessage: 'Selecciona tu municipio',
    description: 'Selecciona tu municipio',
  },
  'invalid.municipio.field.error': {
    id: 'invalid.municipio.field.error',
    defaultMessage: 'Selecciona tu municipio',
    description: 'Selecciona tu municipio',
  },




});

export default messages;

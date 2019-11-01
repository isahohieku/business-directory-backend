const main = {
    BODY_PARSER_LIMIT: '50mb',

    EMPTY_STRING: '',
    ZERO: 0,
    ERROR: 'error',
    SUCCESS: 'success',
    PENDING: 'pending',
    ENABLED: 'enabled',

    VERIFICATION_TYPE_EMAIL: 'email',
    VERIFICATION_TYPE_PHONE: 'phone',

    // eslint-disable-next-line max-len
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    CREATE_ACCOUNT_TEMPLATE: 'accountCreated',
    FORGOT_PASSWORD_TEMPLATE: 'forgotPassword',
    INVITE_ADMIN_TEMPLATE: 'adminInvite',
    INVITE_USER_TEMPLATE: 'userInvite',
    CREATE_ACCOUNT_SUBJECT: 'Email Verification',
    FORGOT_PASSWORD_SUBJECT: 'Reset your password',

    APPEMAILADDRESS: 'contactapp@email.com',
    SIGNUPSUBJECT: 'Welcome to contact app'
};

export { main };

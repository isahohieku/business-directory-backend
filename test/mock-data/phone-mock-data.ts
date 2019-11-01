import { phone } from '../../constants/phone.constants';

const validPhoneDetail = {
    contactId: 1,
    type: phone.MOBILE_NUMBER,
    number: '08036133002'
};

const validUpdatePhoneDetail = {
    id: -1,
    type: phone.MOBILE_NUMBER,
    number: '080312345678'
};

const invalidPhoneDetail = {
    fullName: 'Foo bar'
};

export {
    validPhoneDetail,
    invalidPhoneDetail,
    validUpdatePhoneDetail
};
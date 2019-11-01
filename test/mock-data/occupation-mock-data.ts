import { occupation } from '../../constants/occupation.constants';

const validOccupationDetail = {
    contactId: 1,
    position: occupation.ELECTRICAL_ENGINEER,
    workplace: 'Ovivi ventures Limited'
};

const validUpdateOccupationDetail = {
    id: -1,
    workplace: 'Dotmac Technology',
    position: occupation.NETWORK_SYSTEMS_ADMINISTRATOR
};

const invalidOccupationDetail = {
    workplace: 'Hobeei'
};

export {
    validOccupationDetail,
    invalidOccupationDetail,
    validUpdateOccupationDetail
};
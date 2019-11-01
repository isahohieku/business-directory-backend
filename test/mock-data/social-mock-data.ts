const validSocialDetail = {
    contactId: 1,
    type: 'work',
    handle: 'isahohieku@hobeei.com'
};

const validUpdateSocialDetail = {
    id: -1,
    handle: 'isahohieku@dotmac.ng',
    type: 'Hobeei'
};

const invalidSocialDetail = {
    handle: 'Foo bar'
};

export {
    validSocialDetail,
    invalidSocialDetail,
    validUpdateSocialDetail
};
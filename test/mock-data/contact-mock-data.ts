const validContactDetail = {
    authorId: 1,
    fullName: 'Foo bar',
    title: 'Mr.'
};

const validUpdateContactDetail = {
    authorId: 1,
    id: -1,
    fullName: 'Foo bar',
    title: 'Mr.'
};

const invalidContactDetail = {
    fullName: 'Foo bar'
};

export {
    validContactDetail,
    invalidContactDetail,
    validUpdateContactDetail
};
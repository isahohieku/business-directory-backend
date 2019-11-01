import ContactModel from '../../db/models/contact.model';

/**
 * @param id is the id of contact passed into the @method getContactData
 * @method getContactData is a method to get a contact or contacts
 */
const getContactData = async (id: string): Promise<ContactModel | ContactModel[] | undefined> => {
    if (!id) {
        const result = await ContactModel.query();
        return result;
    }

    const result = await ContactModel.query().where({ id }).first();
    return result;
};

/**
 * @param contact is the id of contact passed into the @method addContactData
 * @method addContactData is a method to add a contact
 */
const addContactData = async (contact: ContactModel): Promise<ContactModel | undefined> => {
    const result = await ContactModel.query().insert(contact).first();
    return result;
};

/**
 * @param contact is the id of contact passed into the @method removeContactData
 * @method removeContactData is a method to remove a contact
 */
const removeContactData = async (id: string): Promise<number | undefined> => {
    const result = await ContactModel.query().delete().where({ id });
    return result;
};

/**
 * @param data is the data of contact passed into the @method updateContactData
 * @method updateContactData is a method to update a contact
 */
const updateContactData = async (data: ContactModel): Promise<ContactModel | undefined> => {
    let result = await ContactModel.query().patchAndFetchById(Number(data.id), data);
    return result;
};

export { getContactData, addContactData, removeContactData, updateContactData };

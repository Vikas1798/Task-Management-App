export const ValidateName = (data) => {
    const re = /^[a-zA-Z]*[']?[ ]?[a-zA-Z]*[']?[ ]?[a-zA-Z]*$/;
    let test = re.test(data);
    return test;
};
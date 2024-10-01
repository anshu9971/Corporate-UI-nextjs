const ROOT_KEY = "@wizr";
const LS_KEY = {
    auth_token: `${ROOT_KEY}:auth`,
    reduxPersist: `persist:@wizr:persistRoot`,
    tempData: `${ROOT_KEY}:tempData`,
    subjects: `${ROOT_KEY}:subjects`,
    phone_verified: `${ROOT_KEY}:isPhoneVerified`,
};

const set = {
    authToken: (data) => {
        localStorage.setItem(
            LS_KEY.auth_token,
            JSON.stringify({
                auth_token: data,
            }),
        );
    },
    subjects: (data) => {
        localStorage.setItem(
            LS_KEY.subjects,
            JSON.stringify({
                subjects: data,
            }),
        );
    },
    tempData: (data) => {
        localStorage.setItem(
            LS_KEY.tempData,
            JSON.stringify({
                tempData: data,
            }),
        );
    },
    isPhoneVerified: () => {
        localStorage.setItem(LS_KEY.phone_verified, true);
    },
};

const fetch = {
    authToken: () => {
        const data = localStorage.getItem(LS_KEY.auth_token);
        let value = null;
        if (data) {
            try {
                const decoded = JSON.parse(data);
                value = decoded.auth_token;
            } catch (err) {
                // continue regardless of error
            }
        }
        return value;
    },
    subjects: () => {
        const data = localStorage.getItem(LS_KEY.subjects);
        let value = null;
        if (data) {
            try {
                const decoded = JSON.parse(data);
                value = decoded.subjects;
            } catch (err) {
                // continue regardless of error
            }
        }
        return value;
    },
    tempData: () => {
        const data = localStorage.getItem(LS_KEY.tempData);
        let value = null;
        if (data) {
            try {
                const decoded = JSON.parse(data);
                value = decoded.tempData;
            } catch (err) {
                // continue regardless of error
            }
        }
        return value;
    },
};

const destroy = {
    authToken: () => {
        localStorage.removeItem(LS_KEY.auth_token);
    },
    reduxPersist: () => {
        localStorage.removeItem(LS_KEY.reduxPersist);
    },
    all: () => {
        localStorage.removeItem(LS_KEY.auth_token);
        localStorage.removeItem(LS_KEY.reduxPersist);
        localStorage.removeItem(LS_KEY.tempData);
        localStorage.removeItem(LS_KEY.subjects);
        localStorage.removeItem(LS_KEY.phone_verified);
    },
};

export const storage = {
    set,
    fetch,
    destroy,
};

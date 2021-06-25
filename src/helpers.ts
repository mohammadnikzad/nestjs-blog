import * as bcrypt from 'bcryptjs';

export const getIPAddress = (): string => {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }

    return '0.0.0.0';
};

export const generateCode = (length = 4): string => {
    const characters = '123456789';
    const charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters[getRndInteger(0, charactersLength - 1)];
    }
    return randomString;
};

export const generateHash = (length = 40): string => {
    const characters = 'ABCDEFGIQUMLQPWDnspqmsdmtyipmnbvb0987615370KJJDISJDAMJHsjsadlqpwe';
    const charactersLength = characters.length;
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters[getRndInteger(0, charactersLength - 1)];
    }
    return randomString;
};

const getRndInteger = (min, max): number => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const slug = (title) => {
    return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-");
};

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Match user entered password to hashed password in database
export const matchPassword = async (enteredPassword, currentPassword) => {
    return await bcrypt.compare(enteredPassword, currentPassword);
};
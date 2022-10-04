const bcrypt = require('bcrypt');

async function verifyPassword() {
    const myPassword = 'admin123.202';
    const hash = '$2b$10$zzuvaIqi7tOp8jATmMSPeuYQYbAZjqZLTplrU6x5tRHIwpGEfKaZ2';
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
}

verifyPassword();
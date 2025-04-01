export const isValidPassword = (password: string) => {
    // Check if password length is at least 6
    if (password.length < 6) {
        return false;
    }

    // Check if password has at least one special character
    const hasSpecialChar = /[!@#$_&.*]/.test(password);
    if (!hasSpecialChar) {
        return false;
    }

    // Check if password has at least one lowercase letter
    const hasLowercase = /[a-z]/.test(password);
    if (!hasLowercase) {
        return false;
    }

    // Check if password has at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
    if (!hasUppercase) {
        return false;
    }

    // Check if password has at least one digit
    const hasDigit = /[0-9]/.test(password);
    if (!hasDigit) {
        return false;
    }

    // If all conditions pass, return true
    return true;
}

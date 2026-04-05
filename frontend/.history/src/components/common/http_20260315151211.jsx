export const apiUrl = 'http://localhost:8000/api';
export const fileUrl = 'http://localhost:8000';    // for accessing images and files.
export const token = () => {
    const userInfo = localStorage.getItem('userInfo');  // userInfo is coming from login.jsx where we have stored user info in local storage after login.
    if (userInfo) {
        const data = JSON.parse(userInfo);
        return data.token;
    }   

    return null;
}


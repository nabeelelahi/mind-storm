

export default function getUser() {
    const user = localStorage.getItem('user')
    console.log(user);
    return JSON.parse(user);
}
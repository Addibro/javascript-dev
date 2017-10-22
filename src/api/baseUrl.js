/*This file will look at the host name o determine if the application is running in development.
If it is, it will point our mock API which is hosted on port 3001. If it's in production it will point at
that production api that we set up that serves from express
*/

// This function will be used in userApi.js
export default function getBaseUrl() {
    const inDevelopment = window.location.hostname === 'localhost';
    return inDevelopment ? 'http://localhost:3001/' : '/';
}
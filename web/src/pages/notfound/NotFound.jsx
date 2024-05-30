import React from 'react'

const NotFound = () => {
    return (
    <div style={styles.container}>
        <h1 style={styles.heading}>404</h1>
        <h2 style={styles.subheading}>Page Not Found</h2>
        <p style={styles.text}>The page you are looking for does not exist.</p>
    </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '6em',
        margin: 0,
        color: '#FF5722',
    },
    subheading: {
        fontSize: '2em',
        margin: '0.2em 0',
    },
    text: {
        fontSize: '1.2em',
        margin: '0.5em 0',
    },
};

export default NotFound;

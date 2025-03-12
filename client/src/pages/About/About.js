import React from 'react';
import aboutImage from "../../assets/aboutimg.jpg";

function AboutPage() {

  const handleLocationClick = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=179+Periyar+Street,+Erode+-+638001",
      "_blank"
    );
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to Simon & Sons</h1>
        <h2 style={styles.subtitle}>Your Trusted Stationery Merchant</h2>
      </header>
      <section style={styles.contentSection}>
        <div style={styles.textContent}>
          <p style={styles.description}>
            At {" "}
            <span style={styles.highlight}
            onClick={handleLocationClick}
              title="Click to view our location"
            >
              Simon & Sons
            </span>
            , we specialize in providing a wide range of high-quality stationery items,
            including <strong>students' notebooks</strong>, premium <strong>paper products</strong>, and essential <strong>office supplies</strong>.
            We are proud to serve students, professionals, and creatives with products that inspire productivity and creativity.
          </p>
          <p style={styles.description}>
            Our stationery shop, based in Erode, has been a cornerstone for the community, offering the finest products to meet all your educational
            and office needs. With decades of experience, Simon & Sons is committed to excellence and customer satisfaction.
          </p>
          <p style={styles.contactDetails}>
            <strong>Address:</strong> 179 Periyar Street, Erode - 638 001 <br />
            <strong>Phone:</strong> 2227409, 2223928, 2213223 <br />
            <strong>Email:</strong> <a href="mailto:simonandsons121@gmail.com"><span style={{color:'green'}}>simonandsons121@gmail.com</span></a>
          </p>
        </div>
        <div style={styles.imageContent}>
          <img
            src={aboutImage}
            alt="Simon & Sons Stationery Shop"
            style={styles.image}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#2d3436',
    padding: '20px',
    background: 'linear-gradient(to bottom, #ffffff, #f1f1f1)', // Gradient background
    minHeight: '70vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '20px',
    background: 'linear-gradient(to right,rgb(53, 198, 164),rgb(4, 9, 12))',
    color: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '3em',
    margin: '10px 0',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  subtitle: {
    fontSize: '1.8em',
    fontStyle: 'italic',
    color: '#dfe6e9',
  },
  contentSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'rgba(227, 242, 241, 0.1)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  textContent: {
    flex: '1',
    maxWidth: '50%',
    textAlign: 'justify',
    padding: '10px',
    color: '#2d3436',
  },
  description: {
    fontSize: '1.2em',
    lineHeight: '1.8',
    marginBottom: '15px',
  },
  highlight: {
    color: 'brown',
    fontWeight: 'bold',
    textDecoration: 'underline',
    cursor:'pointer'
  },
  contactDetails: {
    fontSize: '1.1em',
    lineHeight: '1.8',
    marginTop: '10px',
    fontWeight: 'bold',
    color: 'black',
  },
  imageContent: {
    flex: '1',
    maxWidth: '50%',
    textAlign: 'center',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    cursor:'pointer'
  },
  imageHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
  },
  '@media (max-width: 768px)': {
    contentSection: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
    },
    textContent: {
      maxWidth: '100%',
      marginBottom: '20px',
    },
    imageContent: {
      maxWidth: '100%',
    },
    image: {
      maxWidth: '100%',
    },
    title: {
      fontSize: '2.5em',
    },
    subtitle: {
      fontSize: '1.4em',
    },
    description: {
      fontSize: '1em',
    },
  },
};


export default AboutPage;

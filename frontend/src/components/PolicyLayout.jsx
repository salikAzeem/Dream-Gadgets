import Navbar from "./Navbar";

export default function PolicyLayout({ title, children }) {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1>{title}</h1>
        <div style={styles.content}>{children}</div>
      </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    lineHeight: "1.8",
  },
  content: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#334155",
  },
};

import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <h2>Im the page component!</h2>

      {children}
    </div>
  );
}

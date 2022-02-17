import { useRouter } from 'next/router';

export function Button(props) {
  const router = useRouter();

  return props.href ? (
    <a
      {...props}
      className="app-btn"
      onClick={(e) => {
        e.preventDefault();
        router.push(props.href);
      }}
    />
  ) : (
    <button {...props} className="app-btn" />
  );
}

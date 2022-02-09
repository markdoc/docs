import {useRouter} from 'next/router';

export function Button(props) {
  const router = useRouter();

  return (
    <>
      {props.href ? (
        <a
          {...props}
          onClick={(e) => {
            e.preventDefault();
            router.push(props.href);
          }}
        />
      ) : (
        <button {...props} />
      )}
      <style jsx>
        {`
          button,
          a {
            display: inline-block;
            appearance: none;
            font-size: 18px;
            font-weight: 500;
            padding: 0.75rem 1.5rem;
            margin-right: 0.5rem;
            border-radius: 8px;
            border: 2px solid var(--theme);
            color: var(--text);
            background: transparent;
            transition: all 200ms ease;
          }
          button:hover,
          a:hover {
            background: var(--theme);
            color: white;
          }
        `}
      </style>
    </>
  );
}

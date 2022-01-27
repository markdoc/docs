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
            cursor: pointer;
            appearance: none;
            font-size: 18px;
            font-weight: 500;
            padding: 0.75rem 1.5rem;
            margin-right: 0.5rem;
            border-radius: 8px;
            border: 2px solid #2a9877;
            color: #333333;
            background: transparent;
            transition: all 200ms ease;
          }
          button:hover,
          a:hover {
            background: #2a9877;
            color: white;
          }
        `}
      </style>
    </>
  );
}

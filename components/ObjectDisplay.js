import React from 'react';

const COLORS = {
  string: 'var(--magenta)',
  number: 'var(--yellow)',
  boolean: 'var(--yellow)',
  default: 'white'
};

const VERTICAL_SPACING = 6;

function Arrow({ onClick, style }) {
  return (
    <span
      style={{
        position: 'absolute',
        border: '4px solid transparent',
        borderTop: '6px solid #bec5ca',
        top: '5px',
        left: '-12px',
        zIndex: 1,
        transformOrigin: 'center',
        ...style
      }}
      onClick={onClick}
    />
  );
}

function KeyValueRow({ children, onClick }) {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        margin: `${VERTICAL_SPACING}px 0`,
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative'
      }}
      onClick={onClick}
    >
      {!!onClick && (
        <>
          <Arrow
            onClick={onClick}
            style={{ transform: 'rotate(-90deg)', top: 3 }}
          />
        </>
      )}
      {children}
    </div>
  );
}

const getSurroundingChars = (isArray) => (isArray ? ['[', ']'] : ['{', '}']);

function LineStack({ data, rootKey, children, hasTrailingComma, onClick }) {
  const isArray = Array.isArray(data);
  const [leading, trailing] = getSurroundingChars(isArray);

  return (
    <pre
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: 'var(--white)',
        overflow: 'visible',
        margin: `${VERTICAL_SPACING}px 0`
      }}
    >
      <div
        onClick={onClick}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <Arrow style={{ left: '-16px' }} />
        <span>
          {!!rootKey && (
            <>
              <span>&quot;{rootKey}&quot;</span>
              {': '}
            </>
          )}
          {leading}
        </span>
      </div>
      <div style={{ marginLeft: 16 }}>{children}</div>
      <span>{`${trailing}${hasTrailingComma ? ',' : ''}`}</span>
    </pre>
  );
}

const isObject = (value) =>
  !Array.isArray(value) && typeof value === 'object' && value !== null;

export function ObjectDisplay({ data, rootKey, hasTrailingComma }) {
  const childCount = Object.keys(data).length;
  const isEmpty = childCount === 0;

  const [isCollapsed, setCollapsed] = React.useState(false);

  if ((isObject(data) || Array.isArray(data)) && (isCollapsed || isEmpty)) {
    const [leading, trailing] = getSurroundingChars(Array.isArray(data));

    return (
      <KeyValueRow
        onClick={isEmpty ? null : () => setCollapsed(false)}
        data={data}
      >
        {!!rootKey && (
          <>
            <span>&quot;{rootKey}&quot;</span>
            <pre>{': '}</pre>
          </>
        )}
        <pre>
          {isEmpty ? (
            `${leading}${trailing}`
          ) : (
            <>
              {leading}
              <span
                style={{ color: 'rgb(163, 172, 185)', lineHeight: 0 }}
              >{` ... `}</span>
              <span
                style={{ lineHeight: 0, color: 'rgb(163, 172, 185)' }}
              >{`${childCount} item${childCount === 1 ? '' : 's'} `}</span>
              {trailing}
            </>
          )}
        </pre>
        {hasTrailingComma && <pre>{','}</pre>}
      </KeyValueRow>
    );
  }

  const lines = Object.entries(data).map(([key, value]) => {
    const valueColor = COLORS[typeof value] ?? COLORS.default;

    if (isObject(value) || Array.isArray(value)) {
      return (
        <ObjectDisplay data={value} rootKey={key} hasTrailingComma={true} />
      );
    }

    return (
      <KeyValueRow key={key} hasTrailingComma={hasTrailingComma}>
        {isObject(data) && (
          <>
            <pre>&quot;{key}&quot;</pre>
            <pre>{': '}</pre>
          </>
        )}
        <pre style={{ color: valueColor }}>
          {typeof value === 'string' ? `"${value}"` : String(value)}
        </pre>
        <pre>{','}</pre>
      </KeyValueRow>
    );
  });

  return (
    <div className="object-display">
      <LineStack
        rootKey={rootKey}
        hasTrailingComma={hasTrailingComma}
        onClick={() => setCollapsed(true)}
        data={data}
      >
        {lines}
      </LineStack>
      <style jsx>{`
        .object-display {
          height: 100%;
          background: var(--black-medium);
          padding-left: ${hasTrailingComma ? 0 : 8}px;
        }
        .object-display :global(pre) {
          border: none;
          border-radius: 0;
          font-family: var(--mono);
          font-size: 13px;
        }
      `}</style>
    </div>
  );
}

import React from 'react';

const COLORS = {
  string: 'var(--magenta)',
  number: 'var(--yellow)',
  boolean: 'var(--yellow)',
  default: 'white'
};

const VERTICAL_SPACING = 6;

const Arrow = ({ onClick, style }) => (
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

const KeyValueRow = ({ children, onClick }) => (
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

const getSurroundingChars = (isArray) => (isArray ? ['[', ']'] : ['{', '}']);

const LineStack = ({
  rootKey,
  children,
  hasTrailingComma,
  onClick,
  isArray = false
}) => {
  const [leading, trailing] = getSurroundingChars(isArray);

  return (
    <pre
      style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: COLORS.default,
        overflow: 'visible',
        gap: VERTICAL_SPACING
      }}
    >
      <div
        onClick={onClick}
        style={{
          cursor: 'pointer',
          position: 'relative'
        }}
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
};

const isObject = (value) =>
  !Array.isArray(value) && typeof value === 'object' && value !== null;

export const ObjectDisplay = ({ data, rootKey, isRoot, minCollapseSize }) => {
  const childCount = Object.keys(data).length;
  const isEmpty = childCount === 0;

  const [isCollapsed, setCollapsed] = React.useState(
    () => !isRoot && childCount > minCollapseSize
  );

  if ((isObject(data) || Array.isArray(data)) && (isCollapsed || isEmpty)) {
    const [leading, trailing] = getSurroundingChars(Array.isArray(data));

    return (
      <KeyValueRow
        onClick={isEmpty ? null : () => setCollapsed(false)}
        canCopy={isRoot}
        data={data}
      >
        {!!rootKey && (
          <>
            <span>&quot;{rootKey}&quot;</span>
            <pre>{': '}</pre>
          </>
        )}
        <pre style={{ color: COLORS.default }}>
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
        {!isRoot && <pre>{','}</pre>}
      </KeyValueRow>
    );
  }

  const lines = Object.entries(data).map(([key, value]) => {
    const valueColor = COLORS[typeof value] ?? COLORS.default;

    if (isObject(value) || Array.isArray(value)) {
      return (
        <ObjectDisplay
          data={value}
          rootKey={key}
          minCollapseSize={minCollapseSize}
        />
      );
    }

    return (
      <KeyValueRow key={key} hasTrailingComma={!isRoot}>
        {isObject(data) && (
          <>
            <pre>&quot;{key}&quot;</pre>
            <pre>{': '}</pre>
          </>
        )}
        {!isObject(value) &&
          !Array.isArray(value) && ( // Can probably remove this check...
            <pre style={{ color: valueColor }}>
              {typeof value === 'string' ? `"${value}"` : String(value)}
            </pre>
          )}
        <pre>{','}</pre>
      </KeyValueRow>
    );
  });

  return (
    <div className="object-display">
      <LineStack
        rootKey={rootKey}
        hasTrailingComma={!isRoot}
        onClick={() => setCollapsed(true)}
        isArray={Array.isArray(data)}
        canCopy={false}
        data={data}
      >
        {lines}
      </LineStack>
      <style jsx>{`
        .object-display :global(pre) {
          border: none;
          background: var(--black-medium);
        }
        .object-display :global(pre) {
          font-family: var(--mono);
          border-radius: 0;
        }
      `}</style>
    </div>
  );
};

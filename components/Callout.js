import * as React from 'react';

import {Icon} from './Icon';

const PROP_MAP = {
  note: {icon: 'information-circle', color: '#f7fafc', iconColor: '#8792a2'},
  caution: {icon: 'warning', color: '#fcf9e9', iconColor: '#d97917'},
  check: {icon: 'checkmark-circle', color: '#efffed', iconColor: '#1ea672'},
  warning: {icon: 'warning', color: '#fff8f5', iconColor: '#ed5f74'},
};

export function Callout({title, children, type}) {
  const typeProps = PROP_MAP[type];

  return (
    <div className="wrapper">
      <div className="content">
        <div className="icon">
          <Icon icon={typeProps.icon} color={typeProps.iconColor}></Icon>
        </div>
        <div className="copy">
          <span className="title">{title}</span>
          <span>{children}</span>
        </div>
      </div>
      <style jsx>
        {`
          .content {
            display: flex;
            color: #3c4257;
            line-height: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            box-shadow: 0 0 0 1px #e3e8ee;
            background: ${typeProps.color};
          }
          .copy {
            display: flex;
            flex-direction: column;
          }
          div :global(p) {
            margin: 0;
          }
          .title {
            color: var(--dark);
          }
          .icon {
            padding-right: 8px;
          }
          .wrapper {
            padding: 20px 0 12px;
          }
        `}
      </style>
    </div>
  );
}

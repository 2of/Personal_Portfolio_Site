import React from 'react';
import styles from './StandardGrid.module.scss';

const StandardGrid = ({
  children,
  template = 'regular',
  animated = false,
  className = '',
  ...props
}) => {
  // Completely flat implementation relying on CSS Grid mapping
  const containerClasses = [
    styles.grid,
    styles[`template-${template}`],
    animated && styles.animatedContainer,
    className
  ].filter(Boolean).join(' ');

  // Inject animation delays sequentially if animated flag is true
  const renderedChildren = animated
    ? React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              style: {
                ...child.props.style,
                animationDelay: `${index * 85}ms` // Smooth staggered step orchestration
              }
            })
          : child
      )
    : children;

  return (
    <div className={containerClasses} {...props}>
      {renderedChildren}
    </div>
  );
};

StandardGrid.Item = ({ children, className = '', ...props }) => (
  <div className={[styles.item, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);

export default StandardGrid;
export { StandardGrid };